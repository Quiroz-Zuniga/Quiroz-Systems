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

  test('evaluación para usuario visitante / guest (sin token de autenticación)', async () => {
    const { status, data } = await jsonFetch(baseUrl, '/api/assessments', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'python',
        lessonId: 'py-01',
        language: 'python',
        code: 'print("Bienvenido a Quiroz Systems")\nprint("Python Nivel Cero")',
      }),
    });
    assert.equal(status, 200, 'Debe permitir evaluación para visitantes');
    assert.ok(data.passed, 'Debe aprobar la lección con el código correcto');
    assert.ok(data.grade, 'Debe incluir la calificación de la rúbrica');
    assert.equal(data.grade.passed, true);
  });

  test('evaluación local de C++ (fallback local)', async () => {
    const { status, data } = await jsonFetch(baseUrl, '/api/assessments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        courseId: 'cpp',
        lessonId: 'cpp-01',
        language: 'cpp',
        code: '#include <iostream>\nint main() {\n  std::cout << "Bienvenido a Quiroz Systems\\nC++ Nivel Cero" << std::endl;\n  return 0;\n}',
      }),
    });
    assert.equal(status, 200);
    assert.ok(data.passed, 'Debe aprobar la lección C++ 01');
  });

  test('evaluación local de JavaScript (fallback local)', async () => {
    const { status, data } = await jsonFetch(baseUrl, '/api/assessments', {
      method: 'POST',
      body: JSON.stringify({
        courseId: 'javascript',
        lessonId: 'js-01',
        language: 'javascript',
        code: 'console.log("Bienvenido a Quiroz Systems");\nconsole.log("JS Nivel Cero");',
      }),
    });
    assert.equal(status, 200);
    assert.ok(data.passed, 'Debe aprobar la lección JS 01');
  });
});