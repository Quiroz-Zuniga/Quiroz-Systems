import { Course } from '../../types';

export const rustCourse: Course = {
  id: 'rust',
  title: 'Quiroz Systems — Rust',
  languageName: 'Rust',
  monacoLanguage: 'rust',
  description: 'Programación de sistemas con seguridad de memoria sin Garbage Collector: Ownership, Borrowing, Lifetimes, Traits y Concurrencia.',
  levelRange: 'Básico → Experto',
  estimatedHours: 55,
  iconName: 'ShieldCheck',
  color: 'from-orange-700 to-amber-800',
  lessons: [
    {
      id: 'rs-01',
      title: 'Primer Programa, Cargo y Macros',
      level: 'Básico',
      objectives: ['Implementar la macro println! para salida en consola.'],
      theory: `### Conceptos
Rust es compilado Ahead-of-Time. Las macros se distinguen por el signo \`!\`.`,
      examples: [
        {
          title: 'println!',
          code: `fn main() {
    println!("¡Hola, Quiroz Systems!");
}`,
        },
      ],
      exercise: {
        statement: 'Escribe el programa fn main() en Rust. Imprime exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "Rust Nivel Cero" en la segunda con println!.',
        initialCode: `// Tu código aquí
`,
        solution: `fn main() {
    println!("Bienvenido a Quiroz Systems");
    println!("Rust Nivel Cero");
}`,
        testCases: [
          { id: 'tc-1', output: 'Bienvenido a Quiroz Systems\nRust Nivel Cero\n' },
        ],
        hints: ['fn main() { ... }', 'println!("...");'],
      },
      approvalCriteria: 'Macro println! con salida exacta.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'rs-02',
      title: 'Variables, Mutabilidad y Tipos de Datos',
      level: 'Básico',
      objectives: ['Declarar variables inmutables por defecto y mutables con mut.'],
      theory: `### Conceptos
Las variables en Rust son inmutables por defecto. Se usa \`mut\` para mutabilidad.`,
      examples: [
        {
          title: 'let mut',
          code: `fn main() {
    let mut x = 5;
    x = 10;
}`,
        },
      ],
      exercise: {
        statement: 'Declara anio_nacimiento = 2000 e anio_actual = 2026 inmutables. Calcula la edad. Imprime "La edad es: {}" pasando edad a println!.',
        initialCode: `fn main() {
    // Tu código aquí
}`,
        solution: `fn main() {
    let anio_nacimiento = 2000;
    let anio_actual = 2026;
    let edad = anio_actual - anio_nacimiento;
    println!("La edad es: {}", edad);
}`,
        testCases: [{ id: 'tc-1', output: 'La edad es: 26\n' }],
        hints: ['let edad = anio_actual - anio_nacimiento;', 'println!("La edad es: {}", edad);'],
      },
      approvalCriteria: 'Inmutabilidad preservada e interpolación con {}.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'rs-03',
      title: 'Control de Flujo',
      level: 'Básico',
      objectives: ['Sentencias if, else if, else sin paréntesis.'],
      theory: `### Conceptos
Evaluación con \`if condicion { }\`. No requiere paréntesis.`,
      examples: [
        {
          title: 'If',
          code: `fn main() {
    if 5 > 3 { println!("Mayor"); }
}`,
        },
      ],
      exercise: {
        statement: 'Con numero = 4, si numero == 0 imprime "Cero". Si numero % 2 == 0 "Par". Si no "Impar".',
        initialCode: `fn main() {
    let numero = 4;
    
    // Tu código aquí
}`,
        solution: `fn main() {
    let numero = 4;
    
    if numero == 0 {
        println!("Cero");
    } else if numero % 2 == 0 {
        println!("Par");
    } else {
        println!("Impar");
    }
}`,
        testCases: [{ id: 'tc-1', output: 'Par\n' }],
        hints: ['if numero == 0 { ... }'],
      },
      approvalCriteria: 'Evaluación condicional estricta en Rust.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'rs-04',
      title: 'Ownership (Propiedad): El Corazón de Rust',
      level: 'Intermedio',
      objectives: ['Reglas de Ownership y clonado explícito con .clone().'],
      theory: `### Conceptos
Un solo dueño a la vez. Movimiento (Move) vs Clonado (\`.clone()\`).`,
      examples: [
        {
          title: 'Clone',
          code: `let s1 = String::from("Hola");
let s2 = s1.clone();`,
        },
      ],
      exercise: {
        statement: 'Crea cadena1 = String::from("Quiroz"). Crea cadena2 clonando cadena1 con .clone(). Imprime ambas en una sola línea separadas por espacio.',
        initialCode: `fn main() {
    // Tu código aquí
}`,
        solution: `fn main() {
    let cadena1 = String::from("Quiroz");
    let cadena2 = cadena1.clone();
    
    println!("{} {}", cadena1, cadena2);
}`,
        testCases: [{ id: 'tc-1', output: 'Quiroz Quiroz\n' }],
        hints: ['let cadena2 = cadena1.clone();'],
      },
      approvalCriteria: 'Uso de .clone() para prevenir movimiento de ownership.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'rs-05',
      title: 'Referencias y Borrowing',
      level: 'Intermedio',
      objectives: ['Referencias mutables con &mut.'],
      theory: `### Conceptos
Borrowing: referencias inmutables \`&\` o una sola referencia mutable \`&mut\`.`,
      examples: [
        {
          title: 'Borrowing',
          code: `fn mod_str(s: &mut String) { s.push_str("!"); }`,
        },
      ],
      exercise: {
        statement: 'Declara let mut mensaje = String::from("Prueba");. Crea modificar_mensaje(texto: &mut String) que le agregue " OK" con .push_str(). Llama e imprime.',
        initialCode: `// Define modificar_mensaje aquí

fn main() {
    // Lógica aquí
}`,
        solution: `fn modificar_mensaje(texto: &mut String) {
    texto.push_str(" OK");
}

fn main() {
    let mut mensaje = String::from("Prueba");
    modificar_mensaje(&mut mensaje);
    println!("{}", mensaje);
}`,
        testCases: [{ id: 'tc-1', output: 'Prueba OK\n' }],
        hints: ['fn modificar_mensaje(texto: &mut String)', 'modificar_mensaje(&mut mensaje);'],
      },
      approvalCriteria: 'Préstamo mutable con &mut.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'rs-06',
      title: 'Structs y Métodos',
      level: 'Intermedio',
      objectives: ['Structs y bloque impl con receptor &self.'],
      theory: `### Conceptos
Estructuras con \`struct\` y métodos en bloque \`impl\`. Receptor \`&self\`.`,
      examples: [
        {
          title: 'Struct impl',
          code: `struct Punto { x: i32 }
impl Punto { fn get_x(&self) -> i32 { self.x } }`,
        },
      ],
      exercise: {
        statement: 'Crea struct Circulo { radio: f64 }. Bloque impl Circulo con area(&self) -> f64 que devuelva 3.14 * self.radio * self.radio. Instancia radio 10.0 e imprime "Area: X".',
        initialCode: `// Struct e impl aquí

fn main() {
    // Prueba
}`,
        solution: `struct Circulo {
    radio: f64,
}

impl Circulo {
    fn area(&self) -> f64 {
        3.14 * self.radio * self.radio
    }
}

fn main() {
    let c = Circulo { radio: 10.0 };
    println!("Area: {}", c.area());
}`,
        testCases: [{ id: 'tc-1', output: 'Area: 314\n' }],
        hints: ['impl Circulo { fn area(&self) -> f64 { 3.14 * self.radio * self.radio } }'],
      },
      approvalCriteria: 'Definición de struct e impl con &self.',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'rs-07',
      title: 'Enums y Pattern Matching',
      level: 'Intermedio',
      objectives: ['Match exhaustivo sobre enums.'],
      theory: `### Conceptos
Enumeradores \`enum\` y coincidencia de patrones con \`match\`.`,
      examples: [
        {
          title: 'Match Enum',
          code: `enum Op { A, B }
match op { Op::A => "A", Op::B => "B" }`,
        },
      ],
      exercise: {
        statement: 'Crea enum Semaforo { Rojo, Amarillo, Verde }. Función accion_semaforo(estado: Semaforo) -> &\'static str con match. Rojo->"Detener", Amarillo->"Precaucion", Verde->"Avanzar". Imprime con Rojo.',
        initialCode: `// Enum y función

fn main() {
    // Prueba
}`,
        solution: `enum Semaforo {
    Rojo,
    Amarillo,
    Verde,
}

fn accion_semaforo(estado: Semaforo) -> &'static str {
    match estado {
        Semaforo::Rojo => "Detener",
        Semaforo::Amarillo => "Precaucion",
        Semaforo::Verde => "Avanzar",
    }
}

fn main() {
    let estado = Semaforo::Rojo;
    println!("{}", accion_semaforo(estado));
}`,
        testCases: [{ id: 'tc-1', output: 'Detener\n' }],
        hints: ['Semaforo::Rojo => "Detener",'],
      },
      approvalCriteria: 'Evaluación exhaustiva de enums con match.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'rs-08',
      title: 'Manejo de Errores I: Option y Ausencia de Nulos',
      level: 'Intermedio',
      objectives: ['Uso del enum Option<T> con Some y None.'],
      theory: `### Conceptos
Ausencia de nulos mediante \`Option<T>\` (\`Some(val)\` o \`None\`).`,
      examples: [
        {
          title: 'Option',
          code: `let x: Option<i32> = Some(5);`,
        },
      ],
      exercise: {
        statement: 'Crea division_segura(dividendo: f64, divisor: f64) -> Option<f64>. Si divisor es 0.0 retorna None, de lo contrario Some(dividendo / divisor). Llama con 10.0 y 0.0 y maneja con match.',
        initialCode: `// Implementa division_segura

fn main() {
    // Match
}`,
        solution: `fn division_segura(dividendo: f64, divisor: f64) -> Option<f64> {
    if divisor == 0.0 {
        None
    } else {
        Some(dividendo / divisor)
    }
}

fn main() {
    match division_segura(10.0, 0.0) {
        Some(resultado) => println!("{}", resultado),
        None => println!("Infinito"),
    }
}`,
        testCases: [{ id: 'tc-1', output: 'Infinito\n' }],
        hints: ['Some(dividendo / divisor)', 'None'],
      },
      approvalCriteria: 'Retorno de Option<f64> y desempaquetado con match.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'rs-09',
      title: 'Manejo de Errores II: Result y el Operador ?',
      level: 'Avanzado',
      objectives: ['Errores recuperables con Result<T, E>.'],
      theory: `### Conceptos
Tipos algebraicos de error \`Result<T, E>\` con variantes \`Ok(T)\` y \`Err(E)\`.`,
      examples: [
        {
          title: 'Result',
          code: `let r: Result<i32, &str> = Ok(10);`,
        },
      ],
      exercise: {
        statement: 'Crea simular_proceso(exito: bool) -> Result<String, String>. Si exito es true Ok(String::from("Hecho")), si no Err(String::from("FallaCritica")). Llama con false y maneja con match.',
        initialCode: `// Función Result

fn main() {
    // Match
}`,
        solution: `fn simular_proceso(exito: bool) -> Result<String, String> {
    if exito {
        Ok(String::from("Hecho"))
    } else {
        Err(String::from("FallaCritica"))
    }
}

fn main() {
    match simular_proceso(false) {
        Ok(mensaje) => println!("{}", mensaje),
        Err(error) => println!("{}", error),
    }
}`,
        testCases: [{ id: 'tc-1', output: 'FallaCritica\n' }],
        hints: ['Ok(String::from("Hecho"))', 'Err(String::from("FallaCritica"))'],
      },
      approvalCriteria: 'Manejo de Ok y Err con Result.',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'rs-10',
      title: 'Colecciones Comunes: Vectors y Strings',
      level: 'Avanzado',
      objectives: ['Uso de la macro vec![] e iteración por referencia.'],
      theory: `### Conceptos
Vectores dinámicos en el Heap con \`vec![1, 2, 3]\`.`,
      examples: [
        {
          title: 'vec!',
          code: `let v = vec![10, 20];`,
        },
      ],
      exercise: {
        statement: 'Crea un vector vec![10, 20, 30]. Recórrelo por referencia (&numeros) con un for. Si el valor es 20 imprime "Encontrado".',
        initialCode: `fn main() {
    // Tu código aquí
}`,
        solution: `fn main() {
    let numeros = vec![10, 20, 30];
    
    for num in &numeros {
        if *num == 20 {
            println!("Encontrado");
        }
    }
}`,
        testCases: [{ id: 'tc-1', output: 'Encontrado\n' }],
        hints: ['for num in &numeros { if *num == 20 { ... } }'],
      },
      approvalCriteria: 'Iteración prestada por referencia sobre vec![].',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'rs-11',
      title: 'Tipos Genéricos (Generics)',
      level: 'Avanzado',
      objectives: ['Funciones genéricas con <T>.'],
      theory: `### Conceptos
Abstracción de tipos con \`fn funcion<T>(param: T) -> T\`.`,
      examples: [
        {
          title: 'Generic fn',
          code: `fn id<T>(x: T) -> T { x }`,
        },
      ],
      exercise: {
        statement: 'Crea la función genérica devolver_mismo<T>(valor: T) -> T que retorne valor. En main invócala con "Rust" e imprime.',
        initialCode: `// Función genérica

fn main() {
    // Prueba
}`,
        solution: `fn devolver_mismo<T>(valor: T) -> T {
    valor
}

fn main() {
    println!("{}", devolver_mismo("Rust"));
}`,
        testCases: [{ id: 'tc-1', output: 'Rust\n' }],
        hints: ['fn devolver_mismo<T>(valor: T) -> T { valor }'],
      },
      approvalCriteria: 'Definición de función genérica con <T>.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'rs-12',
      title: 'Traits: Definiendo Comportamiento',
      level: 'Avanzado',
      objectives: ['Declaración de trait e impl ... for ...'],
      theory: `### Conceptos
Interfaces en Rust: \`trait Hablador { fn hablar(&self) -> &str; }\`.`,
      examples: [
        {
          title: 'Trait',
          code: `trait Saludar { fn hola(&self); }`,
        },
      ],
      exercise: {
        statement: 'Define trait Hablador con fn hablar(&self) -> &\'static str;. Define struct Perro;. Implementa Hablador para Perro retornando "Guau". En main instancia Perro e imprime hablar().',
        initialCode: `// Trait y struct

fn main() {
    // Prueba
}`,
        solution: `trait Hablador {
    fn hablar(&self) -> &'static str;
}

struct Perro;

impl Hablador for Perro {
    fn hablar(&self) -> &'static str {
        "Guau"
    }
}

fn main() {
    let p = Perro;
    println!("{}", p.hablar());
}`,
        testCases: [{ id: 'tc-1', output: 'Guau\n' }],
        hints: ['impl Hablador for Perro { ... }'],
      },
      approvalCriteria: 'Implementación del Trait para el struct.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'rs-13',
      title: 'Lifetimes: Validando Referencias',
      level: 'Avanzado',
      objectives: ['Anotación de lifetimes genéricos \'a.'],
      theory: `### Conceptos
Validación de referencias por el Borrow Checker con notación \`'a\`.`,
      examples: [
        {
          title: 'Lifetime',
          code: `fn ref_fn<'a>(x: &'a str) -> &'a str { x }`,
        },
      ],
      exercise: {
        statement: 'Construye primero<\'a>(s1: &\'a str, s2: &\'a str) -> &\'a str devolviendo s1. Invócala con "Uno" y "Dos" e imprime.',
        initialCode: `// Función con Lifetime

fn main() {
    // Prueba
}`,
        solution: `fn primero<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    s1
}

fn main() {
    println!("{}", primero("Uno", "Dos"));
}`,
        testCases: [{ id: 'tc-1', output: 'Uno\n' }],
        hints: ['fn primero<\'a>(s1: &\'a str, s2: &\'a str) -> &\'a str'],
      },
      approvalCriteria: 'Anotación genérica de lifetime \'a.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'rs-14',
      title: 'Concurrencia Segura y Threads',
      level: 'Experto',
      objectives: ['Hilos paralelos con thread::spawn y .join().'],
      theory: `### Conceptos
Hilos de ejecución seguros con \`std::thread::spawn\`.`,
      examples: [
        {
          title: 'Thread',
          code: `let h = std::thread::spawn(|| println!("Hilo"));
h.join().unwrap();`,
        },
      ],
      exercise: {
        statement: 'Usa std::thread::spawn(|| { println!("Mensaje de Hilo"); }). Bloquea en main llamando a hilo.join().unwrap();.',
        initialCode: `use std::thread;

fn main() {
    // Hilo y join
}`,
        solution: `use std::thread;

fn main() {
    let hilo = thread::spawn(|| {
        println!("Mensaje de Hilo");
    });
    
    hilo.join().unwrap();
}`,
        testCases: [{ id: 'tc-1', output: 'Mensaje de Hilo\n' }],
        hints: ['hilo.join().unwrap();'],
      },
      approvalCriteria: 'Creación y join() de hilos paralelos.',
      estimatedMinutes: 100,
      maxScore: 100,
    },
    {
      id: 'rs-15',
      title: 'Proyecto Integrador y Rust Avanzado (Unsafe)',
      level: 'Experto',
      objectives: ['Integrar Structs, Enums y referencias mutables en un CLI Tareas.'],
      theory: `### Proyecto Integrador Final
Integración de enum Estado (Pendiente, Completada) y struct Tarea.`,
      examples: [
        {
          title: 'Sistema Tareas',
          code: `enum Estado { Pendiente, Completada }
struct Tarea { id: u32, estado: Estado }`,
        },
      ],
      exercise: {
        statement: 'Crea enum Estado { Pendiente, Completada }. Struct Tarea { id: u32, estado: Estado }. impl Tarea con fn new(id: u32) -> Tarea. En main crea let mut tareas = vec![Tarea::new(1), Tarea::new(2), Tarea::new(3)];. Itera con for t in &mut tareas e iguala la de id==2 a Estado::Completada. Imprime "Proyecto Terminado".',
        initialCode: `// Enum Estado y struct Tarea

fn main() {
    // Integración
}`,
        solution: `enum Estado {
    Pendiente,
    Completada,
}

struct Tarea {
    id: u32,
    estado: Estado,
}

impl Tarea {
    fn new(id: u32) -> Tarea {
        Tarea {
            id,
            estado: Estado::Pendiente,
        }
    }
}

fn main() {
    let mut tareas = vec![
        Tarea::new(1),
        Tarea::new(2),
        Tarea::new(3),
    ];
    
    for t in &mut tareas {
        if t.id == 2 {
            t.estado = Estado::Completada;
        }
    }
    
    println!("Proyecto Terminado");
}`,
        testCases: [{ id: 'tc-1', output: 'Proyecto Terminado\n' }],
        hints: ['for t in &mut tareas { if t.id == 2 { t.estado = Estado::Completada; } }'],
      },
      approvalCriteria: 'Integración completa con mutación in-place por préstamo &mut.',
      estimatedMinutes: 180,
      maxScore: 500,
    },
  ],
};
