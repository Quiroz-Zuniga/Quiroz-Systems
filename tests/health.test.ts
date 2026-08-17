import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setupTestDatabase, startTestServer, jsonFetch, type TestServer } from './helpers';
import { loadAllLessonSpecs, validateLessonSpec } from '../backend/specs/lessonSpecs';

// SDD-3 — Tests e2e: healthcheck y validación de specs de lección versionadas.

describe('Health e2e', () => {
  let server: TestServer;
  let baseUrl: string;
  const NAMEDB = 'health';

  before(async () => {
    setupTestDatabase(NAMEDB);
    server = await startTestServer();
    baseUrl = server.baseUrl;
  });

  after(async () => {
    await server.close();
  });

  test('GET /api/health reporta ok con DB conectada', async () => {
    const { status, data } = await jsonFetch(baseUrl, '/api/health');
    assert.equal(status, 200);
    assert.equal(data.status, 'ok');
    assert.equal(data.database, 'connected');
    assert.ok(data.uptimeSeconds >= 0);
  });
});

describe('Specs de lecciones (SDD-2)', () => {
  test('existen specs para los 8 cursos y cumplen el contrato', () => {
    const specs = loadAllLessonSpecs();
    const courseIds = new Set(
      specs.map((s) => s.filePath.split('/').slice(-2)[0])
    );
    assert.equal(specs.length, 120, 'debe haber 120 lecciones versionadas');
    assert.equal(courseIds.size, 8, 'debe cubrir los 8 cursos');
    for (const { filePath, lesson } of specs) {
      assert.deepEqual(validateLessonSpec(lesson, filePath), [], `spec inválida: ${filePath}`);
    }
  });
});