import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setupTestDatabase, startTestServer, jsonFetch, type TestServer } from './helpers';
import { allCourses } from '../src/data/courses';

describe('FASE 2 — API & Seguridad e2e', () => {
  let server: TestServer;
  let baseUrl: string;
  const NAMEDB = 'fase2';

  before(async () => {
    setupTestDatabase(NAMEDB);
    server = await startTestServer();
    baseUrl = server.baseUrl;
  });

  after(async () => {
    await server.close();
  });

  describe('1. Webhook de PayPal (Firma y Seguridad)', () => {
    test('rechaza con 400 cualquier webhook POST sin firma válida', async () => {
      const res = await jsonFetch(baseUrl, '/api/webhooks/paypal', {
        method: 'POST',
        body: JSON.stringify({
          event_type: 'BILLING.SUBSCRIPTION.ACTIVATED',
          resource: { custom_id: 'fake-id', id: 'I-SUB123' },
        }),
      });
      assert.equal(res.status, 400);
      assert.match(res.data.error, /Firma de webhook/i);
    });

    test('rechaza con 400 cuando cert-url no pertenece al dominio oficial de PayPal (anti-SSRF)', async () => {
      const res = await fetch(`${baseUrl}/api/webhooks/paypal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'paypal-transmission-id': 'test-trans-id',
          'paypal-transmission-time': new Date().toISOString(),
          'paypal-cert-url': 'https://malicious-site.com/fake-cert.pem',
          'paypal-auth-algo': 'SHA256withRSA',
          'paypal-transmission-sig': 'fake-sig',
        },
        body: JSON.stringify({
          event_type: 'BILLING.SUBSCRIPTION.ACTIVATED',
          resource: { custom_id: 'fake-id', id: 'I-SUB123' },
        }),
      });
      const data = await res.json();
      assert.equal(res.status, 400);
      assert.match(data.error, /Firma de webhook/i);
    });
  });

  describe('2. POST /api/progress — Zero Trust y recálculo server-side', () => {
    test('el servidor ignora finalGradePercent enviado por el cliente y lo recalcula con los intentos reales', async () => {
      // 1. Registrar y loguear estudiante
      const reg = await jsonFetch(baseUrl, '/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          role: 'USUARIO',
          name: 'Hacker Grade',
          email: 'hacker@test.com',
          password: 'Secret123!',
        }),
      });
      assert.equal(reg.status, 201);

      const login = await jsonFetch(baseUrl, '/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'hacker@test.com', password: 'Secret123!' }),
      });
      const token = login.data.token;

      // 2. Intentar inyectar finalGradePercent: 100 sin intentos reales
      const progressRes = await jsonFetch(baseUrl, '/api/progress', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          courseId: 'python',
          finalGradePercent: 100, // Intentar falsificar 100%
          attempts: {},
        }),
      });
      assert.equal(progressRes.status, 200);

      // 3. Consultar progreso y verificar que la nota real es 0%
      const getProgress = await jsonFetch(baseUrl, '/api/progress/python', {
        headers: { Authorization: `Bearer ${token}` },
      });
      assert.equal(getProgress.status, 200);
      assert.equal(getProgress.data.finalGradePercent, 0, 'La nota calculada server-side debe ser 0%');
    });
  });

  describe('3. Flujo completo de Reconocimiento Institucional', () => {
    test('institución activa emite reconocimiento cuando el alumno completó el curso', async () => {
      const { prisma } = await import('../backend/db');

      // 1. Crear institución
      const regInst = await jsonFetch(baseUrl, '/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          role: 'INSTITUCION',
          name: 'Instituto Tecnológico',
          email: 'admin@instituto.edu',
          password: 'Secret123!',
          institutionName: 'Instituto Tecnológico',
        }),
      });
      assert.equal(regInst.status, 201);
      const instUserId = regInst.data.user.id;

      // Activar suscripción y rol de la institución en DB
      await prisma.user.update({
        where: { id: instUserId },
        data: { role: 'INSTITUCION' },
      });
      await prisma.subscription.create({
        data: {
          institution_id: instUserId,
          plan: 'ESTANDAR',
          max_alumnos: 200,
          estado: 'activa',
        },
      });

      // Login institución
      const loginInst = await jsonFetch(baseUrl, '/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@instituto.edu', password: 'Secret123!' }),
      });
      const instToken = loginInst.data.token;

      // 2. Registrar alumno institucional y agregarlo
      const regStudent = await jsonFetch(baseUrl, '/api/institutions/add-user', {
        method: 'POST',
        headers: { Authorization: `Bearer ${instToken}` },
        body: JSON.stringify({
          name: 'Alumno Destacado',
          email: 'alumno@instituto.edu',
        }),
      });
      assert.equal(regStudent.status, 200);
      const studentId = regStudent.data.userUser.id;

      // 3. Intentar emitir reconocimiento ANTES de completar el curso -> debe fallar con 400
      const prematureRec = await jsonFetch(baseUrl, '/api/institutions/emit-recognition', {
        method: 'POST',
        headers: { Authorization: `Bearer ${instToken}` },
        body: JSON.stringify({
          userId: studentId,
          courseId: 'python',
        }),
      });
      assert.equal(prematureRec.status, 400);

      // 4. El alumno completa el curso: sembrar todas las lecciones aprobadas
      const pythonCourse = allCourses.find((c) => c.id === 'python')!;
      const progress = await prisma.courseProgress.create({
        data: {
          userId: studentId,
          courseId: 'python',
          status: 'APPROVED',
          finalGradePercent: 95,
          completionDate: new Date(),
        },
      });
      for (const lesson of pythonCourse.lessons) {
        await prisma.lessonAttempt.create({
          data: {
            courseProgressId: progress.id,
            lessonId: lesson.id,
            passed: true,
            submittedCode: 'print("ok")',
            scoreObtained: lesson.maxScore,
            completedAt: new Date(),
          },
        });
      }

      // 5. Emitir reconocimiento exitosamente
      const validRec = await jsonFetch(baseUrl, '/api/institutions/emit-recognition', {
        method: 'POST',
        headers: { Authorization: `Bearer ${instToken}` },
        body: JSON.stringify({
          userId: studentId,
          courseId: 'python',
        }),
      });
      assert.equal(validRec.status, 200);
      assert.equal(validRec.data.success, true);
      assert.ok(validRec.data.recognition.recognitionCode);
      assert.equal(validRec.data.recognition.usuario_id, studentId);
      assert.equal(validRec.data.recognition.curso_id, 'python');
      assert.equal(validRec.data.recognition.institucion_id, instUserId);
    });
  });
});
