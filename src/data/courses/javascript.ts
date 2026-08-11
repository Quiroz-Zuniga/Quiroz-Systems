import { Course } from '../../types';

export const javascriptCourse: Course = {
  id: 'javascript',
  title: 'Quiroz Systems — JavaScript',
  languageName: 'JavaScript',
  monacoLanguage: 'javascript',
  description: 'El lenguaje de la web moderna: ES6+, promesas, async/await, métodos funcionales, objetos y asincronía profunda.',
  levelRange: 'Básico → Experto',
  estimatedHours: 45,
  iconName: 'FileCode2',
  color: 'from-yellow-500 to-amber-600',
  lessons: [
    {
      id: 'js-01',
      title: 'Primer Programa y Consola',
      level: 'Básico',
      objectives: ['Utilizar console.log para depurar e imprimir mensajes.'],
      theory: `### Conceptos
JavaScript es un lenguaje interpretado. \`console.log()\` envía mensajes a la salida de consola.`,
      examples: [
        {
          title: 'Hola Mundo',
          code: `console.log("¡Hola, Quiroz Systems!");`,
        },
      ],
      exercise: {
        statement: 'Escribe un script que imprima exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "JS Nivel Cero" en la segunda línea.',
        initialCode: `// Tu código aquí
`,
        solution: `console.log("Bienvenido a Quiroz Systems");
console.log("JS Nivel Cero");`,
        testCases: [
          { id: 'tc-1', output: 'Bienvenido a Quiroz Systems\nJS Nivel Cero\n' },
        ],
        hints: ['Usa console.log() dos veces.'],
      },
      approvalCriteria: 'Salida exacta sin excepciones de sintaxis.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'js-02',
      title: 'Variables (let, const) y Tipos de Datos',
      level: 'Básico',
      objectives: ['Declarar variables con let y const.', 'Interpolación con Template Literals.'],
      theory: `### Conceptos
Sintaxis ES6: \`const\` por defecto, \`let\` para variables mutables. Template literals con \` \`texto \${var}\` \`.`,
      examples: [
        {
          title: 'Template Literals',
          code: `const lenguaje = "JavaScript";
console.log(\`Aprendiendo \${lenguaje}\`);`,
        },
      ],
      exercise: {
        statement: 'Declara anioNacimiento = 2000 y anioActual = 2026. Calcula la edad. Imprime "La edad es: X" usando Template Literals.',
        initialCode: `// Tu código aquí
`,
        solution: `const anioNacimiento = 2000;
const anioActual = 2026;
const edad = anioActual - anioNacimiento;
console.log(\`La edad es: \${edad}\`);`,
        testCases: [{ id: 'tc-1', output: 'La edad es: 26\n' }],
        hints: ['Usa backticks ` La edad es: ${edad} `'],
      },
      approvalCriteria: 'Interpolación de cadenas con backticks.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'js-03',
      title: 'Control de Flujo y Operadores Estrictos',
      level: 'Básico',
      objectives: ['Condicionales con operadores de igualdad estricta ===.'],
      theory: `### Conceptos
Igualdad estricta \`===\` compara valor y tipo evitando coerciones no deseadas.`,
      examples: [
        {
          title: 'Igualdad estricta',
          code: `if (5 === 5) {
    console.log("Iguales");
}`,
        },
      ],
      exercise: {
        statement: 'Con la variable numero provista, si es estrictamente igual a 0 imprime "Cero". Si es par "Par". Si es impar "Impar".',
        initialCode: `const numero = parseInt(prompt());

// Tu código aquí
`,
        solution: `const numero = parseInt(prompt());

if (numero === 0) {
    console.log("Cero");
} else if (numero % 2 === 0) {
    console.log("Par");
} else {
    console.log("Impar");
}`,
        testCases: [
          { id: 'tc-1', input: '0', output: 'Cero\n' },
          { id: 'tc-2', input: '4', output: 'Par\n' },
          { id: 'tc-3', input: '-3', output: 'Impar\n' },
        ],
        hints: ['Usa === 0 para la primera comparación.'],
      },
      approvalCriteria: 'Uso exclusivo de igualdad estricta ===.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'js-04',
      title: 'Ciclos y Repetición',
      level: 'Básico',
      objectives: ['Bucles for controlados.'],
      theory: `### Conceptos
Bucle \`for (let i = 1; i <= n; i++)\`.`,
      examples: [
        {
          title: 'Ciclo For',
          code: `for (let i = 1; i <= 5; i++) {
    console.log(i);
}`,
        },
      ],
      exercise: {
        statement: 'Recibes N con prompt(). Usa un bucle for para calcular e imprimir la suma de todos los números de 1 a N. Si N es 0 imprime 0.',
        initialCode: `const n = parseInt(prompt());
let suma = 0;

// Tu código aquí

console.log(suma);`,
        solution: `const n = parseInt(prompt());
let suma = 0;

for (let i = 1; i <= n; i++) {
    suma += i;
}

console.log(suma);`,
        testCases: [
          { id: 'tc-1', input: '5', output: '15\n' },
          { id: 'tc-2', input: '1', output: '1\n' },
          { id: 'tc-3', input: '0', output: '0\n' },
        ],
        hints: ['Itera desde i = 1 hasta i <= n.'],
      },
      approvalCriteria: 'Sumatoria correcta con bucle for.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'js-05',
      title: 'Funciones Clásicas y Funciones Flecha',
      level: 'Intermedio',
      objectives: ['Sintaxis de Arrow Functions con retorno implícito.'],
      theory: `### Conceptos
Funciones flecha: \`const sumar = (a, b) => a + b;\``,
      examples: [
        {
          title: 'Arrow function',
          code: `const doble = n => n * 2;`,
        },
      ],
      exercise: {
        statement: 'Crea una Arrow Function llamada esMayorDeEdad con retorno implícito que devuelva edad >= 18. Llama a la función e imprime "Permitido" o "Denegado".',
        initialCode: `// Define tu Arrow Function aquí

const edadUsuario = parseInt(prompt());
// Lógica if-else aquí`,
        solution: `const esMayorDeEdad = (edad) => edad >= 18;

const edadUsuario = parseInt(prompt());

if (esMayorDeEdad(edadUsuario)) {
    console.log("Permitido");
} else {
    console.log("Denegado");
}`,
        testCases: [
          { id: 'tc-1', input: '20', output: 'Permitido\n' },
          { id: 'tc-2', input: '17', output: 'Denegado\n' },
        ],
        hints: ['const esMayorDeEdad = (edad) => edad >= 18;'],
      },
      approvalCriteria: 'Función flecha con retorno implícito usando =>.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'js-06',
      title: 'Arreglos y Métodos de Mutación',
      level: 'Intermedio',
      objectives: ['Iteración con for...of y mutación de arreglos.'],
      theory: `### Conceptos
Arreglos en JS. Iteración limpia con \`for (const item of array)\`.`,
      examples: [
        {
          title: 'for...of',
          code: `const nums = [10, 20];
for (const n of nums) console.log(n);`,
        },
      ],
      exercise: {
        statement: 'Con el arreglo datos provisto, iterado con for...of para encontrar e imprimir el número mayor sin usar Math.max().',
        initialCode: `const n = parseInt(prompt());
const datos = [];
for(let i=0; i<n; i++) datos.push(parseInt(prompt()));

// Tu código algorítmico aquí
`,
        solution: `const n = parseInt(prompt());
const datos = [];
for(let i=0; i<n; i++) datos.push(parseInt(prompt()));

let mayor = datos[0];
for (const num of datos) {
    if (num > mayor) {
        mayor = num;
    }
}
console.log(mayor);`,
        testCases: [
          { id: 'tc-1', input: '5\n1\n5\n3\n9\n2', output: '9\n' },
          { id: 'tc-2', input: '5\n-1\n-5\n-2\n-9\n-3', output: '-1\n' },
        ],
        hints: ['Recorre con for (const num of datos)'],
      },
      approvalCriteria: 'Iteración secuencial sin Math.max().',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'js-07',
      title: 'Objetos Literales',
      level: 'Intermedio',
      objectives: ['Diccionarios clave-valor y notación de corchetes.'],
      theory: `### Conceptos
Objetos en JS \`{ clave: "valor" }\`. Notación de corchetes \`obj[clave]\`.`,
      examples: [
        {
          title: 'Objeto',
          code: `const user = { name: "Rubén" };
user["rol"] = "Admin";`,
        },
      ],
      exercise: {
        statement: 'Recibes una cadena de texto. Cuenta la frecuencia de caracteres en un objeto conteo e imprímelo con for...in.',
        initialCode: `const texto = prompt();
const conteo = {};

// Tu código aquí para contar

// Impresión del diccionario`,
        solution: `const texto = prompt();
const conteo = {};

for (const char of texto) {
    if (conteo[char]) {
        conteo[char] += 1;
    } else {
        conteo[char] = 1;
    }
}

for (const key in conteo) {
    console.log(\`\${key}: \${conteo[key]}\`);
}`,
        testCases: [
          { id: 'tc-1', input: 'hola', output: 'h: 1\no: 1\nl: 1\na: 1\n' },
          { id: 'tc-2', input: 'aaabbc', output: 'a: 3\nb: 2\nc: 1\n' },
        ],
        hints: ['Itera caracteres con for (const char of texto)', 'Usa for (const key in conteo) para imprimir'],
      },
      approvalCriteria: 'Uso dinámico de objetos con notación de corchetes.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'js-08',
      title: 'Iteración Funcional: map, filter y reduce',
      level: 'Intermedio',
      objectives: ['Filtrado declarativo e inmutable con .filter().'],
      theory: `### Conceptos
Programación funcional: \`arr.filter(x => condicion)\`.`,
      examples: [
        {
          title: 'Filter',
          code: `const impares = [1, 2, 3].filter(x => x % 2 !== 0);`,
        },
      ],
      exercise: {
        statement: 'Con el arreglo datos, crea un nuevo arreglo impares usando SOLO .filter(). Imprímelo con console.log(impares.join(" ")).',
        initialCode: `const n = parseInt(prompt());
const datos = [];
for(let i=1; i<=n; i++) datos.push(i);

// Tu código funcional aquí (usa const impares = ...)`,
        solution: `const n = parseInt(prompt());
const datos = [];
for(let i=1; i<=n; i++) datos.push(i);

const impares = datos.filter(num => num % 2 !== 0);
console.log(impares.join(" "));`,
        testCases: [
          { id: 'tc-1', input: '10', output: '1 3 5 7 9\n' },
          { id: 'tc-2', input: '5', output: '1 3 5\n' },
        ],
        hints: ['const impares = datos.filter(num => num % 2 !== 0);'],
      },
      approvalCriteria: 'Uso explícito de .filter().',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'js-09',
      title: 'Scope y Closures',
      level: 'Intermedio',
      objectives: ['Crear clausuras léxicas persistentes.'],
      theory: `### Conceptos
Una función recuerda las variables de su ámbito padre (Closure).`,
      examples: [
        {
          title: 'Closure',
          code: `function multiplicar(factor) {
    return (x) => x * factor;
}`,
        },
      ],
      exercise: {
        statement: 'Crea una función generarMultiplicador(factor) que retorne una Arrow Function que multiplique numero * factor.',
        initialCode: `// Define generarMultiplicador aquí

const base = parseInt(prompt());
const valor = parseInt(prompt());
const porBase = generarMultiplicador(base);
console.log(porBase(valor));`,
        solution: `function generarMultiplicador(factor) {
    return (numero) => numero * factor;
}

const base = parseInt(prompt());
const valor = parseInt(prompt());
const porBase = generarMultiplicador(base);
console.log(porBase(valor));`,
        testCases: [
          { id: 'tc-1', input: '5\n10', output: '50\n' },
          { id: 'tc-2', input: '3\n3', output: '9\n' },
        ],
        hints: ['return (numero) => numero * factor;'],
      },
      approvalCriteria: 'High Order Function retornando una clausura.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'js-10',
      title: 'Manejo de Errores',
      level: 'Avanzado',
      objectives: ['Atrapar excepciones con try/catch y new Error().'],
      theory: `### Conceptos
Lanzamiento de excepciones con \`throw new Error("mensaje")\` y captura con \`try / catch\`.`,
      examples: [
        {
          title: 'Try Catch',
          code: `try {
    throw new Error("Fallo");
} catch (e) {
    console.log(e.message);
}`,
        },
      ],
      exercise: {
        statement: 'Escribe dividir(num1, num2) que lance new Error("DivZero") si num2 === 0, o retorne Math.floor(num1 / num2). En un try/catch llama e imprime el resultado o error.message.',
        initialCode: `const a = parseInt(prompt());
const b = parseInt(prompt());

function dividir(num1, num2) {
    // Lógica
}

// Implementa el try / catch`,
        solution: `const a = parseInt(prompt());
const b = parseInt(prompt());

function dividir(num1, num2) {
    if (num2 === 0) {
        throw new Error("DivZero");
    }
    return Math.floor(num1 / num2);
}

try {
    console.log(dividir(a, b));
} catch (error) {
    console.log(error.message);
}`,
        testCases: [
          { id: 'tc-1', input: '10\n2', output: '5\n' },
          { id: 'tc-2', input: '5\n0', output: 'DivZero\n' },
        ],
        hints: ['throw new Error("DivZero");'],
      },
      approvalCriteria: 'Lanzamiento e intercepción del objeto Error.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'js-11',
      title: 'Asincronía I: Promesas',
      level: 'Avanzado',
      objectives: ['Creación y consumo de Promesas con .then().catch().'],
      theory: `### Conceptos
\`new Promise((resolve, reject) => { ... })\` consumida con \`.then().catch()\`.`,
      examples: [
        {
          title: 'Promesa',
          code: `const p = new Promise(res => res("Ok"));
p.then(m => console.log(m));`,
        },
      ],
      exercise: {
        statement: 'Crea verificarEdad(edad) retornando una Promesa. Si es >= 18 resolve("Permitido"), de lo contrario reject(new Error("Denegado")). Consume la promesa con .then() y .catch().',
        initialCode: `// Define verificarEdad retornando la promesa

const edadUsuario = parseInt(prompt());
// Consume la promesa aquí`,
        solution: `function verificarEdad(edad) {
    return new Promise((resolve, reject) => {
        if (edad >= 18) {
            resolve("Permitido");
        } else {
            reject(new Error("Denegado"));
        }
    });
}

const edadUsuario = parseInt(prompt());

verificarEdad(edadUsuario)
    .then(mensaje => console.log(mensaje))
    .catch(error => console.log(error.message));`,
        testCases: [
          { id: 'tc-1', input: '20', output: 'Permitido\n' },
          { id: 'tc-2', input: '17', output: 'Denegado\n' },
        ],
        hints: ['return new Promise((resolve, reject) => { ... })'],
      },
      approvalCriteria: 'Uso explícito de new Promise y .then().catch().',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'js-12',
      title: 'Asincronía II: Async / Await',
      level: 'Avanzado',
      objectives: ['Sintaxis async/await sobre promesas.'],
      theory: `### Conceptos
Sintaxis secuencial asíncrona: \`async function() { const res = await promesa; }\``,
      examples: [
        {
          title: 'Async Await',
          code: `async function run() {
    const val = await Promise.resolve("Listo");
    console.log(val);
}`,
        },
      ],
      exercise: {
        statement: 'Escribe una función ejecutar = async () => { ... }. Usa await para esperar simularProceso() y guárdalo en resultado. Imprímelo. Llama a ejecutar(). No uses .then().',
        initialCode: `function simularProceso() {
    return Promise.resolve("Terminado");
}

// Escribe tu función asíncrona aquí

// Llama a la función`,
        solution: `function simularProceso() {
    return Promise.resolve("Terminado");
}

const ejecutar = async () => {
    try {
        const resultado = await simularProceso();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
};

ejecutar();`,
        testCases: [{ id: 'tc-1', output: 'Terminado\n' }],
        hints: ['const resultado = await simularProceso();'],
      },
      approvalCriteria: 'Sintaxis async/await sin utilizar .then().',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'js-13',
      title: 'Programación Orientada a Objetos',
      level: 'Avanzado',
      objectives: ['Definición de clases ES6 con constructor.'],
      theory: `### Conceptos
Clases ES6 con \`class Entidad { constructor(...) {} }\`.`,
      examples: [
        {
          title: 'Clase ES6',
          code: `class Persona {
    constructor(nombre) { this.nombre = nombre; }
}`,
        },
      ],
      exercise: {
        statement: 'Crea la clase Rectangulo con constructor(ancho, alto) y método getArea(). Read w y h de prompt, instancia con new e imprime getArea().',
        initialCode: `// Crea la clase

const w = parseInt(prompt());
const h = parseInt(prompt());
// Instancia e imprime`,
        solution: `class Rectangulo {
    constructor(ancho, alto) {
        this.ancho = ancho;
        this.alto = alto;
    }
    
    getArea() {
        return this.ancho * this.alto;
    }
}

const w = parseInt(prompt());
const h = parseInt(prompt());
const rect = new Rectangulo(w, h);
console.log(rect.getArea());`,
        testCases: [
          { id: 'tc-1', input: '5\n10', output: '50\n' },
          { id: 'tc-2', input: '3\n3', output: '9\n' },
        ],
        hints: ['class Rectangulo { constructor(ancho, alto) { ... } }'],
      },
      approvalCriteria: 'Uso de palabra class e instanciación con new.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'js-14',
      title: 'Estructuras de Datos Modernas: Map y Set',
      level: 'Experto',
      objectives: ['Eliminación de duplicados con Set y spread operator.'],
      theory: `### Conceptos
\`Set\` almacena elementos únicos. Conversión a arreglo con \`[...new Set(array)]\`.`,
      examples: [
        {
          title: 'Set unicos',
          code: `const unicos = [...new Set([1, 1, 2])];`,
        },
      ],
      exercise: {
        statement: 'Crea una función limpiarDuplicados(lista) que use new Set(lista) y devuelva un arreglo sin duplicados con el operador spread [...]. Imprime el resultado unido por espacios.',
        initialCode: `const datos = [1, 2, 2, 3, 4, 4, 5];

// Función limpiarDuplicados

// Llamada e impresión`,
        solution: `const datos = [1, 2, 2, 3, 4, 4, 5];

function limpiarDuplicados(lista) {
    return [...new Set(lista)];
}

const resultado = limpiarDuplicados(datos);
console.log(resultado.join(" "));`,
        testCases: [{ id: 'tc-1', output: '1 2 3 4 5\n' }],
        hints: ['return [...new Set(lista)];'],
      },
      approvalCriteria: 'Uso de la clase new Set y operador spread.',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'js-15',
      title: 'Proyecto Integrador: Gestor de Tareas Asíncrono',
      level: 'Experto',
      objectives: ['Integrar Clases, Async/Await y Arreglos en un Gestor Asíncrono.'],
      theory: `### Proyecto Integrador Final
Combinación de ES6, POO y flujos asíncronos.`,
      examples: [
        {
          title: 'Gestor',
          code: `class TaskManager { constructor() { this.tareas = []; } }`,
        },
      ],
      exercise: {
        statement: 'Crea TaskManager (tareas = []). Método agregar(tarea). Método async ejecutarLote(n) con for que pida prompt(), haga await Promise.resolve(), y agregue la tarea. Método mostrar() que imprima "Tarea: texto". Lee N, instancia, ejecuta lote y muestra.',
        initialCode: `// Implementa TaskManager
class TaskManager {
    // ...
}

// Bucle principal
const n = parseInt(prompt());
// Instancia y ejecuta`,
        solution: `class TaskManager {
    constructor() {
        this.tareas = [];
    }
    
    agregar(tarea) {
        this.tareas.push(tarea);
    }
    
    async ejecutarLote(cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const texto = prompt();
            await Promise.resolve();
            this.agregar(texto);
        }
    }
    
    mostrar() {
        for (const t of this.tareas) {
            console.log(\`Tarea: \${t}\`);
        }
    }
}

const n = parseInt(prompt());
const app = new TaskManager();

const run = async () => {
    await app.ejecutarLote(n);
    app.mostrar();
};

run();`,
        testCases: [
          { id: 'tc-1', input: '2\nDeploy\nTest', output: 'Tarea: Deploy\nTarea: Test\n' },
          { id: 'tc-2', input: '1\nInit', output: 'Tarea: Init\n' },
          { id: 'tc-3', input: '0', output: '' },
        ],
        hints: ['Usa await app.ejecutarLote(n); dentro de una función async.'],
      },
      approvalCriteria: 'Despacho asíncrono y mutación segura de estado en objetos.',
      estimatedMinutes: 180,
      maxScore: 500,
    },
  ],
};
