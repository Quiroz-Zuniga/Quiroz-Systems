import { Course } from '../../types';

export const pythonCourse: Course = {
  id: 'python',
  title: 'Quiroz Systems — Python',
  languageName: 'Python',
  monacoLanguage: 'python',
  description: 'Desde los fundamentos de la sintaxis legible hasta manejo de colecciones, POO, decoradores y programación asíncrona.',
  levelRange: 'Básico → Experto',
  estimatedHours: 45,
  iconName: 'Code2',
  color: 'from-amber-500 to-emerald-600',
  lessons: [
    {
      id: 'py-01',
      title: 'Primer Programa y Entorno',
      level: 'Básico',
      objectives: ['Explicar la naturaleza interpretada de Python.', 'Ejecutar instrucciones de salida con print().'],
      theory: `### Conceptos
Python es un lenguaje interpretado de alto nivel. La función \`print("texto")\` envía información a la consola.`,
      examples: [
        {
          title: 'Hola Mundo',
          code: `# Comentario de una línea
print("¡Hola, Quiroz Systems!")`,
        },
      ],
      exercise: {
        statement: 'Escribe un script que imprima exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "Python Nivel Cero" en la segunda línea.',
        initialCode: `# Tu código aquí
`,
        solution: `print("Bienvenido a Quiroz Systems")
print("Python Nivel Cero")`,
        testCases: [
          { id: 'tc-1', output: 'Bienvenido a Quiroz Systems\nPython Nivel Cero\n' },
        ],
        hints: ['Usa print() dos veces.', 'Cuida las mayúsculas.'],
      },
      approvalCriteria: 'Salida exacta con los saltos de línea requeridos.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'py-02',
      title: 'Variables y Tipos de Datos',
      level: 'Básico',
      objectives: ['Asignar valores con tipado dinámico.', 'Utilizar f-strings.'],
      theory: `### Conceptos
Tipado dinámico: \`int\`, \`float\`, \`str\`, \`bool\`. Interpolación con f-strings \`f"{variable}"\`.`,
      examples: [
        {
          title: 'Uso de f-strings',
          code: `nombre = "Rubén"
edad = 23
print(f"Nombre: {nombre}, Edad: {edad}")`,
        },
      ],
      exercise: {
        statement: 'Define una variable anio_nacimiento con valor 2000 y anio_actual con 2026. Calcula la edad. Imprime exactamente "La edad es: X" usando un F-String.',
        initialCode: `# Tu código aquí
`,
        solution: `anio_nacimiento = 2000
anio_actual = 2026
edad = anio_actual - anio_nacimiento
print(f"La edad es: {edad}")`,
        testCases: [{ id: 'tc-1', output: 'La edad es: 26\n' }],
        hints: ['Calcula edad = anio_actual - anio_nacimiento.', 'Usa f"La edad es: {edad}"'],
      },
      approvalCriteria: 'Cálculo dinámico con f-string.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'py-03',
      title: 'Control de Flujo',
      level: 'Básico',
      objectives: ['Controlar flujo con if, elif, else y operadores lógicos.'],
      theory: `### Conceptos
Estructuras condicionales indentadas. Sintaxis con dos puntos \`:\`.`,
      examples: [
        {
          title: 'If-Elif-Else',
          code: `nota = 85
if nota >= 90:
    print("Excelente")
elif nota >= 70:
    print("Aprobado")
else:
    print("Reprobado")`,
        },
      ],
      exercise: {
        statement: 'Lee un número entero usando int(input()). Si es 0 imprime "Cero". Si es par imprime "Par". Si es impar imprime "Impar".',
        initialCode: `numero = int(input())
# Tu código aquí
`,
        solution: `numero = int(input())

if numero == 0:
    print("Cero")
elif numero % 2 == 0:
    print("Par")
else:
    print("Impar")`,
        testCases: [
          { id: 'tc-1', input: '0', output: 'Cero\n' },
          { id: 'tc-2', input: '4', output: 'Par\n' },
          { id: 'tc-3', input: '-3', output: 'Impar\n' },
        ],
        hints: ['Verifica primero if numero == 0:', 'Usa el operador módulo % 2 == 0.'],
      },
      approvalCriteria: 'Evaluar 0, par e impar correctamente.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'py-04',
      title: 'Ciclos y Repetición',
      level: 'Básico',
      objectives: ['Iterar con bucle for y range().'],
      theory: `### Conceptos
Bucle \`for i in range(inicio, fin):\`. Recordar que el límite superior es exclusivo.`,
      examples: [
        {
          title: 'Range',
          code: `for i in range(1, 6):
    print(i)`,
        },
      ],
      exercise: {
        statement: 'Recibe N con int(input()). Usa for y range() para calcular e imprimir la suma de 1 a N (incluido).',
        initialCode: `n = int(input())
suma = 0

# Tu código aquí

print(suma)`,
        solution: `n = int(input())
suma = 0

for i in range(1, n + 1):
    suma += i
    
print(suma)`,
        testCases: [
          { id: 'tc-1', input: '5', output: '15\n' },
          { id: 'tc-2', input: '1', output: '1\n' },
          { id: 'tc-3', input: '0', output: '0\n' },
        ],
        hints: ['Usa range(1, n + 1).', 'Acumula suma += i.'],
      },
      approvalCriteria: 'Sumatoria correcta con límite inclusivo superior.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'py-05',
      title: 'Listas y Tuplas',
      level: 'Intermedio',
      objectives: ['Declarar y manipular listas y tuplas.'],
      theory: `### Conceptos
Listas mutables \`[]\`, tuplas inmutables \`()\`.`,
      examples: [
        {
          title: 'Listas',
          code: `frutas = ["manzana", "pera"]
frutas.append("uva")`,
        },
      ],
      exercise: {
        statement: 'Se te da una lista de enteros en la variable datos. Encuentra e imprime el valor más grande sin usar max().',
        initialCode: `datos = [int(x) for x in input().split()]

# Tu código aquí
`,
        solution: `datos = [int(x) for x in input().split()]

mayor = datos[0]
for num in datos:
    if num > mayor:
        mayor = num
        
print(mayor)`,
        testCases: [
          { id: 'tc-1', input: '1 5 3 9 2', output: '9\n' },
          { id: 'tc-2', input: '-1 -5 -2 -9 -3', output: '-1\n' },
        ],
        hints: ['Inicializa mayor = datos[0].', 'Recorre con for num in datos:'],
      },
      approvalCriteria: 'Algoritmo de búsqueda sin usar la función max().',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'py-06',
      title: 'Diccionarios y Sets',
      level: 'Intermedio',
      objectives: ['Usar diccionarios clave-valor y conjuntos únicos.'],
      theory: `### Conceptos
Diccionarios \`dict = {}\`, Sets \`s = set()\`.`,
      examples: [
        {
          title: 'Diccionarios',
          code: `persona = {"nombre": "Rubén", "edad": 23}`,
        },
      ],
      exercise: {
        statement: 'Recibe una cadena de texto. Crea un diccionario que cuente la frecuencia de cada carácter e imprímelo.',
        initialCode: `texto = input()
conteo = {}

# Tu código aquí

print(conteo)`,
        solution: `texto = input()
conteo = {}

for char in texto:
    if char in conteo:
        conteo[char] += 1
    else:
        conteo[char] = 1

print(conteo)`,
        testCases: [
          { id: 'tc-1', input: 'hola', output: "{'h': 1, 'o': 1, 'l': 1, 'a': 1}\n" },
          { id: 'tc-2', input: 'aaabbc', output: "{'a': 3, 'b': 2, 'c': 1}\n" },
        ],
        hints: ['Recorre cada carácter con for char in texto:', 'Suma 1 si existe o inicializa en 1.'],
      },
      approvalCriteria: 'Generar el diccionario de frecuencias exacto.',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'py-07',
      title: 'Funciones y Alcance',
      level: 'Intermedio',
      objectives: ['Declarar funciones con def y entender el alcance.'],
      theory: `### Conceptos
Definición de funciones con \`def nombre():\`. Retornos con \`return\`.`,
      examples: [
        {
          title: 'Función',
          code: `def sumar(a, b):
    return a + b`,
        },
      ],
      exercise: {
        statement: 'Crea una función es_mayor_de_edad(edad) que retorne True si es >= 18. Lee una edad por input y muestra "Permitido" o "Denegado".',
        initialCode: `# Define tu función aquí

edad_usuario = int(input())
# Tu condicional aquí`,
        solution: `def es_mayor_de_edad(edad):
    return edad >= 18

edad_usuario = int(input())
if es_mayor_de_edad(edad_usuario):
    print("Permitido")
else:
    print("Denegado")`,
        testCases: [
          { id: 'tc-1', input: '20', output: 'Permitido\n' },
          { id: 'tc-2', input: '17', output: 'Denegado\n' },
          { id: 'tc-3', input: '18', output: 'Permitido\n' },
        ],
        hints: ['def es_mayor_de_edad(edad): return edad >= 18'],
      },
      approvalCriteria: 'Función definida con def que retorne un booleano.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'py-08',
      title: 'Manejo de Archivos',
      level: 'Intermedio',
      objectives: ['Gestión de archivos con context managers with open.'],
      theory: `### Conceptos
Uso de \`with open('archivo', 'modo') as f:\`.`,
      examples: [
        {
          title: 'Escritura y lectura',
          code: `with open("demo.txt", "w") as f:
    f.write("Hola")`,
        },
      ],
      exercise: {
        statement: 'Escribe un string recibido por input() en un archivo log.txt. Luego ábrelo en modo lectura e imprime su contenido.',
        initialCode: `mensaje = input()

# Escribe en log.txt

# Lee de log.txt e imprime`,
        solution: `mensaje = input()

with open("log.txt", "w", encoding="utf-8") as file:
    file.write(mensaje)
    
with open("log.txt", "r", encoding="utf-8") as file:
    print(file.read())`,
        testCases: [
          { id: 'tc-1', input: 'Prueba 123', output: 'Prueba 123\n' },
        ],
        hints: ['Usa with open("log.txt", "w") primero.', 'Luego with open("log.txt", "r") para leer.'],
      },
      approvalCriteria: 'Manejo de contexto con with open.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'py-09',
      title: 'Manejo de Excepciones',
      level: 'Intermedio',
      objectives: ['Atrapar errores con try, except, else, finally.'],
      theory: `### Conceptos
Control de errores en runtime con \`try / except Exception:\`.`,
      examples: [
        {
          title: 'Try Except',
          code: `try:
    res = 10 / 0
except ZeroDivisionError:
    print("Error de división")`,
        },
      ],
      exercise: {
        statement: 'Solicita dos números con input(). Intenta convertirlos a int y dividirlos con //. Maneja ZeroDivisionError ("ErrorDivZero") y ValueError ("ErrorValor"). Si es exitoso, imprime el resultado.',
        initialCode: `val1 = input()
val2 = input()

# Bloques try-except aquí`,
        solution: `val1 = input()
val2 = input()

try:
    num1 = int(val1)
    num2 = int(val2)
    resultado = num1 // num2
    print(resultado)
except ZeroDivisionError:
    print("ErrorDivZero")
except ValueError:
    print("ErrorValor")`,
        testCases: [
          { id: 'tc-1', input: '10\n2', output: '5\n' },
          { id: 'tc-2', input: '5\n0', output: 'ErrorDivZero\n' },
          { id: 'tc-3', input: '10\na', output: 'ErrorValor\n' },
        ],
        hints: ['Pon int(val1) y la división en el bloque try:'],
      },
      approvalCriteria: 'Manejo específico de ZeroDivisionError y ValueError.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'py-10',
      title: 'Clases y Objetos',
      level: 'Avanzado',
      objectives: ['Definir clases y constructores __init__ con self.'],
      theory: `### Conceptos
Programación Orientada a Objetos en Python. Constructor \`def __init__(self, ...):\`.`,
      examples: [
        {
          title: 'Clase',
          code: `class Persona:
    def __init__(self, nombre):
        self.nombre = nombre`,
        },
      ],
      exercise: {
        statement: 'Crea una clase Rectangulo con constructor __init__(self, ancho, alto) y método get_area(self) que retorne el área. Lee dos enteros e imprime el área.',
        initialCode: `# Crea tu clase Rectangulo aquí

a = int(input())
h = int(input())
# Instancia e imprime`,
        solution: `class Rectangulo:
    def __init__(self, ancho, alto):
        self.ancho = ancho
        self.alto = alto
        
    def get_area(self):
        return self.ancho * self.alto

a = int(input())
h = int(input())
rect = Rectangulo(a, h)
print(rect.get_area())`,
        testCases: [
          { id: 'tc-1', input: '5\n10', output: '50\n' },
          { id: 'tc-2', input: '3\n3', output: '9\n' },
        ],
        hints: ['Define def __init__(self, ancho, alto):', 'El método get_area(self) usa self.ancho * self.alto'],
      },
      approvalCriteria: 'Instanciación y uso correcto de self.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'py-11',
      title: 'POO: Herencia y Polimorfismo',
      level: 'Avanzado',
      objectives: ['Herencia de clases y super().'],
      theory: `### Conceptos
Extensión de clases \`class Hija(Padre):\` y \`super().__init__()\`.`,
      examples: [
        {
          title: 'Herencia',
          code: `class Animal:
    def hacer_sonido(self): print("Sonido")

class Perro(Animal):
    def hacer_sonido(self): print("Guau")`,
        },
      ],
      exercise: {
        statement: 'Crea una clase base Sistema con método iniciar(self) -> print("Sistema Base"). Crea Servidor(Sistema) que sobreescriba iniciar(self) -> print("Servidor Online"). Instancia Servidor e inicia.',
        initialCode: `# Clases aquí

# Main lógico`,
        solution: `class Sistema:
    def iniciar(self):
        print("Sistema Base")

class Servidor(Sistema):
    def iniciar(self):
        print("Servidor Online")

srv = Servidor()
srv.iniciar()`,
        testCases: [{ id: 'tc-1', output: 'Servidor Online\n' }],
        hints: ['class Servidor(Sistema): heredará de Sistema.'],
      },
      approvalCriteria: 'Herencia nativa y sobrescritura de métodos.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'py-12',
      title: 'Comprensión de Listas y Generadores',
      level: 'Avanzado',
      objectives: ['Sintaxis sintética list comprehensions y yield.'],
      theory: `### Conceptos
\`[x for x in iterable if condicion]\` y generadores con \`yield\`.`,
      examples: [
        {
          title: 'List Comprehension',
          code: `pares = [x for x in range(10) if x % 2 == 0]`,
        },
      ],
      exercise: {
        statement: 'Usa una List Comprehension. Dado N recibido por input, genera e imprime la lista de números impares de 1 a N (incluido).',
        initialCode: `n = int(input())

# Tu comprehension en una línea`,
        solution: `n = int(input())
impares = [x for x in range(1, n + 1) if x % 2 != 0]
print(impares)`,
        testCases: [
          { id: 'tc-1', input: '10', output: '[1, 3, 5, 7, 9]\n' },
          { id: 'tc-2', input: '5', output: '[1, 3, 5]\n' },
        ],
        hints: ['impares = [x for x in range(1, n + 1) if x % 2 != 0]'],
      },
      approvalCriteria: 'Sintaxis sintética de comprensión de listas.',
      estimatedMinutes: 90,
      maxScore: 100,
    },
    {
      id: 'py-13',
      title: 'Decoradores',
      level: 'Experto',
      objectives: ['Creación y uso de decoradores con @.'],
      theory: `### Conceptos
Funciones que envuelven el comportamiento de otras funciones con el azúcar sintáctico \`@decorador\`.`,
      examples: [
        {
          title: 'Decorador',
          code: `def mi_decorador(func):
    def wrapper():
        print("Antes")
        func()
    return wrapper`,
        },
      ],
      exercise: {
        statement: 'Crea un decorador etiqueta_html que imprima "<html>" antes y "</html>" después. Aplícalo con @ a la función contenido() que imprime "Hola". Llama a contenido().',
        initialCode: `# Crea el decorador etiqueta_html

def contenido():
    print("Hola")

# Llama a la función`,
        solution: `def etiqueta_html(func):
    def wrapper():
        print("<html>")
        func()
        print("</html>")
    return wrapper

@etiqueta_html
def contenido():
    print("Hola")

contenido()`,
        testCases: [
          { id: 'tc-1', output: '<html>\nHola\n</html>\n' },
        ],
        hints: ['Usa @etiqueta_html antes de la función contenido.'],
      },
      approvalCriteria: 'Uso correcto del operador @ y wrapper.',
      estimatedMinutes: 100,
      maxScore: 100,
    },
    {
      id: 'py-14',
      title: 'Asincronía con Asyncio',
      level: 'Experto',
      objectives: ['Corrutinas asíncronas con async y await.'],
      theory: `### Conceptos
Concurrencia no bloqueante con \`async def\` y \`asyncio.run()\`.`,
      examples: [
        {
          title: 'Asyncio',
          code: `import asyncio

async def main():
    print("Hola")
    await asyncio.sleep(0)`,
        },
      ],
      exercise: {
        statement: 'Crea una corrutina descargar() que imprima "Descargando", haga await asyncio.sleep(0), e imprima "Hecho". Ejecútala con asyncio.run().',
        initialCode: `import asyncio

# Define tu corrutina async def descargar():

# Ejecuta con asyncio.run`,
        solution: `import asyncio

async def descargar():
    print("Descargando")
    await asyncio.sleep(0)
    print("Hecho")

asyncio.run(descargar())`,
        testCases: [
          { id: 'tc-1', output: 'Descargando\nHecho\n' },
        ],
        hints: ['async def descargar():', 'asyncio.run(descargar())'],
      },
      approvalCriteria: 'Corrutina asíncrona ejecutada con asyncio.run().',
      estimatedMinutes: 100,
      maxScore: 100,
    },
    {
      id: 'py-15',
      title: 'Proyecto Integrador - Task Manager CLI',
      level: 'Experto',
      objectives: ['Construir un sistema de gestión interactivo a prueba de fallos.'],
      theory: `### Proyecto Integrador Final
Integración de POO, diccionarios, try-except y control de errores en un CLI.`,
      examples: [
        {
          title: 'Gestor',
          code: `class TaskManager:
    def __init__(self): self.tareas = {}`,
        },
      ],
      exercise: {
        statement: 'Crea la clase TaskManager con tareas = {}. Método agregar(id, titulo) y mostrar() que imprima "id - titulo". Lee N, luego en N iteraciones lee id (int) y titulo (str). Protege la conversión con try-except ValueError ignorando fallos con pass.',
        initialCode: `# Implementa tu TaskManager y la lógica principal aquí
`,
        solution: `class TaskManager:
    def __init__(self):
        self.tareas = {}
        
    def agregar(self, t_id, titulo):
        self.tareas[t_id] = titulo
        
    def mostrar(self):
        for t_id, titulo in self.tareas.items():
            print(f"{t_id} - {titulo}")

n = int(input())
manager = TaskManager()

for _ in range(n):
    try:
        t_id = int(input())
        titulo = input()
        manager.agregar(t_id, titulo)
    except ValueError:
        pass

manager.mostrar()`,
        testCases: [
          { id: 'tc-1', input: '2\n1\nSetup\n2\nDeploy', output: '1 - Setup\n2 - Deploy\n' },
          { id: 'tc-2', input: '2\na\nFallo\n3\nTesting', output: '3 - Testing\n' },
          { id: 'tc-3', input: '0', output: '' },
        ],
        hints: ['Usa un try-except ValueError dentro del ciclo.'],
      },
      approvalCriteria: 'Aplicación CLI a prueba de fallos de entrada.',
      estimatedMinutes: 180,
      maxScore: 500,
    },
  ],
};
