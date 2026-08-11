import { Course } from '../../types';

export const javaCourse: Course = {
  id: 'java',
  title: 'Quiroz Systems — Java',
  languageName: 'Java',
  monacoLanguage: 'java',
  description: 'Paradigma POO puro, tipado estricto, JVM, colecciones, streams, lambdas y concurrencia empresarial.',
  levelRange: 'Básico → Experto',
  estimatedHours: 50,
  iconName: 'Coffee',
  color: 'from-orange-600 to-red-700',
  lessons: [
    {
      id: 'java-01',
      title: 'Primer Programa y la JVM',
      level: 'Básico',
      objectives: ['Estructurar la clase Main y el método public static void main.'],
      theory: `### Conceptos
En Java todo vive en una clase. Punto de entrada: \`public static void main(String[] args)\`.`,
      examples: [
        {
          title: 'Main Class',
          code: `public class Main {
    public static void main(String[] args) {
        System.out.println("¡Hola, Quiroz Systems!");
    }
}`,
        },
      ],
      exercise: {
        statement: 'Escribe un programa en Java (clase Main y método main). Imprime "Bienvenido a Quiroz Systems" en la primera línea y "Java Nivel Cero" en la segunda.',
        initialCode: `// Tu código aquí
`,
        solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Bienvenido a Quiroz Systems");
        System.out.println("Java Nivel Cero");
    }
}`,
        testCases: [
          { id: 'tc-1', output: 'Bienvenido a Quiroz Systems\nJava Nivel Cero\n' },
        ],
        hints: ['Usa public class Main', 'Usa System.out.println() dos veces'],
      },
      approvalCriteria: 'Clase Main y método principal sintácticamente válidos.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'java-02',
      title: 'Variables y Tipos de Datos Primitivos',
      level: 'Básico',
      objectives: ['Declarar variables de tipos primitivos (int, double, boolean) y String.'],
      theory: `### Conceptos
Tipado estricto: \`int\`, \`double\`, \`boolean\`, \`char\`, y la clase \`String\`. Concatenación con \`+\`.`,
      examples: [
        {
          title: 'Tipos',
          code: `int edad = 23;
String nombre = "Rubén";
System.out.println(nombre + " " + edad);`,
        },
      ],
      exercise: {
        statement: 'Declara anioNacimiento = 2000 y anioActual = 2026 en la clase Main. Calcula la edad. Imprime "La edad es: X".',
        initialCode: `public class Main {
    public static void main(String[] args) {
        // Tu código aquí
    }
}`,
        solution: `public class Main {
    public static void main(String[] args) {
        int anioNacimiento = 2000;
        int anioActual = 2026;
        int edad = anioActual - anioNacimiento;
        System.out.println("La edad es: " + edad);
    }
}`,
        testCases: [{ id: 'tc-1', output: 'La edad es: 26\n' }],
        hints: ['int edad = anioActual - anioNacimiento;', 'System.out.println("La edad es: " + edad);'],
      },
      approvalCriteria: 'Cálculo dinámico con concatenación de String.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'java-03',
      title: 'Control de Flujo (If/Switch)',
      level: 'Básico',
      objectives: ['Lectura de consola con Scanner y condicionales if-else.'],
      theory: `### Conceptos
Lectura con \`Scanner sc = new Scanner(System.in);\`. Evaluación con \`if / else if / else\`.`,
      examples: [
        {
          title: 'Scanner',
          code: `import java.util.Scanner;
Scanner sc = new Scanner(System.in);
int num = sc.nextInt();`,
        },
      ],
      exercise: {
        statement: 'Lee un entero numero con Scanner. Si es 0 imprime "Cero". Si es par "Par". Si es impar "Impar".',
        initialCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Tu código aquí
        
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int numero = sc.nextInt();
        
        if (numero == 0) {
            System.out.println("Cero");
        } else if (numero % 2 == 0) {
            System.out.println("Par");
        } else {
            System.out.println("Impar");
        }
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '0', output: 'Cero\n' },
          { id: 'tc-2', input: '4', output: 'Par\n' },
          { id: 'tc-3', input: '-3', output: 'Impar\n' },
        ],
        hints: ['int numero = sc.nextInt();'],
      },
      approvalCriteria: 'Lectura con Scanner y evaluación de paridad.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'java-04',
      title: 'Ciclos y Repetición',
      level: 'Básico',
      objectives: ['Bucle for para iteración definida.'],
      theory: `### Conceptos
Sintaxis: \`for (int i = 1; i <= n; i++)\`.`,
      examples: [
        {
          title: 'For',
          code: `for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");
}`,
        },
      ],
      exercise: {
        statement: 'Lee un número n con Scanner. Usa un ciclo for para sumar todos los números de 1 a n. Imprime el resultado total.',
        initialCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int suma = 0;
        
        // Tu código aquí
        
        System.out.println(suma);
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int suma = 0;
        
        for (int i = 1; i <= n; i++) {
            suma += i;
        }
        
        System.out.println(suma);
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '5', output: '15\n' },
          { id: 'tc-2', input: '1', output: '1\n' },
          { id: 'tc-3', input: '0', output: '0\n' },
        ],
        hints: ['for (int i = 1; i <= n; i++) suma += i;'],
      },
      approvalCriteria: 'Sumatoria correcta con bucle for.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'java-05',
      title: 'Arreglos y Matrices',
      level: 'Intermedio',
      objectives: ['Declarar y recorrer arreglos estáticos.'],
      theory: `### Conceptos
Arreglos de tamaño fijo: \`int[] datos = new int[n];\`.`,
      examples: [
        {
          title: 'Arrays',
          code: `int[] nums = {10, 20, 30};
for (int n : nums) System.out.println(n);`,
        },
      ],
      exercise: {
        statement: 'Con el arreglo datos de n elementos leídos por Scanner, iterado para encontrar e imprimir el número mayor sin usar ordenamiento ni Math.max.',
        initialCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] datos = new int[n];
        for(int i = 0; i < n; i++) datos[i] = sc.nextInt();
        
        // Tu código aquí
        
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] datos = new int[n];
        for(int i = 0; i < n; i++) datos[i] = sc.nextInt();
        
        int mayor = datos[0];
        for (int num : datos) {
            if (num > mayor) {
                mayor = num;
            }
        }
        
        System.out.println(mayor);
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '5\n1 5 3 9 2', output: '9\n' },
          { id: 'tc-2', input: '5\n-1 -5 -2 -9 -3', output: '-1\n' },
        ],
        hints: ['int mayor = datos[0];'],
      },
      approvalCriteria: 'Iteración de arreglo para encontrar el valor máximo.',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'java-06',
      title: 'Métodos y Sobrecarga',
      level: 'Intermedio',
      objectives: ['Declarar métodos estáticos reutilizables.'],
      theory: `### Conceptos
Firma de método: \`public static tipoRetorno nombre(params) { return valor; }\`.`,
      examples: [
        {
          title: 'Método',
          code: `public static int sumar(int a, int b) { return a + b; }`,
        },
      ],
      exercise: {
        statement: 'Crea en Main el método estático public static boolean esMayorDeEdad(int edad). En el main lee la edad e imprime "Permitido" o "Denegado".',
        initialCode: `import java.util.Scanner;

public class Main {
    
    // Define esMayorDeEdad aquí

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int edad = sc.nextInt();
        
        // Condicional
        
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;

public class Main {
    
    public static boolean esMayorDeEdad(int edad) {
        return edad >= 18;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int edad = sc.nextInt();
        
        if (esMayorDeEdad(edad)) {
            System.out.println("Permitido");
        } else {
            System.out.println("Denegado");
        }
        
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '20', output: 'Permitido\n' },
          { id: 'tc-2', input: '17', output: 'Denegado\n' },
        ],
        hints: ['public static boolean esMayorDeEdad(int edad) { return edad >= 18; }'],
      },
      approvalCriteria: 'Método estático externo invocado en main.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'java-07',
      title: 'Clases, Objetos y Atributos',
      level: 'Intermedio',
      objectives: ['Diferenciar Clases de Objetos e instanciar con new.'],
      theory: `### Conceptos
Instanciación de objetos: \`Clase obj = new Clase();\`.`,
      examples: [
        {
          title: 'Instanciación',
          code: `class Mascota { String nombre; }
Mascota m = new Mascota();`,
        },
      ],
      exercise: {
        statement: 'Crea la clase Rectangulo con atributos int ancho, alto y método int getArea(). En el main lee a y h, instancia Rectangulo, asigna los campos e imprime el área.',
        initialCode: `import java.util.Scanner;

// Clase Rectangulo aquí

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int h = sc.nextInt();
        
        // Instancia e imprime
        
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;

class Rectangulo {
    int ancho;
    int alto;
    
    int getArea() {
        return ancho * alto;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int h = sc.nextInt();
        
        Rectangulo rect = new Rectangulo();
        rect.ancho = a;
        rect.alto = h;
        
        System.out.println(rect.getArea());
        
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '5\n10', output: '50\n' },
          { id: 'tc-2', input: '3\n3', output: '9\n' },
        ],
        hints: ['Rectangulo rect = new Rectangulo();'],
      },
      approvalCriteria: 'Instanciación con new y uso de campos.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'java-08',
      title: 'Constructores y Encapsulamiento',
      level: 'Intermedio',
      objectives: ['Atributos privados, constructores y getters.'],
      theory: `### Conceptos
Encapsulamiento con \`private\`, constructores y la palabra \`this\`.`,
      examples: [
        {
          title: 'Encapsulamiento',
          code: `class Cuenta {
    private double saldo;
    public Cuenta(double s) { this.saldo = s; }
    public double getSaldo() { return saldo; }
}`,
        },
      ],
      exercise: {
        statement: 'Refactoriza Rectangulo: atributos private int ancho, alto. Constructor public Rectangulo(int ancho, int alto), getters y getArea(). En main instancia con el constructor e imprime getArea().',
        initialCode: `import java.util.Scanner;

// Tu clase Rectangulo fuertemente encapsulada aquí

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int h = sc.nextInt();
        
        // Instancia con constructor
        
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;

class Rectangulo {
    private int ancho;
    private int alto;
    
    public Rectangulo(int ancho, int alto) {
        this.ancho = ancho;
        this.alto = alto;
    }
    
    public int getAncho() { return this.ancho; }
    public int getAlto() { return this.alto; }
    
    public int getArea() {
        return this.ancho * this.alto;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int h = sc.nextInt();
        
        Rectangulo rect = new Rectangulo(a, h);
        System.out.println(rect.getArea());
        
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '5\n10', output: '50\n' },
          { id: 'tc-2', input: '3\n3', output: '9\n' },
        ],
        hints: ['private int ancho;', 'public Rectangulo(int ancho, int alto) { this.ancho = ancho; ... }'],
      },
      approvalCriteria: 'Atributos privados e inicialización con constructor.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'java-09',
      title: 'Herencia y Polimorfismo',
      level: 'Avanzado',
      objectives: ['Herencia con extends y anotación @Override.'],
      theory: `### Conceptos
\ \`class Hija extends Padre\` y resolución dinámica con \`@Override\`.`,
      examples: [
        {
          title: 'Polimorfismo',
          code: `class Empleado { public void trabajar() { System.out.println("Base"); } }
class Dev extends Empleado { @Override public void trabajar() { System.out.println("Dev"); } }`,
        },
      ],
      exercise: {
        statement: 'Crea Empleado con trabajar() -> "Trabajo Base". Crea Ingeniero extends Empleado con @Override trabajar() -> "Trabajo en Codigo". Instancia Empleado emp = new Ingeniero(); y llama a trabajar().',
        initialCode: `// Clases aquí

public class Main {
    public static void main(String[] args) {
        // Polimorfismo aquí
    }
}`,
        solution: `class Empleado {
    public void trabajar() {
        System.out.println("Trabajo Base");
    }
}

class Ingeniero extends Empleado {
    @Override
    public void trabajar() {
        System.out.println("Trabajo en Codigo");
    }
}

public class Main {
    public static void main(String[] args) {
        Empleado emp = new Ingeniero();
        emp.trabajar();
    }
}`,
        testCases: [{ id: 'tc-1', output: 'Trabajo en Codigo\n' }],
        hints: ['Empleado emp = new Ingeniero();'],
      },
      approvalCriteria: 'Instanciación polimórfica y @Override.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'java-10',
      title: 'Clases Abstractas e Interfaces',
      level: 'Avanzado',
      objectives: ['Contratos con interface e implements.'],
      theory: `### Conceptos
Contratos con \`interface Conectable { void conectar(); }\` e \`implements\`.`,
      examples: [
        {
          title: 'Interface',
          code: `interface Exec { void run(); }
class Job implements Exec { public void run() {} }`,
        },
      ],
      exercise: {
        statement: 'Crea interface Conectable con void conectar();. Crea BaseDatos implements Conectable con conectar() -> "Conexión MySQL Exitosa". Instancia Conectable db = new BaseDatos(); e invoca.',
        initialCode: `// Interfaz y Clase

public class Main {
    public static void main(String[] args) {
        // Implementación
    }
}`,
        solution: `interface Conectable {
    void conectar();
}

class BaseDatos implements Conectable {
    @Override
    public void conectar() {
        System.out.println("Conexión MySQL Exitosa");
    }
}

public class Main {
    public static void main(String[] args) {
        Conectable db = new BaseDatos();
        db.conectar();
    }
}`,
        testCases: [{ id: 'tc-1', output: 'Conexión MySQL Exitosa\n' }],
        hints: ['interface Conectable { void conectar(); }'],
      },
      approvalCriteria: 'Uso de interface e implements.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'java-11',
      title: 'Manejo de Excepciones',
      level: 'Avanzado',
      objectives: ['Captura de errores con try y catch.'],
      theory: `### Conceptos
Captura de excepciones con \`try { ... } catch (ArithmeticException e) { ... }\`.`,
      examples: [
        {
          title: 'Try Catch',
          code: `try { int x = 10 / 0; } catch(ArithmeticException e) { System.out.println("Error"); }`,
        },
      ],
      exercise: {
        statement: 'Lee dos enteros a y b. En un try calcula a / b. Si ocurre ArithmeticException imprime "ErrorDivZero", de lo contrario imprime el resultado.',
        initialCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        
        // Aplica try-catch
        
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        
        try {
            int resultado = a / b;
            System.out.println(resultado);
        } catch (ArithmeticException e) {
            System.out.println("ErrorDivZero");
        }
        
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '10\n2', output: '5\n' },
          { id: 'tc-2', input: '5\n0', output: 'ErrorDivZero\n' },
        ],
        hints: ['catch (ArithmeticException e) { System.out.println("ErrorDivZero"); }'],
      },
      approvalCriteria: 'Captura de ArithmeticException.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'java-12',
      title: 'Java Collections Framework (List, Map)',
      level: 'Avanzado',
      objectives: ['Colecciones dinámicas con List<Integer> y ArrayList.'],
      theory: `### Conceptos
\ \`List<Integer> lista = new ArrayList<>();\`.`,
      examples: [
        {
          title: 'ArrayList',
          code: `List<String> lista = new ArrayList<>();
lista.add("Java");`,
        },
      ],
      exercise: {
        statement: 'Crea un ArrayList<Integer>. Lee n enteros por Scanner. Si son > 0 agrégalos a la lista. Itera con for-each e imprímelos separados por espacio (System.out.print(num + " ");).',
        initialCode: `import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Tu código de listas
        
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Integer> positivos = new ArrayList<>();
        
        for(int i = 0; i < n; i++) {
            int valor = sc.nextInt();
            if (valor > 0) {
                positivos.add(valor);
            }
        }
        
        for (Integer num : positivos) {
            System.out.print(num + " ");
        }
        System.out.println();
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '5\n-1 5 -3 9 0', output: '5 9 \n' },
          { id: 'tc-2', input: '3\n-5 -10 -2', output: '\n' },
        ],
        hints: ['List<Integer> positivos = new ArrayList<>();'],
      },
      approvalCriteria: 'Instanciación y filtrado con ArrayList.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'java-13',
      title: 'Expresiones Lambda y API Streams',
      level: 'Experto',
      objectives: ['Pipeline declarativo con stream().filter().map().forEach().'],
      theory: `### Conceptos
Streams en Java 8: \`lista.stream().filter(...).map(...).forEach(...)\`.`,
      examples: [
        {
          title: 'Stream',
          code: `Arrays.asList(1, 2, 3).stream().filter(n -> n % 2 != 0).forEach(System.out::println);`,
        },
      ],
      exercise: {
        statement: 'Con la lista datos provista, crea un stream(), usa .filter(n -> n % 2 != 0), .map(n -> n * 2) e imprime con .forEach(System.out::println).',
        initialCode: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> datos = Arrays.asList(1, 2, 3, 4, 5);
        
        // Cadena de Streams
        
    }
}`,
        solution: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> datos = Arrays.asList(1, 2, 3, 4, 5);
        
        datos.stream()
             .filter(n -> n % 2 != 0)
             .map(n -> n * 2)
             .forEach(System.out::println);
    }
}`,
        testCases: [{ id: 'tc-1', output: '2\n6\n10\n' }],
        hints: ['filter(n -> n % 2 != 0)', 'map(n -> n * 2)'],
      },
      approvalCriteria: 'Encadenamiento de funciones en API Streams.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'java-14',
      title: 'Concurrencia básica y Threads',
      level: 'Experto',
      objectives: ['Hilos paralelos implementando Runnable.'],
      theory: `### Conceptos
Hilos de ejecución con \`class MiTarea implements Runnable\` y \`new Thread(tarea).start()\`.`,
      examples: [
        {
          title: 'Thread',
          code: `Thread t = new Thread(() -> System.out.println("Hilo"));
t.start();`,
        },
      ],
      exercise: {
        statement: 'Crea ProcesoFondo implements Runnable con run() -> print("Hilo secundario"). En main imprime "Hilo principal", crea Thread con ProcesoFondo y llama a .start().',
        initialCode: `// Clase ProcesoFondo aquí

public class Main {
    public static void main(String[] args) {
        // Main logic
    }
}`,
        solution: `class ProcesoFondo implements Runnable {
    @Override
    public void run() {
        System.out.println("Hilo secundario");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Hilo principal");
        Thread hilo = new Thread(new ProcesoFondo());
        hilo.start();
    }
}`,
        testCases: [{ id: 'tc-1', output: 'Hilo principal\nHilo secundario\n' }],
        hints: ['Thread hilo = new Thread(new ProcesoFondo()); hilo.start();'],
      },
      approvalCriteria: 'Implementar Runnable e invocar .start().',
      estimatedMinutes: 100,
      maxScore: 100,
    },
    {
      id: 'java-15',
      title: 'Proyecto Integrador: Sistema de Gestión Académica',
      level: 'Experto',
      objectives: ['Construir un gestor multimodular con composición de clases.'],
      theory: `### Proyecto Integrador Final
Integración de entidades modelo (Curso) y capa de servicios (GestorCursos).`,
      examples: [
        {
          title: 'Entidad y Servicio',
          code: `class Curso { String nombre; int matriculados; }`,
        },
      ],
      exercise: {
        statement: 'Crea Curso (private String nombre, private int matriculados, constructor y getters). Crea GestorCursos con List<Curso> listaCursos = new ArrayList<>(), agregarCurso(Curso c) e imprimirCursos() que imprima "Curso: [nombre] - [matriculados]". En main lee n, luego n entradas de nombre e int, agrega e imprime.',
        initialCode: `import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

// Implementa Curso y GestorCursos

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        // Integración
        
        sc.close();
    }
}`,
        solution: `import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

class Curso {
    private String nombre;
    private int matriculados;
    
    public Curso(String nombre, int matriculados) {
        this.nombre = nombre;
        this.matriculados = matriculados;
    }
    
    public String getNombre() { return nombre; }
    public int getMatriculados() { return matriculados; }
}

class GestorCursos {
    private List<Curso> listaCursos;
    
    public GestorCursos() {
        listaCursos = new ArrayList<>();
    }
    
    public void agregarCurso(Curso c) {
        listaCursos.add(c);
    }
    
    public void imprimirCursos() {
        for(Curso c : listaCursos) {
            System.out.println("Curso: " + c.getNombre() + " - " + c.getMatriculados());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        GestorCursos gestor = new GestorCursos();
        
        for(int i = 0; i < n; i++) {
            String nom = sc.next();
            int mat = sc.nextInt();
            gestor.agregarCurso(new Curso(nom, mat));
        }
        
        gestor.imprimirCursos();
        sc.close();
    }
}`,
        testCases: [
          { id: 'tc-1', input: '2\nBackend 30\nFrontend 25', output: 'Curso: Backend - 30\nCurso: Frontend - 25\n' },
          { id: 'tc-2', input: '1\nDevops 10', output: 'Curso: Devops - 10\n' },
          { id: 'tc-3', input: '0', output: '' },
        ],
        hints: ['gestor.agregarCurso(new Curso(nom, mat));'],
      },
      approvalCriteria: 'Modelado relacional con encapsulamiento estricto y listas.',
      estimatedMinutes: 180,
      maxScore: 500,
    },
  ],
};
