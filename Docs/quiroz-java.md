Quiroz Systems — Java
Descripción del curso: El curso "Quiroz Systems — Java" está diseñado para formar desarrolladores de software robustos bajo el paradigma de Programación Orientada a Objetos puro. Java es el pilar de los sistemas empresariales, aplicaciones Android y microservicios backend. Este curso abarca desde la sintaxis básica y tipado estricto, pasando por el dominio total de la POO, hasta características modernas del lenguaje como la API de Streams, expresiones Lambda y concurrencia.
Nivel objetivo: Cero absoluto a Experto. Prerequisitos: Ninguno. Disposición para entender la estructuración estricta y orientada a objetos. Duración estimada total: 50 horas.
Resultados de aprendizaje (Learning Outcomes):
Configurar el Java Development Kit (JDK) y comprender el funcionamiento de la Java Virtual Machine (JVM).
Dominar el tipado estricto, operadores y estructuras de control.
Diseñar e implementar arquitecturas completas basadas en Programación Orientada a Objetos (Herencia, Polimorfismo, Encapsulamiento, Abstracción).
Gestionar estructuras de datos dinámicas utilizando el Java Collections Framework.
Implementar programación funcional (Lambdas/Streams) y manejo de hilos (Concurrencia).
Construir un proyecto de software empresarial por consola aplicando todo el stack tecnológico.
Tabla de Contenido
Lección 1: Primer Programa y la JVM (Básico)
Lección 2: Variables y Tipos de Datos Primitivos (Básico)
Lección 3: Control de Flujo (If/Switch) (Básico)
Lección 4: Ciclos y Repetición (Básico)
Lección 5: Arreglos y Matrices (Intermedio)
Lección 6: Métodos y Sobrecarga (Intermedio)
Lección 7: Clases, Objetos y Atributos (Intermedio)
Lección 8: Constructores y Encapsulamiento (Intermedio)
Lección 9: Herencia y Polimorfismo (Avanzado)
Lección 10: Clases Abstractas e Interfaces (Avanzado)
Lección 11: Manejo de Excepciones (Avanzado)
Lección 12: Java Collections Framework (List, Map) (Avanzado)
Lección 13: Expresiones Lambda y API Streams (Experto)
Lección 14: Concurrencia básica y Threads (Experto)
Lección 15: Proyecto Integrador: Sistema de Gestión Académica (Experto)
Lección 1: Primer Programa y la JVM
1. ID de lección
java-01
2. Título
Primer Programa y la JVM
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar el concepto de "Write Once, Run Anywhere" facilitado por la JVM.
Estructurar la clase principal y el método main obligatorio en Java.
Implementar la salida estándar para imprimir en consola.
5. Contenido teórico
Conceptos: Java es un lenguaje compilado (a bytecode) e interpretado (por la Java Virtual Machine). Todo el código en Java debe vivir obligatoriamente dentro de una class. El punto de entrada de toda aplicación es el método public static void main(String[] args).
Sintaxis: System.out.println("Texto"); se utiliza para imprimir con salto de línea.
Buenas prácticas: El nombre del archivo .java debe coincidir exactamente con el nombre de la clase public que contiene (ej. Main.java contiene public class Main). Los nombres de las clases usan PascalCase.
Errores comunes: Olvidar el punto y coma (;). Confundir mayúsculas y minúsculas (Java es case-sensitive, system lanzará error, debe ser System).
6. Ejemplos de código comentados
Ejemplo 1: Estructura Básica
Java
// El nombre de la clase debe ser igual al nombre del archivo
public class Main {
    // Método principal: punto de entrada
    public static void main(String[] args) {
        System.out.println("¡Hola, Quiroz Systems!"); 
    }
}

Ejemplo 2: Print vs Println
Java
public class Main {
    public static void main(String[] args) {
        System.out.print("Cargando"); // No incluye salto de línea
        System.out.print("...");
        System.out.println("¡Listo!"); // Imprime y luego salta la línea
    }
}

7. Ejercicio práctico
Enunciado: Escribe un programa completo en Java (incluyendo la declaración de la clase Main y el método main). El programa debe imprimir exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "Java Nivel Cero" en la segunda línea. Código inicial:
Java
// Tu código aquí


Solución esperada:
Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bienvenido a Quiroz Systems");
        System.out.println("Java Nivel Cero");
    }
}

Casos de prueba:
Caso 1: Output esperado exacto: Bienvenido a Quiroz Systems\nJava Nivel Cero\n
Caso 2: Verificar sintaxis de la clase Main.
Caso 3: Validar la firma exacta del método main. Pistas progresivas:
Declara la clase: public class Main { ... }.
Dentro de la clase, escribe el método principal: public static void main(String[] args) { ... }.
Usa System.out.println() para cada una de las frases solicitadas.
8. Criterio de aprobación de la lección
La estructura de la clase y el método principal son correctos sintácticamente y generan las salidas exactas requeridas.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 2: Variables y Tipos de Datos Primitivos
1. ID de lección
java-02
2. Título
Variables y Tipos de Datos Primitivos
3. Nivel
Básico
4. Objetivos de aprendizaje
Declarar e inicializar variables fuertemente tipadas.
Diferenciar los tipos primitivos (int, double, boolean, char).
Utilizar la clase String (tipo de referencia nativo) para manejar texto.
5. Contenido teórico
Conceptos: Java es un lenguaje estático y fuertemente tipado; debes declarar el tipo de variable antes de su nombre.
Sintaxis: tipoDeDato nombreVariable = valor;
Buenas prácticas: Utilizar camelCase para nombres de variables. Evitar variables globales no necesarias. Terminar los números double opcionalmente con d y float obligatoriamente con f.
Errores comunes: Asignar texto a una variable declarada como entera (Type mismatch). Olvidar las comillas simples para char ('a') y usar comillas dobles (que son estrictamente para String "a").
6. Ejemplos de código comentados
Ejemplo 1: Tipos primitivos y String
Java
public class Main {
    public static void main(String[] args) {
        int edad = 23;
        double altura = 1.75;
        boolean esEstudiante = true;
        char inicial = 'R';
        
        // String no es primitivo, es una Clase, por eso inicia con mayúscula
        String nombre = "Rubén"; 
        
        System.out.println(nombre + " tiene " + edad + " años.");
    }
}

7. Ejercicio práctico
Enunciado: Declara una variable entera anioNacimiento con valor 2000 y una variable anioActual con valor 2026. Calcula la edad. Imprime "La edad es: X" (donde X es la edad). Código inicial:
Java
public class Main {
    public static void main(String[] args) {
        // Tu código aquí
    }
}

Solución esperada:
Java
public class Main {
    public static void main(String[] args) {
        int anioNacimiento = 2000;
        int anioActual = 2026;
        int edad = anioActual - anioNacimiento;
        System.out.println("La edad es: " + edad);
    }
}

Casos de prueba:
Caso 1: Output esperado exacto: La edad es: 26\n
Caso 2: Declaración explícita de variables tipo int.
Caso 3: Concatenación correcta usando el operador + en System.out.println. Pistas progresivas:
Declara las variables iniciando con la palabra int.
Realiza la resta: int edad = anioActual - anioNacimiento;.
Concatena el texto con la variable usando el signo +.
8. Criterio de aprobación de la lección
La variable se calcula dinámicamente y la concatenación con String se realiza sin errores de tipado.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 3: Control de Flujo (If/Switch)
1. ID de lección
java-03
2. Título
Control de Flujo (If/Switch)
3. Nivel
Básico
4. Objetivos de aprendizaje
Implementar la estructura if-else para lógica condicional.
Implementar la estructura switch para evaluaciones de casos.
Leer datos de la consola mediante la clase Scanner.
5. Contenido teórico
Conceptos: Las estructuras de control evalúan expresiones booleanas y desvían el flujo. Scanner es la clase del JDK (java.util.Scanner) utilizada para capturar entradas de usuario.
Sintaxis: if (condicion) { ... }. Instanciar Scanner: Scanner sc = new Scanner(System.in); int num = sc.nextInt();.
Buenas prácticas: Importar las clases del paquete java.util necesarias. Siempre cerrar el Scanner al finalizar su uso (sc.close();) para evitar fugas de memoria.
Errores comunes: Olvidar el bloque break; dentro de un switch, causando la ejecución de todos los casos siguientes (fall-through). Comparar Strings con == en vez de usar el método .equals().
6. Ejemplos de código comentados
Ejemplo 1: If-Else y Scanner
Java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int nota = scanner.nextInt();
        
        if (nota >= 90) {
            System.out.println("Excelente");
        } else {
            System.out.println("Necesita mejorar");
        }
        scanner.close();
    }
}

7. Ejercicio práctico
Enunciado: Usa la clase Scanner para leer un número entero (numero). Si el número es 0, imprime "Cero". Si es par, imprime "Par". Si es impar, imprime "Impar". Código inicial:
Java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Tu código aquí
        
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;

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
}

Casos de prueba:
Caso 1: Input: 0 | Output: Cero\n
Caso 2: Input: 4 | Output: Par\n
Caso 3: Input: -3 | Output: Impar\n Pistas progresivas:
Lee el número con int numero = sc.nextInt();.
Para evaluar si es par, usa el operador módulo % (numero % 2 == 0).
Empieza con el 0 primero en tu if, luego un else if para pares.
8. Criterio de aprobación de la lección
Lectura correcta desde la entrada estándar y evaluación condicional estricta.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 4: Ciclos y Repetición
1. ID de lección
java-04
2. Título
Ciclos y Repetición
3. Nivel
Básico
4. Objetivos de aprendizaje
Implementar bucles for para iteraciones definidas.
Implementar bucles while y do-while para iteraciones condicionales.
Utilizar sentencias break y continue para modificar el flujo.
5. Contenido teórico
Conceptos: Los ciclos iteran bloques de código. El for es ideal si conoces la cantidad exacta de repeticiones; while evalúa antes de entrar; do-while garantiza al menos una ejecución.
Sintaxis: for (int i = 0; i < límite; i++) { ... }
Buenas prácticas: Declarar la variable de control (int i = 0) dentro de la firma del for para limitar su alcance (scope) al bloque del ciclo.
Errores comunes: Poner un punto y coma justo después de los paréntesis del bucle for (int i=0; i<10; i++);, lo cual interrumpe el bloque de código (creando un ciclo vacío).
6. Ejemplos de código comentados
Ejemplo 1: Bucle For
Java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        // Output: 1 2 3 4 5 
    }
}

Ejemplo 2: Bucle While con break
Java
public class Main {
    public static void main(String[] args) {
        int contador = 0;
        while (true) { // Bucle aparentemente infinito
            if (contador == 3) {
                break; // Rompe la repetición
            }
            contador++;
        }
    }
}

7. Ejercicio práctico
Enunciado: Usa la clase Scanner para leer un número entero n. Usa un ciclo for para sumar todos los números desde 1 hasta n (incluido). Imprime el resultado total. Código inicial:
Java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int suma = 0;
        
        // Tu código de ciclo for aquí
        
        System.out.println(suma);
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;

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
}

Casos de prueba:
Caso 1: Input: 5 | Output: 15\n
Caso 2: Input: 1 | Output: 1\n
Caso 3: Input: 0 | Output: 0\n Pistas progresivas:
Tu bucle debe inicializarse en 1 (int i = 1).
La condición debe ser menor o igual a n (i <= n).
En el bloque del bucle suma: suma = suma + i; o suma += i;.
8. Criterio de aprobación de la lección
El código debe contener la estructura completa de iteración for y realizar la sumatoria correcta incluso para n=0.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 5: Arreglos y Matrices
1. ID de lección
java-05
2. Título
Arreglos y Matrices
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar e inicializar arreglos unidimensionales (Arrays).
Iterar arreglos usando el bucle enhanced for (for-each).
Declarar e interactuar con arreglos bidimensionales (Matrices).
5. Contenido teórico
Conceptos: Un array en Java es un objeto que contiene una cantidad estática de elementos del mismo tipo. El tamaño de un arreglo no puede cambiar tras su creación.
Sintaxis: int[] numeros = new int[5]; o int[] numeros = {1, 2, 3};.
Buenas prácticas: Preferir el bucle for-each cuando necesites leer todos los elementos secuencialmente sin requerir el número de índice actual.
Errores comunes: Intentar acceder a un índice fuera de los límites definidos lanza la excepción ArrayIndexOutOfBoundsException (ej. intentar leer el índice 5 en un arreglo de longitud 5).
6. Ejemplos de código comentados
Ejemplo 1: Declaración y bucle for-each
Java
public class Main {
    public static void main(String[] args) {
        String[] tecnologias = {"Java", "Spring", "MySQL"};
        
        // for-each: para cada 'tech' dentro de 'tecnologias'
        for (String tech : tecnologias) {
            System.out.println(tech);
        }
    }
}

7. Ejercicio práctico
Enunciado: Se te proporciona un código que lee el entero n y luego lee n valores, llenando un arreglo. Escribe el algoritmo para iterar el arreglo, encontrar el número mayor e imprimirlo. No uses librerías como Math.max ni utilidades de ordenamiento (ej. Arrays.sort). Código inicial:
Java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] datos = new int[n];
        for(int i = 0; i < n; i++) {
            datos[i] = sc.nextInt();
        }
        
        // Algoritmo para encontrar el mayor
        
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] datos = new int[n];
        for(int i = 0; i < n; i++) {
            datos[i] = sc.nextInt();
        }
        
        int mayor = datos[0];
        for (int num : datos) {
            if (num > mayor) {
                mayor = num;
            }
        }
        
        System.out.println(mayor);
        sc.close();
    }
}

Casos de prueba:
Caso 1: Input: 5 \n 1 5 3 9 2 | Output: 9\n
Caso 2: Input: 5 \n -1 -5 -2 -9 -3 | Output: -1\n
Caso 3: Validar la ausencia estricta de métodos de ordenamiento predefinidos. Pistas progresivas:
Crea una variable mayor inicializada con el primer elemento del arreglo (datos[0]).
Haz un ciclo for (tradicional o for-each) recorriendo el arreglo.
Si el elemento actual es mayor a mayor, reasigna la variable.
8. Criterio de aprobación de la lección
Búsqueda del elemento máximo por iteración pura manejando arreglos con límites precisos.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 6: Métodos y Sobrecarga
1. ID de lección
java-06
2. Título
Métodos y Sobrecarga
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar métodos encapsulando lógica reutilizable.
Explicar la firma del método y la declaración de retorno (void vs tipos).
Implementar la sobrecarga de métodos (Overloading).
5. Contenido teórico
Conceptos: Los métodos son bloques de código definidos dentro de una clase. La sobrecarga permite tener múltiples métodos con el mismo nombre pero diferente cantidad o tipo de parámetros.
Sintaxis: modificadorAcceso tipoRetorno nombre(parámetros) { ... }.
Buenas prácticas: Nombrar los métodos con verbos en infinitivo (camelCase). Mantener métodos cortos respetando el Principio de Responsabilidad Única.
Errores comunes: Definir un tipo de retorno en la firma del método (ej. int) y olvidar incluir la sentencia return dentro del método.
6. Ejemplos de código comentados
Ejemplo 1: Creación de Método y Sobrecarga
Java
public class Main {
    
    // Método que no retorna valor
    public static void saludar(String nombre) {
        System.out.println("Hola " + nombre);
    }
    
    // Método que retorna un entero
    public static int sumar(int a, int b) {
        return a + b;
    }
    
    // Sobrecarga del método sumar (mismo nombre, distintos parámetros)
    public static double sumar(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        saludar("Quiroz");
        System.out.println(sumar(5, 10));     // Llama al de int
        System.out.println(sumar(3.5, 2.5));  // Llama al de double
    }
}

7. Ejercicio práctico
Enunciado: En la clase Main, crea un método esMayorDeEdad(int edad) estático, que reciba un entero y retorne un boolean (true si es >= 18). Llama a este método en el main pasando una edad leída por teclado. Imprime "Permitido" o "Denegado". Código inicial:
Java
import java.util.Scanner;

public class Main {
    
    // Define el método esMayorDeEdad aquí

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int edad = sc.nextInt();
        
        // Condicional llamando a la función
        
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;

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
}

Casos de prueba:
Caso 1: Input: 20 | Output: Permitido\n
Caso 2: Input: 17 | Output: Denegado\n
Caso 3: Validar la existencia del método esMayorDeEdad retornando tipo primitivo booleano. Pistas progresivas:
El método requiere modificadores public static boolean esMayorDeEdad(int edad).
Para el retorno, simplemente usa return edad >= 18;.
Úsalo dentro del main como la condición de tu if.
8. Criterio de aprobación de la lección
La lógica se delega y ejecuta exitosamente a través de un método estático externo al main.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 7: Clases, Objetos y Atributos
1. ID de lección
java-07
2. Título
Clases, Objetos y Atributos
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Diferenciar entre una Clase (plantilla) y un Objeto (instancia).
Definir atributos dentro de una clase personalizada.
Instanciar objetos utilizando la palabra reservada new.
5. Contenido teórico
Conceptos: En POO, todo modela el mundo real. Una Clase define las características, y el Objeto es la creación física en memoria (Heap) de dicha clase.
Sintaxis: Clase obj = new Clase();
Buenas prácticas: Por el momento, declarar múltiples clases en el mismo archivo es posible si solo una es public, pero en proyectos reales cada clase pública va en su propio archivo .java.
Errores comunes: Intentar acceder a un objeto que no fue inicializado con new lanza NullPointerException.
6. Ejemplos de código comentados
Ejemplo 1: Crear e instanciar
Java
// Clase sin modificador public para estar en el mismo archivo
class Mascota {
    String nombre;
    int edad;
    
    void hacerSonido() {
        System.out.println(nombre + " hace ruido.");
    }
}

public class Main {
    public static void main(String[] args) {
        // Instanciación
        Mascota miPerro = new Mascota();
        
        // Accediendo a los atributos
        miPerro.nombre = "Rex";
        miPerro.edad = 3;
        
        miPerro.hacerSonido();
    }
}

7. Ejercicio práctico
Enunciado: Crea una clase externa (en el mismo archivo) llamada Rectangulo con dos atributos de tipo int: ancho y alto. Añade un método getArea() que retorne la multiplicación de ambos atributos. En el main, lee dos números enteros, instancia la clase Rectangulo, asígnale los números a sus atributos, y finalmente imprime su área. Código inicial:
Java
import java.util.Scanner;

// Clase Rectangulo aquí

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int h = sc.nextInt();
        
        // Instancia, asignación e impresión
        
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;

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
}

Casos de prueba:
Caso 1: Input: 5 \n 10 | Output: 50\n
Caso 2: Input: 3 \n 3 | Output: 9\n
Caso 3: Validar la declaración de la clase y de la palabra new. Pistas progresivas:
Declara la clase class Rectangulo fuera del Main. Añade int ancho; int alto;.
Crea el método interno: int getArea() { return ancho * alto; }.
En el main usa Rectangulo r = new Rectangulo();, llena los atributos y llama a r.getArea().
8. Criterio de aprobación de la lección
Instanciación y uso correcto del estado de los objetos a través de métodos de instancia.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 8: Constructores y Encapsulamiento
1. ID de lección
java-08
2. Título
Constructores y Encapsulamiento
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Implementar modificadores de acceso (private, public, protected).
Diseñar constructores personalizados para inicializar estado de forma segura.
Exponer estado internamente encapsulado a través de Getters y Setters.
5. Contenido teórico
Conceptos: El encapsulamiento es el pilar que protege los datos internos de manipulaciones externas accidentales. Los atributos deben ser privados. Los constructores preparan el objeto en el momento de creación (new).
Sintaxis: public NombreClase(parametros) { ... }.
Buenas prácticas: Utilizar la palabra reservada this para diferenciar el atributo de clase de la variable del parámetro en el constructor y setters. No crear un setter si el valor de un atributo jamás debería cambiar.
Errores comunes: Declarar un tipo de retorno en el constructor (ej. public void MiClase()), lo que Java interpretará erróneamente como un método normal y no como un constructor.
6. Ejemplos de código comentados
Ejemplo 1: Clase encapsulada
Java
class CuentaBancaria {
    // Atributo protegido, inaccesible directamente
    private double saldo;

    // Constructor
    public CuentaBancaria(double saldoInicial) {
        this.saldo = saldoInicial;
    }

    // Getter para solo lectura
    public double getSaldo() {
        return this.saldo;
    }

    // Método de negocio (más seguro que un Setter ciego)
    public void depositar(double monto) {
        if (monto > 0) {
            this.saldo += monto;
        }
    }
}

7. Ejercicio práctico
Enunciado: Refactoriza la clase Rectangulo. Haz que sus atributos ancho y alto sean private. Crea un constructor public Rectangulo(int ancho, int alto) para inicializarlos. Crea un método público getArea() y los Getters respectivos (ej. getAncho()). En el main, instancia con los dos enteros leídos y llama a getArea(). Código inicial:
Java
import java.util.Scanner;

// Tu clase Rectangulo fuertemente encapsulada aquí

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int h = sc.nextInt();
        
        // Instancia pasándole argumentos al constructor y llama a getArea
        
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;

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
}

Casos de prueba:
Caso 1: Input: 5 \n 10 | Output: 50\n
Caso 2: Input: 3 \n 3 | Output: 9\n
Caso 3: Validar la presencia explícita del modificador private y this. Pistas progresivas:
Declara private int ancho; private int alto;.
El constructor es public Rectangulo(int ancho, int alto) { this.ancho = ancho; ... }.
Ahora la instanciación es new Rectangulo(a, h); pasando los parámetros entre los paréntesis.
8. Criterio de aprobación de la lección
Definir los atributos como privados e inyectarlos exclusivamente a través de la firma del constructor, aplicando el encapsulamiento.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 9: Herencia y Polimorfismo
1. ID de lección
java-09
2. Título
Herencia y Polimorfismo
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Implementar jerarquías extendiendo clases base con extends.
Sobrescribir (override) métodos del padre en la clase hija usando @Override.
Ejecutar polimorfismo instanciando objetos hijos bajo referencias de clases padre.
5. Contenido teórico
Conceptos: La herencia transmite atributos y métodos ("es-un"). El polimorfismo permite que objetos hijos se comporten distinto a la misma instrucción (Late Binding).
Sintaxis: class Hija extends Padre { ... }.
Buenas prácticas: Utilizar la anotación @Override siempre que sobrescribas. Si el constructor del padre requiere argumentos, el hijo debe llamar a super(args) explícitamente en la primera línea de su constructor.
Errores comunes: Omitir la llamada a super() en hijos cuyas clases padre no tienen constructores por defecto sin parámetros.
6. Ejemplos de código comentados
Ejemplo 1: Herencia y Override
Java
class SistemaBase {
    public void arrancar() {
        System.out.println("Arrancando sistema");
    }
}

// Extiende la clase Base
class SistemaServidor extends SistemaBase {
    
    // Sobrescritura de comportamiento
    @Override
    public void arrancar() {
        System.out.println("Arrancando servidor con servicios de red");
    }
}

public class Main {
    public static void main(String[] args) {
        // Polimorfismo: Referencia tipo Base apuntando a objeto Hijo
        SistemaBase sys = new SistemaServidor();
        sys.arrancar(); // Llama al método del hijo
    }
}

7. Ejercicio práctico
Enunciado: Crea una clase Empleado con un método trabajar() que imprima "Trabajo Base". Crea una clase Ingeniero que extends Empleado y sobrescriba trabajar() para imprimir "Trabajo en Codigo". En el main, crea un objeto de tipo Ingeniero, guardado en una variable de tipo Empleado. Llama al método trabajar(). Código inicial:
Java
// Clases aquí

public class Main {
    public static void main(String[] args) {
        // Polimorfismo aquí
    }
}

Solución esperada:
Java
class Empleado {
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
}

Casos de prueba:
Caso 1: Output esperado exacto: Trabajo en Codigo\n
Caso 2: Verificar sintaxis extends y la anotación @Override.
Caso 3: Validar la instanciación polimórfica Empleado emp = new Ingeniero();. Pistas progresivas:
class Ingeniero extends Empleado { ... }.
Para sobrescribir, escribe el método con la misma firma exacta y coloca @Override en la línea anterior.
El main es tan sencillo como instanciar la clase hija.
8. Criterio de aprobación de la lección
La aplicación de la resolución de métodos dinámica (polimorfismo) se debe llevar a cabo heredando clases apropiadamente y sobrescribiéndolas.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 10: Clases Abstractas e Interfaces
1. ID de lección
java-10
2. Título
Clases Abstractas e Interfaces
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Definir clases abstractas que prevengan su instanciación directa.
Implementar Contratos de código a través de Interfaces.
Diferenciar el caso de uso entre extends e implements.
5. Contenido teórico
Conceptos: Una clase abstracta puede tener métodos normales y métodos abstractos (sin cuerpo), forzando a los hijos a implementarlos. Una interfaz define un "contrato" de métodos puramente abstractos (hasta Java 8, que introdujo métodos default).
Sintaxis: abstract class Animal y interface Volador { void volar(); }.
Buenas prácticas: Las Interfaces solucionan la carencia de herencia múltiple en Java; una clase puede implementar múltiples interfaces (class Pajaro implements Volador, Cantador). Programar siempre apuntando a Interfaces.
Errores comunes: Intentar instanciar directamente una Interfaz o Clase Abstracta con la instrucción new causará error de compilación (sólo se pueden instanciar sus clases concretas).
6. Ejemplos de código comentados
Ejemplo 1: Interfaz y clase concreta
Java
// Define el contrato
interface Ejecutable {
    void ejecutar();
}

// Cumple el contrato
class Tarea implements Ejecutable {
    @Override
    public void ejecutar() {
        System.out.println("Procesando tarea en background.");
    }
}

public class Main {
    public static void main(String[] args) {
        Ejecutable miTarea = new Tarea();
        miTarea.ejecutar();
    }
}

7. Ejercicio práctico
Enunciado: Crea una interface Conectable con el método abstracto void conectar();. Crea una clase BaseDatos que implemente la interfaz, y sobrescriba el método imprimiendo "Conexión MySQL Exitosa". En el main, instancia la clase utilizando una referencia del tipo interfaz y llama al método. Código inicial:
Java
// Interfaz y Clase

public class Main {
    public static void main(String[] args) {
        // Implementación
    }
}

Solución esperada:
Java
interface Conectable {
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
}

Casos de prueba:
Caso 1: Output esperado exacto: Conexión MySQL Exitosa\n
Caso 2: Verificar sintaxis de creación de interface y la palabra reservada implements.
Caso 3: Instanciar como Conectable db = new BaseDatos();. Pistas progresivas:
Declara la interfaz: interface Conectable { void conectar(); } (el cuerpo de método queda vacío, no lleva llaves).
Para que la clase la adopte usa: class BaseDatos implements Conectable.
En la clase concreta añade el cuerpo del método agregando public: public void conectar() { ... }.
8. Criterio de aprobación de la lección
La interfaz no debe tener cuerpo de método (implementación), forzando correctamente el contrato a la clase que la implementa.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 11: Manejo de Excepciones
1. ID de lección
java-11
2. Título
Manejo de Excepciones
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Capturar y procesar excepciones con try, catch y finally.
Diferenciar entre Excepciones Chequeadas (Checked) y No Chequeadas (Unchecked/Runtime).
Lanzar excepciones manuales mediante la sentencia throw.
5. Contenido teórico
Conceptos: Las excepciones interrumpen el flujo ante errores. Las Excepciones Unchecked (RuntimeException) no obligan a ser capturadas por el compilador, mientras que las Checked (Exception) sí lo exigen (como IOException).
Sintaxis: try { ... } catch (Exception e) { ... } y firmas con throws Exception.
Buenas prácticas: Capturar excepciones específicas (ej. ArithmeticException) antes que Exception genérico. Utilizar el bloque finally para cerrar recursos (archivos, sockets).
Errores comunes: Silenciar errores, es decir, dejar un bloque catch vacío catch(Exception e) {}, impidiendo el rastreo de fallos en el sistema.
6. Ejemplos de código comentados
Ejemplo 1: Try / Catch Básico
Java
public class Main {
    public static void main(String[] args) {
        try {
            int resultado = 10 / 0; // Provocará ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Error matemático: " + e.getMessage());
        } finally {
            System.out.println("Bloque de limpieza.");
        }
    }
}

7. Ejercicio práctico
Enunciado: Solicita al usuario dos enteros (código inicial provisto). Intenta dividirlos. Si se genera error por división por cero (ArithmeticException), imprime "ErrorDivZero". Si no hay error, imprime el resultado entero de la división. Código inicial:
Java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        
        // Aplica try-catch aquí
        
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;

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
}

Casos de prueba:
Caso 1: Input: 10 \n 2 | Output: 5\n
Caso 2: Input: 5 \n 0 | Output: ErrorDivZero\n
Caso 3: Validación sintáctica de bloques try y catch. Pistas progresivas:
Coloca int resultado = a / b; System.out.println(resultado); dentro del bloque try.
El catch debe atrapar ArithmeticException e.
Dentro del bloque catch imprime el string exacto pedido "ErrorDivZero".
8. Criterio de aprobación de la lección
La excepción debe ser atrapada a nivel de Runtime impidiendo la terminación abrupta (crash) del programa.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 12: Java Collections Framework (List, Map)
1. ID de lección
java-12
2. Título
Java Collections Framework (List, Map)
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Reemplazar arreglos estáticos con Colecciones dinámicas.
Implementar ArrayList para almacenamiento y lectura de secuencias.
Implementar HashMap para almacenamiento en formato clave-valor.
5. Contenido teórico
Conceptos: Las Colecciones superan a los arreglos al permitir mutar el tamaño dinámicamente e incluir métodos enriquecidos. Utilizan genéricos (<T>) indicando el tipo de objetos almacenados (no soportan tipos primitivos crudos, requieren envoltorios como Integer).
Sintaxis: List<String> lista = new ArrayList<>();, Map<String, Integer> mapa = new HashMap<>();.
Buenas prácticas: Declarar la variable instanciando la interfaz base (List) e implementando la clase concreta (ArrayList), facilitando el polimorfismo.
Errores comunes: Intentar instanciar con genéricos primitivos (List<int>), en lugar de su wrapper object (List<Integer>).
6. Ejemplos de código comentados
Ejemplo 1: Lista Dinámica
Java
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        List<String> frameworkList = new ArrayList<>();
        frameworkList.add("Spring Boot");
        frameworkList.add("Hibernate");
        
        System.out.println(frameworkList.size()); // 2
        System.out.println(frameworkList.get(0)); // Spring Boot
    }
}

7. Ejercicio práctico
Enunciado: Crea un ArrayList de Integer. Lee un número n con Scanner. Luego lee n valores, y solo aquellos mayores que cero deberás agregarlos a la lista. Al finalizar, itera la lista completa con un for-each e imprime cada número, seguido de un espacio. (Usa System.out.print(num + " ");). Código inicial:
Java
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Tu código de listas aquí
        
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;
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
}

Casos de prueba:
Caso 1: Input: 5 \n -1 5 -3 9 0 | Output: 5 9 \n
Caso 2: Input: 3 \n -5 -10 -2 | Output: \n
Caso 3: Validar la instanciación de un ArrayList en vez de un arreglo estático. Pistas progresivas:
Declara: List<Integer> lista = new ArrayList<>();
En tu ciclo para leer usa una variable temporal int valor = sc.nextInt();.
Condiciona la agregación: if(valor > 0) lista.add(valor);.
8. Criterio de aprobación de la lección
La estructura Collection dinámica List<Integer> debe manipularse e imprimirse sin salir de límites, filtrando correctamente.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 13: Expresiones Lambda y API Streams
1. ID de lección
java-13
2. Título
Expresiones Lambda y API Streams
3. Nivel
Experto
4. Objetivos de aprendizaje
Implementar expresiones lambda para pasar comportamiento como argumento.
Reemplazar bucles tradicionales por la API de Streams.
Encadenar operaciones funcionales puras (filter, map, forEach).
5. Contenido teórico
Conceptos: Introducido en Java 8, permite un acercamiento a la programación declarativa funcional. Un Stream envuelve colecciones y permite operaciones matemáticas y lógicas (pipeline) sin modificar la original.
Sintaxis: Lambdas: (param) -> operacion. Streams: lista.stream().filter(condicion).forEach(impresion);.
Buenas prácticas: Streams puros. No generar efectos secundarios (side-effects) desde dentro de una lambda que modifiquen variables de estado fuera de ella.
Errores comunes: Olvidar la operación "terminal" de un Stream (como .collect o .forEach). Los Streams intermedios (como .filter) no se ejecutan solos (lazy evaluation).
6. Ejemplos de código comentados
Ejemplo 1: Stream.filter()
Java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> nombres = Arrays.asList("Rubén", "Víctor", "Eduardo");
        
        // Iteración tradicional vs Funcional
        nombres.stream()
               .filter(n -> n.startsWith("R"))
               .forEach(n -> System.out.println("Encontrado: " + n));
    }
}

7. Ejercicio práctico
Enunciado: Tienes una List<Integer> predefinida en el código. Genera un Stream de dicha lista, usa .filter() con una Lambda para obtener solo los números impares, usa .map() para duplicar sus valores (* 2), y finalmente imprime cada uno con .forEach(). Código inicial:
Java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> datos = Arrays.asList(1, 2, 3, 4, 5);
        
        // Implementa tu cadena funcional de Stream aquí
        
    }
}

Solución esperada:
Java
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> datos = Arrays.asList(1, 2, 3, 4, 5);
        
        datos.stream()
             .filter(n -> n % 2 != 0)
             .map(n -> n * 2)
             .forEach(System.out::println);
    }
}

Casos de prueba:
Caso 1: Output esperado exacto: 2\n6\n10\n
Caso 2: Verificar sintaxis .filter y ->.
Caso 3: Validar la presencia explícita de .map(. Pistas progresivas:
Inicia con datos.stream().
Para filtrar impares: .filter(n -> n % 2 != 0).
Para transformar: .map(n -> n * 2). Para imprimir: .forEach(n -> System.out.println(n));.
8. Criterio de aprobación de la lección
Uso y encadenamiento exclusivo de funciones puras sobre colecciones mediante la API nativa de Streams sin crear bucles for.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 14: Concurrencia básica y Threads
1. ID de lección
java-14
2. Título
Concurrencia básica y Threads
3. Nivel
Experto
4. Objetivos de aprendizaje
Diferenciar procesos e hilos (Threads).
Crear hilos de trabajo implementando la interfaz Runnable.
Gestionar la ejecución independiente del hilo principal (main).
5. Contenido teórico
Conceptos: Java fue diseñado multihilo desde su concepción. Ejecutar hilos permite tareas paralelas (ej. descargar archivos mientras la UI sigue respondiendo).
Sintaxis: Thread t = new Thread(new MiRunnable()); t.start();
Buenas prácticas: Preferir implementar Runnable a extender la clase Thread, porque implementando dejas la jerarquía abierta para otras clases padres, y es más modular (separación de tarea del hilo ejecutor).
Errores comunes: Llamar al método run() en lugar de start(). Si llamas a run(), el código se ejecutará secuencialmente en el mismo hilo, no asíncronamente.
6. Ejemplos de código comentados
Ejemplo 1: Implementando Runnable
Java
class Descarga implements Runnable {
    @Override
    public void run() {
        System.out.println("Proceso de descarga en segundo plano.");
    }
}

public class Main {
    public static void main(String[] args) {
        // Tarea asíncrona
        Thread hilo = new Thread(new Descarga());
        hilo.start(); // Fundamental, arranca el SO
        
        System.out.println("Hilo principal terminando");
    }
}

7. Ejercicio práctico
Enunciado: Crea una clase ProcesoFondo que implemente la interfaz Runnable y cuyo método run() simplemente imprima "Hilo secundario". En tu método main, imprime "Hilo principal", luego instancia el ProcesoFondo, dáselo a un nuevo objeto Thread, y llama al método necesario para iniciarlo. Código inicial:
Java
// Clase ProcesoFondo aquí

public class Main {
    public static void main(String[] args) {
        // Main logic
    }
}

Solución esperada:
Java
class ProcesoFondo implements Runnable {
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
}

Casos de prueba:
Caso 1: Output esperado puede ser concurrente, requiriéndose las presencias de: Hilo principal e Hilo secundario.
Caso 2: Verificar sintaxis implements Runnable.
Caso 3: Validar la presencia estricta de .start(). Pistas progresivas:
Declara class ProcesoFondo implements Runnable { public void run() { ... } }.
En el main: System.out.println("Hilo principal");.
Envuelve el Runnable en un Thread y arráncalo: Thread t = new Thread(new ProcesoFondo()); t.start();.
8. Criterio de aprobación de la lección
Creación e invocación correcta de hilos independientes del flujo de ejecución nativo.
9. Tiempo estimado de la lección
100 minutos
10. Puntaje máximo de la lección
100 pts
Lección 15: Proyecto Integrador: Sistema de Gestión Académica
1. ID de lección
java-15
2. Título
Proyecto Integrador: Sistema de Gestión Académica
3. Nivel
Experto
4. Objetivos de aprendizaje
Integrar POO de clases, Encapsulamiento, Colecciones y control de flujo en un programa cohesionado.
Diseñar la lógica del negocio mediante entidades.
Implementar un sistema de registro interconectado.
5. Contenido teórico
Conceptos: Un proyecto backend robusto consolida los fundamentos del lenguaje en módulos, combinando estado de instancias encapsuladas con contenedores (Listas) que modelan un modelo relacional de forma orientada a objetos.
Sintaxis: Integración de List, Iterator, class, Constructores, y bucle For-each.
Buenas prácticas: Utilizar clases modelo (Model/Entity) separadas del Manager/Service (la clase que contiene las listas). Mantener el método Main con tan poco código de procesamiento lógico como sea posible.
Errores comunes: Violación de encapsulamiento utilizando atributos públicos para acceder directamente a la información dentro del array principal.
6. Ejemplos de código comentados
(Estructura mental sugerida)
Java
class Estudiante {
    private String id;
    public Estudiante(String i) { id = i; }
}
class Sistema {
    private List<Estudiante> alumnos = new ArrayList<>();
    public void add(Estudiante e) { alumnos.add(e); }
}

7. Ejercicio práctico
Enunciado: Construye un mini-sistema. Crea una clase Curso encapsulada (atributos private String nombre, private int matriculados, crear un Constructor, y sus respectivos Getters). Crea la clase GestorCursos que albergue internamente un List<Curso> listaCursos = new ArrayList<>();. Incluye un método void agregarCurso(Curso c) y un método void imprimirCursos() que lo itere imprimiendo "Curso: [nombre] - [matriculados]". En la función main: Lee el entero n (cantidad de cursos). Luego para cada vuelta, lee el nombre (string) y el valor de matriculados (int). Agrega, y por último imprime todos los cursos con el método del gestor. Código inicial:
Java
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

// Implementa Curso y GestorCursos

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        // Integración de sistema
        
        sc.close();
    }
}

Solución esperada:
Java
import java.util.Scanner;
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
}

Casos de prueba:
Caso 1: Input: 2 \n Backend 30 \n Frontend 25 | Output: Curso: Backend - 30\nCurso: Frontend - 25\n
Caso 2: Input: 1 \n Devops 10 | Output: Curso: Devops - 10\n
Caso 3: Input: 0 | Output: \n (Nada, se procesa n = 0) Pistas progresivas:
Diseña la clase Entidad: class Curso con sus atributos privados, su constructor y sus metódos Getters para que puedan leerse luego.
Diseña la clase Manager: class GestorCursos contiene el ArrayList. Iterar llamando c.getNombre().
El input lo haces con un bucle for repitiendo sc.next() para el string y sc.nextInt() para el int. Inmediatamente agregas la nueva instancia al gestor.
8. Criterio de aprobación de la lección
La aplicación ensambla todo el modelo del mundo real con relaciones de composición, respetando visibilidad de variables (private/public).
9. Tiempo estimado de la lección
180 minutos
10. Puntaje máximo de la lección
500 pts

