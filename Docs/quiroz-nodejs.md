Quiroz Systems — Node.js
Descripción del curso: El curso "Quiroz Systems — Node.js" te llevará desde los fundamentos del entorno de ejecución de JavaScript en el servidor hasta la creación de arquitecturas escalables y de alto rendimiento. Construido sobre el motor V8 de Google Chrome, Node.js es el estándar de la industria para microservicios, APIs RESTful y aplicaciones en tiempo real. Este curso explora a profundidad su naturaleza asíncrona, el sistema de módulos, el bucle de eventos (Event Loop) y herramientas avanzadas para desplegar software empresarial de nivel experto.
Nivel objetivo: Cero absoluto (en Node.js) a Experto. Prerequisitos: Haber completado el curso "Quiroz Systems — JavaScript". Duración estimada total: 50 horas.
Resultados de aprendizaje (Learning Outcomes):
Configurar el entorno de Node.js y comprender su arquitectura No-Bloqueante impulsada por eventos.
Modularizar aplicaciones utilizando CommonJS y ES Modules, y gestionar dependencias con npm.
Interactuar con el sistema operativo (archivos, procesos, variables de entorno).
Construir servidores web robustos desde cero y utilizando el framework Express.js.
Diseñar e implementar APIs RESTful aplicando Middlewares, seguridad y buenas prácticas.
Escalar aplicaciones utilizando Streams para grandes volúmenes de datos y Clusters/Workers para concurrencia.
Tabla de Contenido
Lección 1: Introducción al Entorno y el REPL (Básico)
Lección 2: Objeto Global y Variables de Entorno (Básico)
Lección 3: El Sistema de Módulos (CommonJS) (Básico)
Lección 4: Gestión de Paquetes con npm (Básico)
Lección 5: Sistema de Archivos (fs) y Path (Intermedio)
Lección 6: Arquitectura Orientada a Eventos (EventEmitter) (Intermedio)
Lección 7: El Bucle de Eventos (Event Loop) (Intermedio)
Lección 8: Creación de Servidores HTTP Nativos (Intermedio)
Lección 9: Introducción a Express.js y Enrutamiento (Intermedio)
Lección 10: Middlewares y Arquitectura de APIs (Avanzado)
Lección 11: Controladores y Simulación de Base de Datos (Avanzado)
Lección 12: Seguridad Básica y Hashing (Avanzado)
Lección 13: Streams y Buffers para Datos Masivos (Experto)
Lección 14: Escalabilidad con Módulo Cluster (Experto)
Lección 15: Proyecto Integrador: Arquitectura de Microservicio (Experto)
Lección 1: Introducción al Entorno y el REPL
1. ID de lección
node-01
2. Título
Introducción al Entorno y el REPL
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar qué es Node.js y en qué se diferencia del JavaScript del navegador.
Ejecutar scripts de Node.js desde la línea de comandos.
Utilizar el objeto global process para obtener información del entorno.
5. Contenido teórico
Conceptos: Node.js no es un lenguaje, es un entorno de ejecución (runtime) de JavaScript basado en el motor V8. A diferencia del navegador, en Node.js no existe el objeto window ni el DOM, pero tenemos acceso directo al sistema operativo.
Sintaxis: Ejecutar un archivo: node archivo.js. Interfaz REPL: simplemente tecleando node en la terminal.
Buenas prácticas: Utilizar siempre el modo estricto ("use strict";) en versiones antiguas, aunque en las modernas y en ES Modules ya es el estándar.
Errores comunes: Intentar usar document.getElementById o alert() dentro de un script de Node.js, lo cual lanzará ReferenceError porque esas APIs pertenecen exclusivamente a los navegadores web.
6. Ejemplos de código comentados
Ejemplo 1: Hola Node
JavaScript
// Este código se ejecuta en el servidor (o tu terminal local)
console.log("Iniciando aplicación en Quiroz Systems...");
console.log(`Versión de Node: ${process.version}`);

Ejemplo 2: Argumentos de línea de comandos
JavaScript
// process.argv es un array con los argumentos pasados al script
// Índice 0: ruta de node, Índice 1: ruta del script, Índice 2+: argumentos personalizados
const argumento = process.argv[2];
console.log(`Hola, ${argumento || 'Invitado'}`);

7. Ejercicio práctico
Enunciado: Escribe un script de Node.js que imprima exactamente "Bienvenido a Quiroz Systems Node.js". En la siguiente línea, debes imprimir el valor de tu arquitectura de sistema utilizando la propiedad process.arch. Código inicial:
JavaScript
// Tu código aquí


Solución esperada:
JavaScript
console.log("Bienvenido a Quiroz Systems Node.js");
console.log(process.arch);

Casos de prueba:
Caso 1: Output esperado (asumiendo x64): Bienvenido a Quiroz Systems Node.js\nx64\n (puede variar la arq, pero debe imprimir algo válido como x64 o arm64).
Caso 2: Verificar que no haya errores de ReferenceError.
Caso 3: Validar la presencia del objeto nativo process.arch. Pistas progresivas:
Haz un console.log() normal para la primera línea.
El objeto process está disponible globalmente en Node, no necesitas importarlo.
Simplemente haz console.log(process.arch) en la segunda línea.
8. Criterio de aprobación de la lección
La salida estándar muestra el saludo y la arquitectura del procesador accediendo correctamente al objeto global de Node.
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 2: Objeto Global y Variables de Entorno
1. ID de lección
node-02
2. Título
Objeto Global y Variables de Entorno
3. Nivel
Básico
4. Objetivos de aprendizaje
Identificar el objeto global de Node.js como equivalente al window del navegador.
Leer y configurar variables de entorno a través de process.env.
Implementar lógicas condicionales basadas en el entorno de despliegue.
5. Contenido teórico
Conceptos: Las variables de entorno sirven para ocultar información sensible (contraseñas, claves de API) y modificar el comportamiento del software dependiendo de dónde se ejecute (Desarrollo vs Producción). Node expone esto mediante process.env.
Sintaxis: Acceso mediante process.env.NOMBRE_VARIABLE.
Buenas prácticas: Nunca quemar (hardcodear) contraseñas ni tokens en el código fuente. Usar paquetes como dotenv para cargar estas variables desde un archivo .env en desarrollo.
Errores comunes: Subir el archivo .env a repositorios públicos como GitHub (siempre debe estar en el .gitignore).
6. Ejemplos de código comentados
Ejemplo 1: El objeto global
JavaScript
// setTimeout y console pertenecen al objeto 'global' en Node
global.setTimeout(() => {
    console.log("Esto es ejecutado desde el objeto global");
}, 1000);

Ejemplo 2: Evaluando el entorno
JavaScript
// Suponiendo que ejecutamos el script con: NODE_ENV=production node app.js
const entorno = process.env.NODE_ENV || 'development';

if (entorno === 'production') {
    console.log("Ejecutando en modo PRODUCCIÓN. Bases de datos reales conectadas.");
} else {
    console.log("Ejecutando en modo DESARROLLO. Mock de datos activado.");
}

7. Ejercicio práctico
Enunciado: El entorno de evaluación inyectará una variable de entorno llamada QUIROZ_PORT. Escribe un script que lea esta variable. Si la variable existe, imprime "Servidor escuchando en el puerto X" (donde X es el valor). Si no existe o está vacía, debe imprimir "Servidor escuchando en el puerto 3000" por defecto. Código inicial:
JavaScript
// Tu código aquí


Solución esperada:
JavaScript
const puerto = process.env.QUIROZ_PORT || 3000;
console.log(`Servidor escuchando en el puerto ${puerto}`);

Casos de prueba:
Caso 1: (Simulando entorno sin variable): Output: Servidor escuchando en el puerto 3000\n
Caso 2: (Simulando process.env.QUIROZ_PORT = 8080): Output: Servidor escuchando en el puerto 8080\n
Caso 3: Validar la lectura a través de process.env. Pistas progresivas:
Declara una variable puerto leyendo process.env.QUIROZ_PORT.
Utiliza el operador OR (||) lógico para asignar 3000 si la primera es undefined.
Interpola el valor usando un Template Literal.
8. Criterio de aprobación de la lección
Acceso seguro a variables de entorno aplicando fallbacks (valores por defecto) efectivos.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 3: El Sistema de Módulos (CommonJS)
1. ID de lección
node-03
2. Título
El Sistema de Módulos (CommonJS)
3. Nivel
Básico
4. Objetivos de aprendizaje
Encapsular lógica en múltiples archivos utilizando módulos.
Exportar funciones y objetos utilizando module.exports.
Importar módulos locales y módulos nativos (Core Modules) usando require().
5. Contenido teórico
Conceptos: Históricamente, Node.js utiliza el estándar CommonJS para sus módulos, donde cada archivo es un módulo con su propio scope privado. (Actualmente también soporta ES Modules import/export, pero require es vital de entender).
Sintaxis: Exportar: module.exports = { funcion };. Importar: const modulo = require('./modulo');.
Buenas prácticas: Agrupar lógicas similares en archivos dedicados (ej. math.js, logger.js). Usar rutas relativas ./ o ../ para archivos propios; para módulos nativos (como os), solo el nombre.
Errores comunes: Confundir exports con module.exports. Asignar un valor nuevo a exports directamente rompe el enlace, por lo que siempre se recomienda usar module.exports. Lanzamiento de MODULE_NOT_FOUND por rutas mal escritas.
6. Ejemplos de código comentados
Ejemplo 1: Archivo math.js (El Módulo)
JavaScript
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;

// Hacemos públicas estas funciones
module.exports = {
    sumar,
    restar
};

Ejemplo 2: Archivo app.js (El Consumidor)
JavaScript
// Importamos el módulo local (nota el ./)
const math = require('./math');
// Importamos un módulo nativo de Node.js (información del SO)
const os = require('os'); 

console.log("La suma es:", math.sumar(5, 10));
console.log("Sistema operativo:", os.type());

7. Ejercicio práctico
Enunciado: El entorno ha precargado un archivo virtual llamado ./utils.js que contiene y exporta una función multiplicar(a, b). En tu script principal (este editor), importa ese módulo local. Luego, importa el módulo nativo os. Imprime primero el nombre de la plataforma usando os.platform(). Finalmente, imprime el resultado de usar multiplicar(5, 4). Código inicial:
JavaScript
// 1. Importa ./utils.js y el módulo os

// 2. Imprime os.platform()

// 3. Imprime la multiplicación

Solución esperada:
JavaScript
const utils = require('./utils.js');
const os = require('os');

console.log(os.platform());
console.log(utils.multiplicar(5, 4));

Casos de prueba:
Caso 1: Output esperado: [plataforma]\n20\n (Ej. linux\n20\n).
Caso 2: Comprobar la presencia estricta de la función nativa require.
Caso 3: Verificar que se importa usando la ruta local correcta. Pistas progresivas:
Declara const utils = require('./utils.js');.
Declara const os = require('os'); (sin el ./ por ser nativo).
Llama a utils.multiplicar(5, 4) dentro de un console.log.
8. Criterio de aprobación de la lección
Integración exitosa de módulos nativos y de usuario empleando la sintaxis CommonJS.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 4: Gestión de Paquetes con npm
1. ID de lección
node-04
2. Título
Gestión de Paquetes con npm
3. Nivel
Básico
4. Objetivos de aprendizaje
Comprender el propósito de npm (Node Package Manager) y del archivo package.json.
Explicar la diferencia entre dependencias de producción y dependencias de desarrollo.
Requerir dependencias de terceros instaladas en node_modules.
5. Contenido teórico
Conceptos: npm es el registro de software más grande del mundo. El archivo package.json es el corazón de cualquier proyecto Node, listando metadatos y dependencias. La carpeta node_modules almacena el código físico descargado.
Sintaxis CLI: npm init -y (crea package.json), npm install <paquete> (instala), npm install -D <paquete> (instala solo para desarrollo).
Buenas prácticas: NUNCA hacer commit de la carpeta node_modules en Git; el archivo package.json basta para que otros devs hagan npm install y regeneren la carpeta.
Errores comunes: Borrar accidentalmente package.json. Alterar código dentro de node_modules (cualquier cambio allí se borrará en la próxima actualización del paquete).
6. Ejemplos de código comentados
Ejemplo 1: Un package.json típico
JSON
{
  "name": "quiroz-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}

Ejemplo 2: Usando un paquete descargado
JavaScript
// Una vez instalado (ej. npm install uuid), se importa igual que un módulo nativo
const { v4: uuidv4 } = require('uuid');

console.log("Generando ID único:");
console.log(uuidv4());

7. Ejercicio práctico
(Simulación de npm) Enunciado: Imagina que ya ejecutaste npm install colors en este proyecto. El paquete colors añade propiedades a los Strings en consola. Importa el paquete colors. Luego, imprime el texto "Error Critico" pero invocando la propiedad .red sobre el string. Código inicial:
JavaScript
// Importa el paquete 'colors'
// (En este entorno de prueba el módulo ya está simulado e instalado)

// Imprime "Error Critico" usando el método proveído por el paquete

Solución esperada:
JavaScript
const colors = require('colors');

console.log("Error Critico".red);

Casos de prueba:
Caso 1: Output esperado exacto: Se imprimirá la cadena con códigos ANSI u objeto modificado (evaluado internamente como "Error Critico".red).
Caso 2: Verificar sintaxis de importación require('colors').
Caso 3: Validar la llamada al método extensor provisto por el paquete sobre una primitiva String. Pistas progresivas:
Haz un require('colors');. No necesitas asignarlo a una variable obligatoriamente, ya que este paquete específico muta el prototipo String al importarse.
Escribe tu string "Error Critico".
Concaténale la propiedad .red al final: "texto".red dentro del log.
8. Criterio de aprobación de la lección
Demostrar la importación y uso de módulos de terceros alojados globalmente en la carpeta de dependencias.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 5: Sistema de Archivos (fs) y Path
1. ID de lección
node-05
2. Título
Sistema de Archivos (fs) y Path
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Leer y escribir archivos en el disco duro usando el módulo nativo fs.
Diferenciar entre los métodos síncronos (fs.readFileSync) y asíncronos basados en Promesas.
Manejar rutas de directorios independientemente del Sistema Operativo con el módulo path.
5. Contenido teórico
Conceptos: Node.js brilla al interactuar con el sistema de archivos. Para evitar bloquear el servidor, casi siempre debes preferir las versiones asíncronas (promises o callbacks) en lugar de las que terminan en Sync.
Sintaxis: const fs = require('fs/promises');, const path = require('path');.
Buenas prácticas: Usar path.join(__dirname, 'archivo.txt') para construir rutas relativas de manera segura, resolviendo los problemas de las barras (/ en Linux vs \ en Windows).
Errores comunes: Usar funciones Sync (ej. fs.writeFileSync) en el ciclo principal de una API, lo que bloqueará por completo el servidor impidiendo que otros usuarios se conecten mientras el disco escribe.
6. Ejemplos de código comentados
Ejemplo 1: Construcción de Rutas (Path)
JavaScript
const path = require('path');
// __dirname es una constante de Node que apunta a la carpeta actual
const rutaSegura = path.join(__dirname, 'logs', 'app.log');
console.log(rutaSegura);

Ejemplo 2: Lectura Asíncrona (fs/promises)
JavaScript
const fs = require('fs/promises');

async function leerArchivo() {
    try {
        // Leemos el archivo esperando su resolución asíncrona (utf-8 para texto)
        const contenido = await fs.readFile('./datos.txt', 'utf-8');
        console.log(contenido);
    } catch (error) {
        console.error("No se pudo leer el archivo", error);
    }
}
leerArchivo();

7. Ejercicio práctico
Enunciado: Usa require('fs/promises'). Escribe una función asíncrona autoejecutable (o normal y llámala) que intente leer un archivo llamado reporte.txt con codificación utf-8. Si es exitoso, imprime el contenido. Si falla (archivo no existe), el catch debe imprimir estrictamente "ErrorDeLectura". Código inicial:
JavaScript
const fs = require('fs/promises');

// Crea tu función asíncrona
async function ejecutar() {
    // try catch aquí
}

ejecutar();

Solución esperada:
JavaScript
const fs = require('fs/promises');

async function ejecutar() {
    try {
        const contenido = await fs.readFile('reporte.txt', 'utf-8');
        console.log(contenido);
    } catch (error) {
        console.log("ErrorDeLectura");
    }
}

ejecutar();

Casos de prueba:
Caso 1: (Si el archivo existe): Output: [Contenido del archivo]\n
Caso 2: (Si el archivo NO existe): Output: ErrorDeLectura\n
Caso 3: Validación estricta del uso de la promesa await fs.readFile(. Pistas progresivas:
Dentro del try, declara const contenido = await fs.readFile('reporte.txt', 'utf-8');.
Imprime la constante en la siguiente línea.
En el bloque catch, escribe el console.log("ErrorDeLectura"); directamente.
8. Criterio de aprobación de la lección
Consumo exitoso de APIs nativas asíncronas de I/O de disco utilizando async/await.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 6: Arquitectura Orientada a Eventos (EventEmitter)
1. ID de lección
node-06
2. Título
Arquitectura Orientada a Eventos (EventEmitter)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Explicar el patrón de diseño Observador (Observer Pattern) subyacente en Node.js.
Instanciar la clase nativa EventEmitter.
Emitir eventos y registrar Listeners (escuchadores) para reaccionar asíncronamente.
5. Contenido teórico
Conceptos: Gran parte de los módulos de Node (como streams y requests HTTP) heredan de EventEmitter. Se basa en emitir señales (eventos con nombre) que disparan funciones (listeners) registradas para ese nombre.
Sintaxis: const EventEmitter = require('events'); const emisor = new EventEmitter();. Escuchar: emisor.on('nombre', callback). Emitir: emisor.emit('nombre', datos).
Buenas prácticas: Agrupar los nombres de eventos en un objeto de constantes para evitar errores tipográficos (typos) al emitir o escuchar.
Errores comunes: Emitir un evento antes de haber registrado (.on()) el listener. Los listeners solo escuchan hacia el futuro, no los eventos del pasado.
6. Ejemplos de código comentados
Ejemplo 1: Emisor de eventos básico
JavaScript
const EventEmitter = require('events');
const notificador = new EventEmitter();

// 1. Registramos el escuchador
notificador.on('usuarioRegistrado', (datosUsuario) => {
    console.log(`Enviando email de bienvenida a: ${datosUsuario.email}`);
});

// 2. Simulamos la acción (esto disparará la función de arriba)
console.log("Registrando usuario en DB...");
notificador.emit('usuarioRegistrado', { email: 'test@quirozsystems.com' });

7. Ejercicio práctico
Enunciado: Importa el módulo nativo events y crea una instancia de EventEmitter llamada sistema. Registra un evento (.on) llamado fallaCritica. Su callback recibe un parámetro codigoError e imprime "Alerta: Código " + codigoError. Finalmente, emite (.emit) el evento pasándole el código entero 500. Código inicial:
JavaScript
// Importa y crea la instancia

// Registra el evento (listener)

// Emite el evento

Solución esperada:
JavaScript
const EventEmitter = require('events');
const sistema = new EventEmitter();

sistema.on('fallaCritica', (codigoError) => {
    console.log(`Alerta: Código ${codigoError}`);
});

sistema.emit('fallaCritica', 500);

Casos de prueba:
Caso 1: Output esperado exacto: Alerta: Código 500\n
Caso 2: Verificar sintaxis de instanciación new EventEmitter().
Caso 3: Asegurarse de que el registro (.on) ocurre estrictamente antes de la emisión (.emit). Pistas progresivas:
const EventEmitter = require('events'); y luego const sistema = new EventEmitter();.
Escucha el evento: sistema.on('fallaCritica', (codigoError) => { ... });.
Dispara la señal: sistema.emit('fallaCritica', 500);.
8. Criterio de aprobación de la lección
Implementación funcional del patrón Publicador-Suscriptor, registrando y emitiendo señales correctamente.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 7: El Bucle de Eventos (Event Loop)
1. ID de lección
node-07
2. Título
El Bucle de Eventos (Event Loop)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Explicar teóricamente el funcionamiento de una arquitectura no bloqueante.
Diferenciar el orden de ejecución entre el código síncrono, microtareas y macrotareas.
Utilizar setTimeout, setImmediate y process.nextTick.
5. Contenido teórico
Conceptos: Node.js corre en un solo hilo. El Event Loop delega tareas pesadas (I/O, disco, red) a la librería subyacente (libuv, que usa hilos del sistema operativo) y sigue ejecutando código en JS. Cuando libuv termina, devuelve el resultado al hilo principal de JS mediante un callback.
Fases: Tiene distintas fases. process.nextTick se ejecuta antes de la próxima fase; las Promesas (Microtasks) van después de nextTick. Luego van Timers (setTimeout), I/O, y finalmente Inmediates (setImmediate).
Buenas prácticas: Nunca usar ciclos muy largos o procesamientos matemáticos intensos (ej. cálculo de primos, parseos masivos de JSON) en el hilo principal porque "bloqueará el Event Loop", deteniendo todo el servidor.
Errores comunes: Pensar que setTimeout(..., 0) se ejecuta literalmente de inmediato; en realidad, se pone en la cola y se ejecuta en la siguiente vuelta del loop, después del código síncrono.
6. Ejemplos de código comentados
Ejemplo 1: Orden de ejecución
JavaScript
console.log("1. Síncrono - Inicio");

setTimeout(() => console.log("4. Timer"), 0);
setImmediate(() => console.log("5. Immediate"));
Promise.resolve().then(() => console.log("3. Microtarea (Promesa)"));

console.log("2. Síncrono - Fin");

/* Resultado esperado:
   1. Síncrono - Inicio
   2. Síncrono - Fin
   3. Microtarea (Promesa)
   4. Timer
   5. Immediate
*/

7. Ejercicio práctico
Enunciado: Tienes tres sentencias console.log. Una imprime "Alfa", otra "Beta", y otra "Gamma". Coloca "Beta" dentro de un setTimeout con 0 ms de retraso. Deja "Alfa" y "Gamma" sueltos como código síncrono normal. El output demostrará la naturaleza del Event Loop. Código inicial:
JavaScript
// Escribe el código estructurado para que "Beta" pase a la cola de macrotareas


Solución esperada:
JavaScript
console.log("Alfa");

setTimeout(() => {
    console.log("Beta");
}, 0);

console.log("Gamma");

Casos de prueba:
Caso 1: Output esperado exacto: Alfa\nGamma\nBeta\n
Caso 2: Verificar sintaxis de invocación asíncrona de la API nativa setTimeout.
Caso 3: Validar la presencia explícita de 0 como tiempo de timer. Pistas progresivas:
Imprime "Alfa" normalmente en la primera línea.
Abre un setTimeout(() => { ... }, 0);.
Imprime "Beta" adentro, e imprime "Gamma" afuera, al final. Gamma se ejecutará antes porque el Event Loop da prioridad al código síncrono actual.
8. Criterio de aprobación de la lección
Demostrar control sobre el diferimiento de ejecución hacia las colas de callbacks del Event Loop.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 8: Creación de Servidores HTTP Nativos
1. ID de lección
node-08
2. Título
Creación de Servidores HTTP Nativos
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Inicializar un servidor web utilizando el módulo central nativo http.
Manejar los objetos Request (petición) y Response (respuesta).
Crear enrutamiento básico mediante inspección de URLs.
5. Contenido teórico
Conceptos: Node.js es lo suficientemente poderoso para crear un servidor web sin necesidad de software externo (como Apache o Nginx). El módulo http expone métodos para escuchar en un puerto de red.
Sintaxis: const server = http.createServer((req, res) => { ... }); server.listen(puerto);
Buenas prácticas: Especificar los cabeceras (headers), como Content-Type: application/json para que los clientes sepan cómo interpretar la respuesta.
Errores comunes: Olvidar finalizar la respuesta con res.end(). Si no lo haces, el cliente (ej. el navegador) se quedará cargando infinitamente esperando que termine la transferencia.
6. Ejemplos de código comentados
Ejemplo 1: Servidor Básico Enrutado
JavaScript
const http = require('http');

const server = http.createServer((req, res) => {
    // Inspeccionamos la ruta solicitada por el cliente
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Pagina de Inicio");
    } else if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // JSON.stringify transforma el objeto JS a formato String de JSON
        res.end(JSON.stringify({ mensaje: "API Activa" })); 
    } else {
        res.writeHead(404);
        res.end("Ruta no encontrada");
    }
});

server.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));

7. Ejercicio práctico
(Simulador de Server) Enunciado: Construye un servidor http. En el callback (req, res), verifica si req.url === '/test'. Si es así, escribe la respuesta (res.write("Test OK")) y termínala (res.end()). Inicia el servidor en el puerto 8080. Código inicial:
JavaScript
const http = require('http');

// Crea el server y el enrutamiento

// Ponlo a escuchar en 8080

Solución esperada:
JavaScript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/test') {
        res.write("Test OK");
        res.end();
    }
});

server.listen(8080);

Casos de prueba:
Caso 1: Comprobación virtual (Simular un request a /test retorna Test OK).
Caso 2: Validar existencia de .listen(8080).
Caso 3: Validar la presencia estricta de .end() para cerrar el canal. Pistas progresivas:
Haz const server = http.createServer((req, res) => { ... });.
Dentro, incluye el if (req.url === '/test') llamando a los métodos de res.
Fuera del servidor, llama al método que lo enciende: server.listen(8080);.
8. Criterio de aprobación de la lección
Instanciación y enrutamiento manual exitoso mediante Streams subyacentes nativos de la librería HTTP.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 9: Introducción a Express.js y Enrutamiento
1. ID de lección
node-09
2. Título
Introducción a Express.js y Enrutamiento
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Sustituir la lógica http nativa compleja por el framework Minimalista Express.js.
Construir rutas semánticas (Endpoints) utilizando los verbos HTTP (GET, POST).
Utilizar el objeto Response extendido proporcionado por Express.
5. Contenido teórico
Conceptos: Express es el framework web estándar de facto para Node. Abstrae la complejidad del módulo http, facilitando enrutamiento robusto, análisis de parámetros y middlewares.
Sintaxis: const app = require('express')(); app.get('/ruta', (req, res) => { ... });
Buenas prácticas: Utilizar res.json() para responder con objetos; Express automáticamente convierte el objeto a JSON y configura los headers correctos, ahorrando trabajo respecto a http nativo.
Errores comunes: Definir múltiples bloques .send() o .json() dentro de la misma ruta intentando responder dos veces al mismo cliente (Error: Cannot set headers after they are sent).
6. Ejemplos de código comentados
Ejemplo 1: Servidor API Rest básico
JavaScript
const express = require('express');
const app = express(); // Instanciamos la aplicación

// Endpoint GET
app.get('/api/usuarios', (req, res) => {
    const usuarios = [{ id: 1, nombre: "Rubén" }];
    // Retorna estado 200 y el JSON formateado
    res.status(200).json(usuarios); 
});

// Endpoint POST (para crear)
app.post('/api/usuarios', (req, res) => {
    res.send("Usuario creado");
});

app.listen(3000, () => console.log("API en puerto 3000"));

7. Ejercicio práctico
Enunciado: Construye una API con Express. Crea la instancia app. Define una ruta GET a /ping que responda un objeto JSON de la forma {"status": "ok"} usando res.json(). Pon la aplicación a escuchar en el puerto 4000. (Asume que express ya está instalado). Código inicial:
JavaScript
const express = require('express');
// Crea la app, ruta y puerto


Solución esperada:
JavaScript
const express = require('express');
const app = express();

app.get('/ping', (req, res) => {
    res.json({ status: "ok" });
});

app.listen(4000);

Casos de prueba:
Caso 1: Mock Request GET /ping | Output interno: {"status":"ok"} y header application/json.
Caso 2: Verificar sintaxis declarativa app.get(.
Caso 3: Validar la presencia de .listen(4000). Pistas progresivas:
Instancia Express con const app = express();.
Define la ruta: app.get('/ping', (req, res) => { ... });.
Adentro usa res.json({ status: "ok" });. Y arranca la app con app.listen(4000);.
8. Criterio de aprobación de la lección
Instanciación y enrutamiento RESTful básico utilizando métodos de abstracción del framework Express.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 10: Middlewares y Arquitectura de APIs
1. ID de lección
node-10
2. Título
Middlewares y Arquitectura de APIs
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Explicar la cadena de procesamiento de Express mediante Middlewares.
Implementar middlewares de aplicación general (ej. Logger, parser JSON).
Invocar la función next() para ceder el control en la cadena.
5. Contenido teórico
Conceptos: Un middleware es simplemente una función que tiene acceso al Request, al Response y al next middleware. Todo en Express, incluido el enrutamiento final, se comporta como un middleware. Se pueden usar para autorización, registro (logs) y parseo de datos.
Sintaxis: app.use((req, res, next) => { ... next(); });
Buenas prácticas: Utilizar siempre el middleware integrado app.use(express.json()) si tu API va a recibir cuerpos (body) de peticiones POST en formato JSON.
Errores comunes: Olvidar llamar a next() dentro de un middleware personalizado. Esto dejará la petición colgada (hang) y nunca llegará a la ruta final.
6. Ejemplos de código comentados
Ejemplo 1: Middlewares
JavaScript
const express = require('express');
const app = express();

// Middleware Global: se ejecuta en TODAS las peticiones
app.use((req, res, next) => {
    console.log(`Petición entrante: ${req.method} a ${req.url}`);
    next(); // Crucial: pasa el control al siguiente bloque
});

// Middleware nativo de Express para parsear Body JSON
app.use(express.json()); 

app.post('/datos', (req, res) => {
    // req.body ahora contiene el JSON parseado, gracias al middleware previo
    console.log(req.body); 
    res.send("Recibido");
});

7. Ejercicio práctico
Enunciado: Construye una app de Express. Escribe un middleware global personalizado que asigne una nueva propiedad al request: req.timestamp = "2026";, y luego llame a next(). Finalmente, define una ruta GET a /hora que responda devolviendo el string que configuró el middleware usando res.send(req.timestamp);. Código inicial:
JavaScript
const express = require('express');
const app = express();

// Tu middleware global aquí

// Tu ruta GET /hora aquí

app.listen(3000);

Solución esperada:
JavaScript
const express = require('express');
const app = express();

app.use((req, res, next) => {
    req.timestamp = "2026";
    next();
});

app.get('/hora', (req, res) => {
    res.send(req.timestamp);
});

app.listen(3000);

Casos de prueba:
Caso 1: Mock Request GET /hora | Output interno: 2026.
Caso 2: Verificar sintaxis app.use((req, res, next).
Caso 3: Validar llamada a la función next(). Pistas progresivas:
Declara app.use((req, res, next) => { ... });.
Adentro, asigna: req.timestamp = "2026"; y luego obliga explícitamente la invocación de next();.
En el app.get, responde simplemente enviando esa variable: res.send(req.timestamp);.
8. Criterio de aprobación de la lección
Mutación controlada del flujo de la Request utilizando la arquitectura de cadena de Middlewares (Pipeline).
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 11: Controladores y Simulación de Base de Datos
1. ID de lección
node-11
2. Título
Controladores y Simulación de Base de Datos
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Separar la lógica de rutas de la lógica de negocio (Patrón MVC / Arquitectura de Capas).
Implementar funciones asíncronas dentro de los controladores.
Manejar parámetros de ruta dinámica (req.params) y Queries (req.query).
5. Contenido teórico
Conceptos: A medida que la app crece, colocar la lógica dentro de la ruta (callback inline) genera código "Spaghetti". Separamos la lógica en "Controladores" que realizan las peticiones a la Base de Datos.
Sintaxis: app.get('/user/:id', usuarioController.obtener); donde :id es un parámetro dinámico extraíble con req.params.id.
Buenas prácticas: Las funciones de bases de datos son promesas asíncronas. El controlador siempre debe envolver estas llamadas en try/catch o usar manejadores globales de errores asíncronos.
Errores comunes: Olvidar convertir req.params.id de String a Número (si tu DB usa IDs numéricos). Todo parámetro extraído de la URL llega siempre como String.
6. Ejemplos de código comentados
Ejemplo 1: Ruta con parámetros y simulación Async
JavaScript
const express = require('express');
const app = express();

// "Base de datos" simulada
const buscarEnDB = async (id) => {
    if (id === 1) return { id: 1, nombre: "CatraCode Admin" };
    throw new Error("No encontrado");
};

// Controlador
const obtenerUsuario = async (req, res) => {
    try {
        // req.params.id viene de los dos puntos de la ruta
        const idBuscado = parseInt(req.params.id); 
        const datos = await buscarEnDB(idBuscado);
        res.json(datos);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Inyección del controlador en la ruta
app.get('/api/usuarios/:id', obtenerUsuario);

7. Ejercicio práctico
Enunciado: Construye el controlador asíncrono para una ruta Express. Define const buscarPerfil = async (id) => "Perfil " + id;. Luego define tu controlador const getPerfil = async (req, res) => { ... }. En el controlador extrae req.params.id, espera (await) el resultado de buscarPerfil, y envíalo con res.send(). Integra esto en la ruta app.get('/perfil/:id', getPerfil). Código inicial:
JavaScript
const express = require('express');
const app = express();

const buscarPerfil = async (id) => "Perfil " + id;

// Define el controlador getPerfil

// Define la ruta /perfil/:id

app.listen(3000);

Solución esperada:
JavaScript
const express = require('express');
const app = express();

const buscarPerfil = async (id) => "Perfil " + id;

const getPerfil = async (req, res) => {
    const id = req.params.id;
    const data = await buscarPerfil(id);
    res.send(data);
};

app.get('/perfil/:id', getPerfil);

app.listen(3000);

Casos de prueba:
Caso 1: Mock Request GET /perfil/42 | Output interno: Perfil 42.
Caso 2: Verificar sintaxis dinámica de ruta /:id.
Caso 3: Validar la presencia estricta del parseo y espera asíncrona await. Pistas progresivas:
Tu controlador debe firmarse: const getPerfil = async (req, res) => { ... };.
Adentro: const data = await buscarPerfil(req.params.id);.
Inyéctalo en la ruta sin los paréntesis para no ejecutarlo prematuramente: app.get('/perfil/:id', getPerfil);.
8. Criterio de aprobación de la lección
Modularización correcta de la capa de acceso a datos utilizando Controladores Asíncronos Desacoplados de Express.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 12: Seguridad Básica y Hashing
1. ID de lección
node-12
2. Título
Seguridad Básica y Hashing
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Implementar la librería criptográfica nativa crypto.
Aplicar hashing de una sola vía (one-way hashing) para contraseñas.
Comprender el flujo abstracto de verificación en APIs seguras (Bases para JWT).
5. Contenido teórico
Conceptos: Una regla de oro en el backend es NUNCA guardar contraseñas en texto plano (plain text). Se les aplica una función resumen (Hash). Node incluye el módulo de bajo nivel crypto (aunque en producción a menudo se prefiere bcrypt porque incluye Salt y cálculo de coste interno).
Sintaxis: crypto.createHash('sha256').update(string).digest('hex').
Buenas prácticas: Combinar siempre un Salt (cadena aleatoria inyectada) con la contraseña antes de aplicarle el algoritmo Hash (evitando ataques de diccionario y Rainbow Tables).
Errores comunes: Intentar "desencriptar" un Hash para ver la contraseña real. Los hashes no son encriptación; la encriptación es bidireccional (reversible), el hash es destructivo (irreversible). Para comparar, aplicas la misma función a la contraseña que intenta entrar, y comparas los Hashes resultantes.
6. Ejemplos de código comentados
Ejemplo 1: Generación de Hash básico
JavaScript
const crypto = require('crypto');

const passwordDelUsuario = "123456";

// Algoritmo sha256 (Secure Hash Algorithm)
const passwordHasheada = crypto.createHash('sha256')
                               .update(passwordDelUsuario)
                               .digest('hex'); // Formato hexadecimal

console.log("Contraseña en DB:", passwordHasheada);
// Output: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92

7. Ejercicio práctico
Enunciado: Importa el módulo nativo crypto. Crea una función hashearContrasena(password) que retorne el hash aplicando sha256, con digestión hex. Invoca la función pasando "Quiroz2026" e imprime el resultado. Código inicial:
JavaScript
// Importa módulo

function hashearContrasena(password) {
    // Lógica aquí
}

// Imprime el hash

Solución esperada:
JavaScript
const crypto = require('crypto');

function hashearContrasena(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

console.log(hashearContrasena("Quiroz2026"));

Casos de prueba:
Caso 1: Output esperado exacto: Un string alfanumérico hash SHA256 largo.
Caso 2: Verificar sintaxis de la función nativa require('crypto').
Caso 3: Validar la instanciación e invocación progresiva del pipeline .createHash().update().digest(). Pistas progresivas:
Inicia con const crypto = require('crypto');.
Para retornar el valor, encadena: crypto.createHash('sha256').update(password).digest('hex');.
Simplemente llámala dentro de tu console.log.
8. Criterio de aprobación de la lección
Codificación segura de flujos de texto utilizando la API criptográfica nativa sin almacenamiento reversible.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 13: Streams y Buffers para Datos Masivos
1. ID de lección
node-13
2. Título
Streams y Buffers para Datos Masivos
3. Nivel
Experto
4. Objetivos de aprendizaje
Explicar la asignación de memoria RAM vs transmisión vía chunks (pedazos).
Crear flujos de lectura (ReadStream) y escritura (WriteStream).
Utilizar el método pipe() para conectar Streams eficientemente.
5. Contenido teórico
Conceptos: Al usar fs.readFile, Node.js carga todo el archivo en la RAM a la vez. Si el archivo pesa 5GB y tu servidor tiene 2GB de RAM, la aplicación colapsará ("Out of Memory"). Los Streams permiten procesar el archivo en pequeños pedazos (Chunks / Buffers) a medida que fluyen, usando casi 0 memoria continua.
Sintaxis: const stream = fs.createReadStream('./gigante.mp4');
Buenas prácticas: Acoplar flujos mediante el método .pipe(). Por ejemplo, leer desde el disco con un ReadStream y despacharlo directamente hacia la respuesta HTTP (res, que es un WriteStream subyacente).
Errores comunes: Olvidar gestionar los eventos de error en los Streams (stream.on('error', ...)), lo que provocará la terminación (crash) si el flujo se corta abruptamente.
6. Ejemplos de código comentados
Ejemplo 1: Streaming de un archivo pesado
JavaScript
const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    // No usamos res.end(), el pipe gestiona el flujo y el cerrado
    const fileStream = fs.createReadStream('./video_gigante.mp4');
    
    // Conecta la manguera de lectura directamente al usuario (res)
    fileStream.pipe(res); 
}).listen(3000);

7. Ejercicio práctico
Enunciado: Usa el módulo fs. Escribe un script que utilice fs.createReadStream('origen.txt') y fs.createWriteStream('destino.txt'). Utiliza el método .pipe() para transferir los datos del primero hacia el segundo en modo streaming de bajo costo computacional. Código inicial:
JavaScript
const fs = require('fs');

// Crea el stream de lectura

// Crea el stream de escritura

// Haz pipe del origen hacia el destino

Solución esperada:
JavaScript
const fs = require('fs');

const readStream = fs.createReadStream('origen.txt');
const writeStream = fs.createWriteStream('destino.txt');

readStream.pipe(writeStream);

Casos de prueba:
Caso 1: Validar estáticamente que el destino reciba datos sin saturar memoria temporal virtual.
Caso 2: Verificar sintaxis fs.createReadStream y fs.createWriteStream.
Caso 3: Validar la invocación explícita del acoplador abstracto .pipe(). Pistas progresivas:
Declara const origen = fs.createReadStream('origen.txt');.
Declara el destino de la misma forma pero con escritura.
Acopla con origen.pipe(destino);.
8. Criterio de aprobación de la lección
Gestión hiper-escalable de recursos de disco evadiendo el Buffer total en memoria RAM y aplicando arquitecturas de tubería continua.
9. Tiempo estimado de la lección
100 minutos
10. Puntaje máximo de la lección
100 pts
Lección 14: Escalabilidad con Módulo Cluster
1. ID de lección
node-14
2. Título
Escalabilidad con Módulo Cluster
3. Nivel
Experto
4. Objetivos de aprendizaje
Entender los límites del hilo único de Node.js ante servidores con múltiples procesadores (Cores).
Balancear carga instalando instancias secundarias (Workers).
Implementar el módulo nativo cluster para crear procesos de red multi-hilo.
5. Contenido teórico
Conceptos: Dado que Node.js es Single-Thread, en un servidor empresarial (AWS, GCP) con 16 núcleos, correrá solo en 1 núcleo, desperdiciando el 94% de la potencia de la máquina. El módulo cluster permite levantar un "Hijo" (Worker) por cada núcleo físico. El "Padre" (Master) actúa como balanceador de carga repartiendo los requests.
Sintaxis: const cluster = require('cluster'); if (cluster.isMaster) { cluster.fork(); }
Buenas prácticas: En la nube actual, en lugar de manejar clusters internamente, se suele usar orquestación moderna en contenedores (Docker/Kubernetes). Sin embargo, saber crear Workers es vital para comprender arquitecturas de alto nivel o usar PM2 (Process Manager).
Errores comunes: Programar estados globales o guardado en memoria caché (como diccionarios locales) esperando que todo el servidor lo comparta. Al usar Clusters, cada Worker tiene una memoria RAM separada (requiriendo usar Redis como intermediario).
6. Ejemplos de código comentados
Ejemplo 1: Instanciando Workers por Core
JavaScript
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isPrimary) { // En versiones anteriores era isMaster
    const numCPUs = os.cpus().length;
    console.log(`Master (Padre) ${process.pid} arrancando. Clonando ${numCPUs} veces...`);

    // Crea un Worker por cada procesador
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    // Este bloque de código lo corren solo los Hijos clonados (Workers)
    const app = express();
    app.get('/', (req, res) => res.send(`Respondido por Worker ${process.pid}`));
    app.listen(3000);
}

7. Ejercicio práctico
Enunciado: Construye un sistema con el módulo cluster. Haz un condicional. Si es el proceso primario (cluster.isPrimary), haz cluster.fork() dos veces usando un bucle. Si no lo es (else), simplemente imprime "Iniciado Worker" (sin servidor Express por simplicidad). Código inicial:
JavaScript
const cluster = require('cluster');

// Condicional isPrimary y forks

Solución esperada:
JavaScript
const cluster = require('cluster');

if (cluster.isPrimary) {
    for(let i=0; i<2; i++) {
        cluster.fork();
    }
} else {
    console.log("Iniciado Worker");
}

Casos de prueba:
Caso 1: Output esperado puede desencadenar: Iniciado Worker\nIniciado Worker\n
Caso 2: Verificar sintaxis cluster.isPrimary (o isMaster).
Caso 3: Validar que el hijo imprima exitosamente bifurcando el proceso global process.pid. Pistas progresivas:
Haz un if (cluster.isPrimary) { ... }.
Adentro haz un ciclo for(let i=0; i<2; i++) que ejecute la orden de clonación: cluster.fork();.
En el bloque del else, haz el console.log final.
8. Criterio de aprobación de la lección
Orquestación manual base de microprocesos independientes que exprimen la capacidad muti-core subyacente.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 15: Proyecto Integrador: Arquitectura de Microservicio
1. ID de lección
node-15
2. Título
Proyecto Integrador: Arquitectura de Microservicio REST
3. Nivel
Experto
4. Objetivos de aprendizaje
Ensamblar conocimientos de Express, Variables de Entorno, Asincronía y Middlewares.
Validar cuerpos de request e implementar lógica de simulación de controladores.
Proveer una API completamente funcional con arquitectura monolítica básica.
5. Contenido teórico
Conceptos: Un proyecto backend consolida el conocimiento. El archivo principal (server.js) carga las configuraciones e inyecta middlewares globales. Se definen rutas que delegan tareas. Se controla rigurosamente el código HTTP retornado (200, 201, 400, 404, 500).
Sintaxis: Integración masiva general.
Buenas prácticas: Validar que todos los campos requeridos del Payload (cuerpo) lleguen correctamente antes de pasárselos a un controlador de negocio; devolviendo un código 400 (Bad Request) inmediatamente (Fallar rápido/Fail Fast Pattern).
Errores comunes: Dejar promesas sin atrapar (Unhandled Promise Rejection), lo que en Node.js modernos puede causar que la aplicación se "mate" (crash) para evitar corrupción de datos silenciosa.
6. Ejemplos de código comentados
(Esqueleto estructural sugerido)
JavaScript
const express = require('express');
const app = express();

app.use(express.json()); // Middleware core

app.post('/api/item', async (req, res) => {
    try {
        if(!req.body.nombre) throw new Error("Faltan datos");
        // lógica de DB...
        res.status(201).json({ mensaje: "Creado" });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.listen(process.env.PORT || 3000);

7. Ejercicio práctico
Enunciado: Crea una aplicación Express integral. Añade el middleware express.json(). Define un endpoint POST /login. En tu callback asíncrono, extrae email y password del req.body. Si alguno de los dos falta, responde enviando un código 400 y el JSON {"error": "Bad Request"}. Si ambos vienen en el body, responde con código 200 y el JSON {"token": "JWT_SIMULADO"}. Arranca la API en el puerto 3000. Código inicial:
JavaScript
const express = require('express');
const app = express();

// Instala middleware parseador

// Define ruta POST /login con lógica de validación

// Inicialización de puerto

Solución esperada:
JavaScript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Bad Request" });
    }
    
    return res.status(200).json({ token: "JWT_SIMULADO" });
});

app.listen(3000);

Casos de prueba:
Caso 1: Mock Request POST sin password | Output: Status 400. Json {error: "Bad Request"}.
Caso 2: Mock Request POST válido | Output: Status 200. Json {token: "JWT_SIMULADO"}.
Caso 3: Validar la presencia explícita y obligatoria de la inyección nativa del middleware body-parser app.use(express.json()). Pistas progresivas:
Recuerda habilitar la lectura con app.use(express.json());.
Dentro de app.post('/login', ...), desestructura el body: const { email, password } = req.body;.
Evalúa con if (!email || !password) para responder un res.status(400). Asegúrate de agregar el return antes del res.status para terminar la ejecución de la función.
8. Criterio de aprobación de la lección
Modelado efectivo de APIs aplicando reglas de validación en el negocio, devoluciones controladas con Headers semánticos y estructuración moderna del framework.
9. Tiempo estimado de la lección
150 minutos
10. Puntaje máximo de la lección
500 pts
