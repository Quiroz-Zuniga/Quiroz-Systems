Quiroz Systems — C++
Descripción del curso: El curso "Quiroz Systems — C++" está diseñado para llevar al estudiante desde los conceptos más elementales de la programación estructurada hasta el dominio de la programación orientada a objetos, gestión dinámica de memoria y características modernas de C++. Este curso es la piedra angular para desarrollar software de alto rendimiento, sistemas embebidos, y motores de videojuegos.
Nivel objetivo: Cero absoluto a Experto. Prerequisitos: Ninguno. Conocimientos básicos de uso de sistema operativo (preferentemente entornos Linux/Debian) son recomendados pero no obligatorios. Duración estimada total: 45 horas.
Resultados de aprendizaje (Learning Outcomes):
Configurar y utilizar un entorno de desarrollo para C++.
Dominar la sintaxis básica, estructuras de control y tipos de datos.
Gestionar la memoria dinámica de forma segura mediante punteros y punteros inteligentes.
Aplicar los paradigmas de Programación Orientada a Objetos (POO).
Utilizar la Standard Template Library (STL) y características de C++11/14/17.
Construir una aplicación robusta e integradora como proyecto final.
Tabla de Contenido
Lección 1: Primer Programa y Compilación (Básico)
Lección 2: Variables y Tipos de Datos (Básico)
Lección 3: Control de Flujo (Básico)
Lección 4: Ciclos y Repetición (Básico)
Lección 5: Funciones y Alcance (Intermedio)
Lección 6: Arreglos y Cadenas Primitivas (Intermedio)
Lección 7: Vectores (std::vector) (Intermedio)
Lección 8: Punteros y Referencias (Intermedio)
Lección 9: Gestión Dinámica de Memoria (Intermedio)
Lección 10: Clases y Objetos (Avanzado)
Lección 11: Herencia y Polimorfismo (Avanzado)
Lección 12: Manejo de Excepciones y Archivos (Avanzado)
Lección 13: Templates genéricos (Experto)
Lección 14: Smart Pointers y Modern C++ (Experto)
Lección 15: Proyecto Integrador (Experto)
Lección 1: Primer Programa y Compilación
1. ID de lección
cpp-01
2. Título
Primer Programa y Compilación
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar la estructura básica de un archivo fuente en C++.
Compilar y ejecutar un programa utilizando el compilador.
Implementar la salida estándar para imprimir mensajes en consola.
5. Contenido teórico
Conceptos: C++ es un lenguaje compilado. El código fuente se transforma en lenguaje máquina antes de ejecutarse. La función main() es el punto de entrada obligatorio.
Sintaxis: Inclusión de librerías (#include <iostream>), uso del espacio de nombres (using namespace std; o prefijo std::), y retorno de enteros (return 0;).
Buenas prácticas: Evitar using namespace std; en proyectos grandes por colisión de nombres; usar std::cout explícitamente. Indentar correctamente.
Errores comunes: Olvidar el punto y coma (;) al final de las instrucciones. Olvidar retornar 0 en la función main.
6. Ejemplos de código comentados
Ejemplo 1: El Hola Mundo estándar
C++
#include <iostream> // Librería de entrada y salida

int main() {
    // std::cout se usa para imprimir en consola
    std::cout << "¡Hola, Quiroz Systems!" << std::endl;
    return 0; // Indica que el programa finalizó con éxito
}

Ejemplo 2: Impresión múltiple sin std::endl
C++
#include <iostream>

int main() {
    std::cout << "Iniciando sistema...\n"; // \n es un salto de línea más eficiente
    std::cout << "Carga completada." << "\n";
    return 0;
}

7. Ejercicio práctico
Enunciado: Escribe un programa que imprima exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "C++ Nivel Cero" en la segunda línea. Código inicial:
C++
#include <iostream>

int main() {
    // Tu código aquí
    
    return 0;
}

Solución esperada:
C++
#include <iostream>

int main() {
    std::cout << "Bienvenido a Quiroz Systems\n";
    std::cout << "C++ Nivel Cero\n";
    return 0;
}

Casos de prueba:
Caso 1: Input: n/a | Output: Bienvenido a Quiroz Systems\nC++ Nivel Cero\n
Caso 2: Validar que compila sin errores.
Caso 3: Validar la presencia de la función main. Pistas progresivas:
Necesitas usar std::cout dos veces o encadenar con <<.
No olvides incluir \n o std::endl para el salto de línea.
Verifica la ortografía exacta requerida en el enunciado.
8. Criterio de aprobación de la lección
El código compila sin errores, contiene la función main y pasa el caso de prueba de impresión exacta.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 2: Variables y Tipos de Datos
1. ID de lección
cpp-02
2. Título
Variables y Tipos de Datos
3. Nivel
Básico
4. Objetivos de aprendizaje
Declarar e inicializar variables de diferentes tipos primitivos.
Diferenciar entre tipos enteros, flotantes y booleanos.
Implementar operaciones aritméticas básicas.
5. Contenido teórico
Conceptos: C++ es fuertemente tipado. Una variable es un espacio en memoria con nombre y tipo.
Tipos de datos: int (enteros), float/double (decimales), char (carácter), bool (verdadero/falso).
Sintaxis: tipo nombre_variable = valor;
Buenas prácticas: Usar nombres de variables descriptivos (camelCase o snake_case). Inicializar siempre las variables al declararlas para evitar valores basura.
Errores comunes: Asignar un decimal a un int (provoca truncamiento). No inicializar una variable antes de usarla en una operación matemática.
6. Ejemplos de código comentados
Ejemplo 1: Declaración e impresión
C++
#include <iostream>

int main() {
    int edad = 23;
    float altura = 1.75f;
    bool esEstudiante = true;
    
    std::cout << "Edad: " << edad << ", Altura: " << altura << "\n";
    return 0;
}

Ejemplo 2: Operaciones matemáticas
C++
#include <iostream>

int main() {
    int base = 10;
    int altura = 5;
    int area = (base * altura) / 2; // Fórmula del área de un triángulo
    
    std::cout << "El area es: " << area << "\n";
    return 0;
}

7. Ejercicio práctico
Enunciado: Declara una variable entera anio_nacimiento con valor 2000 y una variable anio_actual con valor 2026. Calcula la edad y guárdala en una variable edad. Imprime "La edad es: X". Código inicial:
C++
#include <iostream>

int main() {
    // Tu código aquí
    
    return 0;
}

Solución esperada:
C++
#include <iostream>

int main() {
    int anio_nacimiento = 2000;
    int anio_actual = 2026;
    int edad = anio_actual - anio_nacimiento;
    std::cout << "La edad es: " << edad << "\n";
    return 0;
}

Casos de prueba:
Caso 1: Output esperado exacto: La edad es: 26\n
Caso 2: Declaración explícita de anio_nacimiento.
Caso 3: Declaración explícita de anio_actual. Pistas progresivas:
Declara las variables con el tipo int.
La fórmula es anio_actual - anio_nacimiento.
Concatena el texto y la variable usando << en std::cout.
8. Criterio de aprobación de la lección
Pasar 3/3 casos de prueba, realizando el cálculo dinámicamente y no imprimiendo directamente "26".
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 3: Control de Flujo
1. ID de lección
cpp-03
2. Título
Control de Flujo
3. Nivel
Básico
4. Objetivos de aprendizaje
Implementar sentencias condicionales if, else if y else.
Utilizar operadores lógicos y relacionales para evaluar condiciones.
Implementar la estructura switch para opciones múltiples.
5. Contenido teórico
Conceptos: Las estructuras de control deciden qué bloque de código se ejecuta según una evaluación booleana.
Sintaxis: Operadores relacionales (==, !=, <, >, <=, >=) y lógicos (&& AND, || OR, ! NOT).
Buenas prácticas: Evitar la anidación profunda (arrow anti-pattern). Usar switch cuando se evalúa una sola variable contra múltiples enteros o caracteres constantes.
Errores comunes: Usar = (asignación) en lugar de == (comparación) dentro de un if. Olvidar la palabra clave break en los casos de un switch, causando fall-through.
6. Ejemplos de código comentados
Ejemplo 1: If-Else
C++
#include <iostream>

int main() {
    int nota = 85;
    if (nota >= 90) {
        std::cout << "Excelente\n";
    } else if (nota >= 70) {
        std::cout << "Aprobado\n";
    } else {
        std::cout << "Reprobado\n";
    }
    return 0;
}

Ejemplo 2: Switch
C++
#include <iostream>

int main() {
    char opcion = 'A';
    switch (opcion) {
        case 'A':
            std::cout << "Alta de usuario\n";
            break; // Crucial para no ejecutar el caso B
        case 'B':
            std::cout << "Baja de usuario\n";
            break;
        default:
            std::cout << "Opcion no valida\n";
    }
    return 0;
}

7. Ejercicio práctico
Enunciado: Modifica el programa para que lea un número entero por consola (usando std::cin). Si el número es par, imprime "Par". Si es impar, imprime "Impar". Si es 0, imprime "Cero". Código inicial:
C++
#include <iostream>

int main() {
    int numero;
    std::cin >> numero;
    
    // Tu código aquí
    
    return 0;
}

Solución esperada:
C++
#include <iostream>

int main() {
    int numero;
    std::cin >> numero;
    
    if (numero == 0) {
        std::cout << "Cero\n";
    } else if (numero % 2 == 0) {
        std::cout << "Par\n";
    } else {
        std::cout << "Impar\n";
    }
    return 0;
}

Casos de prueba:
Caso 1: Input: 0 | Output: Cero\n
Caso 2: Input: 4 | Output: Par\n
Caso 3: Input: -3 | Output: Impar\n Pistas progresivas:
Comprueba primero si el número es exactamente igual a 0.
Para saber si es par, usa el operador módulo % (ej: numero % 2 == 0).
Todo lo que no sea 0 ni par, cae en el bloque else.
8. Criterio de aprobación de la lección
Pasar 3/3 casos de prueba evaluando correctamente el 0, números positivos, negativos pares e impares.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
(Se continúan las lecciones manteniendo la estructura estricta solicitada)
Lección 4: Ciclos y Repetición
1. ID de lección
cpp-04
2. Título
Ciclos y Repetición
3. Nivel
Básico
4. Objetivos de aprendizaje
Implementar bucles for para iteraciones conocidas.
Implementar bucles while y do-while para iteraciones condicionadas.
Explicar la diferencia entre iteraciones de evaluación previa y posterior.
5. Contenido teórico
Conceptos: Los ciclos permiten repetir un bloque de código.
Sintaxis: for (inicialización; condición; incremento), while(condición), do { ... } while(condición);.
Buenas prácticas: Declarar la variable de control dentro del for (ej. for(int i = 0...)). Prevenir bucles infinitos asegurando que la condición eventualmente sea falsa.
Errores comunes: Bucle infinito por olvidar incrementar la variable en un while. Poner un punto y coma justo después del for(), lo que anula el cuerpo del ciclo.
6. Ejemplos de código comentados
Ejemplo 1: Ciclo For
C++
#include <iostream>

int main() {
    // Imprime del 1 al 5
    for (int i = 1; i <= 5; i++) {
        std::cout << i << " ";
    }
    return 0;
}

Ejemplo 2: Ciclo While
C++
#include <iostream>

int main() {
    int contador = 5;
    while (contador > 0) {
        std::cout << contador << " ";
        contador--; // Decremento vital
    }
    return 0;
}

7. Ejercicio práctico
Enunciado: Escribe un programa que reciba un número entero N. Usa un bucle for para imprimir la suma de todos los números desde 1 hasta N (incluido). Código inicial:
C++
#include <iostream>

int main() {
    int n;
    std::cin >> n;
    int suma = 0;
    
    // Tu código aquí
    
    std::cout << suma << "\n";
    return 0;
}

Solución esperada:
C++
#include <iostream>

int main() {
    int n;
    std::cin >> n;
    int suma = 0;
    
    for(int i = 1; i <= n; i++){
        suma += i;
    }
    
    std::cout << suma << "\n";
    return 0;
}

Casos de prueba:
Caso 1: Input: 5 | Output: 15\n
Caso 2: Input: 1 | Output: 1\n
Caso 3: Input: 0 | Output: 0\n Pistas progresivas:
Tu bucle for debe iniciar en 1 y terminar cuando i <= n.
Dentro del bucle, usa suma = suma + i; o suma += i;.
Si el input es 0, el bucle no debe ejecutarse, dejando la suma en 0.
8. Criterio de aprobación de la lección
Pasar 3/3 casos de prueba calculando la sumatoria correctamente.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 5: Funciones y Alcance
1. ID de lección
cpp-05
2. Título
Funciones y Alcance
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar, definir e invocar funciones.
Pasar parámetros por valor y entender el alcance (scope) de las variables.
Retornar valores desde una función.
5. Contenido teórico
Conceptos: Una función es un bloque de código reutilizable. Ayuda a modularizar el programa.
Sintaxis: tipo_retorno nombreFuncion(tipo parametro1) { ... return valor; }
Buenas prácticas: Las funciones deben realizar una sola tarea (Single Responsibility). Usar declaraciones adelantadas (prototipos) si la función se define después del main.
Errores comunes: Retornar el tipo incorrecto. Intentar acceder a una variable local desde fuera de la función donde fue declarada (error de scope).
6. Ejemplos de código comentados
Ejemplo 1: Función simple con retorno
C++
#include <iostream>

// Función que suma dos números
int sumar(int a, int b) {
    return a + b;
}

int main() {
    int resultado = sumar(10, 5);
    std::cout << "Suma: " << resultado << "\n";
    return 0;
}

Ejemplo 2: Función void (sin retorno)
C++
#include <iostream>

void saludar(std::string nombre) {
    std::cout << "Hola " << nombre << "\n";
}

int main() {
    saludar("Quiroz Systems");
    return 0;
}

7. Ejercicio práctico
Enunciado: Crea una función llamada esMayorDeEdad que reciba un entero (edad) y retorne un bool (true si es >= 18, false de lo contrario). En el main, lee una edad e imprime "Acceso Permitido" o "Acceso Denegado" usando el retorno de la función. Código inicial:
C++
#include <iostream>

// Define tu función aquí

int main() {
    int edad;
    std::cin >> edad;
    
    // Tu lógica aquí
    
    return 0;
}

Solución esperada:
C++
#include <iostream>

bool esMayorDeEdad(int edad) {
    return edad >= 18;
}

int main() {
    int edad;
    std::cin >> edad;
    
    if (esMayorDeEdad(edad)) {
        std::cout << "Acceso Permitido\n";
    } else {
        std::cout << "Acceso Denegado\n";
    }
    return 0;
}

Casos de prueba:
Caso 1: Input: 20 | Output: Acceso Permitido\n
Caso 2: Input: 17 | Output: Acceso Denegado\n
Caso 3: Input: 18 | Output: Acceso Permitido\n Pistas progresivas:
La firma de tu función debe ser bool esMayorDeEdad(int edad).
Puedes usar directamente return edad >= 18; para devolver el booleano.
En el main, usa la función dentro de la condición del if.
8. Criterio de aprobación de la lección
La función externa debe existir y ser llamada correctamente en el main. Pasar 3/3 casos.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 6: Arreglos y Cadenas Primitivas
1. ID de lección
cpp-06
2. Título
Arreglos y Cadenas Primitivas
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar e inicializar arreglos estáticos de una dimensión.
Iterar sobre arreglos usando ciclos.
Entender las cadenas estilo C (char array).
5. Contenido teórico
Conceptos: Un arreglo almacena múltiples valores del mismo tipo contiguos en memoria. El tamaño es fijo en tiempo de compilación.
Sintaxis: int numeros[5] = {1, 2, 3, 4, 5};
Buenas prácticas: Evitar salir de los límites del arreglo (Out of Bounds). C++ no verifica los límites automáticamente por rendimiento.
Errores comunes: Índices fuera de rango (causando Undefined Behavior). Confundir el tamaño físico del arreglo con la cantidad de elementos lógicos que contiene.
6. Ejemplos de código comentados
Ejemplo 1: Arreglo de enteros
C++
#include <iostream>

int main() {
    int notas[3] = {85, 90, 78};
    // Los índices inician en 0
    for(int i = 0; i < 3; i++) {
        std::cout << "Nota " << i << ": " << notas[i] << "\n";
    }
    return 0;
}

Ejemplo 2: Cadena estilo C
C++
#include <iostream>

int main() {
    // Las cadenas en C terminan con el carácter nulo '\0'
    char nombre[] = "Quiroz";
    std::cout << nombre << "\n";
    return 0;
}

7. Ejercicio práctico
Enunciado: Tienes un arreglo de 5 enteros. Escribe código para encontrar e imprimir el valor más grande dentro del arreglo. Código inicial:
C++
#include <iostream>

int main() {
    int datos[5];
    for(int i=0; i<5; i++) std::cin >> datos[i];
    
    // Tu código aquí para hallar el mayor
    
    return 0;
}

Solución esperada:
C++
#include <iostream>

int main() {
    int datos[5];
    for(int i=0; i<5; i++) std::cin >> datos[i];
    
    int mayor = datos[0];
    for(int i=1; i<5; i++) {
        if(datos[i] > mayor) {
            mayor = datos[i];
        }
    }
    
    std::cout << mayor << "\n";
    return 0;
}

Casos de prueba:
Caso 1: Input: 1 5 3 9 2 | Output: 9\n
Caso 2: Input: -1 -5 -2 -9 -3 | Output: -1\n
Caso 3: Input: 7 7 7 7 7 | Output: 7\n Pistas progresivas:
Asume que el primer elemento (datos[0]) es el mayor al iniciar.
Itera desde el índice 1 hasta 4.
Si el elemento actual es mayor que tu variable mayor, actualiza la variable.
8. Criterio de aprobación de la lección
El algoritmo debe encontrar correctamente el número mayor incluso con números negativos.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 7: Vectores (std::vector)
1. ID de lección
cpp-07
2. Título
Vectores (std::vector)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Implementar std::vector como alternativa dinámica a los arreglos.
Insertar, eliminar y acceder a elementos dinámicamente.
Explicar las ventajas del vector estándar en la gestión de memoria.
5. Contenido teórico
Conceptos: std::vector es una estructura de la STL (Standard Template Library) que representa un arreglo que puede cambiar de tamaño dinámicamente.
Sintaxis: #include <vector>, declaración: std::vector<int> nums;
Buenas prácticas: Usar push_back() para agregar elementos. Pasar vectores a funciones por referencia (const std::vector<int>&) para evitar copias costosas.
Errores comunes: Usar el operador [] en un índice que aún no ha sido insertado (usar .at() proporciona validación de límites).
6. Ejemplos de código comentados
Ejemplo 1: Uso básico de std::vector
C++
#include <iostream>
#include <vector>

int main() {
    std::vector<int> puntajes;
    puntajes.push_back(100); // Agrega al final
    puntajes.push_back(95);
    
    std::cout << "Tamaño: " << puntajes.size() << "\n";
    std::cout << "Primer elemento: " << puntajes[0] << "\n";
    return 0;
}

Ejemplo 2: Iteración moderna (Range-based for)
C++
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numeros = {10, 20, 30};
    for(int n : numeros) {
        std::cout << n << " ";
    }
    return 0;
}

7. Ejercicio práctico
Enunciado: Lee un número N. Luego lee N números y guárdalos en un vector. Finalmente, imprime solo los números pares separados por un espacio. Código inicial:
C++
#include <iostream>
#include <vector>

int main() {
    int n;
    std::cin >> n;
    
    // Tu código aquí
    
    return 0;
}

Solución esperada:
C++
#include <iostream>
#include <vector>

int main() {
    int n;
    std::cin >> n;
    std::vector<int> vec;
    
    for(int i=0; i<n; i++) {
        int val;
        std::cin >> val;
        vec.push_back(val);
    }
    
    for(int num : vec) {
        if(num % 2 == 0) {
            std::cout << num << " ";
        }
    }
    std::cout << "\n";
    return 0;
}

Casos de prueba:
Caso 1: Input: 4 1 2 3 4 | Output: 2 4 \n (o 2 4)
Caso 2: Input: 3 1 3 5 | Output: \n
Caso 3: Input: 2 10 20 | Output: 10 20 \n Pistas progresivas:
Declara el vector vacío de enteros.
Haz un ciclo for que se repita n veces para leer e insertar con push_back.
Haz otro ciclo para recorrer el vector y filtra con un if (numero % 2 == 0).
8. Criterio de aprobación de la lección
Uso correcto de la estructura std::vector y la función push_back. Pasar todos los casos.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 8: Punteros y Referencias
1. ID de lección
cpp-08
2. Título
Punteros y Referencias
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Diferenciar entre la dirección de memoria y el valor de una variable.
Declarar y usar referencias (&) y punteros (*).
Implementar el paso por referencia y paso por puntero a funciones.
5. Contenido teórico
Conceptos: Una referencia es un alias de una variable. Un puntero es una variable que almacena una dirección de memoria.
Sintaxis: Referencia: int &ref = x;, Puntero: int *ptr = &x;
Buenas prácticas: Preferir referencias sobre punteros para pasar argumentos a funciones, ya que no pueden ser nulas y la sintaxis es más limpia.
Errores comunes: Desreferenciar un puntero nulo o no inicializado (Segmentation Fault).
6. Ejemplos de código comentados
Ejemplo 1: Referencias
C++
#include <iostream>

void duplicar(int &num) {
    num *= 2; // Modifica la variable original
}

int main() {
    int valor = 5;
    duplicar(valor);
    std::cout << valor << "\n"; // Imprime 10
    return 0;
}

Ejemplo 2: Punteros básicos
C++
#include <iostream>

int main() {
    int variable = 42;
    int *puntero = &variable; // Obtiene la dirección de memoria
    
    std::cout << "Dirección: " << puntero << "\n";
    std::cout << "Valor: " << *puntero << "\n"; // Desreferenciación
    return 0;
}

7. Ejercicio práctico
Enunciado: Escribe una función intercambiar que reciba dos enteros por puntero e intercambie sus valores. Llama a esta función en el main. Código inicial:
C++
#include <iostream>

// Crea la función intercambiar aquí

int main() {
    int a, b;
    std::cin >> a >> b;
    
    // Llama a la función intercambiar
    
    std::cout << a << " " << b << "\n";
    return 0;
}

Solución esperada:
C++
#include <iostream>

void intercambiar(int *p1, int *p2) {
    int temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}

int main() {
    int a, b;
    std::cin >> a >> b;
    
    intercambiar(&a, &b);
    
    std::cout << a << " " << b << "\n";
    return 0;
}

Casos de prueba:
Caso 1: Input: 5 10 | Output: 10 5\n
Caso 2: Input: -1 1 | Output: 1 -1\n
Caso 3: Input: 0 0 | Output: 0 0\n Pistas progresivas:
La función debe definirse como void intercambiar(int *p1, int *p2).
Necesitas una variable temporal temp para guardar *p1.
Al llamar a la función en el main, pásale las direcciones: intercambiar(&a, &b);.
8. Criterio de aprobación de la lección
La función debe usar punteros explícitamente (no referencias & en los parámetros) para dominar la desreferenciación.
9. Tiempo estimado de la lección
120 minutos
10. Puntaje máximo de la lección
100 pts
Lección 9: Gestión Dinámica de Memoria
1. ID de lección
cpp-09
2. Título
Gestión Dinámica de Memoria
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Asignar memoria en el Heap utilizando el operador new.
Liberar memoria manualmente utilizando el operador delete.
Explicar y prevenir fugas de memoria (memory leaks).
5. Contenido teórico
Conceptos: Las variables locales viven en el Stack. La memoria dinámica vive en el Heap, controlada por el programador.
Sintaxis: int* ptr = new int;, para arreglos: int* arr = new int[10];. Liberación: delete ptr; y delete[] arr;.
Buenas prácticas: Por cada new, debe haber un delete. Poner el puntero a nullptr después de hacer delete.
Errores comunes: Memory leaks (olvidar hacer delete), Dangling pointers (usar un puntero después de hacer delete).
6. Ejemplos de código comentados
Ejemplo 1: Variable dinámica simple
C++
#include <iostream>

int main() {
    int* ptr = new int(100); // Reservar e inicializar
    std::cout << *ptr << "\n";
    
    delete ptr; // Liberar memoria
    ptr = nullptr; // Buenas prácticas
    return 0;
}

Ejemplo 2: Arreglo dinámico
C++
#include <iostream>

int main() {
    int size = 5;
    int* arr = new int[size]; // Arreglo en el Heap
    
    arr[0] = 10; // Acceso estándar
    
    delete[] arr; // Importante: usar delete[] para arreglos
    return 0;
}

7. Ejercicio práctico
Enunciado: Lee un número N. Crea un arreglo dinámico de N enteros. Llénalo con números del 1 al N. Imprime el último elemento. Finalmente, libera la memoria. Código inicial:
C++
#include <iostream>

int main() {
    int n;
    std::cin >> n;
    
    // Reserva memoria dinámica, llena, imprime y libera
    
    return 0;
}

Solución esperada:
C++
#include <iostream>

int main() {
    int n;
    std::cin >> n;
    
    int* arr = new int[n];
    for(int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }
    
    std::cout << arr[n - 1] << "\n";
    
    delete[] arr;
    return 0;
}

Casos de prueba:
Caso 1: Input: 5 | Output: 5\n
Caso 2: Input: 10 | Output: 10\n
Caso 3: Validar sintácticamente el uso de new y delete[]. Pistas progresivas:
Declara int* arr = new int[n];
En el ciclo, el valor a asignar es i + 1.
El último índice es n - 1. No olvides delete[] arr; al final.
8. Criterio de aprobación de la lección
Pasar 3/3 casos. El código fuente debe obligatoriamente contener el token delete[].
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 10: Clases y Objetos
1. ID de lección
cpp-10
2. Título
Clases y Objetos
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Definir clases con atributos y métodos (encapsulamiento básico).
Instanciar objetos a partir de clases.
Crear constructores para inicializar objetos.
5. Contenido teórico
Conceptos: La POO (Programación Orientada a Objetos) agrupa datos y comportamientos. Una clase es una plantilla; un objeto es una instancia.
Sintaxis: Palabra clave class, modificadores de acceso (public, private).
Buenas prácticas: Mantener los atributos private y proporcionar métodos (getters/setters) si es necesario (encapsulación). Usar listas de inicialización en constructores.
Errores comunes: Olvidar el punto y coma (;) al finalizar la declaración de la clase.
6. Ejemplos de código comentados
Ejemplo 1: Clase básica y Constructor
C++
#include <iostream>
#include <string>

class Desarrollador {
private:
    std::string lenguaje;

public:
    // Constructor
    Desarrollador(std::string leng) : lenguaje(leng) {}

    void codificar() {
        std::cout << "Codificando en " << lenguaje << "\n";
    }
};

int main() {
    Desarrollador dev("C++"); // Instanciación
    dev.codificar();
    return 0;
}

7. Ejercicio práctico
Enunciado: Crea una clase Rectangulo con atributos privados ancho y alto (enteros). Crea un constructor para inicializarlos. Crea un método público getArea() que retorne el área. Lee 2 enteros, crea el objeto e imprime el área. Código inicial:
C++
#include <iostream>

// Tu clase aquí

int main() {
    int a, h;
    std::cin >> a >> h;
    // Instancia e imprime
    return 0;
}

Solución esperada:
C++
#include <iostream>

class Rectangulo {
private:
    int ancho;
    int alto;
public:
    Rectangulo(int a, int h) {
        ancho = a;
        alto = h;
    }
    int getArea() {
        return ancho * alto;
    }
};

int main() {
    int a, h;
    std::cin >> a >> h;
    Rectangulo rect(a, h);
    std::cout << rect.getArea() << "\n";
    return 0;
}

Casos de prueba:
Caso 1: Input: 5 10 | Output: 50\n
Caso 2: Input: 3 3 | Output: 9\n
Caso 3: Validar la presencia de la palabra reservada class y private. Pistas progresivas:
Declara class Rectangulo { ... }; (¡no olvides el punto y coma al final!).
El constructor Rectangulo(int a, int h) debe asignar los valores internos.
El método getArea simplemente retorna ancho * alto.
8. Criterio de aprobación de la lección
Instanciar el objeto correctamente pasando parámetros al constructor y no violar la visibilidad de atributos.
9. Tiempo estimado de la lección
100 minutos
10. Puntaje máximo de la lección
100 pts
Lección 11: Herencia y Polimorfismo
1. ID de lección
cpp-11
2. Título
Herencia y Polimorfismo
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Implementar herencia entre clases para reutilizar código.
Declarar funciones virtuales (virtual) y sobreescribirlas (override).
Demostrar el polimorfismo en tiempo de ejecución usando punteros de la clase base.
5. Contenido teórico
Conceptos: La herencia crea jerarquías ("es-un"). El polimorfismo permite llamar al método correcto de la clase derivada a través de un puntero de la clase base.
Sintaxis: class Derivada : public Base. Funciones: virtual void accion(); en la base, void accion() override; en la derivada.
Buenas prácticas: Declarar siempre el destructor como virtual en clases base polimórficas. Usar la palabra clave override.
Errores comunes: Omitir virtual, lo que resulta en un enlace estático (early binding) llamando a la función de la clase base siempre.
6. Ejemplos de código comentados
Ejemplo 1: Polimorfismo básico
C++
#include <iostream>

class Animal {
public:
    virtual void hacerSonido() { std::cout << "Sonido genérico\n"; }
    virtual ~Animal() = default; // Destructor virtual
};

class Perro : public Animal {
public:
    void hacerSonido() override { std::cout << "Guau\n"; }
};

int main() {
    Animal* miMascota = new Perro();
    miMascota->hacerSonido(); // Imprime "Guau" gracias a 'virtual'
    delete miMascota;
    return 0;
}

7. Ejercicio práctico
Enunciado: Crea una clase base Sistema con un método virtual iniciar() que imprima "Iniciando Sistema". Crea una clase derivada Servidor que herede de Sistema y sobreescriba iniciar() para imprimir "Iniciando Servidor". En el main, crea un puntero de tipo Sistema apuntando a un nuevo Servidor, llama a iniciar() y libera la memoria. Código inicial:
C++
#include <iostream>

// Clases aquí

int main() {
    // Lógica polimórfica aquí
    return 0;
}

Solución esperada:
C++
#include <iostream>

class Sistema {
public:
    virtual void iniciar() {
        std::cout << "Iniciando Sistema\n";
    }
    virtual ~Sistema() {}
};

class Servidor : public Sistema {
public:
    void iniciar() override {
        std::cout << "Iniciando Servidor\n";
    }
};

int main() {
    Sistema* sys = new Servidor();
    sys->iniciar();
    delete sys;
    return 0;
}

Casos de prueba:
Caso 1: Output esperado exacto: Iniciando Servidor\n
Caso 2: Verificar uso explícito del token override.
Caso 3: Verificar el delete del puntero base. Pistas progresivas:
No olvides virtual en el método iniciar() de Sistema.
class Servidor : public Sistema es la sintaxis de herencia.
El main debe tener Sistema* ptr = new Servidor();.
8. Criterio de aprobación de la lección
Implementación de ligadura dinámica correcta usando virtual y override.
9. Tiempo estimado de la lección
120 minutos
10. Puntaje máximo de la lección
100 pts
Lección 12: Manejo de Excepciones y Archivos
1. ID de lección
cpp-12
2. Título
Manejo de Excepciones y Archivos
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Atrapar y manejar errores en tiempo de ejecución con try, catch y throw.
Escribir y leer datos de archivos usando <fstream>.
5. Contenido teórico
Conceptos: Las excepciones previenen que el programa colapse ante errores anómalos. ifstream y ofstream controlan lectura/escritura de archivos.
Sintaxis: Bloque try { ... } catch (const std::exception& e) { ... }. Archivos: std::ofstream archivo("datos.txt");.
Buenas prácticas: Atrapar excepciones por referencia constante. Siempre verificar si el archivo se abrió correctamente antes de operar (archivo.is_open()).
Errores comunes: Archivos no cerrados (aunque el destructor lo hace, es buena práctica usar .close()). Capturar excepciones de forma muy general sin solucionar el error.
6. Ejemplos de código comentados
Ejemplo 1: Excepciones
C++
#include <iostream>
#include <stdexcept>

int dividir(int a, int b) {
    if(b == 0) throw std::invalid_argument("Division por cero");
    return a / b;
}

int main() {
    try {
        std::cout << dividir(10, 0) << "\n";
    } catch(const std::exception& e) {
        std::cout << "Error: " << e.what() << "\n";
    }
    return 0;
}

7. Ejercicio práctico
Enunciado: Solicita al usuario dos enteros. Intenta dividirlos. Si el divisor es 0, lanza una excepción de tipo std::runtime_error con el texto "DivZero". Captúrala e imprime el mensaje del error con e.what(). Código inicial:
C++
#include <iostream>
#include <stdexcept>

int main() {
    int a, b;
    std::cin >> a >> b;
    // try, throw, catch
    return 0;
}

Solución esperada:
C++
#include <iostream>
#include <stdexcept>

int main() {
    int a, b;
    std::cin >> a >> b;
    
    try {
        if(b == 0) {
            throw std::runtime_error("DivZero");
        }
        std::cout << a / b << "\n";
    } catch(const std::exception& e) {
        std::cout << e.what() << "\n";
    }
    return 0;
}

Casos de prueba:
Caso 1: Input: 10 2 | Output: 5\n
Caso 2: Input: 5 0 | Output: DivZero\n
Caso 3: Validar la presencia de try, catch, y throw. Pistas progresivas:
Evalúa if (b == 0) dentro del bloque try.
Lanza el error con throw std::runtime_error("DivZero");.
El catch debe recibir const std::exception& e.
8. Criterio de aprobación de la lección
Pasar 3/3 casos utilizando obligatoriamente la jerarquía estándar de excepciones (std::exception).
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 13: Templates genéricos
1. ID de lección
cpp-13
2. Título
Templates genéricos
3. Nivel
Experto
4. Objetivos de aprendizaje
Crear funciones genéricas usando template.
Crear clases genéricas para manejar distintos tipos de datos.
Explicar la generación de código en tiempo de compilación.
5. Contenido teórico
Conceptos: Los templates (plantillas) permiten escribir código que funciona con cualquier tipo de dato, promoviendo el principio DRY (Don't Repeat Yourself).
Sintaxis: template <typename T> o template <class T>.
Buenas prácticas: Declarar e implementar templates en el mismo archivo (usualmente un .h o .hpp) para evitar errores de enlace (linker errors).
Errores comunes: Mensajes de error del compilador extremadamente largos por uso incorrecto de tipos incompatibles con las operaciones del template.
6. Ejemplos de código comentados
Ejemplo 1: Función Template
C++
#include <iostream>

// Función genérica para sumar
template <typename T>
T sumar(T a, T b) {
    return a + b;
}

int main() {
    std::cout << sumar<int>(5, 10) << "\n";
    std::cout << sumar<double>(3.5, 2.1) << "\n";
    return 0;
}

7. Ejercicio práctico
Enunciado: Crea una función template llamada maximo que reciba dos parámetros del mismo tipo genérico y retorne el mayor de ellos. Llama a la función en el main usando int y luego usando double. Código inicial:
C++
#include <iostream>

// Define tu template aquí

int main() {
    int i1, i2;
    double d1, d2;
    std::cin >> i1 >> i2;
    std::cin >> d1 >> d2;
    
    // Imprime maximo de ints y luego de doubles, separados por espacio
    
    return 0;
}

Solución esperada:
C++
#include <iostream>

template <typename T>
T maximo(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    int i1, i2;
    double d1, d2;
    std::cin >> i1 >> i2 >> d1 >> d2;
    
    std::cout << maximo(i1, i2) << " " << maximo(d1, d2) << "\n";
    return 0;
}

Casos de prueba:
Caso 1: Input: 5 10 3.1 2.9 | Output: 10 3.1\n
Caso 2: Input: 10 5 2.9 3.1 | Output: 10 3.1\n
Caso 3: Chequeo de sintaxis template <typename T>. Pistas progresivas:
Empieza con template <typename T>.
La firma es T maximo(T a, T b).
Puedes usar el operador ternario return a > b ? a : b; o un simple if.
8. Criterio de aprobación de la lección
La función debe ser puramente genérica y funcionar con cualquier tipo comparable.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 14: Smart Pointers y Modern C++
1. ID de lección
cpp-14
2. Título
Smart Pointers y Modern C++
3. Nivel
Experto
4. Objetivos de aprendizaje
Reemplazar el uso de punteros crudos con std::unique_ptr y std::shared_ptr.
Implementar asignación segura de memoria mediante std::make_unique.
Evitar Memory Leaks automáticamente gracias a RAII (Resource Acquisition Is Initialization).
5. Contenido teórico
Conceptos: En C++ Moderno (C++11/14 en adelante), rara vez se usa new y delete. Los punteros inteligentes se limpian automáticamente al salir de su alcance (scope).
Sintaxis: #include <memory>. std::unique_ptr<int> ptr = std::make_unique<int>(10);
Buenas prácticas: Usar std::unique_ptr por defecto. Solo usar std::shared_ptr si múltiples partes del código necesitan compartir la propiedad del recurso.
Errores comunes: Intentar copiar un std::unique_ptr (está prohibido por diseño, debe usarse std::move).
6. Ejemplos de código comentados
Ejemplo 1: unique_ptr
C++
#include <iostream>
#include <memory>

class Conexion {
public:
    Conexion() { std::cout << "Conectado\n"; }
    ~Conexion() { std::cout << "Desconectado\n"; }
};

int main() {
    {
        // Se crea el objeto
        std::unique_ptr<Conexion> db = std::make_unique<Conexion>();
    } // Al terminar el bloque, db se destruye y llama al destructor automáticamente
    
    return 0;
}

7. Ejercicio práctico
Enunciado: Crea una clase Sensor con un método público leer() que imprima "Leyendo". En el main, crea un std::unique_ptr a Sensor usando std::make_unique e invoca el método leer(). No uses la palabra reservada new o delete. Código inicial:
C++
#include <iostream>
#include <memory>

// Clase Sensor aquí

int main() {
    // Tu código moderno aquí
    return 0;
}

Solución esperada:
C++
#include <iostream>
#include <memory>

class Sensor {
public:
    void leer() {
        std::cout << "Leyendo\n";
    }
};

int main() {
    std::unique_ptr<Sensor> sensor = std::make_unique<Sensor>();
    sensor->leer();
    return 0;
}

Casos de prueba:
Caso 1: Output exacto: Leyendo\n
Caso 2: Verificar existencia de std::unique_ptr.
Caso 3: Validar ausencia estricta de la palabra reservada new o delete. Pistas progresivas:
Declara la clase y el método.
std::unique_ptr<Sensor> miSensor = std::make_unique<Sensor>();
Usa la flecha -> para acceder al método leer().
8. Criterio de aprobación de la lección
Demostrar el dominio de RAII aplicando instanciación con punteros inteligentes.
9. Tiempo estimado de la lección
120 minutos
10. Puntaje máximo de la lección
100 pts
Lección 15: Proyecto Integrador - Sistema de Inventario
1. ID de lección
cpp-15
2. Título
Proyecto Integrador - Sistema de Inventario
3. Nivel
Experto
4. Objetivos de aprendizaje
Integrar POO, Vectores, Smart Pointers, Ciclos y Control de Flujo.
Implementar un sistema de menú interactivo.
Demostrar el dominio completo del stack de C++ abarcado en el curso.
5. Contenido teórico
Conceptos: Aplicación en el mundo real. Combinar múltiples clases y estructuras de la Standard Template Library.
Sintaxis: Repaso general e integración de módulos.
Buenas prácticas: Separar la lógica del negocio (clase Gestor) de la interacción con el usuario (Main/Consola).
Errores comunes: Mala gestión de la memoria, referencias circulares o fallos en la estructura del loop principal de la aplicación.
6. Ejemplos de código comentados
Ejemplo: Esqueleto estructural
C++
#include <iostream>
#include <vector>
#include <memory>

// Clase de Dominio
class Item { /* ... */ };

// Gestor/Manager
class Inventario {
    std::vector<std::unique_ptr<Item>> lista;
    /* ... */
};

int main() {
    // Bucle while(true) interactivo con switch
}

7. Ejercicio práctico
Enunciado: Construye un sistema simplificado. Crea la clase Producto (string nombre, int precio). Crea la clase Inventario que envuelva un std::vector<Producto>. Inventario debe tener agregarProducto(Producto p) y mostrarTotal() que sume y retorne los precios. En el main, el programa recibe un N. Luego N líneas con string (nombre) y entero (precio). Agrega todo al inventario e imprime el Total. Código inicial:
C++
#include <iostream>
#include <string>
#include <vector>

// Implementa Producto e Inventario

int main() {
    int n;
    std::cin >> n;
    
    // Lectura e integración
    
    return 0;
}

Solución esperada:
C++
#include <iostream>
#include <string>
#include <vector>

class Producto {
public:
    std::string nombre;
    int precio;
    Producto(std::string n, int p) : nombre(n), precio(p) {}
};

class Inventario {
private:
    std::vector<Producto> productos;
public:
    void agregarProducto(Producto p) {
        productos.push_back(p);
    }
    int mostrarTotal() {
        int total = 0;
        for (const auto& p : productos) {
            total += p.precio;
        }
        return total;
    }
};

int main() {
    Inventario inv;
    int n;
    std::cin >> n;
    
    for(int i = 0; i < n; i++) {
        std::string nom;
        int prec;
        std::cin >> nom >> prec;
        inv.agregarProducto(Producto(nom, prec));
    }
    
    std::cout << inv.mostrarTotal() << "\n";
    return 0;
}

Casos de prueba:
Caso 1: Input: 3 Lapiz 10 Borrador 5 Regla 15 | Output: 30\n
Caso 2: Input: 0 | Output: 0\n
Caso 3: Input: 2 Monitor 1500 Teclado 500 | Output: 2000\n Pistas progresivas:
Inventario solo necesita encapsular un vector y el ciclo for sumando los precios.
Instancia la clase Producto dentro del ciclo for en el main antes de pasarlo a agregarProducto.
Usa const auto& en el for-loop para evitar copiar los objetos Producto innecesariamente al sumar los precios.
8. Criterio de aprobación de la lección
El proyecto procesa la carga completa de datos, encapsulando adecuadamente la lógica en objetos, utilizando la librería estándar y produciendo la sumatoria matemáticamente exacta para todo N>=0.
9. Tiempo estimado de la lección
180 minutos
10. Puntaje máximo de la lección
500 pts
