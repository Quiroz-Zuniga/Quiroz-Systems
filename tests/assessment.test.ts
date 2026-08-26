import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import { setupTestDatabase, startTestServer, jsonFetch, type TestServer } from './helpers';
import { getLessonSpec, loadAllLessonSpecs } from '../backend/specs/lessonSpecs';
import { sqlCourse } from '../src/data/courses/sql';

// SDD — Zero Trust de evaluación: los testCases/schemaSql provienen de las
// specs versionadas (specs/lessons), no del body del cliente. Aunque el sandbox
// Piston no corre en CI, validamos el contrato completo de la fuente de verdad.

describe('Specs como fuente de verdad (Zero Trust)', () => {
  test('getLessonSpec resuelve testCases oficiales por curso/lección', () => {
    const spec = getLessonSpec('python', 'py-01');
    assert.ok(spec, 'debe resolver py-01');
    assert.ok(spec.testCases.length > 0, 'debe tener test cases');
    assert.ok(spec.maxScore > 0);
    assert.ok(spec.estimatedMinutes > 0);
  });

  test('las lecciones SQL incluyen schemaSql en la spec cuando la fuente lo usa', () => {
    const specs = loadAllLessonSpecs();
    const sqlSpecs = specs.filter((s) => s.filePath.includes(path.sep + 'sql' + path.sep));
    assert.equal(sqlSpecs.length, 15, 'debe haber 15 lecciones SQL');

    // Toda lección con schemaSql en el curriculum debe tenerlo también en la spec.
    for (const lesson of sqlCourse.lessons) {
      const spec = getLessonSpec('sql', lesson.id);
      assert.ok(spec, `spec faltante para ${lesson.id}`);
      if (lesson.exercise.schemaSql) {
        assert.ok(
          lesson.exercise.schemaSql === spec.schemaSql,
          `schemaSql NO versionado para ${lesson.id}`
        );
      }
    }
  });

  test('lección no versionada -> null (el evaluador la rechaza)', () => {
    assert.equal(getLessonSpec('python', 'no-existe'), null);
    assert.equal(getLessonSpec('curso-fake', 'l1'), null);
  });
});

describe('Evaluación Zero Trust e2e', () => {
  let server: TestServer;
  let baseUrl: string;
  let token: string;

  before(async () => {
    setupTestDatabase('assessment');
    server = await startTestServer();
    baseUrl = server.baseUrl;

    await jsonFetch(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        role: 'USUARIO',
        name: 'Assess Test',
        email: 'assess@test.com',
        password: 'Secret123!',
      }),
    });
    const login = await jsonFetch(baseUrl, '/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'assess@test.com', password: 'Secret123!', role: 'USUARIO' }),
    });
    token = login.data.token;
  });

  after(async () => {
    await server.close();
  });

  test('lección no registrada en el curriculum -> 400', async () => {
    const { status, data } = await jsonFetch(baseUrl, '/api/assessments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      // testCases manipulados por el cliente: deben ser IGNORADOS.
      body: JSON.stringify({
        courseId: 'python',
        lessonId: 'py-no-existe',
        language: 'python',
        code: 'print("hola")',
        testCases: [{ id: 'fake', output: 'aceptame' }],
      }),
    });
    assert.equal(status, 400);
    assert.match(data.error, /no está registrada/);
  });

  test('los testCases del body no existen en la respuesta de resultados falsos', async () => {
    // Enviar testCases manipulados NO debe evaluar contra ellos. Como no
    // tenemos Piston aquí, esperamos error de sandbox (503), NUNCA un resultado
    // calculado sobre los casos falsos.
    const spec = getLessonSpec('python', 'py-01')!;
    const { status, data } = await jsonFetch(baseUrl, '/api/assessments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        courseId: 'python',
        lessonId: 'py-01',
        language: 'python',
        code: 'print("X")',
        testCases: [{ id: 'hack', output: 'aceptame' }],
      }),
    });
    // Si Piston está disponible (solo dev), la evaluación corre con la spec
    // REAL; en CI sin sandbox, responde 503 sin contaminación de resultados.
    if (status === 503) {
      assert.ok(data.error);
    } else {
      assert.equal(status, 200);
      assert.equal(data.results.length, spec.testCases.length);
      assert.ok(data.results.every((r: any) => r.testCaseId !== 'hack'));
    }
  });
});