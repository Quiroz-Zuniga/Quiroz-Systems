Quiroz Systems — JavaScript
Descripción del curso: El curso "Quiroz Systems — JavaScript" está diseñado para dominar el lenguaje más utilizado en la web y el ecosistema de desarrollo moderno (Node.js). Desde los fundamentos de la sintaxis y el manejo de variables hasta el dominio del asincronismo profundo y la programación orientada a objetos en ES6+. Este curso forma las bases sólidas necesarias para desarrollar tanto interfaces interactivas (Frontend) como arquitecturas de servidor de alto rendimiento (Backend).
Nivel objetivo: Cero absoluto a Experto. Prerequisitos: Ninguno. Se recomienda nociones básicas de lógica, pero no es estrictamente necesario. Duración estimada total: 45 horas.
Resultados de aprendizaje (Learning Outcomes):
Comprender la naturaleza dinámica y de un solo hilo (single-threaded) de JavaScript.
Dominar la sintaxis moderna (ES6+), incluyendo variables de bloque, desestructuración y template literals.
Manipular estructuras de datos complejas mediante arreglos y objetos literales.
Implementar arquitecturas asíncronas seguras utilizando Promesas y async/await.
Aplicar paradigmas de Programación Orientada a Objetos y programación funcional básica.
Construir un proyecto integrador que combine manejo de datos, métodos de filtrado y clases.
Tabla de Contenido
Lección 1: Primer Programa y Consola (Básico)
Lección 2: Variables (let, const) y Tipos de Datos (Básico)
Lección 3: Control de Flujo y Operadores Estrictos (Básico)
Lección 4: Ciclos y Repetición (Básico)
Lección 5: Funciones Clásicas y Funciones Flecha (Intermedio)
Lección 6: Arreglos y Métodos de Mutación (Intermedio)
Lección 7: Objetos Literales (Intermedio)
Lección 8: Iteración Funcional: map, filter y reduce (Intermedio)
Lección 9: Scope y Closures (Intermedio)
Lección 10: Manejo de Errores (Avanzado)
Lección 11: Asincronía I: Promesas (Avanzado)
Lección 12: Asincronía II: Async / Await (Avanzado)
Lección 13: Programación Orientada a Objetos (Avanzado)
Lección 14: Estructuras de Datos Modernas: Map y Set (Experto)
Lección 15: Proyecto Integrador: Gestor de Memoria Asíncrono (Experto)
Lección 1: Primer Programa y Consola
1. ID de lección
js-01
2. Título
Primer Programa y Consola
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar el rol de JavaScript como lenguaje de scripting.
Utilizar el objeto console para depuración básica.
Implementar la impresión de mensajes en la salida estándar.
5. Contenido teórico
Conceptos: JavaScript (JS) es un lenguaje interpretado, inicialmente creado para navegadores web, pero que hoy corre en servidores (Node.js). La consola es el entorno donde evaluamos resultados y errores.
Sintaxis: La instrucción fundamental para enviar mensajes a la terminal es console.log().
Buenas prácticas: Terminar las sentencias con punto y coma (;). Aunque JS tiene inserción automática de punto y coma (ASI), ponerlos explícitamente evita errores sutiles.
Errores comunes: Escribir Console con mayúscula (JavaScript es sensible a mayúsculas y minúsculas: ReferenceError).
6. Ejemplos de código comentados
Ejemplo 1: Hola Mundo
JavaScript
// Comentario de una línea
console.log("¡Hola, Quiroz Systems!");

Ejemplo 2: Múltiples datos
JavaScript
/* 
  Comentario 
  multilínea 
*/
console.log("Cargando módulo...", 100, "completado.");

7. Ejercicio práctico
Enunciado: Escribe un script que imprima exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "JS Nivel Cero" en la segunda línea. Código inicial:
JavaScript
// Tu código aquí


Solución esperada:
JavaScript
console.log("Bienvenido a Quiroz Systems");
console.log("JS Nivel Cero");

Casos de prueba:
Caso 1: Output esperado exacto: Bienvenido a Quiroz Systems\nJS Nivel Cero\n
Caso 2: Verificar sintaxis sin errores de compilación (ReferenceError).
Caso 3: Validar la presencia de al menos dos console.log. Pistas progresivas:
Debes usar console.log() dos veces, una para cada línea.
Recuerda poner el texto entre comillas dobles " " o simples ' '.
Revisa exactamente la ortografía requerida en el enunciado.
8. Criterio de aprobación de la lección
La salida estándar debe coincidir con los strings solicitados y el código no debe lanzar excepciones de sintaxis.
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 2: Variables (let, const) y Tipos de Datos
1. ID de lección
js-02
2. Título
Variables (let, const) y Tipos de Datos
3. Nivel
Básico
4. Objetivos de aprendizaje
Declarar variables utilizando la sintaxis moderna (let, const).
Diferenciar entre tipos de datos primitivos (String, Number, Boolean).
Implementar Template Literals para concatenación segura de strings.
5. Contenido teórico
Conceptos: En JS moderno (ES6), se abandonó el uso de var por problemas de alcance (scope). Se usa let para variables que cambiarán de valor y const para constantes.
Sintaxis: const nombre = "Valor";, let edad = 20;.
Buenas prácticas: Utilizar const por defecto. Cambiar a let solo si sabes que la variable será reasignada matemáticamente. Nunca usar var.
Errores comunes: Intentar reasignar una variable declarada con const lanza un TypeError.
6. Ejemplos de código comentados
Ejemplo 1: let vs const
JavaScript
const plataforma = "Quiroz Systems";
// plataforma = "Otra"; // Esto lanzaría un error TypeError

let visitas = 0;
visitas = visitas + 1; // let permite reasignación
console.log(visitas);

Ejemplo 2: Template Literals (ES6)
JavaScript
const lenguaje = "JavaScript";
const version = 6;
// Las comillas invertidas (backticks) permiten interpolar variables con ${}
console.log(`Aprendiendo ${lenguaje} versión ES${version}`);

7. Ejercicio práctico
Enunciado: Declara una variable anioNacimiento con valor 2000 y anioActual con 2026. Calcula la edad. Imprime exactamente el texto "La edad es: X" usando un Template Literal (donde X es la edad calculada). Código inicial:
JavaScript
// Tu código aquí


Solución esperada:
JavaScript
const anioNacimiento = 2000;
const anioActual = 2026;
const edad = anioActual - anioNacimiento;
console.log(`La edad es: ${edad}`);

Casos de prueba:
Caso 1: Output esperado exacto: La edad es: 26\n
Caso 2: Verificar declaración explícita de anioNacimiento y anioActual usando const o let.
Caso 3: Validar el uso de backticks ` para el Template Literal. Pistas progresivas:
Calcula la edad restando anioNacimiento a anioActual.
Un Template Literal usa comillas invertidas: `texto ${variable}`.
Asegúrate de colocar la variable edad entre las llaves ${}.
8. Criterio de aprobación de la lección
Pasar 3/3 casos de prueba, calculando matemáticamente la edad e imprimiendo con interpolación de strings moderna.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 3: Control de Flujo y Operadores Estrictos
1. ID de lección
js-03
2. Título
Control de Flujo y Operadores Estrictos
3. Nivel
Básico
4. Objetivos de aprendizaje
Implementar estructuras condicionales if, else if, else.
Diferenciar entre igualdad débil (==) e igualdad estricta (===).
Evaluar lógica booleana con &&, ||, !.
5. Contenido teórico
Conceptos: Las condicionales dirigen el flujo del programa. JavaScript tiene una peculiaridad llamada Type Coercion (coerción de tipos) donde == intenta igualar tipos distintos antes de comparar.
Sintaxis: if (condicion) { ... } else { ... }
Buenas prácticas: Utilizar SIEMPRE el operador de igualdad estricta === y desigualdad estricta !== para evitar bugs sutiles por coerción de tipos (ej. 0 == "0" es true, pero 0 === "0" es false).
Errores comunes: Usar un solo igual = dentro de un if, lo cual asigna el valor y siempre evalúa como verdadero (o truthy).
6. Ejemplos de código comentados
Ejemplo 1: Igualdad Estricta
JavaScript
const numero = 5;
const stringCinco = "5";

// Mala práctica: coerción de tipos (retorna true)
console.log(numero == stringCinco); 

// Buena práctica: compara valor y tipo (retorna false)
console.log(numero === stringCinco); 

Ejemplo 2: Condicional If-Else
JavaScript
const nota = 85;
if (nota >= 90) {
    console.log("Excelente");
} else if (nota >= 70) {
    console.log("Aprobado");
} else {
    console.log("Reprobado");
}

7. Ejercicio práctico
Enunciado: Usando la variable predefinida numero, escribe un condicional. Si el número es estrictamente igual a 0, imprime "Cero". Si es par, imprime "Par". Si es impar, imprime "Impar". Código inicial:
JavaScript
const numero = parseInt(prompt()); // Entorno simulado recibe el valor

// Tu código aquí


Solución esperada:
JavaScript
const numero = parseInt(prompt());

if (numero === 0) {
    console.log("Cero");
} else if (numero % 2 === 0) {
    console.log("Par");
} else {
    console.log("Impar");
}

Casos de prueba:
Caso 1: Input: 0 | Output: Cero\n
Caso 2: Input: 4 | Output: Par\n
Caso 3: Input: -3 | Output: Impar\n Pistas progresivas:
Inicia evaluando if (numero === 0).
Para saber si es par, usa el módulo: numero % 2 === 0.
Encadena las condiciones usando else if y finaliza con else.
8. Criterio de aprobación de la lección
Pasar 3/3 casos utilizando exclusivamente operadores de igualdad estricta (===).
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 4: Ciclos y Repetición
1. ID de lección
js-04
2. Título
Ciclos y Repetición
3. Nivel
Básico
4. Objetivos de aprendizaje
Implementar bucles for para iteraciones controladas.
Construir bucles while basados en condiciones booleanas.
Prevenir y diagnosticar bucles infinitos.
5. Contenido teórico
Conceptos: Los bucles permiten repetir un bloque de código automáticamente.
Sintaxis: for (let i = 0; i < limite; i++) { ... }
Buenas prácticas: Declarar el iterador del bucle for siempre con let (nunca con var) para mantener el block scope (alcance de bloque) y evitar filtración de la variable fuera del ciclo.
Errores comunes: Bucle infinito por olvidar incrementar el contador en un ciclo while o usar una condición en un for que nunca se vuelve falsa.
6. Ejemplos de código comentados
Ejemplo 1: Ciclo For clásico
JavaScript
// Imprime números del 1 al 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

Ejemplo 2: Ciclo While
JavaScript
let contador = 5;
while (contador > 0) {
    console.log(contador);
    contador--; // Decremento
}

7. Ejercicio práctico
Enunciado: Recibes un número entero n. Usa un bucle for para calcular e imprimir la suma de todos los números desde 1 hasta n (incluido). Si n es 0, imprime 0. Código inicial:
JavaScript
const n = parseInt(prompt());
let suma = 0;

// Tu código aquí

console.log(suma);

Solución esperada:
JavaScript
const n = parseInt(prompt());
let suma = 0;

for (let i = 1; i <= n; i++) {
    suma += i;
}

console.log(suma);

Casos de prueba:
Caso 1: Input: 5 | Output: 15\n
Caso 2: Input: 1 | Output: 1\n
Caso 3: Input: 0 | Output: 0\n Pistas progresivas:
Tu bucle for debe iniciar con let i = 1 y terminar en i <= n.
Dentro del bucle, usa suma += i.
El console.log debe estar fuera del bloque del bucle.
8. Criterio de aprobación de la lección
Calcular correctamente la sumatoria empleando la sintaxis del bucle for (inicialización, condición, incremento).
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 5: Funciones Clásicas y Funciones Flecha
1. ID de lección
js-05
2. Título
Funciones Clásicas y Funciones Flecha
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar funciones tradicionales utilizando la palabra reservada function.
Implementar Arrow Functions (Funciones Flecha) de ES6.
Entender el retorno implícito en funciones flecha.
5. Contenido teórico
Conceptos: Una función agrupa código reutilizable. Las Arrow Functions son una sintaxis más corta que además no vinculan su propio objeto this (útil más adelante en POO).
Sintaxis: Función tradicional: function suma(a, b) { return a + b; }. Función flecha: const suma = (a, b) => a + b;.
Buenas prácticas: Usar Arrow Functions por defecto en callbacks y funciones anónimas por su legibilidad.
Errores comunes: Olvidar la palabra reservada return cuando una Arrow Function usa llaves {}. (Solo hay retorno implícito si se omiten las llaves).
6. Ejemplos de código comentados
Ejemplo 1: Función tradicional vs Flecha
JavaScript
// Tradicional
function multiplicar(a, b) {
    return a * b;
}

// Flecha con retorno implícito (una sola línea)
const multiplicarFlecha = (a, b) => a * b;

console.log(multiplicarFlecha(5, 5)); // 25

Ejemplo 2: Flecha con llaves (bloque de código)
JavaScript
const saludar = (nombre) => {
    const mensaje = `Hola, ${nombre}`;
    return mensaje; // Requiere "return" explícito por usar {}
};

7. Ejercicio práctico
Enunciado: Crea una Arrow Function llamada esMayorDeEdad que reciba un entero (edad) y retorne true si es >= 18, o false en caso contrario. Usa la sintaxis de retorno implícito (sin llaves ni palabra return). Luego llama a la función en un if e imprime "Permitido" o "Denegado". Código inicial:
JavaScript
// Define tu Arrow Function aquí

const edadUsuario = parseInt(prompt());
// Lógica if-else aquí

Solución esperada:
JavaScript
const esMayorDeEdad = (edad) => edad >= 18;

const edadUsuario = parseInt(prompt());

if (esMayorDeEdad(edadUsuario)) {
    console.log("Permitido");
} else {
    console.log("Denegado");
}

Casos de prueba:
Caso 1: Input: 20 | Output: Permitido\n
Caso 2: Input: 17 | Output: Denegado\n
Caso 3: Validar que el código usa obligatoriamente el token =>. Pistas progresivas:
Declárala como const esMayorDeEdad = (edad) => ....
Para el retorno implícito, simplemente coloca la evaluación edad >= 18 después de la flecha.
Úsala dentro de un condicional if (esMayorDeEdad(edadUsuario)).
8. Criterio de aprobación de la lección
La función debe estar definida como Arrow Function con retorno implícito exitosamente.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 6: Arreglos y Métodos de Mutación
1. ID de lección
js-06
2. Título
Arreglos y Métodos de Mutación
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar y acceder a elementos de un arreglo (Array).
Utilizar métodos mutables como push(), pop(), shift(), y splice().
Iterar arreglos mediante el ciclo for...of.
5. Contenido teórico
Conceptos: Un arreglo es una estructura ordenada de datos. Los arreglos en JS pueden contener distintos tipos de datos simultáneamente (aunque no es recomendado).
Sintaxis: const lista = [1, 2, 3];
Buenas prácticas: Declarar los arreglos con const. Aunque uses const, puedes modificar su contenido interno (agregar/quitar elementos), solo no puedes reasignar la variable a un arreglo completamente nuevo.
Errores comunes: Confundir for...in (que itera los índices/propiedades) con for...of (que itera los valores reales del arreglo).
6. Ejemplos de código comentados
Ejemplo 1: Métodos básicos
JavaScript
const tecnologias = ["HTML", "CSS"];
tecnologias.push("JavaScript"); // Agrega al final
tecnologias.unshift("Git");     // Agrega al inicio

console.log(tecnologias[1]); // HTML (el índice 0 ahora es Git)

Ejemplo 2: for...of
JavaScript
const numeros = [10, 20, 30];
// Itera los valores directamente, mucho más limpio que el for clásico
for (const num of numeros) {
    console.log(num);
}

7. Ejercicio práctico
Enunciado: Se te provee un código que lee un tamaño N y luego inserta N números en el arreglo datos. Tu tarea es iterar ese arreglo para encontrar e imprimir el número mayor sin utilizar la función nativa Math.max(). Código inicial:
JavaScript
const n = parseInt(prompt());
const datos = [];
for(let i=0; i<n; i++) datos.push(parseInt(prompt()));

// Tu código algorítmico aquí


Solución esperada:
JavaScript
const n = parseInt(prompt());
const datos = [];
for(let i=0; i<n; i++) datos.push(parseInt(prompt()));

let mayor = datos[0];
for (const num of datos) {
    if (num > mayor) {
        mayor = num;
    }
}
console.log(mayor);

Casos de prueba:
Caso 1: Input: 5 \n 1 \n 5 \n 3 \n 9 \n 2 | Output: 9\n
Caso 2: Input: 5 \n -1 \n -5 \n -2 \n -9 \n -3 | Output: -1\n
Caso 3: Validar la ausencia estricta de Math.max. Pistas progresivas:
Inicializa let mayor = datos[0].
Itera con for (const num of datos).
Actualiza la variable si el elemento iterado es más grande que mayor.
8. Criterio de aprobación de la lección
La lógica debe descubrir el elemento máximo a través de iteración secuencial demostrando comprensión algorítmica de arreglos.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 7: Objetos Literales
1. ID de lección
js-07
2. Título
Objetos Literales
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Estructurar datos utilizando pares clave-valor (Object Literals).
Acceder a propiedades mediante notación de punto y notación de corchetes.
Añadir métodos al interior de objetos.
5. Contenido teórico
Conceptos: Un objeto en JS es una colección de propiedades, equivalentes a los diccionarios en otros lenguajes, pero pueden incluir funciones (llamadas métodos).
Sintaxis: const obj = { clave: "valor" };
Buenas prácticas: Usar la notación de punto (obj.prop) siempre que sea posible. Usar notación de corchetes (obj["prop"]) solo cuando la clave es dinámica (una variable) o tiene espacios.
Errores comunes: Intentar usar un método de objeto usando notación de flecha () => {} cuando ese método necesita acceder al propio objeto con this (las flechas no tienen this propio).
6. Ejemplos de código comentados
Ejemplo 1: Creación y acceso
JavaScript
const usuario = {
    username: "quirozdev",
    rol: "admin"
};

// Modificando propiedades
usuario.edad = 23; 
// Acceso por variable
const propiedadBusqueda = "rol";
console.log(usuario[propiedadBusqueda]); // admin

Ejemplo 2: Métodos de objeto
JavaScript
const rectangulo = {
    ancho: 10,
    alto: 5,
    getArea: function() {
        // "this" apunta al objeto 'rectangulo'
        return this.ancho * this.alto; 
    }
};
console.log(rectangulo.getArea());

7. Ejercicio práctico
Enunciado: Recibes una cadena de texto (string). Escribe un algoritmo que cuente cuántas veces aparece cada carácter y lo guarde en un objeto conteo. Al final imprime el objeto iterando sus claves con un ciclo for...in. Código inicial:
JavaScript
const texto = prompt();
const conteo = {};

// Tu código aquí para contar

// Impresión del diccionario

Solución esperada:
JavaScript
const texto = prompt();
const conteo = {};

for (const char of texto) {
    if (conteo[char]) {
        conteo[char] += 1;
    } else {
        conteo[char] = 1;
    }
}

for (const key in conteo) {
    console.log(`${key}: ${conteo[key]}`);
}

Casos de prueba:
Caso 1: Input: hola | Output: h: 1\no: 1\nl: 1\na: 1\n
Caso 2: Input: aaabbc | Output: a: 3\nb: 2\nc: 1\n
Caso 3: Validar uso de la notación de corchetes para el objeto. Pistas progresivas:
Itera los caracteres del texto con for (const char of texto).
Verifica si la propiedad existe en el objeto evaluando if (conteo[char]). Si existe, suma 1.
Si no existe, inicialízala en 1 (conteo[char] = 1).
Usa for (const key in conteo) para imprimir cada llave y valor.
8. Criterio de aprobación de la lección
Dominio sobre el dinamismo de objetos asignando propiedades en tiempo de ejecución.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 8: Iteración Funcional: map, filter y reduce
1. ID de lección
js-08
2. Título
Iteración Funcional: map, filter y reduce
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Transformar arreglos utilizando el método .map().
Filtrar elementos basados en condiciones utilizando .filter().
Comprender la inmutabilidad: estos métodos retornan arreglos nuevos.
5. Contenido teórico
Conceptos: En JS Moderno se prefiere un enfoque declarativo (programación funcional). En lugar de crear ciclos for, usamos métodos integrados en el prototipo Array que reciben callbacks (preferentemente funciones flecha).
Sintaxis: array.map(elemento => expresion)
Buenas prácticas: Nunca mutar datos (modificar el arreglo original) dentro de un .map() o .filter(). Estos métodos están diseñados para ser funciones puras.
Errores comunes: Olvidar retornar un valor desde la función de callback, lo que resultará en un arreglo lleno de valores undefined.
6. Ejemplos de código comentados
Ejemplo 1: Map (Transformación)
JavaScript
const numeros = [1, 2, 3];
// Retorna un nuevo arreglo con cada número multiplicado por 2
const dobles = numeros.map(num => num * 2);
console.log(dobles); // [2, 4, 6]

Ejemplo 2: Filter (Filtrado)
JavaScript
const notas = [50, 95, 80, 45, 100];
// Retorna un arreglo solo con los elementos que cumplan la condición
const aprobados = notas.filter(nota => nota >= 70);
console.log(aprobados); // [95, 80, 100]

7. Ejercicio práctico
Enunciado: Se provee un arreglo de números (generado en el código base). Crea un nuevo arreglo llamado impares utilizando únicamente el método .filter(). Luego, imprime el nuevo arreglo usando console.log(impares.join(" ")). No utilices ciclos for o while. Código inicial:
JavaScript
// Generador de array según input
const n = parseInt(prompt());
const datos = [];
for(let i=1; i<=n; i++) datos.push(i);

// Tu código funcional aquí (usa const impares = ...)


Solución esperada:
JavaScript
const n = parseInt(prompt());
const datos = [];
for(let i=1; i<=n; i++) datos.push(i);

const impares = datos.filter(num => num % 2 !== 0);
console.log(impares.join(" "));

Casos de prueba:
Caso 1: Input: 10 | Output: 1 3 5 7 9\n
Caso 2: Input: 5 | Output: 1 3 5\n
Caso 3: Validar la presencia explícita de .filter(. Pistas progresivas:
Declara const impares = datos.filter(...).
El callback del filter debe ser una Arrow Function: num => num % 2 !== 0.
Al final, imprime con console.log(impares.join(" ")).
8. Criterio de aprobación de la lección
Refactorización declarativa exitosa, sustituyendo imperatividad por métodos inmutables del prototipo Array.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 9: Scope y Closures
1. ID de lección
js-09
2. Título
Scope y Closures (Clausuras)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Explicar el concepto de Scope Léxico (alcance).
Entender y crear una clausura (Closure).
Utilizar closures para emular variables privadas en JavaScript.
5. Contenido teórico
Conceptos: En JS, una función "recuerda" las variables del entorno donde fue creada, incluso si esa función se ejecuta en otro lugar posteriormente. Esto se llama Closure.
Sintaxis: Una función exterior que retorna una función interior.
Buenas prácticas: Las clausuras son excelentes para el patrón "Módulo" y para proteger el estado interno (encapsulamiento) antes de la existencia formal de clases privadas.
Errores comunes: Crear closures dentro de bucles antiguos (con var) hace que todas las iteraciones compartan la misma referencia. Con let esto se solucionó automáticamente.
6. Ejemplos de código comentados
Ejemplo 1: Creando un Closure
JavaScript
function crearContador() {
    let cuenta = 0; // "cuenta" queda atrapada en el closure
    
    // Retornamos una función que accede a la variable del padre
    return function() {
        cuenta++;
        return cuenta;
    };
}

const miContador = crearContador();
console.log(miContador()); // 1
console.log(miContador()); // 2

7. Ejercicio práctico
Enunciado: Crea una función fábrica llamada generarMultiplicador(factor) que reciba un número y retorne una Arrow Function. Dicha Arrow Function debe recibir un numero y retornar la multiplicación de numero * factor. El código principal ya te evalúa. Código inicial:
JavaScript
// Define generarMultiplicador aquí

// Lógica principal (No modificar)
const base = parseInt(prompt());
const valor = parseInt(prompt());
const porBase = generarMultiplicador(base);
console.log(porBase(valor));

Solución esperada:
JavaScript
function generarMultiplicador(factor) {
    return (numero) => numero * factor;
}

const base = parseInt(prompt());
const valor = parseInt(prompt());
const porBase = generarMultiplicador(base);
console.log(porBase(valor));

Casos de prueba:
Caso 1: Input: 5 \n 10 | Output: 50\n
Caso 2: Input: 3 \n 3 | Output: 9\n
Caso 3: Comprobar la naturaleza High Order Function retornando una función. Pistas progresivas:
function generarMultiplicador(factor) { ... }
El interior debe tener la sentencia return.
Lo que retorna es la función flecha: return (numero) => numero * factor;.
8. Criterio de aprobación de la lección
La función debe crear un entorno léxico persistente (closure) que conserve el valor de "factor".
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 10: Manejo de Errores
1. ID de lección
js-10
2. Título
Manejo de Errores
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Anticipar fallos en el código utilizando bloques try / catch / finally.
Lanzar excepciones deliberadas con la sentencia throw.
Instanciar el objeto nativo Error.
5. Contenido teórico
Conceptos: Para evitar que un error rompa la ejecución del script ("crash"), lo atrapamos. El bloque try intenta ejecutar, catch captura el fallo, y finally se ejecuta siempre para limpieza (cerrar sockets, ocultar loaders, etc.).
Sintaxis: try { ... } catch (error) { ... } finally { ... }
Buenas prácticas: Lanzar siempre instancias de new Error("mensaje"), nunca strings sueltos (throw "error"), ya que el objeto Error provee una traza (stack trace) vital para la depuración.
Errores comunes: Bloquear un error en un catch pero no hacer nada al respecto ("swallowing the error"), dificultando la búsqueda del origen del problema.
6. Ejemplos de código comentados
Ejemplo 1: Try Catch y Throw
JavaScript
function validarUsuario(nombre) {
    if (!nombre) {
        // Lanzamos una excepción formal
        throw new Error("El nombre no puede estar vacío");
    }
    return `Usuario ${nombre} válido`;
}

try {
    console.log(validarUsuario(""));
} catch (error) {
    // error.message contiene el texto que le dimos al new Error()
    console.log(`Error capturado: ${error.message}`); 
}

7. Ejercicio práctico
Enunciado: Solicita al usuario dos enteros (ya implementado). En un bloque try, divídelos utilizando una función que lance un new Error("DivZero") si el divisor es 0. Captúralo e imprime error.message. Si no hay error, imprime el resultado matemático (trunca los decimales con Math.floor). Código inicial:
JavaScript
const a = parseInt(prompt());
const b = parseInt(prompt());

function dividir(num1, num2) {
    // Lanzar error si num2 === 0, o retornar división truncada
}

// Implementa el try / catch

Solución esperada:
JavaScript
const a = parseInt(prompt());
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
}

Casos de prueba:
Caso 1: Input: 10 \n 2 | Output: 5\n
Caso 2: Input: 5 \n 0 | Output: DivZero\n
Caso 3: Validar presencia de los tokens throw new Error. Pistas progresivas:
Dentro de dividir, haz un if (num2 === 0) throw new Error("DivZero");.
Encierra el console.log(dividir(a,b)) en un bloque try {}.
Atrapa con catch (error) e imprime error.message.
8. Criterio de aprobación de la lección
Generación e intercepción correcta de excepciones usando el objeto nativo Error.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 11: Asincronía I: Promesas
1. ID de lección
js-11
2. Título
Asincronía I: Promesas
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Explicar la naturaleza asíncrona (Event Loop) de JavaScript.
Crear y retornar objetos Promise.
Consumir promesas usando la cadena .then() y .catch().
5. Contenido teórico
Conceptos: Como JS bloquea su único hilo si un proceso tarda, la asincronía "posterga" el resultado. Una Promesa es un objeto que representa la terminación o el fracaso eventual de una operación asíncrona. Tiene 3 estados: Pendiente, Resuelta o Rechazada.
Sintaxis: new Promise((resolve, reject) => { ... })
Buenas prácticas: Siempre añadir .catch() al final de una cadena de promesas para evitar advertencias de "Unhandled Promise Rejection".
Errores comunes: Olvidar retornar la promesa desde una función, causando que .then() lance un TypeError indicando que es undefined.
6. Ejemplos de código comentados
Ejemplo 1: Creación y consumo de una Promesa
JavaScript
function simularPeticion(exito) {
    return new Promise((resolve, reject) => {
        // Simulando demora de red
        setTimeout(() => {
            if (exito) {
                resolve("Datos descargados");
            } else {
                reject(new Error("Error de red"));
            }
        }, 1000);
    });
}

// Consumo de la Promesa
simularPeticion(true)
    .then(datos => console.log(datos))
    .catch(error => console.log(error.message));

7. Ejercicio práctico
Enunciado: Construye una función verificarEdad(edad) que retorne una Promesa (sin demoras/setTimeout). Si la edad es >= 18, debe llamar a resolve("Permitido"). Si es menor, reject(new Error("Denegado")). Consume esta promesa con el input capturado e imprime el resultado o el mensaje de error. Código inicial:
JavaScript
// Define verificarEdad retornando la promesa

const edadUsuario = parseInt(prompt());
// Consume la promesa aquí usando .then y .catch

Solución esperada:
JavaScript
function verificarEdad(edad) {
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
    .catch(error => console.log(error.message));

Casos de prueba:
Caso 1: Input: 20 | Output: Permitido\n
Caso 2: Input: 17 | Output: Denegado\n
Caso 3: Validar sintaxis new Promise y la cadena .then().catch(). Pistas progresivas:
Tu función debe hacer un return new Promise((resolve, reject) => { ... });.
Evalúa la edad dentro, llamando a la función resolve() o reject().
Encadena desde afuera: verificarEdad(edad).then(res => console.log(res)).catch(...).
8. Criterio de aprobación de la lección
Instanciación y consumo sincrónico simulado de la interfaz asíncrona de Promesas.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 12: Asincronía II: Async / Await
1. ID de lección
js-12
2. Título
Asincronía II: Async / Await
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Refactorizar promesas anidadas usando la sintaxis moderna async / await.
Detener el flujo aparente de ejecución hasta la resolución asíncrona.
Gestionar errores en async/await usando try/catch.
5. Contenido teórico
Conceptos: async / await es "azúcar sintáctico" sobre las Promesas. Permite escribir código asíncrono que "se lee" como código secuencial síncrono, evitando el famoso "Callback Hell" o interminables cadenas de .then().
Sintaxis: Se coloca async antes de declarar la función. En el interior se usa await delante de la promesa.
Buenas prácticas: Todo bloque asíncrono con await debe estar rodeado de un try/catch para manejar los posibles "rejects" de la Promesa subyacente.
Errores comunes: Intentar usar await fuera de una función async (SyntaxError). Olvidar hacer await a la promesa, recibiendo un objeto Promise { <pending> } en lugar del valor.
6. Ejemplos de código comentados
Ejemplo 1: Refactorización a Async/Await
JavaScript
// Tenemos esta función que retorna promesa
function obtenerDatos() {
    return Promise.resolve("Base de datos conectada");
}

// Nueva sintaxis moderna
async function iniciarApp() {
    try {
        // La ejecución "pausa" en esta línea hasta que obtenerDatos resuelva
        const respuesta = await obtenerDatos(); 
        console.log(respuesta);
    } catch (error) {
        console.log("Error en inicio:", error);
    }
}

iniciarApp();

7. Ejercicio práctico
Enunciado: Tenemos una función simularProceso() que retorna una promesa resuelta con el texto "Terminado" (ya proporcionada). Escribe una función flecha ejecutar() que sea async. Dentro, usa await para esperar el proceso y guárdalo en una variable. Luego imprímela. Finalmente llama a ejecutar(). No uses .then(). Código inicial:
JavaScript
function simularProceso() {
    return Promise.resolve("Terminado");
}

// Escribe tu función asíncrona aquí

// Llama a la función

Solución esperada:
JavaScript
function simularProceso() {
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

ejecutar();

Casos de prueba:
Caso 1: Output esperado exacto: Terminado\n
Caso 2: Verificar sintaxis async y await.
Caso 3: Validar la ausencia estricta de .then(. Pistas progresivas:
Declara la función: const ejecutar = async () => { ... }.
Adentro usa const resultado = await simularProceso();.
Haz un console.log(resultado); y no olvides ejecutar la función afuera.
8. Criterio de aprobación de la lección
Conversión correcta de consumo de promesas a sintaxis lineal moderna async/await.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 13: Programación Orientada a Objetos
1. ID de lección
js-13
2. Título
Programación Orientada a Objetos
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Definir clases usando la sintaxis class (ES6).
Inicializar propiedades usando el método especial constructor.
Implementar herencia básica usando extends y super().
5. Contenido teórico
Conceptos: Las clases en JS son, en realidad, azúcar sintáctico sobre el modelo histórico de Herencia Prototípica del lenguaje. Proveen una sintaxis mucho más clara para quienes vienen de lenguajes orientados a objetos clásicos (como C++ o Python).
Sintaxis: class Entidad { constructor(param) { this.param = param; } }.
Buenas prácticas: Utilizar siempre el primer carácter en mayúscula (PascalCase) para los nombres de las clases.
Errores comunes: Olvidar la invocación obligatoria a super() dentro del constructor de la clase hija al usar extends, provocando un ReferenceError sobre this.
6. Ejemplos de código comentados
Ejemplo 1: Clase y Herencia
JavaScript
class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }
}

class Programador extends Persona {
    constructor(nombre, lenguaje) {
        super(nombre); // Llama al constructor de Persona
        this.lenguaje = lenguaje;
    }

    programar() {
        console.log(`Programando en ${this.lenguaje}`);
    }
}

const dev = new Programador("Rubén", "JS");
dev.saludar();   // Heredado
dev.programar(); // Específico de la hija

7. Ejercicio práctico
Enunciado: Crea una clase Rectangulo que reciba ancho y alto en su constructor. Agrega un método getArea() que retorne la multiplicación. Instancia la clase pasándole dos números leídos por consola e imprime el área. Código inicial:
JavaScript
// Crea la clase

const w = parseInt(prompt());
const h = parseInt(prompt());
// Instancia e imprime

Solución esperada:
JavaScript
class Rectangulo {
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
console.log(rect.getArea());

Casos de prueba:
Caso 1: Input: 5 \n 10 | Output: 50\n
Caso 2: Input: 3 \n 3 | Output: 9\n
Caso 3: Validar uso de la palabra class y de instanciación new. Pistas progresivas:
Declara la clase y su método de inicialización: constructor(ancho, alto) { this.ancho = ancho... }.
El método getArea() simplemente retorna this.ancho * this.alto. No uses la palabra function dentro de la clase.
Instancia: const rect = new Rectangulo(w, h);.
8. Criterio de aprobación de la lección
Instanciación y uso correcto del contexto léxico this aplicado en clases de ES6.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 14: Estructuras de Datos Modernas: Map y Set
1. ID de lección
js-14
2. Título
Estructuras de Datos Modernas: Map y Set
3. Nivel
Experto
4. Objetivos de aprendizaje
Almacenar colecciones de elementos únicos usando la clase Set.
Diferenciar un Objeto Literal de un mapa iterativo nativo Map.
Emplear métodos como .add(), .has() y .set().
5. Contenido teórico
Conceptos: Set es una colección donde no puede haber valores repetidos. Map es un diccionario avanzado que (a diferencia del objeto literal) recuerda el orden original de inserción y permite que las claves sean de cualquier tipo, no solo strings (por ejemplo, puedes usar un objeto como clave).
Sintaxis: new Set(), new Map().
Buenas prácticas: Utiliza Set para eliminar duplicados de un array rápidamente pasándolo como argumento: [...new Set(array)] (usando operador spread).
Errores comunes: Intentar acceder a un Map usando la notación map["clave"]. Siempre debe usarse map.get("clave") y map.set("clave", "valor").
6. Ejemplos de código comentados
Ejemplo 1: Uso de Set
JavaScript
const etiquetas = new Set();
etiquetas.add("frontend");
etiquetas.add("js");
etiquetas.add("js"); // Se ignora por ser duplicado

console.log(etiquetas.has("js")); // true
console.log(etiquetas.size);      // 2

Ejemplo 2: Uso de Map
JavaScript
const caché = new Map();
caché.set("usuario_1", { nombre: "Rubén" });

console.log(caché.get("usuario_1").nombre); // Rubén

7. Ejercicio práctico
Enunciado: Tienes un arreglo con elementos duplicados. Crea una función limpiarDuplicados(lista) que convierta el arreglo en un Set, y luego retorne un nuevo Arreglo puro a partir de ese Set. Usa el método provisto en la teoría (Operador Spread ... o Array.from()). Imprime el resultado unido por espacios. Código inicial:
JavaScript
const datos = [1, 2, 2, 3, 4, 4, 5];

// Función limpiarDuplicados

// Llamada e impresión

Solución esperada:
JavaScript
const datos = [1, 2, 2, 3, 4, 4, 5];

function limpiarDuplicados(lista) {
    return [...new Set(lista)];
}

const resultado = limpiarDuplicados(datos);
console.log(resultado.join(" "));

Casos de prueba:
Caso 1: Output esperado exacto: 1 2 3 4 5\n
Caso 2: Verificar el uso de la clase new Set(.
Caso 3: Verificar que el retorno es un array (uso de [...] o Array.from()). Pistas progresivas:
Crear un Set a partir del array: new Set(lista).
Para reconvertirlo a arreglo, encciérralo en corchetes con los 3 puntos: [...new Set(lista)].
Haz console.log(resultado.join(" "));.
8. Criterio de aprobación de la lección
Uso avanzado de estructuras de datos modernas integradas con operadores de propagación (spread).
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 15: Proyecto Integrador: Gestor de Tareas Asíncrono
1. ID de lección
js-15
2. Título
Proyecto Integrador: Gestor de Tareas Asíncrono
3. Nivel
Experto
4. Objetivos de aprendizaje
Integrar Clases, Arreglos, Funciones Flecha y métodos funcionales (map/filter).
Implementar asincronía en el flujo principal (Async/Await) simulando una DB.
Demostrar el dominio del ecosistema general del curso.
5. Contenido teórico
Conceptos: En aplicaciones modernas (tanto en React.js como en Node.js Express), modelamos los dominios con clases, las persistencias con asincronía, y las mutaciones de estado con métodos inmutables (filter, map).
Sintaxis: Consolidación de ES6+.
Buenas prácticas: Separar la capa de datos (simulación de base de datos asíncrona) de la capa lógica (Controller / Manager).
Errores comunes: Mezclar el comportamiento asíncrono dentro del constructor de una clase (los constructores no pueden ser async, por ende se usan métodos de inicialización o guardado asíncrono separados).
6. Ejemplos de código comentados
(Estructura mental sugerida para el proyecto)
JavaScript
class Gestor {
    constructor() { this.db = []; }
    // Método asíncrono para simular latencia de grabado
    async guardar(item) {
        await PromesaDelay();
        this.db.push(item);
    }
    // Método puro
    obtenerLista() {
        return this.db.filter(item => item.valido);
    }
}

7. Ejercicio práctico
Enunciado: Crea una clase TaskManager. El constructor inicia this.tareas = []. Crea el método agregar(tarea). Crea un método asíncrono ejecutarLote(n) que haga un loop. En cada vuelta: lee el texto mediante prompt() (simulación de llegada), haz un await Promise.resolve(), y luego usa this.agregar(). Por último, un método mostrar() que use un .forEach() o for...of e imprima "Tarea: " + texto. En el entorno principal lee un número N, instancia la clase y llama a ejecutarLote(N). Espera a que termine (con top-level await o en una función async) y llama a mostrar(). Código inicial:
JavaScript
// Implementa TaskManager
class TaskManager {
    // ...
}

// Bucle principal
const n = parseInt(prompt());
// Instancia y ejecuta

Solución esperada:
JavaScript
class TaskManager {
    constructor() {
        this.tareas = [];
    }
    
    agregar(tarea) {
        this.tareas.push(tarea);
    }
    
    async ejecutarLote(cantidad) {
        for (let i = 0; i < cantidad; i++) {
            const texto = prompt();
            await Promise.resolve(); // Simula delay asíncrono
            this.agregar(texto);
        }
    }
    
    mostrar() {
        for (const t of this.tareas) {
            console.log(`Tarea: ${t}`);
        }
    }
}

const n = parseInt(prompt());
const app = new TaskManager();

const run = async () => {
    await app.ejecutarLote(n);
    app.mostrar();
};

run();

Casos de prueba:
Caso 1: Input: 2 \n Deploy \n Test | Output: Tarea: Deploy\nTarea: Test\n
Caso 2: Input: 1 \n Init | Output: Tarea: Init\n
Caso 3: Input: 0 | Output: \n Pistas progresivas:
Dentro de ejecutarLote, un for de 0 a cantidad. Pide la entrada y llama a this.agregar(texto).
No olvides poner await Promise.resolve(); en la línea anterior a agregar, tal y como lo pide el enunciado.
El llamado final asíncrono requiere envolver todo en un const run = async () => { await... }; run();.
8. Criterio de aprobación de la lección
Integración de modelo POO completo, despachando bucles de forma asíncrona y mutando estado encapsulado con seguridad.
9. Tiempo estimado de la lección
180 minutos
10. Puntaje máximo de la lección
500 pts
