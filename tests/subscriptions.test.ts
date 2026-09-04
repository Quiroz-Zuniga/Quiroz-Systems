import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setupTestDatabase, startTestServer, jsonFetch, type TestServer } from './helpers';

describe('Suscripciones y Ciclo de Pagos Institucionales e2e', () => {
  let server: TestServer;
  let baseUrl: string;
  const NAMEDB = 'subscriptions_e2e';

  before(async () => {
    setupTestDatabase(NAMEDB);
    server = await startTestServer();
    baseUrl = server.baseUrl;
  });

  after(async () => {
    await server.close();
  });

  test('Ciclo completo: Registro -> Pendiente -> Checkout -> Activación Webhook -> Pago -> Cancelación', async () => {
    const { prisma } = await import('../backend/db');
    const uniqueEmail = `docente.${Date.now()}@colegio.edu`;

    // 1. Registro como INSTITUCION (crea usuario PENDIENTE_INSTITUCION)
    const regRes = await jsonFetch(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Profesor Ricardo',
        email: uniqueEmail,
        password: 'Password123!',
        role: 'INSTITUCION',
        institutionName: 'Colegio San Agustín',
      }),
    });

    assert.equal(regRes.status, 201);
    assert.equal(regRes.data.user.role, 'PENDIENTE_INSTITUCION');
    const institutionUserId = regRes.data.user.id;

    // 2. Login para obtener cookie de sesión
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: uniqueEmail, password: 'Password123!' }),
    });
    assert.equal(loginRes.status, 200);
    const cookie = loginRes.headers.get('set-cookie');
    assert.ok(cookie);

    // 3. Crear intento de suscripción a plan ESTANDAR
    const createRes = await fetch(`${baseUrl}/api/subscriptions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookie || '',
      },
      body: JSON.stringify({ planId: 'ESTANDAR' }),
    });
    assert.equal(createRes.status, 200);
    const createData = await createRes.json();
    assert.ok(createData.checkoutUrl);
    assert.ok(createData.subscriptionId);

    // 4. Consultar estado (debe figurar como pendiente_pago)
    const statusRes1 = await fetch(`${baseUrl}/api/subscriptions/status`, {
      method: 'GET',
      headers: { cookie: cookie || '' },
    });
    assert.equal(statusRes1.status, 200);
    const statusData1 = await statusRes1.json();
    assert.equal(statusData1.status, 'pendiente_pago');
    assert.equal(statusData1.plan, 'ESTANDAR');

    // 5. Simular Webhook de PayPal: BILLING.SUBSCRIPTION.ACTIVATED
    const paypalSubId = `I-SUB-PAYPAL-${Date.now()}`;
    const webhookActRes = await fetch(`${baseUrl}/api/webhooks/paypal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'paypal-transmission-id': 'trans-123',
        'paypal-transmission-time': new Date().toISOString(),
        'paypal-cert-url': 'https://api.paypal.com/cert.pem',
        'paypal-auth-algo': 'SHA256withRSA',
        'paypal-transmission-sig': 'VALID_TEST_SIGNATURE',
      },
      body: JSON.stringify({
        event_type: 'BILLING.SUBSCRIPTION.ACTIVATED',
        resource: {
          id: paypalSubId,
          custom_id: institutionUserId,
        },
      }),
    });
    assert.equal(webhookActRes.status, 200);

    // 6. Consultar estado post-activación (ahora activa y rol INSTITUCION)
    const statusRes2 = await fetch(`${baseUrl}/api/subscriptions/status`, {
      method: 'GET',
      headers: { cookie: cookie || '' },
    });
    assert.equal(statusRes2.status, 200);
    const statusData2 = await statusRes2.json();
    assert.equal(statusData2.status, 'activa');

    // 7. Simular Webhook de PayPal: PAYMENT.SALE.COMPLETED
    const txRef = `TX-PAYPAL-${Date.now()}`;
    const webhookPayRes = await fetch(`${baseUrl}/api/webhooks/paypal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'paypal-transmission-id': 'trans-124',
        'paypal-transmission-time': new Date().toISOString(),
        'paypal-cert-url': 'https://api.paypal.com/cert.pem',
        'paypal-auth-algo': 'SHA256withRSA',
        'paypal-transmission-sig': 'VALID_TEST_SIGNATURE',
      },
      body: JSON.stringify({
        event_type: 'PAYMENT.SALE.COMPLETED',
        resource: {
          id: txRef,
          billing_agreement_id: paypalSubId,
          amount: { total: '49.99', currency: 'USD' },
          create_time: new Date().toISOString(),
        },
      }),
    });
    assert.equal(webhookPayRes.status, 200);

    // 8. Verificar que la transacción quedó guardada en BD
    const tx = await prisma.transaction.findFirst({
      where: { referencia_paypal: txRef },
    });
    assert.ok(tx);
    assert.equal(tx?.monto, 49.99);
    assert.equal(tx?.estado, 'completado');

    // 9. Simular Webhook de Cancelación: BILLING.SUBSCRIPTION.CANCELLED
    const webhookCancelRes = await fetch(`${baseUrl}/api/webhooks/paypal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'paypal-transmission-id': 'trans-125',
        'paypal-transmission-time': new Date().toISOString(),
        'paypal-cert-url': 'https://api.paypal.com/cert.pem',
        'paypal-auth-algo': 'SHA256withRSA',
        'paypal-transmission-sig': 'VALID_TEST_SIGNATURE',
      },
      body: JSON.stringify({
        event_type: 'BILLING.SUBSCRIPTION.CANCELLED',
        resource: {
          id: paypalSubId,
          custom_id: institutionUserId,
        },
      }),
    });
    assert.equal(webhookCancelRes.status, 200);

    // 10. Consultar estado post-cancelación
    const statusRes3 = await fetch(`${baseUrl}/api/subscriptions/status`, {
      method: 'GET',
      headers: { cookie: cookie || '' },
    });
    assert.equal(statusRes3.status, 200);
    const statusData3 = await statusRes3.json();
    assert.equal(statusData3.status, 'cancelada');
  });
});
