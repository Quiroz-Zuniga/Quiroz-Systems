import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setupTestDatabase, startTestServer, jsonFetch, type TestServer } from './helpers';

// SDD-3 — Tests e2e de autenticación contra el servidor real (cookie + Bearer).
// Registro -> login -> /me por cookie -> rotación -> logout -> 401.

describe('Auth e2e', () => {
  let server: TestServer;
  let baseUrl: string;
  const NAMEDB = 'auth';

  before(async () => {
    setupTestDatabase(NAMEDB);
    server = await startTestServer();
    baseUrl = server.baseUrl;
  });

  after(async () => {
    await server.close();
  });

  test('registro de estudiante', async () => {
    const { status, data } = await jsonFetch(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        role: 'USUARIO',
        name: 'SDD Estudiante',
        email: 'sdd@test.com',
        password: 'Secret123!',
      }),
    });
    assert.equal(status, 201);
    assert.equal(data.success, true);
    assert.equal(data.user.role, 'USUARIO');
  });

  test('login emite token + usuario y fija cookie HttpOnly', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sdd@test.com', password: 'Secret123!', role: 'USUARIO' }),
    });
    const data = await res.json();
    assert.equal(res.status, 200);
    assert.ok(data.token, 'debe devolver token Bearer de respaldo');
    assert.equal(data.user.email, 'sdd@test.com');
    const setCookie = res.headers.get('set-cookie') || '';
    assert.ok(setCookie.includes('qs_session='), 'debe fijar cookie qs_session');
    assert.ok(setCookie.toLowerCase().includes('httponly'), 'cookie debe ser HttpOnly');
  });

  test('GET /me resuelve sesión por cookie', async () => {
    const login = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sdd@test.com', password: 'Secret123!', role: 'USUARIO' }),
    });
    const cookie = login.headers.get('set-cookie') || '';
    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: cookie.split(';')[0] },
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.user.email, 'sdd@test.com');
  });

  test('rotación: un nuevo login invalida el token anterior', async () => {
    const first = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sdd@test.com', password: 'Secret123!', role: 'USUARIO' }),
    });
    const { token: firstToken } = await first.json();

    // El mismo usuario vuelve a entrar: el primer token debe dejar de servir.
    await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sdd@test.com', password: 'Secret123!', role: 'USUARIO' }),
    });

    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${firstToken}` },
    });
    assert.equal(res.status, 401);
  });

  test('logout invalida la sesión y devuelve 401 después', async () => {
    const login = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sdd@test.com', password: 'Secret123!', role: 'USUARIO' }),
    });
    const { token } = await login.json();

    const logout = await jsonFetch(baseUrl, '/api/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(logout.status, 200);

    const me = await jsonFetch(baseUrl, '/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(me.status, 401);
  });

  test('protección default-deny: ruta autenticada sin sesión -> 401', async () => {
    const res = await jsonFetch(baseUrl, '/api/progress/python');
    assert.equal(res.status, 401);
  });
});