import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setupTestDatabase, startTestServer, jsonFetch, type TestServer } from './helpers';
import { allCourses } from '../src/data/courses';

// SDD-3 — Tests e2e de certificados: validación de 100% en el backend y
// verificación pública del UUID. El progreso 100% se siembra en la DB de test
// con la rúbrica oficial (todas las lecciones aprobadas).

describe('Certificates e2e', () => {
  let server: TestServer;
  let baseUrl: string;
  let token: string;
  const NAMEDB = 'certificates';

  const course = allCourses.find((c) => c.id === 'python')!;

  before(async () => {
    setupTestDatabase(NAMEDB);
    server = await startTestServer();
    baseUrl = server.baseUrl;

    // Crear estudiante + login.
    await jsonFetch(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        role: 'STUDENT',
        name: 'SDD Cert',
        email: 'cert@test.com',
        password: 'Secret123!',
      }),
    });
    const login = await jsonFetch(baseUrl, '/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'cert@test.com', password: 'Secret123!', role: 'STUDENT' }),
    });
    token = login.data.token;

    // Sembrar progreso 100% (todas las lecciones aprobadas) directamente.
    const { prisma } = await import('../backend/db');
    const student = await prisma.student.findUnique({ where: { email: 'cert@test.com' } });
    const progress = await prisma.courseProgress.create({
      data: { studentId: student!.id, courseId: 'python' },
    });
    for (const lesson of course.lessons) {
      await prisma.lessonAttempt.create({
        data: {
          courseProgressId: progress.id,
          lessonId: lesson.id,
          passed: true,
          submittedCode: 'pass',
          scoreObtained: lesson.maxScore,
          functionalScore: lesson.maxScore * 0.7,
          efficiencyScore: lesson.maxScore * 0.2,
          timeScore: lesson.maxScore * 0.1,
          attemptsCount: 1,
          hintsUnlockedCount: 0,
          timeSpentSeconds: 600,
          completedAt: new Date(),
        },
      });
    }
  });

  after(async () => {
    await server.close();
  });

  test('emite certificado con 100% y UUID generado por backend', async () => {
    const { status, data } = await jsonFetch(baseUrl, '/api/certificates/issue', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ courseId: 'python', courseTitle: 'Python', studyHours: 45 }),
    });
    assert.equal(status, 200);
    assert.equal(data.success, true);
    assert.ok(data.certificate.uuid, 'debe incluir UUID');
    assert.ok(/^[0-9A-F-]{36}$/.test(data.certificate.uuid), 'UUID debe ser formato crypto');
  });

  test('verificación pública del certificado', async () => {
    const issue = await jsonFetch(baseUrl, '/api/certificates/issue', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ courseId: 'python', courseTitle: 'Python', studyHours: 45 }),
    });
    const uuid = issue.data.certificate.uuid;
    const verify = await jsonFetch(baseUrl, `/api/certificates/verify/${uuid}`);
    assert.equal(verify.status, 200);
    assert.equal(verify.data.valid, true);
  });

  test('emisión sin progreso suficiente -> 403', async () => {
    // Estudiante nuevo sin progreso.
    await jsonFetch(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        role: 'STUDENT',
        name: 'Sin Progreso',
        email: 'noprogress@test.com',
        password: 'Secret123!',
      }),
    });
    const login = await jsonFetch(baseUrl, '/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'noprogress@test.com', password: 'Secret123!', role: 'STUDENT' }),
    });
    const { status } = await jsonFetch(baseUrl, '/api/certificates/issue', {
      method: 'POST',
      headers: { Authorization: `Bearer ${login.data.token}` },
      body: JSON.stringify({ courseId: 'python', courseTitle: 'Python' }),
    });
    assert.equal(status, 403);
  });
});