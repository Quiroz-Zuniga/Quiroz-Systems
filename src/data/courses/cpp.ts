import { Course } from '../../types';

export const cppCourse: Course = {
  id: 'cpp',
  title: 'Quiroz Systems — C++',
  languageName: 'C++',
  monacoLanguage: 'cpp',
  description: 'Desde conceptos elementales de programación estructurada hasta POO avanzada, gestión dinámica de memoria y C++ moderno.',
  levelRange: 'Básico → Experto',
  estimatedHours: 45,
  iconName: 'Cpu',
  color: 'from-blue-600 to-indigo-700',
  lessons: [
    {
      id: 'cpp-01',
      title: 'Primer Programa y Compilación',
      level: 'Básico',
      objectives: [
        'Explicar la estructura básica de un archivo fuente en C++.',
        'Compilar y ejecutar un programa utilizando el compilador.',
        'Implementar la salida estándar para imprimir mensajes en consola.',
      ],
      theory: `### Conceptos
C++ es un lenguaje compilado. El código fuente se transforma en lenguaje máquina antes de ejecutarse. La función \`main()\` es el punto de entrada obligatorio.

### Sintaxis
Inclusión de librerías (\`#include <iostream>\`), uso del espacio de nombres (\`using namespace std;\` o prefijo \`std::\`), y retorno de enteros (\`return 0;\`).

### Buenas prácticas
Evitar \`using namespace std;\` en proyectos grandes por colisión de nombres; usar \`std::cout\` explícitamente. Indentar correctamente.

### Errores comunes
Olvidar el punto y coma (\`;\`) al final de las instrucciones. Olvidar retornar 0 en la función main.`,
      examples: [
        {
          title: 'El Hola Mundo estándar',
          code: `#include <iostream>

int main() {
    std::cout << "¡Hola, Quiroz Systems!" << std::endl;
    return 0;
}`,
        },
        {
          title: 'Impresión múltiple sin std::endl',
          code: `#include <iostream>

int main() {
    std::cout << "Iniciando sistema...\\n";
    std::cout << "Carga completada.\\n";
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Escribe un programa que imprima exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "C++ Nivel Cero" en la segunda línea.',
        initialCode: `#include <iostream>

int main() {
    // Tu código aquí
    
    return 0;
}`,
        solution: `#include <iostream>

int main() {
    std::cout << "Bienvenido a Quiroz Systems\\n";
    std::cout << "C++ Nivel Cero\\n";
    return 0;
}`,
        testCases: [
          {
            id: 'tc-1',
            output: 'Bienvenido a Quiroz Systems\nC++ Nivel Cero\n',
            description: 'Impresión exacta de dos líneas',
          },
        ],
        hints: [
          'Necesitas usar std::cout dos veces o encadenar con <<.',
          'No olvides incluir \\n o std::endl para el salto de línea.',
          'Verifica la ortografía exacta requerida en el enunciado.',
        ],
      },
      approvalCriteria: 'El código compila sin errores, contiene la función main y pasa el caso de prueba de impresión exacta.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'cpp-02',
      title: 'Variables y Tipos de Datos',
      level: 'Básico',
      objectives: [
        'Declarar e inicializar variables de diferentes tipos primitivos.',
        'Diferenciar entre tipos enteros, flotantes y booleanos.',
        'Implementar operaciones aritméticas básicas.',
      ],
      theory: `### Conceptos
C++ es fuertemente tipado. Una variable es un espacio en memoria con nombre y tipo.

### Tipos de datos
\`int\` (enteros), \`float\`/\`double\` (decimales), \`char\` (carácter), \`bool\` (verdadero/falso).

### Sintaxis
\`tipo nombre_variable = valor;\``,
      examples: [
        {
          title: 'Declaración e impresión',
          code: `#include <iostream>

int main() {
    int edad = 23;
    float altura = 1.75f;
    bool esEstudiante = true;
    std::cout << "Edad: " << edad << ", Altura: " << altura << "\\n";
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Declara una variable entera anio_nacimiento con valor 2000 y una variable anio_actual con valor 2026. Calcula la edad y guárdala en una variable edad. Imprime "La edad es: X".',
        initialCode: `#include <iostream>

int main() {
    // Tu código aquí
    
    return 0;
}`,
        solution: `#include <iostream>

int main() {
    int anio_nacimiento = 2000;
    int anio_actual = 2026;
    int edad = anio_actual - anio_nacimiento;
    std::cout << "La edad es: " << edad << "\\n";
    return 0;
}`,
        testCases: [
          {
            id: 'tc-1',
            output: 'La edad es: 26\n',
            description: 'Cálculo dinámico de la edad',
          },
        ],
        hints: [
          'Declara las variables con el tipo int.',
          'La fórmula es anio_actual - anio_nacimiento.',
          'Concatena el texto y la variable usando << en std::cout.',
        ],
      },
      approvalCriteria: 'Pasar el caso de prueba realizando el cálculo dinámicamente.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'cpp-03',
      title: 'Control de Flujo',
      level: 'Básico',
      objectives: [
        'Implementar sentencias condicionales if, else if y else.',
        'Utilizar operadores lógicos y relacionales.',
        'Implementar la estructura switch para opciones múltiples.',
      ],
      theory: `### Conceptos
Las estructuras de control deciden qué bloque de código se ejecuta según una evaluación booleana.`,
      examples: [
        {
          title: 'If-Else',
          code: `#include <iostream>

int main() {
    int nota = 85;
    if (nota >= 90) {
        std::cout << "Excelente\\n";
    } else if (nota >= 70) {
        std::cout << "Aprobado\\n";
    } else {
        std::cout << "Reprobado\\n";
    }
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Modifica el programa para que lea un número entero por consola (usando std::cin). Si el número es 0, imprime "Cero". Si es par, imprime "Par". Si es impar, imprime "Impar".',
        initialCode: `#include <iostream>

int main() {
    int numero;
    std::cin >> numero;
    
    // Tu código aquí
    
    return 0;
}`,
        solution: `#include <iostream>

int main() {
    int numero;
    std::cin >> numero;
    
    if (numero == 0) {
        std::cout << "Cero\\n";
    } else if (numero % 2 == 0) {
        std::cout << "Par\\n";
    } else {
        std::cout << "Impar\\n";
    }
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '0', output: 'Cero\n', description: 'Número 0' },
          { id: 'tc-2', input: '4', output: 'Par\n', description: 'Número par' },
          { id: 'tc-3', input: '-3', output: 'Impar\n', description: 'Número impar negativo' },
        ],
        hints: [
          'Comprueba primero si el número es exactamente igual a 0.',
          'Para saber si es par, usa el operador módulo % (ej: numero % 2 == 0).',
          'Todo lo que no sea 0 ni par, cae en el bloque else.',
        ],
      },
      approvalCriteria: 'Pasar 3/3 casos de prueba evaluando correctamente 0, pares e impares.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'cpp-04',
      title: 'Ciclos y Repetición',
      level: 'Básico',
      objectives: [
        'Implementar bucles for para iteraciones conocidas.',
        'Implementar bucles while y do-while.',
      ],
      theory: `### Conceptos
Los ciclos permiten repetir un bloque de código. Sintaxis: \`for (inicialización; condición; incremento)\``,
      examples: [
        {
          title: 'Ciclo For',
          code: `#include <iostream>

int main() {
    for (int i = 1; i <= 5; i++) {
        std::cout << i << " ";
    }
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Escribe un programa que reciba un número entero N. Usa un bucle for para imprimir la suma de todos los números desde 1 hasta N (incluido).',
        initialCode: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    int suma = 0;
    
    // Tu código aquí
    
    std::cout << suma << "\\n";
    return 0;
}`,
        solution: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    int suma = 0;
    
    for(int i = 1; i <= n; i++){
        suma += i;
    }
    
    std::cout << suma << "\\n";
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '5', output: '15\n' },
          { id: 'tc-2', input: '1', output: '1\n' },
          { id: 'tc-3', input: '0', output: '0\n' },
        ],
        hints: [
          'Tu bucle for debe iniciar en 1 y terminar cuando i <= n.',
          'Dentro del bucle, usa suma += i;.',
        ],
      },
      approvalCriteria: 'Pasar 3/3 casos de prueba calculando la sumatoria correctamente.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'cpp-05',
      title: 'Funciones y Alcance',
      level: 'Intermedio',
      objectives: ['Declarar, definir e invocar funciones.', 'Retornar valores desde una función.'],
      theory: `### Conceptos
Una función es un bloque de código reutilizable. Sintaxis: \`tipo_retorno nombreFuncion(tipo param) { return valor; }\``,
      examples: [
        {
          title: 'Función con retorno',
          code: `#include <iostream>

int sumar(int a, int b) {
    return a + b;
}

int main() {
    std::cout << "Suma: " << sumar(10, 5) << "\\n";
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Crea una función llamada esMayorDeEdad que reciba un entero (edad) y retorne un bool (true si es >= 18, false de lo contrario). En el main, lee una edad e imprime "Acceso Permitido" o "Acceso Denegado".',
        initialCode: `#include <iostream>

// Define tu función aquí

int main() {
    int edad;
    std::cin >> edad;
    
    // Tu lógica aquí
    
    return 0;
}`,
        solution: `#include <iostream>

bool esMayorDeEdad(int edad) {
    return edad >= 18;
}

int main() {
    int edad;
    std::cin >> edad;
    
    if (esMayorDeEdad(edad)) {
        std::cout << "Acceso Permitido\\n";
    } else {
        std::cout << "Acceso Denegado\\n";
    }
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '20', output: 'Acceso Permitido\n' },
          { id: 'tc-2', input: '17', output: 'Acceso Denegado\n' },
          { id: 'tc-3', input: '18', output: 'Acceso Permitido\n' },
        ],
        hints: [
          'La firma de tu función debe ser bool esMayorDeEdad(int edad).',
          'Puedes usar directamente return edad >= 18;.',
        ],
      },
      approvalCriteria: 'La función externa debe existir y ser llamada correctamente en el main.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'cpp-06',
      title: 'Arreglos y Cadenas Primitivas',
      level: 'Intermedio',
      objectives: ['Declarar e inicializar arreglos estáticos.', 'Iterar sobre arreglos.'],
      theory: `### Conceptos
Un arreglo almacena múltiples valores del mismo tipo contiguos en memoria.`,
      examples: [
        {
          title: 'Arreglo estático',
          code: `#include <iostream>

int main() {
    int notas[3] = {85, 90, 78};
    for(int i = 0; i < 3; i++) {
        std::cout << notas[i] << " ";
    }
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Tienes un arreglo de 5 enteros ingresados por consola. Escribe código para encontrar e imprimir el valor más grande dentro del arreglo.',
        initialCode: `#include <iostream>

int main() {
    int datos[5];
    for(int i=0; i<5; i++) std::cin >> datos[i];
    
    // Tu código aquí para hallar el mayor
    
    return 0;
}`,
        solution: `#include <iostream>

int main() {
    int datos[5];
    for(int i=0; i<5; i++) std::cin >> datos[i];
    
    int mayor = datos[0];
    for(int i=1; i<5; i++) {
        if(datos[i] > mayor) {
            mayor = datos[i];
        }
    }
    
    std::cout << mayor << "\\n";
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '1 5 3 9 2', output: '9\n' },
          { id: 'tc-2', input: '-1 -5 -2 -9 -3', output: '-1\n' },
          { id: 'tc-3', input: '7 7 7 7 7', output: '7\n' },
        ],
        hints: [
          'Asume que el primer elemento (datos[0]) es el mayor al iniciar.',
          'Itera desde el índice 1 hasta 4.',
        ],
      },
      approvalCriteria: 'Encontrar el número mayor incluso con números negativos.',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'cpp-07',
      title: 'Vectores (std::vector)',
      level: 'Intermedio',
      objectives: ['Implementar std::vector.', 'Insertar elementos dinámicamente con push_back.'],
      theory: `### Conceptos
\`std::vector\` representa un arreglo dinámico que cambia de tamaño automáticamente.`,
      examples: [
        {
          title: 'Uso de vector',
          code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {10, 20};
    nums.push_back(30);
    std::cout << "Tamaño: " << nums.size() << "\\n";
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Lee un número N. Luego lee N números y guárdalos en un vector. Finalmente, imprime solo los números pares separados por un espacio.',
        initialCode: `#include <iostream>
#include <vector>

int main() {
    int n;
    std::cin >> n;
    
    // Tu código aquí
    
    return 0;
}`,
        solution: `#include <iostream>
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
    std::cout << "\\n";
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '4 1 2 3 4', output: '2 4 \n' },
          { id: 'tc-2', input: '3 1 3 5', output: '\n' },
          { id: 'tc-3', input: '2 10 20', output: '10 20 \n' },
        ],
        hints: ['Declara el vector vacío.', 'Usa push_back para cada lectura.'],
      },
      approvalCriteria: 'Uso correcto de std::vector y push_back.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'cpp-08',
      title: 'Punteros y Referencias',
      level: 'Intermedio',
      objectives: ['Diferenciar dirección de memoria de valor.', 'Declarar y usar referencias (&) y punteros (*).'],
      theory: `### Conceptos
Una referencia (\`&\`) es un alias. Un puntero (\`*\`) almacena una dirección de memoria.`,
      examples: [
        {
          title: 'Punteros',
          code: `#include <iostream>

int main() {
    int x = 42;
    int* ptr = &x;
    std::cout << "Valor: " << *ptr << "\\n";
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Escribe una función intercambiar que reciba dos enteros por puntero e intercambie sus valores. Llama a la función en el main.',
        initialCode: `#include <iostream>

// Crea la función intercambiar aquí

int main() {
    int a, b;
    std::cin >> a >> b;
    
    // Llama a la función intercambiar
    
    std::cout << a << " " << b << "\\n";
    return 0;
}`,
        solution: `#include <iostream>

void intercambiar(int *p1, int *p2) {
    int temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}

int main() {
    int a, b;
    std::cin >> a >> b;
    
    intercambiar(&a, &b);
    
    std::cout << a << " " << b << "\\n";
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '5 10', output: '10 5\n' },
          { id: 'tc-2', input: '-1 1', output: '1 -1\n' },
        ],
        hints: ['La firma es void intercambiar(int *p1, int *p2).', 'Usa las direcciones &a y &b al llamar.'],
      },
      approvalCriteria: 'Usar punteros explícitamente.',
      estimatedMinutes: 120,
      maxScore: 100,
    },
    {
      id: 'cpp-09',
      title: 'Gestión Dinámica de Memoria',
      level: 'Intermedio',
      objectives: ['Asignar memoria en el Heap con new.', 'Liberar memoria con delete.'],
      theory: `### Conceptos
Memoria en Heap gestionada con \`new\` y \`delete[]\`.`,
      examples: [
        {
          title: 'Delete arreglo',
          code: `#include <iostream>

int main() {
    int* arr = new int[5];
    arr[0] = 10;
    delete[] arr;
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Lee N. Crea un arreglo dinámico de N enteros. Llénalo con números del 1 al N. Imprime el último elemento. Libera la memoria con delete[].',
        initialCode: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    
    // Reserva memoria dinámica, llena, imprime y libera
    
    return 0;
}`,
        solution: `#include <iostream>

int main() {
    int n;
    std::cin >> n;
    
    int* arr = new int[n];
    for(int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }
    
    std::cout << arr[n - 1] << "\\n";
    
    delete[] arr;
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '5', output: '5\n' },
          { id: 'tc-2', input: '10', output: '10\n' },
        ],
        hints: ['Declara int* arr = new int[n];', 'Usa delete[] arr; al final.'],
      },
      approvalCriteria: 'El código debe incluir el token delete[].',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'cpp-10',
      title: 'Clases y Objetos',
      level: 'Avanzado',
      objectives: ['Definir clases con atributos y métodos.', 'Instanciar objetos con constructores.'],
      theory: `### Conceptos
Encapsulamiento con palabras clave \`class\`, \`private\` y \`public\`.`,
      examples: [
        {
          title: 'Clase básica',
          code: `#include <iostream>

class Rectangulo {
private:
    int ancho, alto;
public:
    Rectangulo(int a, int h) : ancho(a), alto(h) {}
    int area() { return ancho * alto; }
};

int main() {
    Rectangulo r(5, 10);
    std::cout << r.area() << "\\n";
    return 0;
}`,
        },
      ],
      exercise: {
        statement: 'Crea una clase Rectangulo con atributos privados ancho y alto (enteros). Crea un constructor para inicializarlos. Crea un método público getArea() que retorne el área. Lee 2 enteros por consola, crea el objeto e imprime el área.',
        initialCode: `#include <iostream>

// Tu clase aquí

int main() {
    int a, h;
    std::cin >> a >> h;
    // Instancia e imprime
    return 0;
}`,
        solution: `#include <iostream>

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
    std::cout << rect.getArea() << "\\n";
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '5 10', output: '50\n' },
          { id: 'tc-2', input: '3 3', output: '9\n' },
        ],
        hints: ['Usa class Rectangulo { ... };', 'El método getArea() retorna ancho * alto.'],
      },
      approvalCriteria: 'Instanciar el objeto pasando parámetros al constructor.',
      estimatedMinutes: 100,
      maxScore: 100,
    },
    {
      id: 'cpp-11',
      title: 'Herencia y Polimorfismo',
      level: 'Avanzado',
      objectives: ['Implementar herencia y funciones virtuales.'],
      theory: `### Conceptos
Polimorfismo en tiempo de ejecución con \`virtual\` y \`override\`.`,
      examples: [
        {
          title: 'Polimorfismo',
          code: `#include <iostream>

class Base {
public:
    virtual void show() { std::cout << "Base\\n"; }
};

class Hija : public Base {
public:
    void show() override { std::cout << "Hija\\n"; }
};`,
        },
      ],
      exercise: {
        statement: 'Crea una clase base Sistema con un método virtual iniciar() que imprima "Iniciando Sistema". Crea una clase derivada Servidor que herede de Sistema y sobreescriba iniciar() para imprimir "Iniciando Servidor". En el main, crea un puntero de tipo Sistema apuntando a un nuevo Servidor, llama a iniciar() y libera la memoria.',
        initialCode: `#include <iostream>

// Clases aquí

int main() {
    // Lógica polimórfica aquí
    return 0;
}`,
        solution: `#include <iostream>

class Sistema {
public:
    virtual void iniciar() {
        std::cout << "Iniciando Sistema\\n";
    }
    virtual ~Sistema() {}
};

class Servidor : public Sistema {
public:
    void iniciar() override {
        std::cout << "Iniciando Servidor\\n";
    }
};

int main() {
    Sistema* sys = new Servidor();
    sys->iniciar();
    delete sys;
    return 0;
}`,
        testCases: [{ id: 'tc-1', output: 'Iniciando Servidor\n' }],
        hints: ['Usa virtual en la clase base y override en la derivada.'],
      },
      approvalCriteria: 'Polimorfismo dinámico correcto usando virtual y override.',
      estimatedMinutes: 120,
      maxScore: 100,
    },
    {
      id: 'cpp-12',
      title: 'Manejo de Excepciones y Archivos',
      level: 'Avanzado',
      objectives: ['Atrapar errores con try, catch y throw.'],
      theory: `### Conceptos
Manejo de excepciones estructurado con \`std::runtime_error\`.`,
      examples: [
        {
          title: 'Try Catch',
          code: `#include <iostream>
#include <stdexcept>

int main() {
    try {
        throw std::runtime_error("Error");
    } catch(const std::exception& e) {
        std::cout << e.what() << "\\n";
    }
}`,
        },
      ],
      exercise: {
        statement: 'Solicita dos enteros. Intenta dividirlos. Si el divisor es 0, lanza std::runtime_error("DivZero"). Captúrala e imprime el e.what().',
        initialCode: `#include <iostream>
#include <stdexcept>

int main() {
    int a, b;
    std::cin >> a >> b;
    // try, throw, catch
    return 0;
}`,
        solution: `#include <iostream>
#include <stdexcept>

int main() {
    int a, b;
    std::cin >> a >> b;
    
    try {
        if(b == 0) {
            throw std::runtime_error("DivZero");
        }
        std::cout << a / b << "\\n";
    } catch(const std::exception& e) {
        std::cout << e.what() << "\\n";
    }
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '10 2', output: '5\n' },
          { id: 'tc-2', input: '5 0', output: 'DivZero\n' },
        ],
        hints: ['Evalúa if (b == 0) throw std::runtime_error("DivZero");'],
      },
      approvalCriteria: 'Usar la jerarquía de excepciones estándar.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'cpp-13',
      title: 'Templates genéricos',
      level: 'Experto',
      objectives: ['Crear funciones genéricas con template.'],
      theory: `### Conceptos
Programación genérica en C++ con \`template <typename T>\`.`,
      examples: [
        {
          title: 'Template',
          code: `template <typename T>
T sumar(T a, T b) { return a + b; }`,
        },
      ],
      exercise: {
        statement: 'Crea una función template maximo que reciba dos parámetros genéricos y retorne el mayor. Llama a la función en el main con ints y doubles.',
        initialCode: `#include <iostream>

// Define tu template aquí

int main() {
    int i1, i2;
    double d1, d2;
    std::cin >> i1 >> i2 >> d1 >> d2;
    
    // Imprime el máximo de ints y luego el de doubles separados por espacio
    
    return 0;
}`,
        solution: `#include <iostream>

template <typename T>
T maximo(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    int i1, i2;
    double d1, d2;
    std::cin >> i1 >> i2 >> d1 >> d2;
    
    std::cout << maximo(i1, i2) << " " << maximo(d1, d2) << "\\n";
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '5 10 3.1 2.9', output: '10 3.1\n' },
          { id: 'tc-2', input: '10 5 2.9 3.1', output: '10 3.1\n' },
        ],
        hints: ['Usa template <typename T> T maximo(T a, T b)'],
      },
      approvalCriteria: 'Función genérica utilizable con cualquier tipo comparable.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'cpp-14',
      title: 'Smart Pointers y Modern C++',
      level: 'Experto',
      objectives: ['Usar std::unique_ptr y std::make_unique.'],
      theory: `### Conceptos
Gestión de memoria moderna mediante RAII con smart pointers (\`#include <memory>\`).`,
      examples: [
        {
          title: 'unique_ptr',
          code: `#include <memory>

auto ptr = std::make_unique<int>(10);`,
        },
      ],
      exercise: {
        statement: 'Crea una clase Sensor con método público leer() que imprima "Leyendo". En el main, crea un std::unique_ptr a Sensor usando std::make_unique e invoca leer(). No uses new/delete.',
        initialCode: `#include <iostream>
#include <memory>

// Clase Sensor aquí

int main() {
    // Tu código moderno aquí
    return 0;
}`,
        solution: `#include <iostream>
#include <memory>

class Sensor {
public:
    void leer() {
        std::cout << "Leyendo\\n";
    }
};

int main() {
    std::unique_ptr<Sensor> sensor = std::make_unique<Sensor>();
    sensor->leer();
    return 0;
}`,
        testCases: [{ id: 'tc-1', output: 'Leyendo\n' }],
        hints: ['std::unique_ptr<Sensor> sensor = std::make_unique<Sensor>();'],
      },
      approvalCriteria: 'Instanciación con puntero inteligente sin new/delete.',
      estimatedMinutes: 120,
      maxScore: 100,
    },
    {
      id: 'cpp-15',
      title: 'Proyecto Integrador - Sistema de Inventario',
      level: 'Experto',
      objectives: ['Integrar POO, Vectores, Smart Pointers y Menús interactivos.'],
      theory: `### Proyecto Integrador Final
Integración completa del stack de C++ para construir un Gestor de Inventario.`,
      examples: [
        {
          title: 'Estructura general',
          code: `#include <vector>
#include <memory>

class Producto { public: std::string nombre; int precio; };`,
        },
      ],
      exercise: {
        statement: 'Crea la clase Producto (nombre, precio). Crea la clase Inventario que envuelva un std::vector<Producto> con agregarProducto(Producto p) y mostrarTotal() que retorne la suma de precios. Lee N productos (nombre y precio) y muestra el total.',
        initialCode: `#include <iostream>
#include <string>
#include <vector>

// Implementa Producto e Inventario

int main() {
    int n;
    std::cin >> n;
    
    // Lectura e integración
    
    return 0;
}`,
        solution: `#include <iostream>
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
    
    std::cout << inv.mostrarTotal() << "\\n";
    return 0;
}`,
        testCases: [
          { id: 'tc-1', input: '3 Lapiz 10 Borrador 5 Regla 15', output: '30\n' },
          { id: 'tc-2', input: '0', output: '0\n' },
          { id: 'tc-3', input: '2 Monitor 1500 Teclado 500', output: '2000\n' },
        ],
        hints: ['Inventario encapsula un vector.', 'Suma los precios de todos los productos.'],
      },
      approvalCriteria: 'El proyecto procesa la carga completa encapsulando la lógica en objetos.',
      estimatedMinutes: 180,
      maxScore: 500,
    },
  ],
};
