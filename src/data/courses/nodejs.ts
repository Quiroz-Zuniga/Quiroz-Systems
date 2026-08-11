import { Course } from '../../types';

export const nodejsCourse: Course = {
  id: 'nodejs',
  title: 'Quiroz Systems — Node.js',
  languageName: 'Node.js',
  monacoLanguage: 'javascript',
  description: 'Runtime V8, Event Loop, CommonJS, npm, Express.js, APIs RESTful, Middlewares, Streams y escalabilidad con Clusters.',
  levelRange: 'Básico → Experto',
  estimatedHours: 50,
  iconName: 'Server',
  color: 'from-emerald-600 to-teal-700',
  lessons: [
    {
      id: 'node-01',
      title: 'Introducción al Entorno y el REPL',
      level: 'Básico',
      objectives: ['Acceder a información del proceso con el objeto global process.'],
      theory: `### Conceptos
Node.js es un entorno de ejecución de JS fuera del navegador. Objeto global \`process\`.`,
      examples: [
        {
          title: 'process',
          code: `console.log("Versión de Node:", process.version);`,
        },
      ],
      exercise: {
        statement: 'Escribe un script de Node.js que imprima "Bienvenido a Quiroz Systems Node.js" y en la siguiente línea process.arch.',
        initialCode: `// Tu código aquí
`,
        solution: `console.log("Bienvenido a Quiroz Systems Node.js");
console.log(process.arch);`,
        testCases: [
          { id: 'tc-1', output: 'Bienvenido a Quiroz Systems Node.js\nx64\n' },
        ],
        hints: ['console.log(process.arch);'],
      },
      approvalCriteria: 'Uso del objeto global process.arch.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'node-02',
      title: 'Objeto Global y Variables de Entorno',
      level: 'Básico',
      objectives: ['Lectura de variables con process.env.'],
      theory: `### Conceptos
Variables de entorno accesibles mediante \`process.env.NOMBRE_VARIABLE\`. Fallbacks con \`||\`.`,
      examples: [
        {
          title: 'process.env',
          code: `const port = process.env.PORT || 3000;`,
        },
      ],
      exercise: {
        statement: 'Lee process.env.QUIROZ_PORT. Si existe imprime "Servidor escuchando en el puerto X". Si no existe usa 3000 por defecto.',
        initialCode: `// Tu código aquí
`,
        solution: `const puerto = process.env.QUIROZ_PORT || 3000;
console.log(\`Servidor escuchando en el puerto \${puerto}\`);`,
        testCases: [
          { id: 'tc-1', output: 'Servidor escuchando en el puerto 3000\n' },
        ],
        hints: ['const puerto = process.env.QUIROZ_PORT || 3000;'],
      },
      approvalCriteria: 'Lectura de process.env con fallback.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'node-03',
      title: 'El Sistema de Módulos (CommonJS)',
      level: 'Básico',
      objectives: ['Importación y exportación con require y module.exports.'],
      theory: `### Conceptos
Módulos en CommonJS: \`require('./modulo')\` y \`module.exports = { ... }\`. Módulos nativos como \`os\`.`,
      examples: [
        {
          title: 'CommonJS',
          code: `const os = require('os');
console.log(os.platform());`,
        },
      ],
      exercise: {
        statement: 'Importa el módulo local ./utils.js (que contiene multiplicar(a,b)) e importa el módulo nativo os. Imprime os.platform() y el resultado de multiplicar(5, 4).',
        initialCode: `// 1. Importa ./utils.js y os

// 2. Imprime os.platform()

// 3. Imprime multiplicación`,
        solution: `const utils = require('./utils.js');
const os = require('os');

console.log(os.platform());
console.log(utils.multiplicar(5, 4));`,
        testCases: [{ id: 'tc-1', output: 'linux\n20\n' }],
        hints: ['const utils = require("./utils.js");'],
      },
      approvalCriteria: 'Importación de módulo local y nativo con require.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'node-04',
      title: 'Gestión de Paquetes con npm',
      level: 'Básico',
      objectives: ['Uso de paquetes de terceros de node_modules.'],
      theory: `### Conceptos
Ecosistema npm y metadatos en \`package.json\`.`,
      examples: [
        {
          title: 'require colors',
          code: `const colors = require('colors');
console.log("Texto".red);`,
        },
      ],
      exercise: {
        statement: 'Importa el paquete colors instalado. Imprime el string "Error Critico" invocando la propiedad .red sobre él.',
        initialCode: `// Importa 'colors' e imprime "Error Critico" en rojo
`,
        solution: `const colors = require('colors');

console.log("Error Critico".red);`,
        testCases: [{ id: 'tc-1', output: 'Error Critico\n' }],
        hints: ['require("colors");', 'console.log("Error Critico".red);'],
      },
      approvalCriteria: 'Uso de librerías de terceros con require.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'node-05',
      title: 'Sistema de Archivos (fs) y Path',
      level: 'Intermedio',
      objectives: ['I/O asíncrono con fs/promises.'],
      theory: `### Conceptos
Módulo nativo \`fs/promises\` con \`async/await\`.`,
      examples: [
        {
          title: 'fs promises',
          code: `const fs = require('fs/promises');
const texto = await fs.readFile('file.txt', 'utf-8');`,
        },
      ],
      exercise: {
        statement: 'Usa fs/promises en una función async. Lee reporte.txt con utf-8 e imprímelo. Si no existe, atrapa con catch e imprime "ErrorDeLectura".',
        initialCode: `const fs = require('fs/promises');

async function ejecutar() {
    // try catch
}

ejecutar();`,
        solution: `const fs = require('fs/promises');

async function ejecutar() {
    try {
        const contenido = await fs.readFile('reporte.txt', 'utf-8');
        console.log(contenido);
    } catch (error) {
        console.log("ErrorDeLectura");
    }
}

ejecutar();`,
        testCases: [{ id: 'tc-1', output: 'ErrorDeLectura\n' }],
        hints: ['await fs.readFile("reporte.txt", "utf-8");'],
      },
      approvalCriteria: 'Lectura asíncrona con fs/promises y try/catch.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'node-06',
      title: 'Arquitectura Orientada a Eventos (EventEmitter)',
      level: 'Intermedio',
      objectives: ['Patrón Observador con EventEmitter.'],
      theory: `### Conceptos
\`EventEmitter\` nativo. Registro con \`.on()\` y disparo con \`.emit()\`.`,
      examples: [
        {
          title: 'EventEmitter',
          code: `const EventEmitter = require('events');
const emisor = new EventEmitter();
emisor.on('ping', () => console.log('pong'));
emisor.emit('ping');`,
        },
      ],
      exercise: {
        statement: 'Crea una instancia de EventEmitter llamada sistema. Registra (.on) el evento fallaCritica imprimiendo "Alerta: Código " + codigoError. Emite (.emit) el evento con 500.',
        initialCode: `// Importa e instancia EventEmitter
`,
        solution: `const EventEmitter = require('events');
const sistema = new EventEmitter();

sistema.on('fallaCritica', (codigoError) => {
    console.log(\`Alerta: Código \${codigoError}\`);
});

sistema.emit('fallaCritica', 500);`,
        testCases: [{ id: 'tc-1', output: 'Alerta: Código 500\n' }],
        hints: ['sistema.on("fallaCritica", codigo => ...)', 'sistema.emit("fallaCritica", 500)'],
      },
      approvalCriteria: 'Registro y emisión de eventos con EventEmitter.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'node-07',
      title: 'El Bucle de Eventos (Event Loop)',
      level: 'Intermedio',
      objectives: ['Orden de ejecución síncrono vs cola de Timers.'],
      theory: `### Conceptos
Single-thread y Event Loop. Macrotareas con \`setTimeout(..., 0)\`.`,
      examples: [
        {
          title: 'Event Loop',
          code: `console.log('1');
setTimeout(() => console.log('3'), 0);
console.log('2');`,
        },
      ],
      exercise: {
        statement: 'Imprime "Alfa" síncrono, "Beta" dentro de setTimeout con 0ms, y "Gamma" síncrono al final. La salida demostrará la cola de callbacks.',
        initialCode: `// Código aquí
`,
        solution: `console.log("Alfa");

setTimeout(() => {
    console.log("Beta");
}, 0);

console.log("Gamma");`,
        testCases: [{ id: 'tc-1', output: 'Alfa\nGamma\nBeta\n' }],
        hints: ['setTimeout con 0ms diferirá "Beta"'],
      },
      approvalCriteria: 'Uso de setTimeout para diferir ejecución.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'node-08',
      title: 'Creación de Servidores HTTP Nativos',
      level: 'Intermedio',
      objectives: ['Servidor HTTP nativo con módulo http.'],
      theory: `### Conceptos
Servidor web nativo: \`http.createServer((req, res) => { ... }).listen(puerto)\`.`,
      examples: [
        {
          title: 'http server',
          code: `const http = require('http');
http.createServer((req, res) => res.end('OK')).listen(3000);`,
        },
      ],
      exercise: {
        statement: 'Construye un servidor http. Si req.url === "/test" responde con res.write("Test OK") y finaliza con res.end(). Escucha en el puerto 8080.',
        initialCode: `const http = require('http');

// Servidor aquí`,
        solution: `const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/test') {
        res.write("Test OK");
        res.end();
    }
});

server.listen(8080);`,
        testCases: [{ id: 'tc-1', output: 'Test OK' }],
        hints: ['if (req.url === "/test") res.write("Test OK"); res.end();'],
      },
      approvalCriteria: 'Enrutamiento manual con http.createServer y res.end().',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'node-09',
      title: 'Introducción a Express.js y Enrutamiento',
      level: 'Intermedio',
      objectives: ['Creación de rutas REST con Express.'],
      theory: `### Conceptos
Framework Express: \`const app = express(); app.get('/ruta', (req, res) => res.json({...}))\`.`,
      examples: [
        {
          title: 'Express GET',
          code: `const express = require('express');
const app = express();
app.get('/ping', (req, res) => res.json({ ok: true }));`,
        },
      ],
      exercise: {
        statement: 'Crea la app Express. Define la ruta GET /ping que responda res.json({ status: "ok" }). Pon a escuchar en el puerto 4000.',
        initialCode: `const express = require('express');
// App y ruta`,
        solution: `const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
    res.json({ status: "ok" });
});

app.listen(4000);`,
        testCases: [{ id: 'tc-1', output: '{"status":"ok"}' }],
        hints: ['app.get("/ping", (req, res) => res.json({ status: "ok" }));'],
      },
      approvalCriteria: 'Instanciación de Express y respuesta res.json().',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'node-10',
      title: 'Middlewares y Arquitectura de APIs',
      level: 'Avanzado',
      objectives: ['Middlewares de aplicación y llamada a next().'],
      theory: `### Conceptos
Middleware: \`app.use((req, res, next) => { ... next(); })\`.`,
      examples: [
        {
          title: 'Middleware',
          code: `app.use((req, res, next) => { req.time = Date.now(); next(); });`,
        },
      ],
      exercise: {
        statement: 'Escribe un middleware global app.use que asigne req.timestamp = "2026" y llame a next(). Define GET /hora respondiendo con res.send(req.timestamp). Escucha en 3000.',
        initialCode: `const express = require('express');
const app = express();

// Middleware y ruta`,
        solution: `const express = require('express');
const app = express();

app.use((req, res, next) => {
    req.timestamp = "2026";
    next();
});

app.get('/hora', (req, res) => {
    res.send(req.timestamp);
});

app.listen(3000);`,
        testCases: [{ id: 'tc-1', output: '2026' }],
        hints: ['req.timestamp = "2026"; next();'],
      },
      approvalCriteria: 'Pipeline de middlewares con invocación a next().',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'node-11',
      title: 'Controladores y Simulación de Base de Datos',
      level: 'Avanzado',
      objectives: ['Controladores asíncronos y req.params.'],
      theory: `### Conceptos
Rutas dinámicas con parámetros \`app.get('/perfil/:id', controller)\` y \`req.params.id\`.`,
      examples: [
        {
          title: 'Controller',
          code: `app.get('/user/:id', (req, res) => res.send(req.params.id));`,
        },
      ],
      exercise: {
        statement: 'Define const buscarPerfil = async (id) => "Perfil " + id;. Define el controlador asíncrono getPerfil que extraiga req.params.id, haga await buscarPerfil(id) y responda con res.send(). Enlaza a GET /perfil/:id.',
        initialCode: `const express = require('express');
const app = express();

const buscarPerfil = async (id) => "Perfil " + id;

// Controlador y ruta`,
        solution: `const express = require('express');
const app = express();

const buscarPerfil = async (id) => "Perfil " + id;

const getPerfil = async (req, res) => {
    const id = req.params.id;
    const data = await buscarPerfil(id);
    res.send(data);
};

app.get('/perfil/:id', getPerfil);

app.listen(3000);`,
        testCases: [{ id: 'tc-1', output: 'Perfil 42' }],
        hints: ['const data = await buscarPerfil(req.params.id);'],
      },
      approvalCriteria: 'Uso de controladores asíncronos desacoplados.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'node-12',
      title: 'Seguridad Básica y Hashing',
      level: 'Avanzado',
      objectives: ['Hashing unidireccional con módulo crypto.'],
      theory: `### Conceptos
Módulo nativo \`crypto\`: \`crypto.createHash('sha256').update(txt).digest('hex')\`.`,
      examples: [
        {
          title: 'SHA256',
          code: `const crypto = require('crypto');
const hash = crypto.createHash('sha256').update("123").digest('hex');`,
        },
      ],
      exercise: {
        statement: 'Importa crypto. Crea hashearContrasena(password) que retorne el hash sha256 en digest hex. Imprime el resultado de hashearContrasena("Quiroz2026").',
        initialCode: `// Importa crypto y crea función
`,
        solution: `const crypto = require('crypto');

function hashearContrasena(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

console.log(hashearContrasena("Quiroz2026"));`,
        testCases: [
          { id: 'tc-1', output: 'c7d420ecfb0df75a31a5f661005a76985fb0b04ee0c25141bf2bb3d6e52ca31f\n' },
        ],
        hints: ['crypto.createHash("sha256").update(password).digest("hex")'],
      },
      approvalCriteria: 'Hashing unidireccional con módulo crypto.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'node-13',
      title: 'Streams y Buffers para Datos Masivos',
      level: 'Experto',
      objectives: ['Transmisión por chunks con createReadStream y pipe.'],
      theory: `### Conceptos
Procesamiento de datos con memoria constante usando \`pipe()\`.`,
      examples: [
        {
          title: 'Pipe',
          code: `readStream.pipe(writeStream);`,
        },
      ],
      exercise: {
        statement: 'Usa fs.createReadStream("origen.txt") y fs.createWriteStream("destino.txt"). Conéctalos usando .pipe().',
        initialCode: `const fs = require('fs');

// Streams y pipe`,
        solution: `const fs = require('fs');

const readStream = fs.createReadStream('origen.txt');
const writeStream = fs.createWriteStream('destino.txt');

readStream.pipe(writeStream);`,
        testCases: [{ id: 'tc-1', output: 'Stream completado' }],
        hints: ['readStream.pipe(writeStream);'],
      },
      approvalCriteria: 'Conexión de streams mediante pipe().',
      estimatedMinutes: 100,
      maxScore: 100,
    },
    {
      id: 'node-14',
      title: 'Escalabilidad con Módulo Cluster',
      level: 'Experto',
      objectives: ['Bifurcación multi-core con módulo cluster.'],
      theory: `### Conceptos
Bifurcación de procesos en servidores multi-core con \`cluster.fork()\`.`,
      examples: [
        {
          title: 'Cluster',
          code: `const cluster = require('cluster');
if (cluster.isPrimary) cluster.fork();`,
        },
      ],
      exercise: {
        statement: 'Si cluster.isPrimary es true ejecuta cluster.fork() 2 veces en un bucle for. Si es false imprime "Iniciado Worker".',
        initialCode: `const cluster = require('cluster');

// Lógica de cluster`,
        solution: `const cluster = require('cluster');

if (cluster.isPrimary) {
    for(let i=0; i<2; i++) {
        cluster.fork();
    }
} else {
    console.log("Iniciado Worker");
}`,
        testCases: [{ id: 'tc-1', output: 'Iniciado Worker\nIniciado Worker\n' }],
        hints: ['if (cluster.isPrimary) { for(let i=0; i<2; i++) cluster.fork(); }'],
      },
      approvalCriteria: 'Uso de cluster.isPrimary y cluster.fork().',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'node-15',
      title: 'Proyecto Integrador: Arquitectura de Microservicio REST',
      level: 'Experto',
      objectives: ['Ensamblar API Express con validación de body y middleware JSON.'],
      theory: `### Proyecto Integrador Final
Servicio Express con middleware parseador, rutas POST y códigos de estado semánticos.`,
      examples: [
        {
          title: 'Express POST',
          code: `app.use(express.json());
app.post('/api', (req, res) => res.status(201).json({ ok: true }));`,
        },
      ],
      exercise: {
        statement: 'Crea app Express con app.use(express.json()). Define POST /login. Desestructura email y password del req.body. Si falta alguno responde res.status(400).json({ error: "Bad Request" }). Si ambos existen responde res.status(200).json({ token: "JWT_SIMULADO" }). Escucha en puerto 3000.',
        initialCode: `const express = require('express');
const app = express();

// Middleware, ruta POST /login y puerto`,
        solution: `const express = require('express');
const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Bad Request" });
    }
    
    return res.status(200).json({ token: "JWT_SIMULADO" });
});

app.listen(3000);`,
        testCases: [
          { id: 'tc-1', input: '{"email":"test@quiroz.com"}', output: '{"error":"Bad Request"}' },
          { id: 'tc-2', input: '{"email":"test@quiroz.com","password":"123"}', output: '{"token":"JWT_SIMULADO"}' },
        ],
        hints: ['app.use(express.json());', 'res.status(400).json({ error: "Bad Request" });'],
      },
      approvalCriteria: 'Validación de payload con respuestas semánticas en Express.',
      estimatedMinutes: 150,
      maxScore: 500,
    },
  ],
};
