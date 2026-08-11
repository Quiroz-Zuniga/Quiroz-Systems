Quiroz Systems — SQL
Descripción del curso: El curso "Quiroz Systems — SQL" te capacitará para dominar el Lenguaje de Consulta Estructurada (SQL). Partiendo de los fundamentos de la extracción de datos, avanzarás hacia el diseño relacional, manipulación de esquemas y construcción de consultas analíticas complejas. Las lecciones están optimizadas para el motor SQLite (estándar ligero y compatible con entornos web/móviles), sentando bases 100% transferibles a motores robustos como MySQL o PostgreSQL.
Nivel objetivo: Cero absoluto a Experto. Prerequisitos: Ninguno. Lógica matemática básica es recomendada. Duración estimada total: 40 horas.
Resultados de aprendizaje (Learning Outcomes):
Comprender la arquitectura de bases de datos relacionales y el modelo entidad-relación.
Escribir consultas de selección dinámicas utilizando filtros, agrupaciones y ordenamientos.
Modificar el esquema de la base de datos (DDL) y manipular registros (DML).
Diseñar e implementar consultas multitabla complejas utilizando la familia de operaciones JOIN.
Construir reportes analíticos utilizando subconsultas y funciones de agregación.
Diseñar el modelo relacional para una plataforma digital multiusuario.
Tabla de Contenido
Lección 1: Introducción a Bases de Datos y SELECT (Básico)
Lección 2: Filtrado de datos con WHERE (Básico)
Lección 3: Ordenamiento y Limitación (ORDER BY, LIMIT) (Básico)
Lección 4: Funciones de Agregación (COUNT, SUM, AVG) (Básico)
Lección 5: Agrupación de datos con GROUP BY y HAVING (Intermedio)
Lección 6: Definición de Datos (CREATE TABLE) (Intermedio)
Lección 7: Inserción de Datos (INSERT INTO) (Intermedio)
Lección 8: Actualización y Borrado Seguro (UPDATE, DELETE) (Intermedio)
Lección 9: Consultas Multitabla I (INNER JOIN) (Avanzado)
Lección 10: Consultas Multitabla II (LEFT JOIN) (Avanzado)
Lección 11: Subconsultas y Tablas Derivadas (Avanzado)
Lección 12: Lógica Condicional con CASE WHEN (Avanzado)
Lección 13: Funciones de Texto y Fechas (Experto)
Lección 14: Restricciones y Claves Foráneas (Experto)
Lección 15: Proyecto Integrador: Plataforma Sentinel (Experto)
Lección 1: Introducción a Bases de Datos y SELECT
1. ID de lección
sql-01
2. Título
Introducción a Bases de Datos y SELECT
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar qué es una base de datos relacional y una tabla.
Utilizar la sentencia SELECT para consultar datos.
Proyectar columnas específicas frente a todas las columnas (*).
5. Contenido teórico
Conceptos: Una base de datos relacional organiza los datos en tablas (filas y columnas). SQL es el lenguaje estándar para comunicarse con ellas.
Sintaxis: SELECT columna1, columna2 FROM nombre_tabla;. Para traer todo: SELECT * FROM nombre_tabla;.
Buenas prácticas: Evitar usar SELECT * en entornos de producción si la tabla tiene docenas de columnas, ya que consume memoria innecesaria. Especificar siempre los nombres de las columnas.
Errores comunes: Olvidar el punto y coma (;) al final de la consulta. Escribir mal el nombre de la tabla (Table not found).
6. Ejemplos de código comentados
Ejemplo 1: Seleccionar todo
SQL
-- El asterisco (*) proyecta todas las columnas de la tabla usuarios
SELECT * FROM usuarios;

Ejemplo 2: Selección específica
SQL
-- Trae únicamente las columnas username y rol, optimizando la lectura
SELECT username, rol FROM usuarios;

7. Ejercicio práctico
Enunciado: Tienes una tabla llamada comite_ejecutivo. Escribe una consulta SQL que devuelva únicamente las columnas nombre y cargo de todos los miembros del comité.
Esquema y Datos de Prueba:
SQL
CREATE TABLE comite_ejecutivo (id INTEGER PRIMARY KEY, nombre TEXT, cargo TEXT, experiencia_anios INTEGER);
INSERT INTO comite_ejecutivo VALUES (1, 'Rubén Quiroz', 'Presidente', 3);
INSERT INTO comite_ejecutivo VALUES (2, 'Víctor López', 'Vicepresidente', 2);
INSERT INTO comite_ejecutivo VALUES (3, 'Eduardo Ávila', 'Tesorero', 2);
INSERT INTO comite_ejecutivo VALUES (4, 'Josué Hernández', 'Secretario', 1);

Código inicial:
SQL
-- Escribe tu consulta SELECT aquí


Solución esperada:
SQL
SELECT nombre, cargo FROM comite_ejecutivo;

Casos de prueba:
Caso 1: Validar que las columnas retornadas sean exactamente nombre y cargo.
Caso 2: Verificar que la cantidad de filas retornadas sea 4.
Caso 3: Comprobar la ausencia del asterisco *.
Pistas progresivas:
La instrucción inicia con la palabra reservada SELECT.
Escribe los nombres de las columnas separados por coma: nombre, cargo.
Termina indicando la tabla: FROM comite_ejecutivo;.
8. Criterio de aprobación de la lección
La consulta se ejecuta correctamente contra SQLite devolviendo exactamente las dos columnas solicitadas para todos los registros.
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 2: Filtrado de datos con WHERE
1. ID de lección
sql-02
2. Título
Filtrado de datos con WHERE
3. Nivel
Básico
4. Objetivos de aprendizaje
Implementar la cláusula WHERE para restringir filas.
Utilizar operadores relacionales (=, >, <, >=, <=, <>).
Combinar condiciones lógicas con AND, OR y NOT.
5. Contenido teórico
Conceptos: Rara vez queremos extraer toda la tabla. WHERE actúa como un filtro que evalúa una condición booleana para cada fila.
Sintaxis: SELECT columnas FROM tabla WHERE condicion;
Buenas prácticas: En cadenas de texto (Strings), el motor SQL utiliza comillas simples 'texto', no dobles. Usar paréntesis para agrupar lógica cuando mezclas AND y OR (ej. WHERE (A OR B) AND C).
Errores comunes: Usar el doble igual == como en otros lenguajes; en SQL el operador de igualdad es un solo igual =. Diferente es <> o !=.
6. Ejemplos de código comentados
Ejemplo 1: Filtrado exacto y numérico
SQL
SELECT nombre, precio 
FROM productos 
WHERE precio > 100 AND categoria = 'Tecnología';

Ejemplo 2: Operador OR
SQL
SELECT id, estado 
FROM tareas 
WHERE estado = 'Pendiente' OR estado = 'En Progreso';

7. Ejercicio práctico
Enunciado: La tabla desarrolladores almacena el equipo. Selecciona el nombre y el lenguaje_principal de los desarrolladores cuyo sistema operativo (os) sea estrictamente 'Linux' AND tengan 20 años o más de edad.
Esquema y Datos de Prueba:
SQL
CREATE TABLE desarrolladores (id INTEGER, nombre TEXT, lenguaje_principal TEXT, os TEXT, edad INTEGER);
INSERT INTO desarrolladores VALUES (1, 'Rubén', 'Python', 'Linux', 23);
INSERT INTO desarrolladores VALUES (2, 'Eny', 'JavaScript', 'Windows', 22);
INSERT INTO desarrolladores VALUES (3, 'Carlos', 'Java', 'Linux', 19);
INSERT INTO desarrolladores VALUES (4, 'Ana', 'C++', 'Linux', 25);

Código inicial:
SQL
-- Tu consulta SELECT con WHERE aquí


Solución esperada:
SQL
SELECT nombre, lenguaje_principal 
FROM desarrolladores 
WHERE os = 'Linux' AND edad >= 20;

Casos de prueba:
Caso 1: Output esperado: ['Rubén', 'Python'] y ['Ana', 'C++'].
Caso 2: Carlos no debe aparecer porque su edad es 19. Eny no debe aparecer porque su OS es Windows.
Caso 3: Validar sintaxis con uso de AND y operador >=.
Pistas progresivas:
Inicia con SELECT nombre, lenguaje_principal FROM desarrolladores.
Añade WHERE os = 'Linux'. Las comillas simples son obligatorias.
Añade AND edad >= 20;.
8. Criterio de aprobación de la lección
Proyección de datos condicionada matemáticamente y mediante cadenas de texto precisas.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 3: Ordenamiento y Limitación (ORDER BY, LIMIT)
1. ID de lección
sql-03
2. Título
Ordenamiento y Limitación (ORDER BY, LIMIT)
3. Nivel
Básico
4. Objetivos de aprendizaje
Ordenar los resultados de un conjunto de datos (Ascendente/Descendente).
Restringir la cantidad total de resultados retornados usando LIMIT.
Explicar el orden de ejecución de estas sentencias en SQL.
5. Contenido teórico
Conceptos: Las tablas relacionales no garantizan un orden de lectura. ORDER BY fuerza la ordenación de las filas. LIMIT (común en SQLite, MySQL y PostgreSQL) corta los resultados a las primeras N filas.
Sintaxis: ORDER BY columna ASC|DESC, LIMIT cantidad.
Buenas prácticas: El orden de las cláusulas es estricto: SELECT -> FROM -> WHERE -> ORDER BY -> LIMIT.
Errores comunes: Poner el LIMIT antes del ORDER BY o antes del WHERE causa un error de sintaxis del motor.
6. Ejemplos de código comentados
Ejemplo 1: Ordenamiento descendente
SQL
-- Traemos los 5 productos más caros
SELECT nombre, precio 
FROM catalogo 
ORDER BY precio DESC 
LIMIT 5;

7. Ejercicio práctico
Enunciado: La tabla articulos almacena publicaciones de un blog. Escribe una consulta que seleccione TODAS (*) las columnas de los artículos, ordenados por la columna visitas de mayor a menor (descendente). Muestra únicamente el Top 3 de artículos más visitados.
Esquema y Datos de Prueba:
SQL
CREATE TABLE articulos (id INTEGER, titulo TEXT, visitas INTEGER);
INSERT INTO articulos VALUES (1, 'Bases de IA', 1500);
INSERT INTO পণ্ডিত VALUES (2, 'Lanzamiento de Sentinel', 8500);
INSERT INTO articulos VALUES (3, 'Guía de Debian', 2300);
INSERT INTO articulos VALUES (4, 'Desarrollo en Antigravity', 4200);
INSERT INTO articulos VALUES (5, 'Eventos DevFest', 1100);

(Corrección en set de datos para motor interno: INSERT INTO articulos VALUES...)
Código inicial:
SQL
-- Modifica esta consulta
SELECT * FROM articulos;

Solución esperada:
SQL
SELECT * FROM articulos 
ORDER BY visitas DESC 
LIMIT 3;

Casos de prueba:
Caso 1: Output esperado: IDs 2, 4 y 3 en ese orden estricto.
Caso 2: Validar que se retornan exactamente 3 filas.
Caso 3: Validar la presencia del comando DESC.
Pistas progresivas:
Después de la tabla, añade ORDER BY visitas DESC.
Finalmente, para cortar a 3 resultados, añade LIMIT 3; al final.
No se requiere cláusula WHERE en este caso.
8. Criterio de aprobación de la lección
Alteración exitosa del orden de los resultados y aplicación de límites de paginación o extracción de Top N.
9. Tiempo estimado de la lección
40 minutos
10. Puntaje máximo de la lección
100 pts
Lección 4: Funciones de Agregación (COUNT, SUM, AVG)
1. ID de lección
sql-04
2. Título
Funciones de Agregación (COUNT, SUM, AVG, MAX, MIN)
3. Nivel
Básico
4. Objetivos de aprendizaje
Implementar funciones que calculan un solo valor escalar a partir de múltiples filas.
Calcular conteos, sumatorias, promedios y valores extremos.
Renombrar columnas resultantes usando el alias AS.
5. Contenido teórico
Conceptos: Las funciones de agregación toman una columna entera de resultados y la colapsan en una sola métrica analítica.
Sintaxis: SELECT SUM(columna) AS total FROM tabla;
Buenas prácticas: Utilizar la palabra reservada AS para que la nueva columna calculada tenga un nombre legible en el reporte (ej. AVG(precio) AS precio_promedio).
Errores comunes: Intentar seleccionar una columna normal junto con una función de agregación sin usar GROUP BY (ej. SELECT nombre, SUM(precio) FROM tabla; devolverá datos inconsistentes o error dependiendo del motor).
6. Ejemplos de código comentados
Ejemplo 1: Múltiples agregaciones
SQL
-- Colapsa toda la tabla en un solo renglón con tres métricas
SELECT 
    COUNT(id) AS total_usuarios,
    MAX(edad) AS usuario_mas_viejo,
    AVG(edad) AS edad_promedio
FROM usuarios;

7. Ejercicio práctico
Enunciado: La tabla gastos_personales guarda los egresos del mes. Crea un reporte de una sola fila que devuelva tres métricas: la suma de todos los montos (como total_gastado), el gasto máximo realizado (como gasto_maximo), y la cantidad total de registros (como transacciones).
Esquema y Datos de Prueba:
SQL
CREATE TABLE gastos_personales (id INTEGER, concepto TEXT, monto REAL);
INSERT INTO gastos_personales VALUES (1, 'Supermercado', 150.50);
INSERT INTO gastos_personales VALUES (2, 'Internet', 45.00);
INSERT INTO gastos_personales VALUES (3, 'Libros', 30.00);
INSERT INTO gastos_personales VALUES (4, 'Café', 15.00);

Código inicial:
SQL
-- Escribe tus funciones de agregación
SELECT 
    
FROM gastos_personales;

Solución esperada:
SQL
SELECT 
    SUM(monto) AS total_gastado,
    MAX(monto) AS gasto_maximo,
    COUNT(id) AS transacciones
FROM gastos_personales;

Casos de prueba:
Caso 1: Output retorna 1 sola fila: [240.50, 150.50, 4].
Caso 2: Verificar el uso correcto de los alias definidos (AS).
Caso 3: Validar la presencia de las funciones SUM, MAX y COUNT.
Pistas progresivas:
Usa SUM(monto) AS total_gastado,.
Sigue con MAX(monto) AS gasto_maximo,.
Termina la selección con COUNT(id) AS transacciones (no pongas coma al final del último campo).
8. Criterio de aprobación de la lección
Generación de métricas analíticas globales usando alias semánticos sin errores de sintaxis.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 5: Agrupación de datos con GROUP BY y HAVING
1. ID de lección
sql-05
2. Título
Agrupación de datos con GROUP BY y HAVING
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Particionar datos en grupos lógicos usando GROUP BY.
Aplicar funciones de agregación independientes para cada grupo.
Filtrar grupos calculados utilizando la cláusula HAVING.
5. Contenido teórico
Conceptos: Mientras que la agregación pura colapsa la tabla en una fila, GROUP BY crea "sub-tablas" por cada valor único de una columna y aplica la agregación a cada una. HAVING es el equivalente a WHERE pero actúa sobre las agrupaciones ya calculadas, no sobre filas individuales.
Sintaxis: SELECT categoria, COUNT(*) FROM tabla GROUP BY categoria HAVING COUNT(*) > 5;
Buenas prácticas: Toda columna en el SELECT que no sea una función de agregación (ej. SUM, COUNT) DEBE aparecer explícitamente dentro del GROUP BY.
Errores comunes: Intentar usar funciones de agregación dentro del WHERE (ej. WHERE COUNT(id) > 10). Las agregaciones siempre se filtran con HAVING.
6. Ejemplos de código comentados
Ejemplo 1: Group By y Having
SQL
SELECT departamento, AVG(salario) AS salario_medio
FROM empleados
GROUP BY departamento
HAVING AVG(salario) > 1500; -- Filtra los departamentos cuyo promedio sea mayor a 1500

7. Ejercicio práctico
Enunciado: La tabla miembros_catracode registra los lenguajes de los desarrolladores. Escribe una consulta que devuelva el lenguaje_principal y la cantidad de miembros que lo usan (con el alias cantidad). Usa GROUP BY. Agrega un HAVING para mostrar SOLO los lenguajes que tengan 2 o más miembros.
Esquema y Datos de Prueba:
SQL
CREATE TABLE miembros_catracode (nombre TEXT, lenguaje_principal TEXT);
INSERT INTO miembros_catracode VALUES ('Rubén', 'Python');
INSERT INTO miembros_catracode VALUES ('Víctor', 'Java');
INSERT INTO miembros_catracode VALUES ('Eduardo', 'Python');
INSERT INTO miembros_catracode VALUES ('Josué', 'JavaScript');
INSERT INTO miembros_catracode VALUES ('Eny', 'JavaScript');
INSERT INTO miembros_catracode VALUES ('Carlos', 'C++');

Código inicial:
SQL
-- Tu agrupacion aqui


Solución esperada:
SQL
SELECT lenguaje_principal, COUNT(nombre) AS cantidad
FROM miembros_catracode
GROUP BY lenguaje_principal
HAVING COUNT(nombre) >= 2;

Casos de prueba:
Caso 1: Output esperado: ['Python', 2] y ['JavaScript', 2]. Java y C++ son excluidos.
Caso 2: Validar existencia de la cláusula GROUP BY lenguaje_principal.
Caso 3: Validar la cláusula condicional HAVING filtrando la métrica matemática.
Pistas progresivas:
SELECT lenguaje_principal, COUNT(nombre) AS cantidad FROM miembros_catracode
Luego debes agrupar: GROUP BY lenguaje_principal
Finalmente filtra los grupos: HAVING COUNT(nombre) >= 2;
8. Criterio de aprobación de la lección
Separar dimensionalmente los datos y filtrar el dataset post-agregación correctamente.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 6: Definición de Datos (CREATE TABLE)
1. ID de lección
sql-06
2. Título
Definición de Datos (CREATE TABLE)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Ejecutar sentencias DDL (Data Definition Language).
Definir columnas, tipos de datos y restricciones (Constraints) como PRIMARY KEY.
Evitar errores de sobrescritura con IF NOT EXISTS.
5. Contenido teórico
Conceptos: SQL no solo lee datos, también estructura la base. SQLite soporta tipos básicos: INTEGER, TEXT, REAL (decimales), y BLOB (binarios).
Sintaxis: CREATE TABLE nombre_tabla (columna1 TIPO, columna2 TIPO);
Buenas prácticas: Toda tabla relacional debe tener una Llave Primaria (PRIMARY KEY), un identificador único, usualmente numérico y autoincremental, para distinguir cada fila sin ambigüedades.
Errores comunes: Omitir las comas al definir múltiples columnas. Error de sintaxis por usar palabras reservadas de SQL como nombre de columna sin escaparlas.
6. Ejemplos de código comentados
Ejemplo 1: Creación de tabla base
SQL
CREATE TABLE IF NOT EXISTS proyectos (
    id INTEGER PRIMARY KEY, -- Clave primaria (autoincremental por defecto en SQLite)
    nombre TEXT NOT NULL,   -- El campo no puede quedar vacío
    presupuesto REAL,
    activo BOOLEAN          -- En SQLite se almacena como 0 o 1
);

7. Ejercicio práctico
Enunciado: Crea una tabla llamada guarderias. Debe tener las siguientes tres columnas con sus tipos correctos en este orden exacto: id (entero, llave primaria), nombre (texto, no nulo), y capacidad (entero).
Esquema y Datos de Prueba: (Para este ejercicio el esquema lo define el usuario. El test verifica la estructura.)
Código inicial:
SQL
-- Escribe tu sentencia DDL (CREATE TABLE)
CREATE 

Solución esperada:
SQL
CREATE TABLE guarderias (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    capacidad INTEGER
);

Casos de prueba:
Caso 1: La tabla guarderias se crea con éxito en el motor.
Caso 2: La columna id tiene la restricción PRIMARY KEY.
Caso 3: La columna nombre tiene restricción NOT NULL.
Pistas progresivas:
CREATE TABLE guarderias (
Define la primera columna: id INTEGER PRIMARY KEY,
Cierra el paréntesis al final de la tercera columna y coloca punto y coma.
8. Criterio de aprobación de la lección
La tabla se instancia en el esquema de la base de datos sin errores DDL.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 7: Inserción de Datos (INSERT INTO)
1. ID de lección
sql-07
2. Título
Inserción de Datos (INSERT INTO)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Ejecutar sentencias DML (Data Manipulation Language) de inserción.
Insertar registros individuales y múltiples simultáneamente.
Comprender la omisión de columnas autoincrementales y nulas.
5. Contenido teórico
Conceptos: INSERT INTO agrega nuevas filas a una tabla. Puedes especificar a qué columnas les darás valores. Si omites columnas, SQL insertará NULL o el valor por defecto configurado.
Sintaxis: INSERT INTO tabla (col1, col2) VALUES (val1, val2);
Buenas prácticas: Declarar explícitamente los nombres de las columnas antes de los VALUES. Esto protege tu código (evita bugs) si la estructura de la tabla cambia en el futuro (ej. alguien añade una nueva columna).
Errores comunes: Column count doesn't match value count. Intentar insertar 3 valores cuando solo se declararon 2 columnas. Olvidar poner las comillas simples a los textos.
6. Ejemplos de código comentados
Ejemplo 1: Múltiples inserciones
SQL
-- Se omite el 'id' asumiendo que es PRIMARY KEY Autoincremental
INSERT INTO usuarios (username, edad) 
VALUES 
    ('quirozdev', 23),
    ('admin_sys', 30);

7. Ejercicio práctico
Enunciado: Tienes una tabla certificaciones con las columnas id, nombre y fecha_emision. Inserta un único registro especificando explícitamente el id como 101, el nombre como 'DevFest 2024', y la fecha como '2024-11-23'.
Esquema y Datos de Prueba:
SQL
CREATE TABLE certificaciones (id INTEGER PRIMARY KEY, nombre TEXT, fecha_emision TEXT);
-- El ejercicio ejecutará el INSERT del usuario y validará la tabla.

Código inicial:
SQL
-- Tu comando INSERT aquí


Solución esperada:
SQL
INSERT INTO certificaciones (id, nombre, fecha_emision) 
VALUES (101, 'DevFest 2024', '2024-11-23');

Casos de prueba:
Caso 1: El registro 101 existe en la tabla y los strings coinciden.
Caso 2: Verificar sintaxis de lista de columnas explícita (id, nombre, fecha_emision).
Caso 3: Validar la palabra reservada VALUES.
Pistas progresivas:
INSERT INTO certificaciones (id, nombre, fecha_emision)
Luego la instrucción VALUES
Los valores de texto van entre comillas simples: (101, 'DevFest 2024', '2024-11-23');.
8. Criterio de aprobación de la lección
La tabla almacena el nuevo registro con los tipos de datos correctos e IDs consistentes.
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 8: Actualización y Borrado Seguro (UPDATE, DELETE)
1. ID de lección
sql-08
2. Título
Actualización y Borrado Seguro (UPDATE, DELETE)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Modificar registros existentes con la cláusula UPDATE.
Eliminar registros con la sentencia DELETE.
Aplicar invariablemente la cláusula WHERE para evitar catástrofes en la base de datos.
5. Contenido teórico
Conceptos: UPDATE muta los datos. DELETE elimina la fila. Ambas operaciones son peligrosas porque, a diferencia del código, en SQL transaccional confirmado (autocommit), borrar una tabla sin filtro destruye la data permanentemente.
Sintaxis: UPDATE tabla SET col = valor WHERE condicion;, DELETE FROM tabla WHERE condicion;.
Buenas prácticas: Nunca ejecutes un UPDATE o DELETE sin un WHERE. Una práctica corporativa es hacer un SELECT previo con la misma cláusula WHERE para visualizar exactamente las filas que serán afectadas antes de disparar el borrado. El "Borrado Lógico" (UPDATE activo = 0) se prefiere al borrado físico (DELETE).
Errores comunes: Omitir el WHERE. Escribir mal la condición borrando/actualizando múltiples filas accidentalmente.
6. Ejemplos de código comentados
Ejemplo 1: Update Seguro
SQL
-- Actualiza la nota solo del estudiante con id exacto
UPDATE alumnos 
SET nota_final = 95, estado = 'Aprobado' 
WHERE id = 42;

Ejemplo 2: Delete Seguro
SQL
-- Elimina los registros temporales
DELETE FROM logs 
WHERE fecha < '2025-01-01';

7. Ejercicio práctico
Enunciado: En la tabla pasantes, Mercaplan Honduras ha finalizado el periodo de pasantía de un usuario. Actualiza el estado a 'Finalizado' para el pasante cuyo id es exactamente 5.
Esquema y Datos de Prueba:
SQL
CREATE TABLE pasantes (id INTEGER PRIMARY KEY, nombre TEXT, estado TEXT);
INSERT INTO pasantes VALUES (4, 'Juan', 'Activo');
INSERT INTO pasantes VALUES (5, 'Rubén', 'Activo');
INSERT INTO pasantes VALUES (6, 'María', 'Activo');

Código inicial:
SQL
-- Ejecuta tu UPDATE aquí


Solución esperada:
SQL
UPDATE pasantes 
SET estado = 'Finalizado' 
WHERE id = 5;

Casos de prueba:
Caso 1: El pasante con ID 5 tiene estado 'Finalizado'.
Caso 2: Los pasantes 4 y 6 mantienen el estado 'Activo' (Validación de borrado masivo prevenido).
Caso 3: Sintaxis de SET y WHERE presentes.
Pistas progresivas:
Inicia con UPDATE pasantes.
Indica la mutación: SET estado = 'Finalizado'.
¡Protégete con el filtro! WHERE id = 5;.
8. Criterio de aprobación de la lección
Mutación precisa del registro objetivo aislando el resto de los datos sanos del sistema.
9. Tiempo estimado de la lección
40 minutos
10. Puntaje máximo de la lección
100 pts
Lección 9: Consultas Multitabla I (INNER JOIN)
1. ID de lección
sql-09
2. Título
Consultas Multitabla I (INNER JOIN)
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Entender el problema de la normalización de datos (evitar duplicidad dividiendo en tablas).
Relacionar dos tablas vinculando Primary Keys (PK) y Foreign Keys (FK).
Ejecutar la cláusula INNER JOIN para obtener la intersección de datos.
5. Contenido teórico
Conceptos: Una base de datos relacional separa los datos lógicamente. Un autor está en la tabla autores, sus artículos en la tabla articulos. El INNER JOIN junta las filas de ambas tablas donde exista una coincidencia basada en una columna común (la clave foránea).
Sintaxis: SELECT A.col, B.col FROM Tabla1 A INNER JOIN Tabla2 B ON A.id = B.fk_id;
Buenas prácticas: Utilizar Alias de tablas (ej. FROM usuarios u) para mantener la consulta limpia y resolver ambigüedades cuando dos tablas tienen una columna con el mismo nombre (ej. u.id vs p.id).
Errores comunes: Ambiguous column name. Ocurre al solicitar una columna id sin especificar de qué tabla proviene cuando ambas tablas cruzadas tienen una columna llamada id.
6. Ejemplos de código comentados
Ejemplo 1: Cruce de tablas
SQL
-- 'c' y 'p' son alias de clientes y pedidos
SELECT c.nombre, p.fecha_compra, p.total
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id; -- Regla de coincidencia

7. Ejercicio práctico
Enunciado: Tienes una tabla roles y una tabla usuarios. Muestra el username del usuario y el nombre_rol que posee. Haz un INNER JOIN conectando usuarios.rol_id con roles.id.
Esquema y Datos de Prueba:
SQL
CREATE TABLE roles (id INTEGER PRIMARY KEY, nombre_rol TEXT);
INSERT INTO roles VALUES (1, 'Administrador');
INSERT INTO roles VALUES (2, 'Editor');

CREATE TABLE usuarios (id INTEGER PRIMARY KEY, username TEXT, rol_id INTEGER);
INSERT INTO usuarios VALUES (101, 'quirozdev', 1);
INSERT INTO usuarios VALUES (102, 'eny_editor', 2);

Código inicial:
SQL
-- Escribe tu consulta con INNER JOIN
SELECT 
    
FROM usuarios u

Solución esperada:
SQL
SELECT u.username, r.nombre_rol
FROM usuarios u
INNER JOIN roles r ON u.rol_id = r.id;

Casos de prueba:
Caso 1: Output: ['quirozdev', 'Administrador'] y ['eny_editor', 'Editor'].
Caso 2: Uso explícito de la condición relacional ON.
Caso 3: Resolución de ambigüedades mediante alias u y r.
Pistas progresivas:
Continúa el FROM añadiendo: INNER JOIN roles r.
Especifica cómo se conectan: ON u.rol_id = r.id.
En tu SELECT pon: u.username, r.nombre_rol.
8. Criterio de aprobación de la lección
Unión y proyección analítica transversal de entidades separadas relacionalmente por llaves foráneas.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 10: Consultas Multitabla II (LEFT JOIN)
1. ID de lección
sql-10
2. Título
Consultas Multitabla II (LEFT JOIN)
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Diferenciar entre los retornos exclusivos de INNER JOIN e inclusivos de LEFT JOIN.
Obtener todos los registros de la tabla izquierda, incluso sin coincidencias en la derecha.
Manejar los valores NULL resultantes de las asociaciones vacías.
5. Contenido teórico
Conceptos: Si en un INNER JOIN un usuario no tiene pedidos, el usuario desaparece del resultado final. Un LEFT JOIN (o LEFT OUTER JOIN) preserva todas las filas de la tabla de la izquierda (la primera que declaras en el FROM), rellenando con NULL los datos de la tabla derecha si no hay coincidencia.
Sintaxis: FROM Izquierda L LEFT JOIN Derecha R ON L.id = R.fk;
Buenas prácticas: Utilizar LEFT JOIN con WHERE R.id IS NULL es el método estándar y más eficiente para encontrar "Registros Huérfanos" (ej. Usuarios que nunca han hecho una compra).
Errores comunes: Usar LEFT JOIN y luego agregar un filtro en el WHERE sobre la tabla de la derecha (ej. WHERE R.estado = 'Activo'). Esto implícitamente convierte el LEFT JOIN en un INNER JOIN, rompiendo la lógica inclusiva.
6. Ejemplos de código comentados
Ejemplo 1: Left Join Básico
SQL
-- Trae TODOS los clientes. Si no tienen vehículo asignado, muestra NULL.
SELECT c.nombre, v.modelo 
FROM clientes c 
LEFT JOIN vehiculos v ON c.vehiculo_id = v.id;

7. Ejercicio práctico
Enunciado: La tabla proyectos tiene proyectos planeados, y asignaciones guarda quién está trabajando en ellos. Queremos ver TODOS los proyectos, tengan asignación o no. Haz un LEFT JOIN entre proyectos (izquierda) y asignaciones (derecha). Proyecta el nombre_proyecto y el encargado.
Esquema y Datos de Prueba:
SQL
CREATE TABLE proyectos (id INTEGER PRIMARY KEY, nombre_proyecto TEXT);
INSERT INTO proyectos VALUES (1, 'Plataforma Sentinel');
INSERT INTO proyectos VALUES (2, 'App Guardería');
INSERT INTO proyectos VALUES (3, 'HTML 30 Day Challenge');

CREATE TABLE asignaciones (proyecto_id INTEGER, encargado TEXT);
INSERT INTO asignaciones VALUES (1, 'Víctor López');
INSERT INTO asignaciones VALUES (3, 'Rubén Quiroz');

Código inicial:
SQL
-- Construye tu LEFT JOIN


Solución esperada:
SQL
SELECT p.nombre_proyecto, a.encargado
FROM proyectos p
LEFT JOIN asignaciones a ON p.id = a.proyecto_id;

Casos de prueba:
Caso 1: 'App Guardería' debe aparecer en el listado con un encargado NULL.
Caso 2: Output de 3 filas totales (El INNER JOIN daría solo 2).
Caso 3: Validar sintaxis relacional con LEFT JOIN.
Pistas progresivas:
SELECT p.nombre_proyecto, a.encargado FROM proyectos p
LEFT JOIN asignaciones a
ON p.id = a.proyecto_id;
8. Criterio de aprobación de la lección
Preservación del dataset principal detectando ausencias de relación externa (generación de nulos estructurales).
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 11: Subconsultas y Tablas Derivadas
1. ID de lección
sql-11
2. Título
Subconsultas y Tablas Derivadas
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Anidar instrucciones SELECT dentro de otras cláusulas (WHERE, FROM, SELECT).
Comparar valores contra el resultado dinámico de otra tabla.
Optimizar sentencias evitando la lógica repetitiva.
5. Contenido teórico
Conceptos: Una subconsulta es un query envuelto en paréntesis dentro de otro query. Son increíblemente útiles para filtros dinámicos en donde el parámetro de comparación es desconocido o requiere calcularse antes.
Sintaxis: SELECT * FROM T1 WHERE valor > (SELECT AVG(valor) FROM T1);
Buenas prácticas: Las subconsultas en el WHERE que utilizan operadores como = o > DEBEN devolver una sola columna y un solo registro escalar. Si devuelven una lista, se debe utilizar el operador IN.
Errores comunes: Subquery returns more than 1 row. Ocurre al usar un comparador de escalares (como igual =) cuando la subconsulta arroja toda una columna de datos.
6. Ejemplos de código comentados
Ejemplo 1: Subconsulta en WHERE
SQL
-- 1. Se ejecuta primero el query interno para hallar el ID de 'Sistemas'
-- 2. El query externo usa ese ID para filtrar los empleados
SELECT nombre 
FROM empleados 
WHERE departamento_id = (SELECT id FROM departamentos WHERE nombre = 'Sistemas');

7. Ejercicio práctico
Enunciado: Muestra el nombre y nota de los estudiantes cuya nota es MAYOR que el promedio general de la clase. Usa una subconsulta para calcular dinámicamente ese promedio.
Esquema y Datos de Prueba:
SQL
CREATE TABLE evaluaciones (nombre TEXT, nota REAL);
INSERT INTO evaluaciones VALUES ('Carlos', 60);
INSERT INTO evaluaciones VALUES ('Josué', 95);
INSERT INTO evaluaciones VALUES ('Ana', 70);
INSERT INTO evaluaciones VALUES ('Rubén', 90);
-- Promedio de la clase = 78.75. Mayor que promedio = Josué, Rubén.

Código inicial:
SQL
-- Escribe tu consulta principal y anida la subconsulta en el WHERE
SELECT 


Solución esperada:
SQL
SELECT nombre, nota 
FROM evaluaciones 
WHERE nota > (SELECT AVG(nota) FROM evaluaciones);

Casos de prueba:
Caso 1: Output retorna a 'Josué' y 'Rubén'.
Caso 2: Evaluar el operador de comparación >.
Caso 3: Constatar la existencia de paréntesis de anidamiento de sub-query (SELECT AVG... ).
Pistas progresivas:
SELECT nombre, nota FROM evaluaciones WHERE nota >
Abre paréntesis para la subconsulta.
Adentro escribe: SELECT AVG(nota) FROM evaluaciones. Cierra paréntesis.
8. Criterio de aprobación de la lección
Resolución de métricas analíticas anidadas para filtros en tiempo de ejecución.
9. Tiempo estimado de la lección
75 minutos
10. Puntaje máximo de la lección
100 pts
Lección 12: Lógica Condicional con CASE WHEN
1. ID de lección
sql-12
2. Título
Lógica Condicional con CASE WHEN
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Implementar bifurcación de lógica nativa dentro de consultas (If-Else de SQL).
Clasificar o transformar datos resultantes en tiempo de ejecución.
Crear nuevas dimensiones y categorizaciones para reportería.
5. Contenido teórico
Conceptos: CASE evalúa condiciones lógicas fila por fila y asigna valores derivados (transformaciones) en los resultados de la consulta, sin alterar la base de datos subyacente.
Sintaxis: CASE WHEN condicion1 THEN resultado1 ELSE default END
Buenas prácticas: Utilizar un alias después de la palabra clave END (ej. END AS clasificacion) para que la columna calculada tenga un título amigable. Siempre colocar una cláusula ELSE para manejar los datos no previstos.
Errores comunes: Olvidar la palabra clave END, lo cual causa un Syntax Error fatal y la caída total de la query.
6. Ejemplos de código comentados
Ejemplo 1: Categorización Dinámica
SQL
SELECT nombre, precio,
    CASE 
        WHEN precio > 1000 THEN 'Premium'
        WHEN precio > 100 THEN 'Gama Media'
        ELSE 'Económico'
    END AS categoria_precio
FROM productos;

7. Ejercicio práctico
Enunciado: Modifica la tabla transacciones. Devuelve las columnas concepto, monto, y una nueva columna llamada alerta usando un CASE WHEN. Si el monto es mayor a 1000, la alerta debe decir 'Gasto Fuerte'. Si es menor o igual, debe decir 'Normal'.
Esquema y Datos de Prueba:
SQL
CREATE TABLE transacciones (concepto TEXT, monto REAL);
INSERT INTO transacciones VALUES ('Licencia Server', 1500.00);
INSERT INTO transacciones VALUES ('Dominio web', 15.50);
INSERT INTO transacciones VALUES ('Servicio Nube', 1200.00);
INSERT INTO transacciones VALUES ('Café', 5.00);

Código inicial:
SQL
-- Completa el CASE WHEN
SELECT concepto, monto,
    
FROM transacciones;

Solución esperada:
SQL
SELECT concepto, monto,
    CASE 
        WHEN monto > 1000 THEN 'Gasto Fuerte'
        ELSE 'Normal'
    END AS alerta
FROM transacciones;

Casos de prueba:
Caso 1: Dominio Web es 'Normal', Licencia Server es 'Gasto Fuerte'.
Caso 2: Verificar sintaxis combinada de CASE, WHEN, THEN, ELSE, END AS.
Caso 3: Validar la proyección simultánea de las 3 columnas.
Pistas progresivas:
Comienza el bloque con CASE.
Escribe la condición: WHEN monto > 1000 THEN 'Gasto Fuerte' ELSE 'Normal'.
No olvides cerrar con END AS alerta.
8. Criterio de aprobación de la lección
Transformación sintética e inmutable de la proyección con estructuras de decisión.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 13: Funciones de Texto y Fechas
1. ID de lección
sql-13
2. Título
Funciones de Texto y Fechas
3. Nivel
Experto
4. Objetivos de aprendizaje
Formatear y extraer componentes de los datos tipo texto y fecha en SQLite.
Utilizar funciones nativas de manipulación (UPPER(), SUBSTR(), concatenación ||).
Consultar funciones temporales dinámicas (DATE('now')).
5. Contenido teórico
Conceptos: SQL permite procesar y adecuar la información antes de entregarla al Backend (ej. convertir texto a mayúsculas o extraer el año de un timestamp). En SQLite, las fechas se almacenan típicamente como formato texto ISO-8601 (YYYY-MM-DD).
Sintaxis: Concatenación en SQLite/PostgreSQL usa || (en MySQL es CONCAT()).
Buenas prácticas: Delegar al motor de base de datos tareas simples de formateo (como concatenar nombres y apellidos) suele ser más rápido y requiere menos RAM que hacerlo luego en lenguajes como Python o Java.
Errores comunes: Asumir que la sintaxis de fechas es idéntica en todos los motores SQL. El formateo de fechas es el área menos estandarizada (SQLite usa strftime(), SQL Server usa DATEPART(), MySQL YEAR()).
6. Ejemplos de código comentados
Ejemplo 1: Texto y Concatenación
SQL
-- SQLite usa el operador || para concatenar textos
SELECT UPPER(nombre) || ' - ' || rol AS etiqueta_usuario
FROM empleados;

Ejemplo 2: Funciones de Fecha en SQLite
SQL
-- Extrae los registros insertados en el año actual
SELECT * FROM eventos 
WHERE strftime('%Y', fecha_creacion) = strftime('%Y', 'now');

7. Ejercicio práctico
Enunciado: La tabla eventos_dev contiene un registro de conferencias. Devuelve una columna llamada etiqueta que concatene el texto en mayúsculas del nombre y el año extraído de la fecha con SQLite, resultando en este formato literal: DEVFEST TGU (Año: 2025).
Esquema y Datos de Prueba:
SQL
CREATE TABLE eventos_dev (nombre TEXT, fecha_evento TEXT);
INSERT INTO eventos_dev VALUES ('DevFest TGU', '2025-05-20');
INSERT INTO eventos_dev VALUES ('DevFest SPS', '2024-11-23');

Código inicial:
SQL
-- Usa UPPER() y strftime('%Y', columna) para concatenar
SELECT 

FROM eventos_dev;

Solución esperada:
SQL
SELECT UPPER(nombre) || ' (Año: ' || strftime('%Y', fecha_evento) || ')' AS etiqueta
FROM eventos_dev;

Casos de prueba:
Caso 1: Output del primer registro: DEVFEST TGU (Año: 2025).
Caso 2: Output del segundo registro: DEVFEST SPS (Año: 2024).
Caso 3: Validar la presencia del operador de concatenación puro || y función temporal strftime.
Pistas progresivas:
Convierte a mayúsculas: UPPER(nombre).
Concatena usando || ' (Año: ' ||.
Extrae el año y cierra: strftime('%Y', fecha_evento) || ')' AS etiqueta.
8. Criterio de aprobación de la lección
Manipulación formal e independiente del motor de tipos de datos complejos en crudo a strings estructurados presentables.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 14: Restricciones y Claves Foráneas
1. ID de lección
sql-14
2. Título
Restricciones y Claves Foráneas
3. Nivel
Experto
4. Objetivos de aprendizaje
Aplicar Restricciones (Constraints) para preservar la Integridad Referencial.
Configurar las directivas ON DELETE CASCADE.
Prevenir datos corruptos forzando relaciones lógicas DDL restrictivas.
5. Contenido teórico
Conceptos: Una Foreign Key (FK) vincula la fila de una tabla a la Primary Key de otra. Esto obliga a la Base de Datos a rechazar inserciones si intentan apuntar a un registro padre que no existe. La integridad referencial salva los sistemas de tener "datos fantasmas".
Sintaxis: FOREIGN KEY (columna_local) REFERENCES tabla_padre(columna_destino)
Buenas prácticas: Utilizar ON DELETE CASCADE solo cuando es un requerimiento fuerte del negocio (ej. borrar un proyecto borra automáticamente todas sus tareas). De otra manera, es mejor usar RESTRICT o borrados lógicos.
Errores comunes: En SQLite, las claves foráneas vienen desactivadas por defecto (retrocompatibilidad). Para que SQLite lance error al violar la integridad, debes ejecutar en tu sesión: PRAGMA foreign_keys = ON;.
6. Ejemplos de código comentados
Ejemplo 1: DDL de tabla relacional estricta
SQL
CREATE TABLE comentarios (
    id INTEGER PRIMARY KEY,
    texto TEXT,
    post_id INTEGER,
    -- Impide insertar un post_id que no exista en la tabla posts
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

7. Ejercicio práctico
Enunciado: Construye el DDL (CREATE TABLE) para la tabla autores_articulos. Debe tener dos columnas enteras: articulo_id y autor_id. Establece una Foreign Key en autor_id que referencie a la tabla padre usuarios(id).
Esquema y Datos de Prueba: (Se ejecutará tu esquema sobre un DB con PRAGMA foreign_keys = ON, y se validará el metadato del DDL)
SQL
CREATE TABLE usuarios (id INTEGER PRIMARY KEY);

Código inicial:
SQL
-- Completa la instrucción
CREATE TABLE autores_articulos (
    articulo_id INTEGER,
    autor_id INTEGER,
    
);

Solución esperada:
SQL
CREATE TABLE autores_articulos (
    articulo_id INTEGER,
    autor_id INTEGER,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);

Casos de prueba:
Caso 1: Compilación DDL exitosa validada por el parseador del motor SQLite.
Caso 2: Presencia sintáctica de FOREIGN KEY.
Caso 3: Referenciación correcta al padre REFERENCES usuarios(id).
Pistas progresivas:
Declara la regla: FOREIGN KEY (autor_id)
Apunta a la tabla objetivo: REFERENCES usuarios(id)
No se requiere ON DELETE para aprobar el ejercicio.
8. Criterio de aprobación de la lección
Implementación de bloqueos a nivel de esquema DDL para preservar la estructura en red de la base de datos transaccional.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 15: Proyecto Integrador: Plataforma Sentinel
1. ID de lección
sql-15
2. Título
Proyecto Integrador: Plataforma Sentinel
3. Nivel
Experto
4. Objetivos de aprendizaje
Combinar funciones de DDL relacional, manipulación (DML), Joins, y agregación condicional.
Construir un reporte analítico simulando el requerimiento en vivo de un dashboard multi-usuario.
Demostrar el dominio completo del stack de Lenguaje de Consulta Estructurada.
5. Contenido teórico
Conceptos: Una plataforma de noticias (como "Sentinel") involucra reporteros (usuarios), artículos y un registro de visualizaciones (visitas). Un desarrollador backend se enfrenta diariamente a la necesidad de extraer el total de visitas combinadas que han generado los artículos de un autor específico, filtrando datos inválidos y presentándolos ordenados.
Sintaxis: Integración masiva de múltiples cláusulas (JOIN, GROUP BY, ORDER BY, SUM).
Errores comunes: Perder el orden de la declaración SQL (Recordatorio: SELECT, FROM, JOIN, WHERE, GROUP BY, HAVING, ORDER BY).
6. Ejemplos de código comentados
(Resumen del patrón de solución)
SQL
SELECT pad.nombre, SUM(hij.metrica) AS total
FROM padres pad
LEFT JOIN hijos hij ON pad.id = hij.padre_id
WHERE pad.activo = 1
GROUP BY pad.nombre
ORDER BY total DESC;

7. Ejercicio práctico
Enunciado: Construye una consulta para el dashboard analítico de la plataforma Sentinel. Tienes la tabla reporteros y la tabla noticias.
Haz un INNER JOIN entre ambas tablas usando reporteros.id y noticias.reportero_id.
Agrupa los datos por el username del reportero (GROUP BY).
Calcula la suma de las visualizaciones de todas las noticias de cada reportero, renombrándola AS total_visualizaciones.
Ordena el resultado por las visualizaciones de mayor a menor (DESC).
Esquema y Datos de Prueba:
SQL
CREATE TABLE reporteros (id INTEGER PRIMARY KEY, username TEXT);
INSERT INTO reporteros VALUES (1, 'ruben_sentinel');
INSERT INTO reporteros VALUES (2, 'victor_news');

CREATE TABLE noticias (id INTEGER PRIMARY KEY, titulo TEXT, visualizaciones INTEGER, reportero_id INTEGER);
INSERT INTO noticias VALUES (10, 'Ataque de Phishing', 1500, 1);
INSERT INTO noticias VALUES (11, 'Nuevo framework JS', 5000, 1);
INSERT INTO noticias VALUES (12, 'Conferencia Tech', 1200, 2);

Código inicial:
SQL
-- Diseña tu super query analítico


Solución esperada:
SQL
SELECT r.username, SUM(n.visualizaciones) AS total_visualizaciones
FROM reporteros r
INNER JOIN noticias n ON r.id = n.reportero_id
GROUP BY r.username
ORDER BY total_visualizaciones DESC;

Casos de prueba:
Caso 1: Output en primera fila: ['ruben_sentinel', 6500].
Caso 2: Output en segunda fila: ['victor_news', 1200].
Caso 3: Validar la presencia simultánea de JOIN, SUM, GROUP BY y ORDER BY.
Pistas progresivas:
Inicia con SELECT r.username, SUM(n.visualizaciones) AS total_visualizaciones.
Enlaza las tablas: FROM reporteros r INNER JOIN noticias n ON r.id = n.reportero_id.
Agrupa por el alias exacto: GROUP BY r.username. Ordena al final: ORDER BY total_visualizaciones DESC.
8. Criterio de aprobación de la lección
Generación de reportes analíticos complejos combinando tablas e inyectando matemáticas relacionales orientadas al negocio.
9. Tiempo estimado de la lección
120 minutos
10. Puntaje máximo de la lección
500 pts