Quiroz Systems — Python
Descripción del curso: El curso "Quiroz Systems — Python" está estructurado para transformar a principiantes sin experiencia en desarrolladores backend y analistas de datos altamente competentes. Python destaca por su sintaxis legible, versatilidad y ecosistema masivo. Este curso cubre desde los fundamentos absolutos hasta características avanzadas como metaprogramación (decoradores), concurrencia y programación orientada a objetos moderna, formando la base para el desarrollo ágil de software y la inteligencia artificial.
Nivel objetivo: Cero absoluto a Experto. Prerequisitos: Ninguno. Se recomienda familiaridad básica con la línea de comandos. Duración estimada total: 45 horas.
Resultados de aprendizaje (Learning Outcomes):
Configurar el entorno de ejecución de Python y manejar scripts básicos.
Dominar estructuras de datos nativas (listas, tuplas, diccionarios, sets).
Implementar arquitecturas de código limpias mediante funciones y clases.
Gestionar excepciones, archivos y persistencia de datos básica.
Aplicar paradigmas avanzados como generadores, decoradores y asincronía.
Desarrollar una aplicación de consola completa e integradora.
Tabla de Contenido
Lección 1: Primer Programa y Entorno (Básico)
Lección 2: Variables y Tipos de Datos (Básico)
Lección 3: Control de Flujo (Básico)
Lección 4: Ciclos y Repetición (Básico)
Lección 5: Listas y Tuplas (Intermedio)
Lección 6: Diccionarios y Sets (Intermedio)
Lección 7: Funciones y Alcance (Intermedio)
Lección 8: Manejo de Archivos (Intermedio)
Lección 9: Manejo de Excepciones (Intermedio)
Lección 10: Clases y Objetos (Avanzado)
Lección 11: Herencia y Polimorfismo (Avanzado)
Lección 12: Comprensión de Listas y Generadores (Avanzado)
Lección 13: Decoradores (Experto)
Lección 14: Asincronía con Asyncio (Experto)
Lección 15: Proyecto Integrador (Experto)
Lección 1: Primer Programa y Entorno
1. ID de lección
py-01
2. Título
Primer Programa y Entorno
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar la naturaleza interpretada de Python.
Ejecutar instrucciones básicas de salida en consola.
Implementar la función print() adecuadamente.
5. Contenido teórico
Conceptos: Python es un lenguaje interpretado de alto nivel. No requiere un paso de compilación manual previo; el intérprete ejecuta el código línea por línea.
Sintaxis: La función print("texto") envía información a la salida estándar.
Buenas prácticas: Seguir las guías de estilo PEP 8 (usar comillas simples o dobles de manera consistente, preferiblemente minúsculas para nombres de archivos).
Errores comunes: Olvidar cerrar paréntesis o comillas (SyntaxError). Errores de indentación (IndentationError), ya que en Python los espacios definen la estructura del código.
6. Ejemplos de código comentados
Ejemplo 1: Hola Mundo
Python
# El símbolo de numeral (#) se usa para comentarios de una sola línea
print("¡Hola, Quiroz Systems!")

Ejemplo 2: Múltiples argumentos en print
Python
# print puede recibir varios argumentos y los separa automáticamente con un espacio
print("Iniciando", "sistema...", 2026)

7. Ejercicio práctico
Enunciado: Escribe un script que imprima exactamente "Bienvenido a Quiroz Systems" en la primera línea, y "Python Nivel Cero" en la segunda línea. Código inicial:
Python
# Tu código aquí


Solución esperada:
Python
print("Bienvenido a Quiroz Systems")
print("Python Nivel Cero")

Casos de prueba:
Caso 1: Output esperado exacto: Bienvenido a Quiroz Systems\nPython Nivel Cero\n
Caso 2: Verificar que no haya errores de sintaxis (SyntaxError).
Caso 3: Verificar uso de la función print. Pistas progresivas:
Llama a la función print() dos veces en líneas separadas.
Asegúrate de incluir el texto entre comillas dobles " " o simples ' '.
Revisa la ortografía y mayúsculas exactamente como pide el enunciado.
8. Criterio de aprobación de la lección
El código se ejecuta sin errores y produce la salida estándar con los saltos de línea correspondientes generados por print().
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 2: Variables y Tipos de Datos
1. ID de lección
py-02
2. Título
Variables y Tipos de Datos
3. Nivel
Básico
4. Objetivos de aprendizaje
Asignar valores a variables utilizando tipado dinámico.
Distinguir entre tipos int, float, str y bool.
Convertir tipos de datos explícitamente (casting).
5. Contenido teórico
Conceptos: Python utiliza tipado dinámico, lo que significa que no necesitas declarar el tipo de una variable; el intérprete lo infiere en tiempo de ejecución.
Sintaxis: nombre_variable = valor. Las conversiones se logran con funciones como int(), str(), float().
Buenas prácticas: Usar snake_case para el nombre de las variables (ej. mi_variable). Usar nombres descriptivos.
Errores comunes: Intentar concatenar cadenas y números enteros directamente con el operador + sin antes convertir el entero a cadena (TypeError).
6. Ejemplos de código comentados
Ejemplo 1: Tipado dinámico
Python
edad = 23             # int (Entero)
altura = 1.75         # float (Decimal)
nombre = "Rubén"      # str (Cadena de texto)
es_estudiante = True  # bool (Booleano, nota la mayúscula inicial)

print(f"Nombre: {nombre}, Edad: {edad}") # Uso de f-strings para formateo

Ejemplo 2: Casting y Operaciones
Python
texto_numero = "10"
# Convertimos el string a entero para poder operar matemáticamente
numero_real = int(texto_numero) 
resultado = numero_real * 2
print(resultado) # Imprime 20

7. Ejercicio práctico
Enunciado: Define una variable anio_nacimiento con valor numérico 2000 y anio_actual con 2026. Calcula la edad. Imprime exactamente el texto "La edad es: X" usando un F-String (donde X es la edad calculada). Código inicial:
Python
# Tu código aquí


Solución esperada:
Python
anio_nacimiento = 2000
anio_actual = 2026
edad = anio_actual - anio_nacimiento
print(f"La edad es: {edad}")

Casos de prueba:
Caso 1: Output esperado exacto: La edad es: 26\n
Caso 2: Verificar declaración explícita de anio_nacimiento y anio_actual.
Caso 3: Validar el uso de interpolación f-string f"...". Pistas progresivas:
Calcula la edad restando anio_nacimiento a anio_actual.
Un f-string comienza con la letra f antes de las comillas: f"Texto {variable}".
Asegúrate de colocar la variable edad entre llaves {} dentro del f-string.
8. Criterio de aprobación de la lección
Pasar 3/3 casos de prueba, realizando el cálculo dinámicamente y aplicando interpolación de cadenas de formato (f-strings).
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 3: Control de Flujo
1. ID de lección
py-03
2. Título
Control de Flujo
3. Nivel
Básico
4. Objetivos de aprendizaje
Controlar el flujo de ejecución con if, elif y else.
Evaluar condiciones usando operadores de comparación e identidad.
Aplicar operadores lógicos and, or, not.
5. Contenido teórico
Conceptos: Las estructuras condicionales permiten ejecutar bloques de código solo si una condición booleana es verdadera. El bloque se define por la indentación.
Sintaxis: Se usan dos puntos : tras la condición y el código subsiguiente debe estar indentado (usualmente 4 espacios).
Buenas prácticas: No comparar booleanos con == True; simplemente usar if condicion:. Usar elif para evitar múltiples niveles de anidación.
Errores comunes: Olvidar los dos puntos : al final de la línea del if. Errores de indentación mezclando tabs y espacios (TabError).
6. Ejemplos de código comentados
Ejemplo 1: If, Elif, Else
Python
nota = 85
if nota >= 90:
    print("Excelente")
elif nota >= 70:
    print("Aprobado")
else:
    print("Reprobado")

Ejemplo 2: Operadores lógicos
Python
usuario_activo = True
suscripcion_pagada = False

if usuario_activo and not suscripcion_pagada:
    print("Mostrar aviso de cobro")

7. Ejercicio práctico
Enunciado: Lee un número entero de la consola utilizando int(input()). Si el número es par, imprime "Par". Si es impar, imprime "Impar". Si es 0, imprime "Cero". Código inicial:
Python
numero = int(input())
# Tu código aquí


Solución esperada:
Python
numero = int(input())

if numero == 0:
    print("Cero")
elif numero % 2 == 0:
    print("Par")
else:
    print("Impar")

Casos de prueba:
Caso 1: Input: 0 | Output: Cero\n
Caso 2: Input: 4 | Output: Par\n
Caso 3: Input: -3 | Output: Impar\n Pistas progresivas:
Inicia evaluando if numero == 0:. ¡No olvides los dos puntos!
Usa el operador módulo % para verificar si el resto de dividir por 2 es cero (numero % 2 == 0).
El último caso simplemente es un else:. Recuerda indentar las funciones print.
8. Criterio de aprobación de la lección
Pasar todos los casos evaluando correctamente el 0 y el uso del operador módulo. No se permiten errores de indentación.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 4: Ciclos y Repetición
1. ID de lección
py-04
2. Título
Ciclos y Repetición
3. Nivel
Básico
4. Objetivos de aprendizaje
Iterar secuencias usando el ciclo for y la función range().
Implementar bucles condicionales con while.
Utilizar sentencias break y continue.
5. Contenido teórico
Conceptos: Un ciclo repite un bloque de código. En Python, for itera sobre los elementos de cualquier secuencia (como un rango, lista o cadena), mientras que while repite mientras una condición sea verdadera.
Sintaxis: for i in range(inicio, fin):, while condicion:
Buenas prácticas: Preferir for sobre while siempre que se conozca el número de iteraciones (es más seguro y legible).
Errores comunes: Crear bucles infinitos en un while olvidando actualizar la variable de control. Usar límites erróneos en range(n) (recordar que termina en n-1).
6. Ejemplos de código comentados
Ejemplo 1: Bucle For con Range
Python
# range(1, 6) genera números del 1 al 5
for i in range(1, 6):
    print(i, end=" ") # end=" " evita el salto de línea automático

Ejemplo 2: Bucle While con break
Python
contador = 5
while contador > 0:
    print(contador)
    contador -= 1 # Operador de decremento equivalente a contador = contador - 1

7. Ejercicio práctico
Enunciado: Recibe un número entero N usando int(input()). Usa un bucle for y range() para calcular e imprimir la suma de todos los números desde 1 hasta N (incluido). Código inicial:
Python
n = int(input())
suma = 0

# Tu código aquí

print(suma)

Solución esperada:
Python
n = int(input())
suma = 0

for i in range(1, n + 1):
    suma += i
    
print(suma)

Casos de prueba:
Caso 1: Input: 5 | Output: 15\n
Caso 2: Input: 1 | Output: 1\n
Caso 3: Input: 0 | Output: 0\n Pistas progresivas:
La función range(1, n) se detiene un número antes. Necesitas iterar hasta n + 1.
Dentro del ciclo (indentado), acumula el valor en la variable: suma += i.
Asegúrate de que el print(suma) final esté fuera del ciclo (sin indentación).
8. Criterio de aprobación de la lección
Pasar 3/3 casos de prueba gestionando correctamente el límite inclusivo superior de la función range().
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 5: Listas y Tuplas
1. ID de lección
py-05
2. Título
Listas y Tuplas
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar y manipular listas (arreglos mutables).
Aplicar métodos de listas como append(), remove() y Slicing.
Comprender la inmutabilidad de las tuplas.
5. Contenido teórico
Conceptos: Las listas son colecciones ordenadas y mutables. Las tuplas son colecciones ordenadas e inmutables (no pueden modificarse tras su creación).
Sintaxis: Listas con corchetes [], Tuplas con paréntesis (). Slicing: lista[inicio:fin:paso].
Buenas prácticas: Usar tuplas para datos que no deben cambiar durante la ejecución (ej. coordenadas, configuraciones) por seguridad y eficiencia de memoria.
Errores comunes: IndexError al intentar acceder a un índice que no existe. Intentar modificar un elemento de una tupla (TypeError).
6. Ejemplos de código comentados
Ejemplo 1: Operaciones con listas
Python
tecnologias = ["Python", "HTML", "CSS"]
tecnologias.append("JavaScript") # Agrega al final
tecnologias.insert(0, "C++")     # Inserta en el índice 0

# Slicing: tomar los primeros 3 elementos
print(tecnologias[0:3]) 

Ejemplo 2: Tuplas e Inmutabilidad
Python
dimensiones = (800, 600)
print(dimensiones[0])
# dimensiones[0] = 1024 # Esto lanzaría TypeError

7. Ejercicio práctico
Enunciado: Se te proporciona un código inicial que lee 5 números enteros separados por espacios y los almacena en una lista. Escribe un algoritmo que encuentre el valor más grande en la lista sin usar la función nativa max(), e imprímelo. Código inicial:
Python
# Leemos los datos y los guardamos en una lista de enteros
datos = [int(x) for x in input().split()]

# Tu código aquí


Solución esperada:
Python
datos = [int(x) for x in input().split()]

mayor = datos[0]
for num in datos:
    if num > mayor:
        mayor = num
        
print(mayor)

Casos de prueba:
Caso 1: Input: 1 5 3 9 2 | Output: 9\n
Caso 2: Input: -1 -5 -2 -9 -3 | Output: -1\n
Caso 3: Validar la ausencia estricta de la palabra reservada/función max(. Pistas progresivas:
Declara una variable mayor inicializada con el primer elemento de la lista: datos[0].
Utiliza un for num in datos: para recorrer cada elemento.
Dentro del ciclo, si num > mayor, actualiza la variable mayor.
8. Criterio de aprobación de la lección
La lógica algorítmica para encontrar el mayor debe estar desarrollada a mano, iterando la lista correctamente.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 6: Diccionarios y Sets
1. ID de lección
py-06
2. Título
Diccionarios y Sets
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Implementar diccionarios para almacenamiento clave-valor.
Manejar conjuntos (set) para almacenar elementos únicos.
Iterar eficientemente sobre claves y valores.
5. Contenido teórico
Conceptos: Un diccionario (dict) asocia claves únicas a valores, ofreciendo búsquedas ultrarrápidas (Hash map). Un conjunto (set) es una colección no ordenada de elementos únicos (ideal para operaciones matemáticas de conjuntos).
Sintaxis: Diccionarios: {"clave": "valor"}, Sets: {"a", "b", "c"} o set().
Buenas prácticas: Usar .get("clave", valor_por_defecto) en diccionarios para evitar errores si la clave no existe. Utilizar set para eliminar duplicados de una lista rápidamente.
Errores comunes: Intentar usar una lista como clave en un diccionario (TypeError: unhashable type). KeyError al acceder con dict["clave"] cuando no existe.
6. Ejemplos de código comentados
Ejemplo 1: Diccionarios
Python
usuario = {
    "username": "quirozdev",
    "rol": "admin"
}
usuario["edad"] = 23 # Agregar nuevo par clave-valor

for clave, valor in usuario.items():
    print(f"{clave}: {valor}")

Ejemplo 2: Sets
Python
numeros = [1, 2, 2, 3, 4, 4, 5]
unicos = set(numeros) # Convierte a set eliminando duplicados
print(unicos) # Imprime {1, 2, 3, 4, 5}

7. Ejercicio práctico
Enunciado: Escribe un programa que reciba una cadena de texto (input). Crea un diccionario que cuente y almacene cuántas veces aparece cada carácter en la cadena. Imprime el diccionario resultante. Código inicial:
Python
texto = input()
conteo = {}

# Tu código aquí

print(conteo)

Solución esperada:
Python
texto = input()
conteo = {}

for char in texto:
    if char in conteo:
        conteo[char] += 1
    else:
        conteo[char] = 1

print(conteo)

Casos de prueba:
Caso 1: Input: hola | Output: {'h': 1, 'o': 1, 'l': 1, 'a': 1}\n
Caso 2: Input: aaabbc | Output: {'a': 3, 'b': 2, 'c': 1}\n
Caso 3: Validar la instanciación de un tipo dict. Pistas progresivas:
Itera cada letra del texto usando for char in texto:.
Verifica si el carácter ya existe como clave usando if char in conteo:.
Si existe, suma 1 a su valor. Si no existe, créalo asignándole el valor 1.
8. Criterio de aprobación de la lección
Producir el diccionario exacto de conteo de frecuencias de caracteres superando los casos de prueba.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 7: Funciones y Alcance
1. ID de lección
py-07
2. Título
Funciones y Alcance
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Modularizar código creando funciones con def.
Utilizar argumentos por defecto y argumentos posicionales (*args, **kwargs).
Explicar la diferencia entre variables locales y globales (scope).
5. Contenido teórico
Conceptos: Las funciones envuelven lógica reutilizable. Python permite funciones de primer orden (se pueden pasar como parámetros a otras funciones).
Sintaxis: def nombre_funcion(parametros): return valor
Buenas prácticas: Nombrar las funciones con verbos (acciones). Mantener las funciones pequeñas y con una única responsabilidad (Single Responsibility Principle). Documentar usando Docstrings """ """.
Errores comunes: Modificar variables globales dentro de una función sin usar la palabra reservada global (crea una variable local paralela - Shadowing). Pasar listas como argumentos por defecto (def func(lista=[])), lo cual retiene estado entre llamadas.
6. Ejemplos de código comentados
Ejemplo 1: Parámetros y Retorno
Python
def calcular_area_rectangulo(base, altura=10):
    """Calcula el área, la altura por defecto es 10."""
    return base * altura

print(calcular_area_rectangulo(5))      # Usa altura 10 por defecto
print(calcular_area_rectangulo(5, 20))  # Sobrescribe altura a 20

Ejemplo 2: Alcance (Scope)
Python
sistema = "Linux" # Variable global

def mostrar_os():
    sistema = "Windows" # Variable local, no afecta la global
    print(f"OS Local: {sistema}")

mostrar_os()
print(f"OS Global: {sistema}")

7. Ejercicio práctico
Enunciado: Crea una función llamada es_mayor_de_edad que reciba un entero (edad) y retorne True si es >= 18, o False en caso contrario. En la parte inferior, lee una edad mediante el input, llama a tu función e imprime "Permitido" o "Denegado" basándote en el retorno. Código inicial:
Python
# Define tu función aquí

# --- Lógica principal ---
edad_usuario = int(input())
# Tu condicional aquí

Solución esperada:
Python
def es_mayor_de_edad(edad):
    return edad >= 18

edad_usuario = int(input())
if es_mayor_de_edad(edad_usuario):
    print("Permitido")
else:
    print("Denegado")

Casos de prueba:
Caso 1: Input: 20 | Output: Permitido\n
Caso 2: Input: 17 | Output: Denegado\n
Caso 3: Input: 18 | Output: Permitido\n Pistas progresivas:
Tu función debe definirse como def es_mayor_de_edad(edad):.
Puedes directamente retornar la expresión booleana: return edad >= 18.
Llama a la función en tu if principal: if es_mayor_de_edad(edad_usuario):.
8. Criterio de aprobación de la lección
La función debe estar correctamente definida con def y retornar un booleano real, no cadenas de texto.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 8: Manejo de Archivos
1. ID de lección
py-08
2. Título
Manejo de Archivos
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Leer y escribir archivos de texto.
Gestionar correctamente los recursos utilizando context managers (with).
Diferenciar entre los modos de apertura de archivos (r, w, a).
5. Contenido teórico
Conceptos: Para la persistencia de datos básica se usan archivos. Un gestor de contexto (with) asegura que el archivo se cierre automáticamente incluso si ocurre un error, liberando el descriptor de archivo del sistema operativo.
Sintaxis: with open('archivo.txt', 'modo') as f:
Buenas prácticas: Siempre utilizar el bloque with open(). Especificar explícitamente el encoding='utf-8' para evitar problemas con caracteres especiales en distintos sistemas.
Errores comunes: Usar el modo 'w' (write) y sobreescribir accidentalmente el contenido de un archivo completo, en lugar de usar 'a' (append). FileNotFoundError por no especificar rutas correctas.
6. Ejemplos de código comentados
Ejemplo 1: Escritura de archivos
Python
# 'w' abre en modo escritura (sobrescribe si existe)
with open("reporte.txt", "w", encoding="utf-8") as archivo:
    archivo.write("Iniciando reporte del proyecto.\n")

Ejemplo 2: Lectura de archivos
Python
# 'r' abre en modo lectura
try:
    with open("reporte.txt", "r", encoding="utf-8") as archivo:
        contenido = archivo.read()
        print(contenido)
except FileNotFoundError:
    print("El archivo no existe.")

7. Ejercicio práctico
(Nota: Este entorno simula el sistema de archivos) Enunciado: Escribe un string recibido por input() en un archivo llamado log.txt. Luego, vuelve a abrir el archivo log.txt en modo lectura e imprime su contenido en consola. Código inicial:
Python
mensaje = input()

# Escribe en log.txt

# Lee de log.txt e imprime

Solución esperada:
Python
mensaje = input()

with open("log.txt", "w", encoding="utf-8") as file:
    file.write(mensaje)
    
with open("log.txt", "r", encoding="utf-8") as file:
    print(file.read())

Casos de prueba:
Caso 1: Input: Prueba 123 | Output: Prueba 123\n
Caso 2: Input: Línea de log de CatraCode | Output: Línea de log de CatraCode\n
Caso 3: Validar la presencia del bloque de manejo de contexto with open. Pistas progresivas:
Abre primero con el modo "w" (write) y usa file.write(mensaje).
Sal del primer bloque with (quita la indentación) para que el archivo se cierre.
Abre nuevamente usando un segundo with pero en modo "r" (read), y haz print(file.read()).
8. Criterio de aprobación de la lección
El archivo debe crearse, escribirse y leerse exitosamente usando el context manager with.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 9: Manejo de Excepciones
1. ID de lección
py-09
2. Título
Manejo de Excepciones
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Anticipar y capturar errores en tiempo de ejecución.
Implementar bloques try, except, else y finally.
Lanzar excepciones personalizadas o controladas con raise.
5. Contenido teórico
Conceptos: Las excepciones son eventos que rompen el flujo normal (ej. división por cero, falla de red). Python permite interceptarlos para que el programa no colapse ("crash").
Sintaxis: Bloques try / except Exception as e.
Buenas prácticas: Capturar excepciones específicas (ej. except ValueError:) en lugar de usar un except: global (bare except) que podría ocultar errores graves del sistema.
Errores comunes: Colocar código que no es riesgoso dentro del bloque try. Ignorar excepciones con pass sin registrarlas (silencing errors).
6. Ejemplos de código comentados
Ejemplo 1: Estructura Completa
Python
try:
    resultado = 10 / 2
except ZeroDivisionError as e:
    print("Error: No puedes dividir por cero.")
else:
    # Se ejecuta SOLO si no hubo excepciones
    print(f"Todo bien. Resultado: {resultado}")
finally:
    # Se ejecuta SIEMPRE (haya error o no), útil para limpiar recursos
    print("Operación finalizada.")

Ejemplo 2: Lanzar excepciones (Raise)
Python
def procesar_edad(edad):
    if edad < 0:
        raise ValueError("La edad no puede ser negativa")
    print("Procesando...")

7. Ejercicio práctico
Enunciado: Solicita al usuario dos números usando input(). Intenta convertirlos a int y dividirlos. Maneja específicamente ZeroDivisionError (imprime "ErrorDivZero") y ValueError si el usuario no ingresa números válidos (imprime "ErrorValor"). Si la división es exitosa, imprime el resultado (en entero, usa //). Código inicial:
Python
val1 = input()
val2 = input()

# Bloques try-except aquí

Solución esperada:
Python
val1 = input()
val2 = input()

try:
    num1 = int(val1)
    num2 = int(val2)
    resultado = num1 // num2
    print(resultado)
except ZeroDivisionError:
    print("ErrorDivZero")
except ValueError:
    print("ErrorValor")

Casos de prueba:
Caso 1: Input: 10 \n 2 | Output: 5\n
Caso 2: Input: 5 \n 0 | Output: ErrorDivZero\n
Caso 3: Input: 10 \n a | Output: ErrorValor\n Pistas progresivas:
Todo el intento de conversión (int(val1)) y división debe ir dentro del try:.
Define el primer bloque como except ZeroDivisionError:.
Define el segundo bloque como except ValueError:. No necesitas bloque finally aquí.
8. Criterio de aprobación de la lección
Pasar 3/3 casos, diferenciando correctamente las excepciones matemáticas de las excepciones de parseo de tipos.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 10: Clases y Objetos
1. ID de lección
py-10
2. Título
Programación Orientada a Objetos: Clases y Objetos
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Definir clases usando la convención CamelCase.
Inicializar objetos con el método constructor __init__.
Vincular estado y comportamiento usando la palabra clave self.
5. Contenido teórico
Conceptos: La POO permite modelar entidades del mundo real agrupando estado (atributos) y comportamiento (métodos). Python es puramente orientado a objetos (todo es un objeto).
Sintaxis: class NombreClase: y métodos regulares como def metodo(self):.
Buenas prácticas: El primer parámetro de cualquier método de instancia debe ser obligatoriamente self. Para atributos "privados", la convención en Python es iniciar el nombre con un guion bajo _atributo (encapsulamiento por convención).
Errores comunes: Olvidar self en la firma de los métodos dentro de la clase, lo que provoca un TypeError porque Python pasa implícitamente la instancia como primer argumento.
6. Ejemplos de código comentados
Ejemplo 1: Clase básica
Python
class Desarrollador:
    # Método constructor (se llama al crear el objeto)
    def __init__(self, nombre, lenguaje):
        self.nombre = nombre
        self.lenguaje = lenguaje

    # Método de instancia
    def programar(self):
        print(f"{self.nombre} está escribiendo código en {self.lenguaje}")

# Instanciación
dev = Desarrollador("Rubén", "Python")
dev.programar()

7. Ejercicio práctico
Enunciado: Crea una clase Rectangulo que reciba ancho y alto en su constructor __init__. Agrega un método get_area(self) que retorne el área matemática. Lee dos enteros por consola, instancia la clase e imprime el resultado del método get_area(). Código inicial:
Python
# Crea tu clase Rectangulo aquí

a = int(input())
h = int(input())
# Instancia e imprime

Solución esperada:
Python
class Rectangulo:
    def __init__(self, ancho, alto):
        self.ancho = ancho
        self.alto = alto
        
    def get_area(self):
        return self.ancho * self.alto

a = int(input())
h = int(input())
rect = Rectangulo(a, h)
print(rect.get_area())

Casos de prueba:
Caso 1: Input: 5 \n 10 | Output: 50\n
Caso 2: Input: 3 \n 3 | Output: 9\n
Caso 3: Validar la presencia de class Rectangulo y __init__. Pistas progresivas:
Define la clase: class Rectangulo:.
El constructor es def __init__(self, ancho, alto): y debe asignar self.ancho = ancho.
El método def get_area(self): utiliza los atributos prefijados con self. para multiplicarlos.
8. Criterio de aprobación de la lección
La instanciación y el uso de atributos de instancia (self) deben ser sintácticamente correctos.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 11: Herencia y Polimorfismo
1. ID de lección
py-11
2. Título
POO: Herencia y Polimorfismo
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Extender funcionalidades de una clase base creando subclases.
Sobrescribir (override) métodos de la clase padre.
Utilizar la función super() para delegar comportamientos.
5. Contenido teórico
Conceptos: La herencia evita la duplicación de código permitiendo que una clase derive de otra. El polimorfismo permite que objetos de distintas clases respondan al mismo llamado de método, cada uno a su manera.
Sintaxis: class ClaseHija(ClasePadre):.
Buenas prácticas: Utilizar super().__init__(...) dentro del constructor de la clase hija para asegurar que el estado de la clase padre se inicialice correctamente.
Errores comunes: Sobrescribir el constructor en la clase hija olvidando llamar a super(), dejando atributos del padre sin inicializar.
6. Ejemplos de código comentados
Ejemplo 1: Herencia y Super
Python
class Empleado:
    def __init__(self, nombre):
        self.nombre = nombre

    def trabajar(self):
        print(f"{self.nombre} está trabajando de forma general.")

class Ingeniero(Empleado):
    def __init__(self, nombre, especialidad):
        super().__init__(nombre) # Inicializa la clase padre
        self.especialidad = especialidad

    def trabajar(self): # Polimorfismo: Sobrescritura de método
        print(f"{self.nombre} programa arquitecturas en {self.especialidad}.")

dev = Ingeniero("Rubén", "Python")
dev.trabajar() # Llama al método sobrescrito

7. Ejercicio práctico
Enunciado: Crea una clase base Sistema con un método iniciar() que imprima "Sistema Base". Crea una clase Servidor que herede de Sistema y sobrescriba iniciar() para imprimir "Servidor Online". En la lógica principal, instancia Servidor y llama a su método iniciar(). Código inicial:
Python
# Clases aquí

# Main lógico

Solución esperada:
Python
class Sistema:
    def iniciar(self):
        print("Sistema Base")

class Servidor(Sistema):
    def iniciar(self):
        print("Servidor Online")

srv = Servidor()
srv.iniciar()

Casos de prueba:
Caso 1: Output esperado exacto: Servidor Online\n
Caso 2: Verificar sintaxis de herencia class Servidor(Sistema):.
Caso 3: Validar la instanciación exclusiva del hijo, ejecutando correctamente el método sobrescrito. Pistas progresivas:
Define la clase padre Sistema y asegúrate de incluir el parámetro (self) en su método iniciar.
Para que herede, usa los paréntesis en la definición: class Servidor(Sistema):.
Simplemente reescribe el método def iniciar(self): dentro del Servidor.
8. Criterio de aprobación de la lección
La jerarquía de clases debe establecerse usando herencia nativa de Python.
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 12: Comprensión de Listas y Generadores
1. ID de lección
py-12
2. Título
Comprensión de Listas y Generadores
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Refactorizar bucles convencionales utilizando List Comprehensions.
Crear generadores iterables para manejo eficiente de memoria utilizando yield.
5. Contenido teórico
Conceptos: Las comprensiones de listas son una forma concisa y "Pythónica" de crear listas evaluando expresiones en una sola línea. Los generadores (yield) producen valores uno a uno al vuelo (lazy evaluation), consumiendo memoria O(1) independientemente del tamaño de la serie.
Sintaxis: [expresion for item in iterable if condicion]. Funciones generadoras: usar yield en lugar de return.
Buenas prácticas: Evitar comprensiones de listas demasiado anidadas o complejas; si excede de 2 líneas, usar un bucle tradicional por legibilidad. Usar generadores para procesar archivos inmensos.
Errores comunes: Abusar de las comprensiones sacrificando la legibilidad del código. Intentar usar yield y return combinados incorrectamente en la misma lógica.
6. Ejemplos de código comentados
Ejemplo 1: List Comprehension
Python
numeros = [1, 2, 3, 4, 5]
# Crear lista con los cuadrados solo de los números pares
cuadrados_pares = [x**2 for x in numeros if x % 2 == 0]
print(cuadrados_pares) # [4, 16]

Ejemplo 2: Generador
Python
def contador_infinito():
    n = 1
    while True:
        yield n # Pausa la función, entrega 'n', y reanuda en la próxima llamada
        n += 1

gen = contador_infinito()
print(next(gen)) # 1
print(next(gen)) # 2

7. Ejercicio práctico
Enunciado: Usa una List Comprehension. Dado el límite entero N recibido por input, genera e imprime una lista de todos los números impares desde 1 hasta N (incluido). No utilices ciclos for tradicionales. Código inicial:
Python
n = int(input())

# Tu comprehension en una línea, asígnala a 'impares' y haz print(impares)

Solución esperada:
Python
n = int(input())
impares = [x for x in range(1, n + 1) if x % 2 != 0]
print(impares)

Casos de prueba:
Caso 1: Input: 10 | Output: [1, 3, 5, 7, 9]\n
Caso 2: Input: 5 | Output: [1, 3, 5]\n
Caso 3: Validar la presencia de corchetes [ y ausencia de append(). Pistas progresivas:
Inicia abriendo corchetes: [x for x in range(1, n + 1) ... ].
Para filtrar impares, agrega la condición al final: if x % 2 != 0.
Imprime directamente la lista completa, Python la formateará automáticamente.
8. Criterio de aprobación de la lección
La solución debe estar obligatoriamente condensada en la sintaxis sintética de comprensión de listas (sin iteración imperativa y sin uso de append).
9. Tiempo estimado de la lección
90 minutos
10. Puntaje máximo de la lección
100 pts
Lección 13: Decoradores
1. ID de lección
py-13
2. Título
Decoradores
3. Nivel
Experto
4. Objetivos de aprendizaje
Explicar el concepto de metaprogramación funcional (First-class functions).
Crear y aplicar decoradores mediante el azúcar sintáctico @.
Extender el comportamiento de funciones sin modificar su código original.
5. Contenido teórico
Conceptos: Un decorador es una función que toma otra función como argumento y extiende su comportamiento ("la envuelve"). Muy utilizado en frameworks modernos (ej. Flask para @app.route).
Sintaxis: @nombre_decorador sobre la definición de una función.
Buenas prácticas: Utilizar functools.wraps dentro del decorador para preservar la metadata (nombre, docstring) de la función original que está siendo decorada.
Errores comunes: Olvidar retornar la función envoltura (wrapper) o la llamada a la función original dentro del wrapper.
6. Ejemplos de código comentados
Ejemplo 1: Decorador básico
Python
def logger(funcion):
    def wrapper(*args, **kwargs):
        print(f"Llamando a la función: {funcion.__name__}")
        resultado = funcion(*args, **kwargs)
        print("Finalizado.")
        return resultado
    return wrapper # Se retorna la función anidada sin llamarla

@logger
def sumar(a, b):
    return a + b

print(sumar(5, 5)) 

7. Ejercicio práctico
Enunciado: Crea un decorador llamado etiqueta_html que envuelva la ejecución de cualquier función, imprimiendo <html> antes de su ejecución, y </html> después de ejecutarla. Aplícalo a una función contenido() que imprima "Hola". Llama a la función contenido(). Código inicial:
Python
# Crea el decorador etiqueta_html

# Aplícalo a la función
def contenido():
    print("Hola")

# Llama a la función

Solución esperada:
Python
def etiqueta_html(func):
    def wrapper():
        print("<html>")
        func()
        print("</html>")
    return wrapper

@etiqueta_html
def contenido():
    print("Hola")

contenido()

Casos de prueba:
Caso 1: Output esperado exacto: <html>\nHola\n</html>\n
Caso 2: Verificar el uso del símbolo @ para aplicar el decorador.
Caso 3: Verificar que la función wrapper esté correctamente anidada y retornada. Pistas progresivas:
Tu decorador recibe la función: def etiqueta_html(func):.
Dentro debes definir el envoltorio: def wrapper():. Llama a print(), luego a func() y luego al otro print(). Retorna wrapper.
Coloca @etiqueta_html justo en la línea superior de la definición de contenido().
8. Criterio de aprobación de la lección
Demostrar el entendimiento de clausuras (closures) y el orden de ejecución impuesto por los decoradores.
9. Tiempo estimado de la lección
100 minutos
10. Puntaje máximo de la lección
100 pts
Lección 14: Asincronía con Asyncio
1. ID de lección
py-14
2. Título
Asincronía con Asyncio
3. Nivel
Experto
4. Objetivos de aprendizaje
Diferenciar entre concurrencia y paralelismo.
Declarar corrutinas utilizando las palabras reservadas async y await.
Ejecutar un ciclo de eventos (event loop) básico.
5. Contenido teórico
Conceptos: La concurrencia permite gestionar múltiples tareas de I/O (Input/Output, como redes o bases de datos) en un solo hilo (single-thread), maximizando el rendimiento sin bloquear la aplicación.
Sintaxis: async def funcion():, esperar tareas con await tarea(), inicializar con asyncio.run(funcion()).
Buenas prácticas: Nunca usar bloqueos síncronos (como time.sleep()) en código asíncrono, usar la alternativa asíncrona (como asyncio.sleep()).
Errores comunes: Olvidar hacer await a una corrutina (esto devuelve un objeto corrutina inactivo sin ejecutar la tarea - RuntimeWarning).
6. Ejemplos de código comentados
Ejemplo 1: Corrutina básica
Python
import asyncio

async def tarea_pesada():
    print("Iniciando tarea (Simulando red)...")
    await asyncio.sleep(1) # Cede el control del hilo mientras espera
    print("Tarea finalizada.")

# Punto de entrada asíncrono
# asyncio.run(tarea_pesada())

7. Ejercicio práctico
Enunciado: Crea un programa con la librería asyncio. Define una corrutina descargar() que imprima "Descargando", haga un await asyncio.sleep(0) (para simular el no-bloqueo en testeo), y luego imprima "Hecho". Ejecuta la corrutina usando asyncio.run(). Código inicial:
Python
import asyncio

# Define tu corrutina async def descargar():

# Ejecuta con asyncio.run

Solución esperada:
Python
import asyncio

async def descargar():
    print("Descargando")
    await asyncio.sleep(0)
    print("Hecho")

asyncio.run(descargar())

Casos de prueba:
Caso 1: Output esperado exacto: Descargando\nHecho\n
Caso 2: Verificar sintaxis async def.
Caso 3: Validar la presencia y correcto uso de await asyncio.sleep(0). Pistas progresivas:
No olvides prefijar la definición de la función con async def.
Dentro de la función, la espera debe escribirse como await asyncio.sleep(0).
Para disparar todo el proceso en la base del script, usa asyncio.run(descargar()).
8. Criterio de aprobación de la lección
La arquitectura debe estar instanciada con el loop de eventos asíncrono válido.
9. Tiempo estimado de la lección
100 minutos
10. Puntaje máximo de la lección
100 pts
Lección 15: Proyecto Integrador - Task Manager CLI
1. ID de lección
py-15
2. Título
Proyecto Integrador - Task Manager CLI
3. Nivel
Experto
4. Objetivos de aprendizaje
Diseñar e implementar un sistema orientado a objetos combinando clases, excepciones, colecciones y ciclos infinitos.
Construir una interfaz interactiva de línea de comandos (CLI).
Consolidar los conceptos básicos y avanzados en un único script funcional.
5. Contenido teórico
Conceptos: Un proyecto backend consolida el conocimiento. En este nivel, la organización del código es tan importante como la sintaxis. El modelo de negocio se abstrae en clases robustas.
Sintaxis: Integración de class, dict, try-except, while True, y format().
Buenas prácticas: Validar todos los inputs del usuario (Principio Zero Trust). Mantener el controlador principal (el main loop) corto delegando el trabajo a métodos de los objetos.
Errores comunes: Mezclar lógica de interfaz (prints/inputs) directamente dentro de las reglas de negocio en métodos internos que no deberían manejar entrada/salida.
6. Ejemplos de código comentados
(Resumen del patrón a aplicar)
Python
class Sistema:
    def procesar(self, comando):
        if comando == "salir":
            raise StopIteration
            
def main():
    s = Sistema()
    while True:
        try:
            s.procesar(input())
        except StopIteration:
            break

7. Ejercicio práctico
Enunciado: Construye un sistema simplificado. Crea una clase TaskManager. Debe encapsular un diccionario tareas = {}. Agrega un método agregar(id, titulo) que lo guarde en el diccionario. Agrega un método mostrar() que imprima en orden de ingreso el id y titulo separados por guion (ej: 1 - Comprar pan). En la lógica principal, lee un entero N, e itera N veces pidiendo en cada vuelta id (int) y titulo (string, ambos leídos en líneas separadas vía input). Finalmente, llama a mostrar(). Protege la conversión de id con un try-except ignorando (con pass) las iteraciones con error. Código inicial:
Python
# Implementa tu TaskManager y la lógica principal aquí


Solución esperada:
Python
class TaskManager:
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

manager.mostrar()

Casos de prueba:
Caso 1: Input: 2 \n 1 \n Setup \n 2 \n Deploy | Output: 1 - Setup\n2 - Deploy\n
Caso 2: Input: 2 \n a \n Fallo \n 3 \n Testing | Output: 3 - Testing\n (El error ignoró 'a')
Caso 3: Input: 0 | Output: \n (No hace nada) Pistas progresivas:
Inicializa self.tareas = {} en el constructor de TaskManager.
Al pedir las variables en tu loop principal for _ in range(n):, coloca todo el bloque dentro de un try.
Usa except ValueError: seguido de un simple pass para que el programa sobreviva si el id no es un entero.
8. Criterio de aprobación de la lección
La aplicación CLI de tareas debe ejecutarse a prueba de fallos de input, modelando el estado con POO y despachando la lista de tareas exitosamente bajo cualquier caso de prueba.
9. Tiempo estimado de la lección
180 minutos
10. Puntaje máximo de la lección
500 pts


