Quiroz Systems — Rust
Descripción del curso: El curso "Quiroz Systems — Rust" está diseñado para dominar el lenguaje de programación de sistemas más amado y seguro de la actualidad. Rust garantiza la seguridad de memoria y de hilos (thread-safety) sin necesidad de un recolector de basura (Garbage Collector). Este curso te guiará desde la sintaxis fundamental hasta los conceptos más intimidantes de Rust: Ownership, Borrowing, Lifetimes, y concurrencia segura, culminando en el uso de características avanzadas.
Nivel objetivo: Cero absoluto a Experto. Prerequisitos: Ninguno, aunque conocimientos previos de manejo de memoria (C/C++) o programación de sistemas son beneficiosos. Duración estimada total: 55 horas.
Resultados de aprendizaje (Learning Outcomes):
Configurar el entorno de Rust utilizando el gestor de paquetes y compilador cargo.
Interiorizar el modelo de Ownership (Propiedad) y Borrowing (Préstamos) para lograr seguridad de memoria.
Dominar el manejo funcional de errores mediante los enums Option y Result.
Modelar datos e interfaces usando Structs, Enums, Generics y Traits.
Comprender el Borrow Checker y anotar Lifetimes explícitos.
Escribir código concurrente sin condiciones de carrera y explorar unsafe Rust.
Tabla de Contenido
Lección 1: Primer Programa, Cargo y Macros (Básico)
Lección 2: Variables, Mutabilidad y Tipos de Datos (Básico)
Lección 3: Control de Flujo (Básico)
Lección 4: Ownership (Propiedad): El Corazón de Rust (Intermedio)
Lección 5: Referencias y Borrowing (Intermedio)
Lección 6: Structs y Métodos (Intermedio)
Lección 7: Enums y Pattern Matching (Intermedio)
Lección 8: Manejo de Errores I: Option y Ausencia de Nulos (Intermedio)
Lección 9: Manejo de Errores II: Result y el Operador ? (Avanzado)
Lección 10: Colecciones Comunes: Vectors y Strings (Avanzado)
Lección 11: Tipos Genéricos (Generics) (Avanzado)
Lección 12: Traits: Definiendo Comportamiento (Avanzado)
Lección 13: Lifetimes: Validando Referencias (Avanzado)
Lección 14: Concurrencia Segura y Threads (Experto)
Lección 15: Proyecto Integrador y Rust Avanzado (Unsafe) (Experto)
Lección 1: Primer Programa, Cargo y Macros
1. ID de lección
rs-01
2. Título
Primer Programa, Cargo y Macros
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar el rol del compilador rustc y el gestor cargo.
Diferenciar entre una función estándar y una macro en Rust.
Implementar la macro println! para salida de consola.
5. Contenido teórico
Conceptos: Rust es un lenguaje compilado Ahead-of-Time (AOT). cargo es el gestor de paquetes y sistema de construcción oficial. El punto de entrada es la función main.
Sintaxis: fn main() { ... }. Las macros en Rust se distinguen por terminar con un signo de exclamación !.
Buenas prácticas: Utilizar siempre cargo new para iniciar proyectos. Mantener el código indentado con 4 espacios según rustfmt.
Errores comunes: Olvidar el signo ! al llamar a println, lo cual el compilador interpretará como una llamada a una función inexistente. Olvidar el punto y coma (;).
6. Ejemplos de código comentados
Ejemplo 1: Hola Mundo
Rust
// fn define una función. main es obligatoria.
fn main() {
    // println! es una macro que imprime texto a la consola
    println!("¡Hola, Quiroz Systems!");
}

Ejemplo 2: Interpolar variables directamente en la macro
Rust
fn main() {
    let anio = 2026;
    // Las llaves {} se usan como placeholders para variables
    println!("Iniciando sistema en el año {}", anio);
}

7. Ejercicio práctico
Enunciado: Escribe el programa principal de Rust. Utiliza la macro de impresión para generar exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "Rust Nivel Cero" en la segunda línea. Código inicial:
Rust
// Tu código aquí


Solución esperada:
Rust
fn main() {
    println!("Bienvenido a Quiroz Systems");
    println!("Rust Nivel Cero");
}

Casos de prueba:
Caso 1: Output esperado exacto: Bienvenido a Quiroz Systems\nRust Nivel Cero\n
Caso 2: Verificar sintaxis de la función fn main().
Caso 3: Validar la presencia del símbolo ! indicando el uso de macro. Pistas progresivas:
Declara la función principal con fn main() { }.
Utiliza println!("..."); dos veces.
Verifica mayúsculas y minúsculas exactamente como pide el enunciado.
8. Criterio de aprobación de la lección
El código debe compilar sin errores de sintaxis y la macro debe imprimir exactamente los strings requeridos.
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 2: Variables, Mutabilidad y Tipos de Datos
1. ID de lección
rs-02
2. Título
Variables, Mutabilidad y Tipos de Datos
3. Nivel
Básico
4. Objetivos de aprendizaje
Declarar variables y comprender la inmutabilidad por defecto.
Aplicar la palabra reservada mut para permitir reasignación.
Utilizar tipos de datos escalares explícitos e implícitos.
5. Contenido teórico
Conceptos: En Rust, las variables son inmutables por defecto por razones de seguridad de concurrencia. Para cambiarlas, se debe declarar explícitamente su mutabilidad. Rust es estáticamente tipado, pero tiene una fuerte inferencia de tipos.
Sintaxis: Inmutable: let x = 5;. Mutable: let mut y = 10;.
Buenas prácticas: Mantener las variables inmutables siempre que sea posible. Usar Shadowing (re-declarar la variable con let otra vez) para transformaciones de tipo en lugar de hacerlas mutables.
Errores comunes: Intentar asignar un nuevo valor a una variable declarada sin mut (lanza error cannot assign twice to immutable variable).
6. Ejemplos de código comentados
Ejemplo 1: Mutabilidad
Rust
fn main() {
    let mut contador = 0; // Se declara mutable
    contador = 1;         // Válido
    println!("Contador: {}", contador);
    
    let constante = 10;
    // constante = 11; // ESTO CAUSARÍA ERROR DE COMPILACIÓN
}

Ejemplo 2: Shadowing y Tipos Explícitos
Rust
fn main() {
    let espacios = "   ";
    // Shadowing: Reutilizamos el nombre cambiando el tipo (de &str a usize)
    let espacios: usize = espacios.len(); 
    println!("Cantidad de espacios: {}", espacios);
}

7. Ejercicio práctico
Enunciado: Declara una variable anio_nacimiento inmutable con valor 2000. Declara anio_actual inmutable con valor 2026. Calcula la edad y guárdala en una variable edad. Imprime "La edad es: X" usando la macro de impresión y llaves de interpolación {}. Código inicial:
Rust
fn main() {
    // Tu código aquí
    
}

Solución esperada:
Rust
fn main() {
    let anio_nacimiento = 2000;
    let anio_actual = 2026;
    let edad = anio_actual - anio_nacimiento;
    println!("La edad es: {}", edad);
}

Casos de prueba:
Caso 1: Output esperado exacto: La edad es: 26\n
Caso 2: Declaración de variables usando la palabra clave let.
Caso 3: Verificación de que no se use mut innecesariamente (inmutabilidad preservada). Pistas progresivas:
let anio_nacimiento = 2000;
Calcula con let edad = anio_actual - anio_nacimiento;.
Interpola en la cadena usando println!("La edad es: {}", edad);.
8. Criterio de aprobación de la lección
Uso correcto de la inferencia de tipos, inmutabilidad y la interpolación en macros de Rust.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 3: Control de Flujo
1. ID de lección
rs-03
2. Título
Control de Flujo
3. Nivel
Básico
4. Objetivos de aprendizaje
Evaluar condiciones lógicas sin paréntesis usando if y else.
Comprender que if es una expresión y puede retornar valores.
Utilizar bucles iterativos loop, while y for.
5. Contenido teórico
Conceptos: A diferencia de C++, en Rust las estructuras condicionales son expresiones (retornan un valor). El ciclo loop genera un bucle infinito que puede retornar un valor al usar break.
Sintaxis: if condicion { }, for i in 0..5 { }. No se requieren paréntesis en las condiciones.
Buenas prácticas: Preferir for sobre while para iterar colecciones, evadiendo errores lógicos de índices fuera de límite y optimizando el rendimiento (se evitan los bounds checks en tiempo de ejecución).
Errores comunes: Tipos desiguales en los brazos de un if cuando se usa para asignar (ej. let x = if true { 5 } else { "texto" }; es error de compilación).
6. Ejemplos de código comentados
Ejemplo 1: if como expresión
Rust
fn main() {
    let condicion = true;
    // Asignamos directamente desde el if (sin punto y coma dentro de los bloques)
    let numero = if condicion { 5 } else { 10 };
    println!("El número es: {}", numero);
}

Ejemplo 2: Bucle for con rangos
Rust
fn main() {
    // 1..4 genera los números 1, 2, 3 (exclusivo). Usar 1..=3 lo hace inclusivo.
    for i in 1..=3 {
        println!("Conteo: {}", i);
    }
}

7. Ejercicio práctico
Enunciado: Se declara una variable numero predefinida. Escribe un bloque de código if clásico. Si el número es estrictamente igual a 0, imprime "Cero". Si el resto de dividir por 2 es cero (numero % 2 == 0), imprime "Par". Si no, imprime "Impar". Código inicial:
Rust
fn main() {
    let numero = 4; // Cambiar este valor internamente probará tus casos
    
    // Tu código aquí
    
}

Solución esperada:
Rust
fn main() {
    let numero = 4;
    
    if numero == 0 {
        println!("Cero");
    } else if numero % 2 == 0 {
        println!("Par");
    } else {
        println!("Impar");
    }
}

Casos de prueba:
Caso 1: Variable en 0 | Output: Cero\n
Caso 2: Variable en 4 | Output: Par\n
Caso 3: Variable en -3 | Output: Impar\n Pistas progresivas:
Inicia con if numero == 0 { ... }.
Las llaves son obligatorias, los paréntesis alrededor de la condición no lo son.
Encadena con else if numero % 2 == 0 { ... } y termina con else { ... }.
8. Criterio de aprobación de la lección
Sintaxis estricta de control de flujo evaluando correctamente la paridad de un número entero.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 4: Ownership (Propiedad): El Corazón de Rust
1. ID de lección
rs-04
2. Título
Ownership (Propiedad): El Corazón de Rust
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Enunciar las 3 reglas fundamentales del Ownership.
Diferenciar entre tipos en el Stack (copia semántica) y en el Heap (movimiento semántico).
Aplicar el método clone() para evadir transferencias de propiedad destructivas.
5. Contenido teórico
Conceptos: Ownership es la característica que hace único a Rust.
Cada valor tiene un dueño (owner).
Solo puede haber un dueño a la vez.
Cuando el dueño sale del alcance (scope), el valor se elimina (drop).
Sintaxis: Al asignar un String a otra variable, se produce un "Move" (movimiento), invalidando la variable original.
Buenas prácticas: Evitar usar clone() constantemente para arreglar errores del compilador; el clonado de memoria en el Heap es costoso. Se prefiere el Borrowing (próxima lección).
Errores comunes: Use of moved value. Intentar imprimir una variable de tipo String después de haberla pasado a otra función o variable.
6. Ejemplos de código comentados
Ejemplo 1: Move vs Copy
Rust
fn main() {
    // Tipos primitivos (Stack) tienen Copy trait:
    let x = 5;
    let y = x; // Se copia el valor 5
    println!("x = {}, y = {}", x, y); // Válido

    // Tipos complejos (Heap) tienen Move semantics:
    let s1 = String::from("Hola");
    let s2 = s1; // La propiedad se MOVIÓ a s2. s1 queda invalidado.
    // println!("{}", s1); // ESTO DA ERROR DE COMPILACIÓN
    println!("{}", s2); // Válido
}

7. Ejercicio práctico
Enunciado: Crea una variable cadena1 inicializada con String::from("Quiroz"). Luego, crea una variable cadena2 que reciba el valor de cadena1 pero preservando la validez de cadena1 (utiliza el método para realizar una copia profunda). Finalmente imprime en una sola línea cadena1 y cadena2 separados por un espacio. Código inicial:
Rust
fn main() {
    // Tu código aquí

}

Solución esperada:
Rust
fn main() {
    let cadena1 = String::from("Quiroz");
    let cadena2 = cadena1.clone();
    
    println!("{} {}", cadena1, cadena2);
}

Casos de prueba:
Caso 1: Output esperado exacto: Quiroz Quiroz\n
Caso 2: Verificar sintaxis String::from(.
Caso 3: Validar la presencia explícita de .clone(). Pistas progresivas:
Declara let cadena1 = String::from("Quiroz");.
Para que no ocurra un Move, declara let cadena2 = cadena1.clone();.
Imprime ambas con println!("{} {}", cadena1, cadena2);.
8. Criterio de aprobación de la lección
Superar la restricción semántica de movimiento del compilador clonando explícitamente los datos almacenados en el Heap.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 5: Referencias y Borrowing
1. ID de lección
rs-05
2. Título
Referencias y Borrowing (Préstamos)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Prestar variables a funciones sin ceder el Ownership utilizando referencias &.
Implementar referencias mutables &mut.
Explicar las restricciones del Borrow Checker respecto a las referencias simultáneas.
5. Contenido teórico
Conceptos: Borrowing permite acceder a un dato sin tomar su propiedad. Regla de oro del Borrow Checker: Puedes tener cualquier cantidad de referencias inmutables (&T) O exactamente una referencia mutable (&mut T), pero NO ambas a la vez.
Sintaxis: Referencia inmutable: &variable. Referencia mutable: &mut variable.
Buenas prácticas: Pasar parámetros por referencia & en funciones si la función solo necesita leer el dato (ej. calcular la longitud de un String).
Errores comunes: Cannot borrow as mutable more than once at a time. Ocurre al intentar tener dos &mut apuntando al mismo dato en el mismo scope, previniendo Data Races a nivel de compilador.
6. Ejemplos de código comentados
Ejemplo 1: Referencia inmutable
Rust
fn calcular_longitud(s: &String) -> usize {
    s.len() // Retornamos el tamaño, pero NO somos dueños de 's'
}

fn main() {
    let texto = String::from("Rust");
    let len = calcular_longitud(&texto); // Pasamos una referencia
    println!("El texto '{}' tiene {} bytes.", texto, len); // 'texto' sigue siendo válido
}

Ejemplo 2: Referencia mutable
Rust
fn agregar_texto(s: &mut String) {
    s.push_str(" Systems");
}

fn main() {
    let mut empresa = String::from("Quiroz"); // Debe ser mut
    agregar_texto(&mut empresa); // Pasamos referencia mut
    println!("{}", empresa); // Imprime: Quiroz Systems
}

7. Ejercicio práctico
Enunciado: Declara un String mutable mensaje con el valor "Prueba". Crea una función modificar_mensaje que reciba una referencia mutable al String y le agregue " OK" usando .push_str(). Llama a la función y luego imprime mensaje en el main. Código inicial:
Rust
// Define modificar_mensaje aquí

fn main() {
    // Lógica aquí
}

Solución esperada:
Rust
fn modificar_mensaje(texto: &mut String) {
    texto.push_str(" OK");
}

fn main() {
    let mut mensaje = String::from("Prueba");
    modificar_mensaje(&mut mensaje);
    println!("{}", mensaje);
}

Casos de prueba:
Caso 1: Output esperado exacto: Prueba OK\n
Caso 2: Validar que el parámetro de la función sea &mut String.
Caso 3: Comprobar que en el main no ocurra shadowing ni clones, solo referencias mutables. Pistas progresivas:
Firma de función: fn modificar_mensaje(texto: &mut String).
Adentro: texto.push_str(" OK");.
En el main: let mut mensaje = String::from("Prueba"); y pasa &mut mensaje a tu función.
8. Criterio de aprobación de la lección
Mutación In-Place de estructuras de datos en el Heap sin generar Data Races, satisfaciendo el Borrow Checker.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 6: Structs y Métodos
1. ID de lección
rs-06
2. Título
Structs y Métodos
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Agrupar datos relacionados definiendo struct.
Implementar métodos asociados a un struct utilizando el bloque impl.
Utilizar el puntero léxico &self dentro de los métodos.
5. Contenido teórico
Conceptos: Rust no tiene "Clases" en el sentido tradicional de la POO, pero utiliza structs para los datos y bloques impl para los comportamientos (métodos).
Sintaxis: struct Entidad { campo: Tipo }, impl Entidad { fn metodo(&self) {} }.
Buenas prácticas: Crear un método asociado estático como constructor tradicionalmente llamado new. (Ej: fn new() -> Self).
Errores comunes: Olvidar separar los campos con comas (,) dentro de la instanciación del struct. Omitir &self como primer parámetro del método, convirtiéndolo accidentalmente en una función estática de estructura en lugar de un método de instancia.
6. Ejemplos de código comentados
Ejemplo 1: Struct y Métodos
Rust
struct Rectangulo {
    ancho: u32,
    alto: u32,
}

impl Rectangulo {
    // Función asociada (como un método estático, no toma self)
    fn new(ancho: u32, alto: u32) -> Rectangulo {
        Rectangulo { ancho, alto } // Atajo (Shorthand init)
    }

    // Método de instancia (toma una referencia inmutable a sí mismo)
    fn area(&self) -> u32 {
        self.ancho * self.alto
    }
}

fn main() {
    let rect = Rectangulo::new(10, 5);
    println!("Área: {}", rect.area());
}

7. Ejercicio práctico
Enunciado: Crea un struct Circulo con un campo radio de tipo f64. Define su bloque impl con un método area(&self) -> f64 que retorne 3.14 * self.radio * self.radio. En el main, instancia un círculo con radio 10.0 e imprime su área de la forma "Area: X". Código inicial:
Rust
// Define el struct y su bloque impl aquí

fn main() {
    // Instancia y llama al método
}

Solución esperada:
Rust
struct Circulo {
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
}

Casos de prueba:
Caso 1: Output esperado exacto: Area: 314\n
Caso 2: Verificar sintaxis struct Circulo e impl Circulo.
Caso 3: Validar la presencia del parámetro &self. Pistas progresivas:
Struct: struct Circulo { radio: f64, }. No es punto y coma aquí, es coma.
Impl: impl Circulo { fn area(&self) -> f64 { ... } }. La última línea del método no debe tener punto y coma para que retorne.
Instancia: let c = Circulo { radio: 10.0 };.
8. Criterio de aprobación de la lección
Separación idiomática del modelo de datos (struct) y su comportamiento (impl) mediante el receptor &self.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 7: Enums y Pattern Matching
1. ID de lección
rs-07
2. Título
Enums y Pattern Matching
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar enumeraciones (enum) que contengan datos de diferentes tipos.
Construir lógica de control exhaustiva utilizando la expresión match.
Evaluar que el compilador exige el manejo de todos los casos posibles.
5. Contenido teórico
Conceptos: Los Enums de Rust son Tipos de Datos Algebraicos. Un enumerador puede almacenar datos dentro de sus variantes. El operador match es el equivalente avanzado a un switch, y es exhaustivo: debes abarcar todas las ramas posibles.
Sintaxis: enum Mensaje { Salir, Mover {x: i32, y: i32} }, match variable { Patron => Accion, }.
Buenas prácticas: Utilizar el guion bajo _ => () (el catch-all) cuando se evalúan muchas variantes y solo nos interesan unas pocas.
Errores comunes: Non-exhaustive patterns. Olvidar evaluar una variante del Enum en el match, el compilador no te dejará continuar, garantizando que no existan comportamientos no controlados en tiempo de ejecución.
6. Ejemplos de código comentados
Ejemplo 1: Enums y Match
Rust
enum Moneda {
    Centavo,
    Niquel,
    Dime,
    Cuarto(String), // Esta variante almacena un dato (estado de emisión)
}

fn valor_en_centavos(moneda: Moneda) -> u8 {
    match moneda {
        Moneda::Centavo => 1,
        Moneda::Niquel => 5,
        Moneda::Dime => 10,
        Moneda::Cuarto(estado) => {
            println!("Un cuarto del estado de {}", estado);
            25
        }
    }
}

7. Ejercicio práctico
Enunciado: Crea un enum Semaforo con las variantes Rojo, Amarillo y Verde. Escribe una función accion_semaforo(estado: Semaforo) que use match. Si es Rojo, retorna "Detener". Si es Amarillo, "Precaucion". Si es Verde, "Avanzar". En el main, llama a la función con Semaforo::Rojo e imprime el string retornado. (Retorna strings tipo &'static str o simplemente &str). Código inicial:
Rust
// Define enum y función

fn main() {
    // Instancia e imprime
}

Solución esperada:
Rust
enum Semaforo {
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
}

Casos de prueba:
Caso 1: Output esperado exacto: Detener\n
Caso 2: Verificar sintaxis exhaustiva de match.
Caso 3: Confirmar la declaración del enum. Pistas progresivas:
Firma enum: enum Semaforo { Rojo, Amarillo, Verde }.
El match no necesita default _ => si evalúas las tres variantes explícitamente.
Asegúrate que en las flechas del match devuelvas el string directamente sin punto y coma: Semaforo::Rojo => "Detener",.
8. Criterio de aprobación de la lección
Control de flujo de coincidencia de patrones (Pattern Matching) completamente exhaustivo a nivel de compilación.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 8: Manejo de Errores I: Option y Ausencia de Nulos
1. ID de lección
rs-08
2. Título
Manejo de Errores I: Option y Ausencia de Nulos
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Explicar la decisión de diseño de Rust de eliminar el valor null tradicional.
Implementar el enum de la biblioteca estándar Option<T>.
Desempaquetar valores utilizando match y los métodos unwrap() / expect().
5. Contenido teórico
Conceptos: En lenguajes clásicos, inventar el valor null ha causado billones de dólares en errores ("Billion Dollar Mistake"). Rust soluciona esto con el enum Option<T> que indica que algo puede ser Some(valor) o None.
Sintaxis: let algo: Option<i32> = Some(5); o let nada: Option<i32> = None;.
Buenas prácticas: Evitar usar unwrap() en producción porque si el valor resulta ser None, el programa entrará en panic! (colapso). Preferir manejarlo con match o if let.
Errores comunes: Intentar sumar o realizar operaciones matemáticas con un Option<i32> y un i32 directamente. ¡Tienen tipos diferentes! El compilador obliga a extraer primero el i32 del interior del Option.
6. Ejemplos de código comentados
Ejemplo 1: Option y Match
Rust
fn buscar_usuario(id: u32) -> Option<String> {
    if id == 1 {
        Some(String::from("Admin")) // Valor envuelto en Some
    } else {
        None // Ausencia de valor explícita
    }
}

fn main() {
    let resultado = buscar_usuario(2);

    match resultado {
        Some(nombre) => println!("Usuario encontrado: {}", nombre),
        None => println!("El usuario no existe."),
    }
}

7. Ejercicio práctico
Enunciado: Crea una función division_segura(dividendo: f64, divisor: f64) -> Option<f64>. Si el divisor es exactamente 0.0, retorna None. Si no, retorna Some(dividendo / divisor). En el main, llama a la función con 10.0 y 0.0. Usa un match para imprimir "Infinito" si es None, o el resultado directamente si es Some. Código inicial:
Rust
// Implementa division_segura

fn main() {
    // Llama y maneja el Option con match
}

Solución esperada:
Rust
fn division_segura(dividendo: f64, divisor: f64) -> Option<f64> {
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
}

Casos de prueba:
Caso 1: Output esperado exacto: Infinito\n
Caso 2: Verificar sintaxis de retorno Option<f64>.
Caso 3: Validar la presencia segura del match con los brazos Some y None. Pistas progresivas:
Firma: fn division_segura(dividendo: f64, divisor: f64) -> Option<f64>.
Para retornar el valor válido enciérralo en la variante: Some(dividendo / divisor).
Haz el match division_segura(10.0, 0.0) { Some(v) => ..., None => ... }.
8. Criterio de aprobación de la lección
Gestión segura de tipos nulos empleando el sistema de tipos de envoltorios genéricos.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 9: Manejo de Errores II: Result y el Operador ?
1. ID de lección
rs-09
2. Título
Manejo de Errores II: Result y el Operador ?
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Interceptar errores recuperables modelados con el enum Result<T, E>.
Manejar las variantes Ok y Err.
Propagar errores eficientemente de manera declarativa con el operador ?.
5. Contenido teórico
Conceptos: Si Option significa "nada", Result significa "falla". Result requiere dos tipos: El tipo de éxito (T) y el tipo del error (E). Muchas funciones nativas de I/O de disco y red retornan Result.
Sintaxis: enum Result<T, E> { Ok(T), Err(E) }. Propagación: let r = funcion()?;.
Buenas prácticas: El operador ? se coloca al final de una función que retorna un Result. Si la función arroja Err, el ? automáticamente hace un early return del error hacia la función llamadora.
Errores comunes: Intentar usar ? dentro de la función main estándar. Históricamente no era posible, aunque en Rust moderno se permite si la firma del main se ajusta a fn main() -> Result<(), Box<dyn std::error::Error>>.
6. Ejemplos de código comentados
Ejemplo 1: Uso del Result y Propagación
Rust
use std::fs::File;
use std::io::{self, Read};

// Función retorna un String (en caso de Ok) o un io::Error (en caso de Err)
fn leer_archivo() -> Result<String, io::Error> {
    // Si File::open falla, el '?' retorna el Error inmediatamente
    let mut archivo = File::open("hello.txt")?; 
    let mut contenido = String::new();
    // Si read_to_string falla, el '?' retorna el Error inmediatamente
    archivo.read_to_string(&mut contenido)?; 
    
    Ok(contenido) // Retornamos Todo bien envuelto en Ok
}

7. Ejercicio práctico
(Simulador de Error) Enunciado: Crea una función simular_proceso(exito: bool) -> Result<String, String>. Si exito es true, retorna Ok(String::from("Hecho")). Si es false, retorna Err(String::from("FallaCritica")). En el main, llama a la función con false y maneja la respuesta con un match, imprimiendo el mensaje que venga en la envoltura (sea del Ok o del Err). Código inicial:
Rust
// Implementa la función Result

fn main() {
    // Match aquí
}

Solución esperada:
Rust
fn simular_proceso(exito: bool) -> Result<String, String> {
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
}

Casos de prueba:
Caso 1: Output esperado exacto: FallaCritica\n
Caso 2: Verificar sintaxis de la firma retornando Result<String, String>.
Caso 3: Validar desempaquetado de las estructuras algebraicas Ok y Err. Pistas progresivas:
Firma: fn simular_proceso(exito: bool) -> Result<String, String>.
En las condicionales, no olvides crear el String dinámico con String::from().
El match debe cubrir Ok(m) y Err(e) realizando el print sobre su variable interna.
8. Criterio de aprobación de la lección
Diseño idiomático de tratamiento de excepciones en Rust por medio de tipos algebraicos retornados.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 10: Colecciones Comunes: Vectors y Strings
1. ID de lección
rs-10
2. Título
Colecciones Comunes: Vectors y Strings
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Almacenar colecciones continuas de tamaño variable en el Heap con Vec<T>.
Utilizar la macro vec![] para inicializaciones rápidas.
Diferenciar exhaustivamente entre String y la porción (slice) &str.
5. Contenido teórico
Conceptos: Un Vector (Vec<T>) es como un array pero puede crecer y encogerse dinámicamente. Al igual que el vector, String es un vector de bytes UTF-8 dinámico en el Heap, mientras que &str es una "vista" inmutable y de tamaño estático apuntando a los datos subyacentes.
Sintaxis: let mut v = Vec::new(); v.push(1); o let v = vec![1, 2, 3];.
Buenas prácticas: Evitar accesos directos por índice como v[10] si no se tiene certeza, ya que lanzará un panic!. Preferir el método seguro v.get(10) que retorna un Option.
Errores comunes: Iterar sobre un Vector consumiéndolo (obteniendo Ownership de sus elementos sin desearlo). Se prefiere iterar por referencias for elemento in &v { }.
6. Ejemplos de código comentados
Ejemplo 1: Vectors y Option Getter
Rust
fn main() {
    let nombres = vec!["Quiroz", "Systems"];
    
    // get() retorna un Option. Es la forma segura de acceder.
    match nombres.get(2) {
        Some(nombre) => println!("El tercero es {}", nombre),
        None => println!("No existe el tercer elemento."),
    }
}

7. Ejercicio práctico
Enunciado: Usa la macro vec![] para crear un vector de enteros: 10, 20, 30. Utiliza un ciclo for para recorrer una referencia a este vector (usa &), y si el valor iterado es igual a 20, imprime "Encontrado". Código inicial:
Rust
fn main() {
    // Tu código aquí
}

Solución esperada:
Rust
fn main() {
    let numeros = vec![10, 20, 30];
    
    for num in &numeros {
        if *num == 20 {
            println!("Encontrado");
        }
    }
}

Casos de prueba:
Caso 1: Output esperado exacto: Encontrado\n
Caso 2: Verificar sintaxis vec![].
Caso 3: Validar que el iterador use referencia inmutable &numeros. Pistas progresivas:
Instancia: let numeros = vec![10, 20, 30];.
Itera pasando referencia: for num in &numeros { ... }.
Debido a que iteras por referencia, num es un puntero &i32. El operador de desreferenciación *num te permite compararlo, aunque las versiones modernas de Rust auto-desreferencian en operadores de igualdad num == &20. (Usa *num == 20 para estar seguro).
8. Criterio de aprobación de la lección
Creación y recorrido prestado por referencia sobre colecciones dinámicas alojadas en el Heap.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 11: Tipos Genéricos (Generics)
1. ID de lección
rs-11
2. Título
Tipos Genéricos (Generics)
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Evitar código duplicado declarando funciones con Parámetros de Tipo <T>.
Definir Structs y Enums genéricos (como las tripas de Option<T>).
Entender la Monomorfización que realiza el compilador.
5. Contenido teórico
Conceptos: Los genéricos permiten escribir una plantilla de función o struct para soportar múltiples tipos sin perder el tipado fuerte. Durante la compilación, Rust genera código concreto para cada tipo utilizado (Monomorfización), implicando que los genéricos tienen coste CERO en tiempo de ejecución.
Sintaxis: fn funcion<T>(param: T) -> T { param } y struct Punto<T> { x: T, y: T }.
Buenas prácticas: Usar letras simples y mayúsculas (T, U, V) para denotar los tipos genéricos, convencionalmente T (Type).
Errores comunes: Intentar realizar operaciones específicas sobre <T> dentro de la función genérica sin declarar que T las soporta (Traits bounds, que veremos en la próxima lección).
6. Ejemplos de código comentados
Ejemplo 1: Struct Genérico
Rust
// 'T' representa un tipo arbitrario. Tanto x como y deben ser de ese MISMO tipo.
struct Punto<T> {
    x: T,
    y: T,
}

fn main() {
    let entero = Punto { x: 5, y: 10 };       // Punto<i32>
    let flotante = Punto { x: 1.0, y: 4.0 };  // Punto<f64>
    // let error = Punto { x: 5, y: 4.0 };    // Error: x e y deben coincidir
}

7. Ejercicio práctico
Enunciado: Crea una función genérica llamada devolver_mismo<T> que reciba un parámetro de tipo T y lo retorne exactamente. En el main, invócala pasándole el string de tamaño estático "Rust" e imprime su resultado. Código inicial:
Rust
// Tu función genérica aquí

fn main() {
    // Imprime llamando a la función
}

Solución esperada:
Rust
fn devolver_mismo<T>(valor: T) -> T {
    valor
}

fn main() {
    println!("{}", devolver_mismo("Rust"));
}

Casos de prueba:
Caso 1: Output esperado exacto: Rust\n
Caso 2: Verificar sintaxis fn devolver_mismo<T>.
Caso 3: Validar uso en main. Pistas progresivas:
La firma de la función requiere genéricos en todos lados: fn devolver_mismo<T>(valor: T) -> T.
Como es una simple devolución, solo escribe valor (sin punto y coma) en el cuerpo.
El compilador infiere el tipo, así que en el main solo pásale el texto.
8. Criterio de aprobación de la lección
Abstracción paramétrica de tipos generada sin errores de desajuste sintáctico (Type Mismatch).
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 12: Traits: Definiendo Comportamiento
1. ID de lección
rs-12
2. Título
Traits: Definiendo Comportamiento
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Declarar una interfaz compartida utilizando la palabra trait.
Implementar un Trait para múltiples structs diferentes.
Aplicar Trait Bounds para restringir los tipos genéricos.
5. Contenido teórico
Conceptos: Los Traits son la versión rústica de las "Interfaces". Permiten al compilador saber que un tipo particular tiene el método o comportamiento prometido.
Sintaxis: trait Resumen { fn resumir(&self) -> String; }. Implementación: impl Resumen for Articulo { ... }.
Buenas prácticas: Agrupar requisitos lógicos. Puedes derivar traits estándar automáticamente en structs, por ejemplo #[derive(Debug)] para permitir imprimirlos en la terminal para depuración (usando {:?}).
Errores comunes: Intentar implementar un trait externo para un struct externo (Regla de la Orfandad). Debes ser dueño del trait o del struct para implementar la relación.
6. Ejemplos de código comentados
Ejemplo 1: Traits y Bounds
Rust
// Declaramos el comportamiento esperado
trait Describible {
    fn describir(&self) -> String;
}

struct Auto { marca: String }

// Implementamos el trait
impl Describible for Auto {
    fn describir(&self) -> String {
        format!("Automóvil marca {}", self.marca)
    }
}

// Trait Bound: La función solo acepta genéricos que implementen 'Describible'
fn imprimir_informacion<T: Describible>(item: &T) {
    println!("{}", item.describir());
}

7. Ejercicio práctico
Enunciado: Define el trait Hablador con el método fn hablar(&self) -> &'static str;. Define el struct Perro. Implementa Hablador para Perro y retorna "Guau" en el método. En el main, crea la instancia del perro e imprime el retorno de hablar(). Código inicial:
Rust
// Tu trait y struct aquí

// Implementación de trait

fn main() {
    // Prueba
}

Solución esperada:
Rust
trait Hablador {
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
}

Casos de prueba:
Caso 1: Output esperado exacto: Guau\n
Caso 2: Verificar sintaxis completa de declaración trait e implementación impl ... for.
Caso 3: Instanciación válida de struct unitario Perro. Pistas progresivas:
Trait: trait Hablador { fn hablar(&self) -> &'static str; }.
Como Perro no tiene datos, usa un unit struct: struct Perro;.
Impleméntalo: impl Hablador for Perro { ... }.
8. Criterio de aprobación de la lección
Ejecutar abstracciones de comportamiento a nivel de compilador ligadas exitosamente a un tipo de datos propio.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 13: Lifetimes: Validando Referencias
1. ID de lección
rs-13
2. Título
Lifetimes: Validando Referencias
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Entender el concepto de Dangling References (referencias colgantes) que el Borrow Checker previene.
Aplicar la anotación de lifetime genérico 'a en funciones que retornan referencias.
Comprender el lifetime 'static que perdura toda la vida del programa.
5. Contenido teórico
Conceptos: Todo préstamo/referencia en Rust tiene un Lifetime (tiempo de vida), que es el scope por el cual esa referencia es válida. Cuando tienes parámetros múltiples de entrada referenciados y retornas una referencia, el compilador no sabe cuál de las referencias de entrada sobrevivirá más tiempo, por lo que te obliga a anotar la relación con 'a.
Sintaxis: fn mayor<'a>(x: &'a str, y: &'a str) -> &'a str { ... }. Se pronuncia "tic a".
Buenas prácticas: ¡No abuses de Lifetimes! Muchas funciones se resuelven solas por la "Elisión de Lifetimes" (reglas deductivas implícitas). Úsalos solo si el compilador se queja explícitamente.
Errores comunes: Intentar usar lifetimes para evadir un mal diseño. Los lifetimes no cambian cuánto tiempo vive una variable, solo le explican al compilador las relaciones pre-existentes entre distintas variables.
6. Ejemplos de código comentados
Ejemplo 1: Lifetimes obligatorios
Rust
// 'a estipula que ambas entradas y la salida vivirán juntas,
// previniendo que una se destruya y la salida quede como Puntero Colgante.
fn mayor<'a>(cadena1: &'a str, cadena2: &'a str) -> &'a str {
    if cadena1.len() > cadena2.len() {
        cadena1
    } else {
        cadena2
    }
}

fn main() {
    let a = String::from("Rust");
    let b = "C++";
    println!("Más grande: {}", mayor(a.as_str(), b));
}

7. Ejercicio práctico
Enunciado: Construye una función llamada primero<'a>(s1: &'a str, s2: &'a str) -> &'a str. No importa la longitud, la función DEBE devolver simplemente s1 (el primer argumento). Las anotaciones de lifetime están pensadas para pacificar al compilador en este diseño específico. En el main invócala con "Uno" y "Dos", imprimiendo el resultado. Código inicial:
Rust
// Define la función con notación estricta de Lifetime

fn main() {
    // Uso e impresión
}

Solución esperada:
Rust
fn primero<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    s1
}

fn main() {
    println!("{}", primero("Uno", "Dos"));
}

Casos de prueba:
Caso 1: Output esperado exacto: Uno\n
Caso 2: Verificar sintaxis completa con comilla simple: <'a>.
Caso 3: Validar la firma en los argumentos &'a str. Pistas progresivas:
Declara la función abriendo genéricos: fn primero<'a>.
Todos los parámetros y retornos llevan la comilla antes de la referencia: (s1: &'a str, s2: &'a str) -> &'a str.
Retorna pasivamente s1.
8. Criterio de aprobación de la lección
Anotación correcta e imperativa a nivel de tipado para vincular los tiempos de vida léxicos sobre la devolución de punteros/referencias.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 14: Concurrencia Segura y Threads
1. ID de lección
rs-14
2. Título
Concurrencia Segura y Threads
3. Nivel
Experto
4. Objetivos de aprendizaje
Crear procesos de hilos paralelos (Threads) independientes al hilo principal.
Usar join para esperar que los hilos hijos finalicen su ejecución.
Aplicar Closures de tipo move para enviar propiedad (ownership) de variables hacia los hilos paralelos.
5. Contenido teórico
Conceptos: En lenguajes clásicos, la concurrencia asimétrica causa terribles Bugs, como Data Races. Como Rust hace cumplir el Ownership, las fallas concurrentes son capturadas ¡En tiempo de compilación! ("Fearless Concurrency").
Sintaxis: use std::thread; thread::spawn(|| { ... }).join();.
Buenas prácticas: Utilizar canales (MPSC - Multi-producer, single-consumer) provistos por std::sync::mpsc para transferir mensajes seguros entre hilos en lugar de memoria compartida tradicional (Mutex).
Errores comunes: Closure may outlive the current function. Olvidar la palabra reservada move antes del closure del Thread, impidiendo que el compilador garantice que los datos sobrevivan el hilo si el main termina prematuramente.
6. Ejemplos de código comentados
Ejemplo 1: Creando un hilo y esperando
Rust
use std::thread;
use std::time::Duration;

fn main() {
    let datos = vec![1, 2, 3];

    // 'move' obliga al closure a tomar posesión de 'datos'
    let handler = thread::spawn(move || {
        println!("Vector en el hilo: {:?}", datos);
        thread::sleep(Duration::from_millis(100));
    });

    // Sin el join, el main terminaría de inmediato, matando al hilo en progreso
    handler.join().unwrap(); 
}

7. Ejercicio práctico
Enunciado: Usa std::thread. Crea un thread con thread::spawn(|| { ... }). Dentro del hilo imprime "Mensaje de Hilo". Almacena el hilo devuelto en la variable hilo. En la línea siguiente del main, llama obligatoriamente a hilo.join().unwrap(); para bloquear y esperar a que el hijo imprima. Código inicial:
Rust
use std::thread;

fn main() {
    // Crea el hilo, ejecuta el bloque asíncrono y bloquealo con join
    
}

Solución esperada:
Rust
use std::thread;

fn main() {
    let hilo = thread::spawn(|| {
        println!("Mensaje de Hilo");
    });
    
    hilo.join().unwrap();
}

Casos de prueba:
Caso 1: Output esperado exacto: Mensaje de Hilo\n
Caso 2: Verificar sintaxis nativa y sintaxis de clausura (Closure) ||.
Caso 3: Validar que el flujo sea asegurado con .join().unwrap(). Pistas progresivas:
Declara let hilo = thread::spawn(|| { println!("Mensaje de Hilo"); });.
En la siguiente línea, haz un hilo.join().
Ya que join() devuelve un Result (por si el hilo panicó), agrega .unwrap() al final para compilar sin Warnings.
8. Criterio de aprobación de la lección
Arquitectura paralela asíncrona implementada correctamente previniendo la finalización prematura del hilo principal.
9. Tiempo estimado de la lección
100 minutos
10. Puntaje máximo de la lección
100 pts
Lección 15: Proyecto Integrador y Rust Avanzado (Unsafe)
1. ID de lección
rs-15
2. Título
Proyecto Integrador y Rust Avanzado (Unsafe)
3. Nivel
Experto
4. Objetivos de aprendizaje
Consolidar Structs, Enums, Traits, Propiedad y Tipos estándar del curso.
Crear una arquitectura coherente y protegida.
Entender teóricamente qué es la directiva unsafe y cómo apaga protecciones del Borrow Checker.
5. Contenido teórico
Conceptos de Unsafe: En Rust ocasionalmente necesitas interactuar con C/C++ u operar directamente en la memoria cruda. El bloque unsafe { ... } te otorga "superpoderes" (como desreferenciar punteros crudos). En unsafe, el programador se vuelve responsable de la seguridad de la memoria. NUNCA DEBE USARSE EN LÓGICA DE NEGOCIO ESTÁNDAR.
Proyecto Final: Las arquitecturas en Rust agrupan el modelo en structs y utilizan Result/Option para las devoluciones, validando absolutamente todo a nivel de compilación. Las macros como vec! se usan como estado transaccional.
6. Ejemplos de código comentados
Ejemplo 1: Unsafe Rust (Concepto de Puntero Crudo)
Rust
fn main() {
    let mut num = 5;
    
    // Convertimos de referencia normal a Puntero Crudo (Raw Pointer)
    let r1 = &num as *const i32; 
    let r2 = &mut num as *mut i32;

    // Desreferenciar un puntero crudo requiere estar bajo un bloque unsafe
    unsafe {
        println!("r1 apunta a: {}", *r1);
        *r2 = 10;
        println!("r2 cambió a: {}", *r2);
    }
}

7. Ejercicio práctico
Enunciado (Proyecto CLI Tareas): Crea un Enum Estado (Pendiente, Completada). Crea un Struct Tarea con id: u32 y estado: Estado. Implementa un bloque impl Tarea con un método asociativo de creación fn new(id: u32) -> Tarea (asigna por defecto el estado a Pendiente). En el main, utiliza vec! para crear un vector de 3 tareas inicializándolas con IDs 1, 2, 3. Modifica (usando loop y referencia &mut) la tarea de ID 2 para poner su estado en Estado::Completada. Imprime "Proyecto Terminado" al final. (No es necesario imprimir la lista). Código inicial:
Rust
// Modela el enum Estado y struct Tarea

// Crea el bloque impl de Tarea

fn main() {
    // Instancia el vector mut de tareas con id 1,2,3
    
    // Itera para buscar y actualizar el id=2
    
    // Imprime texto final
}

Solución esperada:
Rust
enum Estado {
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
}

Casos de prueba:
Caso 1: Output esperado exacto: Proyecto Terminado\n
Caso 2: Verificar declaración mutua de enumerador relacional (Struct + Enum).
Caso 3: Validar la presencia del préstamo destructivo a través de iteración &mut. Pistas progresivas:
Diseña el enum Estado y struct Tarea.
impl Tarea { fn new(id: u32) -> Tarea { Tarea { id, estado: Estado::Pendiente } } }.
El vector en el main debe ser declarado como let mut tareas = vec![ ... ];.
El ciclo for requiere la referencia mutable para permitir mutación in-place de campos internos: for t in &mut tareas { if t.id == 2 { t.estado = Estado::Completada; } }.
8. Criterio de aprobación de la lección
Integración de sistema modular completo superando reglas estrictas de ownership, borrowing relacional e inicialización segura de estructuras complejas.
9. Tiempo estimado de la lección
180 minutos
10. Puntaje máximo de la lección
500 pts
