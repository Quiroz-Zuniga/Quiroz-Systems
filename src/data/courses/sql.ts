import { Course } from '../../types';

export const sqlCourse: Course = {
  id: 'sql',
  title: 'Quiroz Systems — SQL',
  languageName: 'SQL',
  monacoLanguage: 'sql',
  description: 'Extracción de datos, filtrado, ordenamiento, agregación, GROUP BY, DDL/DML, INNER JOIN, LEFT JOIN, subconsultas y proyecto Sentinel.',
  levelRange: 'Básico → Experto',
  estimatedHours: 40,
  iconName: 'Database',
  color: 'from-sky-600 to-blue-700',
  lessons: [
    {
      id: 'sql-01',
      title: 'Introducción a Bases de Datos y SELECT',
      level: 'Básico',
      objectives: ['Utilizar SELECT para proyectar columnas específicas.'],
      theory: `### Conceptos
Bases de datos relacionales organizan los datos en tablas. \`SELECT columna1, columna2 FROM tabla;\`.`,
      examples: [
        {
          title: 'SELECT',
          code: `SELECT nombre, cargo FROM empleados;`,
        },
      ],
      exercise: {
        statement: 'Selecciona únicamente las columnas nombre y cargo de todos los miembros de la tabla comite_ejecutivo.',
        initialCode: `-- Escribe tu consulta SELECT aquí
`,
        solution: `SELECT nombre, cargo FROM comite_ejecutivo;`,
        schemaSql: `CREATE TABLE comite_ejecutivo (id INTEGER PRIMARY KEY, nombre TEXT, cargo TEXT, experiencia_anios INTEGER);
INSERT INTO comite_ejecutivo VALUES (1, 'Rubén Quiroz', 'Presidente', 3);
INSERT INTO comite_ejecutivo VALUES (2, 'Víctor López', 'Vicepresidente', 2);
INSERT INTO comite_ejecutivo VALUES (3, 'Eduardo Ávila', 'Tesorero', 2);
INSERT INTO comite_ejecutivo VALUES (4, 'Josué Hernández', 'Secretario', 1);`,
        testCases: [
          { id: 'tc-1', output: 'Rubén Quiroz|Presidente\nVíctor López|Vicepresidente\nEduardo Ávila|Tesorero\nJosué Hernández|Secretario\n' },
        ],
        hints: ['SELECT nombre, cargo FROM comite_ejecutivo;'],
      },
      approvalCriteria: 'Proyección exacta de las columnas nombre y cargo.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'sql-02',
      title: 'Filtrado de datos con WHERE',
      level: 'Básico',
      objectives: ['Restringir filas con WHERE y operadores lógicos.'],
      theory: `### Conceptos
Filtros con \`WHERE condicion1 AND condicion2\`. Textos con comillas simples \`'texto'\`.`,
      examples: [
        {
          title: 'WHERE',
          code: `SELECT * FROM usuarios WHERE activo = 1 AND rol = 'Admin';`,
        },
      ],
      exercise: {
        statement: 'Selecciona el nombre y lenguaje_principal de la tabla desarrolladores donde os = "Linux" AND edad >= 20.',
        initialCode: `-- Tu consulta SELECT con WHERE aquí
`,
        solution: `SELECT nombre, lenguaje_principal FROM desarrolladores WHERE os = 'Linux' AND edad >= 20;`,
        schemaSql: `CREATE TABLE desarrolladores (id INTEGER, nombre TEXT, lenguaje_principal TEXT, os TEXT, edad INTEGER);
INSERT INTO desarrolladores VALUES (1, 'Rubén', 'Python', 'Linux', 23);
INSERT INTO desarrolladores VALUES (2, 'Eny', 'JavaScript', 'Windows', 22);
INSERT INTO desarrolladores VALUES (3, 'Carlos', 'Java', 'Linux', 19);
INSERT INTO desarrolladores VALUES (4, 'Ana', 'C++', 'Linux', 25);`,
        testCases: [
          { id: 'tc-1', output: 'Rubén|Python\nAna|C++\n' },
        ],
        hints: ['WHERE os = \'Linux\' AND edad >= 20;'],
      },
      approvalCriteria: 'Filtrado exacto con operadores relacionales y AND.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'sql-03',
      title: 'Ordenamiento y Limitación (ORDER BY, LIMIT)',
      level: 'Básico',
      objectives: ['Ordenar con ORDER BY DESC y restringir con LIMIT.'],
      theory: `### Conceptos
\`ORDER BY columna DESC LIMIT N;\`.`,
      examples: [
        {
          title: 'ORDER BY DESC',
          code: `SELECT * FROM productos ORDER BY precio DESC LIMIT 5;`,
        },
      ],
      exercise: {
        statement: 'Selecciona todas (*) las columnas de articulos, ordenados por visitas de mayor a menor (DESC), mostrando el Top 3.',
        initialCode: `SELECT * FROM articulos;`,
        solution: `SELECT * FROM articulos ORDER BY visitas DESC LIMIT 3;`,
        schemaSql: `CREATE TABLE articulos (id INTEGER, titulo TEXT, visitas INTEGER);
INSERT INTO articulos VALUES (1, 'Bases de IA', 1500);
INSERT INTO articulos VALUES (2, 'Lanzamiento de Sentinel', 8500);
INSERT INTO articulos VALUES (3, 'Guía de Debian', 2300);
INSERT INTO articulos VALUES (4, 'Desarrollo en Antigravity', 4200);
INSERT INTO articulos VALUES (5, 'Eventos DevFest', 1100);`,
        testCases: [
          { id: 'tc-1', output: '2|Lanzamiento de Sentinel|8500\n4|Desarrollo en Antigravity|4200\n3|Guía de Debian|2300\n' },
        ],
        hints: ['ORDER BY visitas DESC LIMIT 3;'],
      },
      approvalCriteria: 'Ordenación descendente y recorte a 3 filas.',
      estimatedMinutes: 40,
      maxScore: 100,
    },
    {
      id: 'sql-04',
      title: 'Funciones de Agregación (COUNT, SUM, AVG)',
      level: 'Básico',
      objectives: ['Métricas escalares globales y alias con AS.'],
      theory: `### Conceptos
Agregaciones: \`COUNT()\`, \`SUM()\`, \`MAX()\`, \`AVG()\`.`,
      examples: [
        {
          title: 'Agregaciones',
          code: `SELECT COUNT(*) AS total, AVG(monto) AS promedio FROM ventas;`,
        },
      ],
      exercise: {
        statement: 'De gastos_personales, devuelve una fila con SUM(monto) AS total_gastado, MAX(monto) AS gasto_maximo, y COUNT(id) AS transacciones.',
        initialCode: `SELECT 

FROM gastos_personales;`,
        solution: `SELECT SUM(monto) AS total_gastado, MAX(monto) AS gasto_maximo, COUNT(id) AS transacciones FROM gastos_personales;`,
        schemaSql: `CREATE TABLE gastos_personales (id INTEGER, concepto TEXT, monto REAL);
INSERT INTO gastos_personales VALUES (1, 'Supermercado', 150.50);
INSERT INTO gastos_personales VALUES (2, 'Internet', 45.00);
INSERT INTO gastos_personales VALUES (3, 'Libros', 30.00);
INSERT INTO gastos_personales VALUES (4, 'Café', 15.00);`,
        testCases: [{ id: 'tc-1', output: '240.5|150.5|4\n' }],
        hints: ['SELECT SUM(monto) AS total_gastado, MAX(monto) AS gasto_maximo, COUNT(id) AS transacciones'],
      },
      approvalCriteria: 'Uso de SUM, MAX, COUNT con alias especificados.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'sql-05',
      title: 'Agrupación de datos con GROUP BY y HAVING',
      level: 'Intermedio',
      objectives: ['Particionamiento relacional con GROUP BY y filtros HAVING.'],
      theory: `### Conceptos
\`GROUP BY columna HAVING COUNT(*) >= 2;\`.`,
      examples: [
        {
          title: 'Group By',
          code: `SELECT depto, COUNT(*) FROM emp GROUP BY depto HAVING COUNT(*) > 1;`,
        },
      ],
      exercise: {
        statement: 'De miembros_catracode selecciona lenguaje_principal y COUNT(nombre) AS cantidad. Agrupa por lenguaje_principal y filtra con HAVING cantidad >= 2.',
        initialCode: `-- Tu agrupacion aqui
`,
        solution: `SELECT lenguaje_principal, COUNT(nombre) AS cantidad FROM miembros_catracode GROUP BY lenguaje_principal HAVING COUNT(nombre) >= 2;`,
        schemaSql: `CREATE TABLE miembros_catracode (nombre TEXT, lenguaje_principal TEXT);
INSERT INTO miembros_catracode VALUES ('Rubén', 'Python');
INSERT INTO miembros_catracode VALUES ('Víctor', 'Java');
INSERT INTO miembros_catracode VALUES ('Eduardo', 'Python');
INSERT INTO miembros_catracode VALUES ('Josué', 'JavaScript');
INSERT INTO miembros_catracode VALUES ('Eny', 'JavaScript');
INSERT INTO miembros_catracode VALUES ('Carlos', 'C++');`,
        testCases: [{ id: 'tc-1', output: 'Python|2\nJavaScript|2\n' }],
        hints: ['GROUP BY lenguaje_principal HAVING COUNT(nombre) >= 2;'],
      },
      approvalCriteria: 'Agrupación por columna y filtro post-agregado con HAVING.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'sql-06',
      title: 'Definición de Datos (CREATE TABLE)',
      level: 'Intermedio',
      objectives: ['Definición DDL con PRIMARY KEY y NOT NULL.'],
      theory: `### Conceptos
DDL \`CREATE TABLE guarderias (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL, capacidad INTEGER);\`.`,
      examples: [
        {
          title: 'CREATE TABLE',
          code: `CREATE TABLE test (id INTEGER PRIMARY KEY, txt TEXT NOT NULL);`,
        },
      ],
      exercise: {
        statement: 'Crea una tabla guarderias con tres columnas: id (INTEGER PRIMARY KEY), nombre (TEXT NOT NULL) y capacidad (INTEGER).',
        initialCode: `CREATE TABLE guarderias (
    
);`,
        solution: `CREATE TABLE guarderias (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    capacidad INTEGER
);`,
        testCases: [{ id: 'tc-1', output: 'OK' }],
        hints: ['id INTEGER PRIMARY KEY, nombre TEXT NOT NULL, capacidad INTEGER'],
      },
      approvalCriteria: 'Creación de tabla DDL válida con restricciones.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'sql-07',
      title: 'Inserción de Datos (INSERT INTO)',
      level: 'Intermedio',
      objectives: ['DML de inserción con lista explícita de columnas.'],
      theory: `### Conceptos
\`INSERT INTO tabla (col1, col2) VALUES (val1, val2);\`.`,
      examples: [
        {
          title: 'INSERT',
          code: `INSERT INTO usuarios (username) VALUES ('quirozdev');`,
        },
      ],
      exercise: {
        statement: 'Inserta en certificaciones especificando id = 101, nombre = "DevFest 2024", y fecha_emision = "2024-11-23".',
        initialCode: `-- Tu comando INSERT aquí
`,
        solution: `INSERT INTO certificaciones (id, nombre, fecha_emision) VALUES (101, 'DevFest 2024', '2024-11-23');`,
        schemaSql: `CREATE TABLE certificaciones (id INTEGER PRIMARY KEY, nombre TEXT, fecha_emision TEXT);`,
        testCases: [{ id: 'tc-1', output: '101|DevFest 2024|2024-11-23\n' }],
        hints: ['INSERT INTO certificaciones (id, nombre, fecha_emision) VALUES (101, \'DevFest 2024\', \'2024-11-23\');'],
      },
      approvalCriteria: 'Inserción de registro DML válida.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'sql-08',
      title: 'Actualización y Borrado Seguro (UPDATE, DELETE)',
      level: 'Intermedio',
      objectives: ['Mutación de datos con UPDATE y filtro obligatorio WHERE.'],
      theory: `### Conceptos
\`UPDATE pasantes SET estado = 'Finalizado' WHERE id = 5;\`.`,
      examples: [
        {
          title: 'UPDATE',
          code: `UPDATE usuarios SET activo = 1 WHERE id = 10;`,
        },
      ],
      exercise: {
        statement: 'En la tabla pasantes actualiza el estado a "Finalizado" para el pasante con id = 5.',
        initialCode: `-- Tu UPDATE aquí
`,
        solution: `UPDATE pasantes SET estado = 'Finalizado' WHERE id = 5;`,
        schemaSql: `CREATE TABLE pasantes (id INTEGER PRIMARY KEY, nombre TEXT, estado TEXT);
INSERT INTO pasantes VALUES (4, 'Juan', 'Activo');
INSERT INTO pasantes VALUES (5, 'Rubén', 'Activo');
INSERT INTO pasantes VALUES (6, 'María', 'Activo');`,
        testCases: [{ id: 'tc-1', output: '4|Juan|Activo\n5|Rubén|Finalizado\n6|María|Activo\n' }],
        hints: ['UPDATE pasantes SET estado = \'Finalizado\' WHERE id = 5;'],
      },
      approvalCriteria: 'Modificación aislada del registro objetivo con WHERE.',
      estimatedMinutes: 40,
      maxScore: 100,
    },
    {
      id: 'sql-09',
      title: 'Consultas Multitabla I (INNER JOIN)',
      level: 'Avanzado',
      objectives: ['Cruce de tablas relacionales con INNER JOIN.'],
      theory: `### Conceptos
Intersección de tablas: \`FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id\`.`,
      examples: [
        {
          title: 'INNER JOIN',
          code: `SELECT u.name, r.role FROM users u INNER JOIN roles r ON u.role_id = r.id;`,
        },
      ],
      exercise: {
        statement: 'Muestra u.username y r.nombre_rol haciendo INNER JOIN entre usuarios u y roles r conectado por u.rol_id = r.id.',
        initialCode: `SELECT 

FROM usuarios u`,
        solution: `SELECT u.username, r.nombre_rol FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id;`,
        schemaSql: `CREATE TABLE roles (id INTEGER PRIMARY KEY, nombre_rol TEXT);
INSERT INTO roles VALUES (1, 'Administrador');
INSERT INTO roles VALUES (2, 'Editor');

CREATE TABLE usuarios (id INTEGER PRIMARY KEY, username TEXT, rol_id INTEGER);
INSERT INTO usuarios VALUES (101, 'quirozdev', 1);
INSERT INTO usuarios VALUES (102, 'eny_editor', 2);`,
        testCases: [{ id: 'tc-1', output: 'quirozdev|Administrador\neny_editor|Editor\n' }],
        hints: ['INNER JOIN roles r ON u.rol_id = r.id'],
      },
      approvalCriteria: 'Proyección de datos combinados mediante INNER JOIN.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'sql-10',
      title: 'Consultas Multitabla II (LEFT JOIN)',
      level: 'Avanzado',
      objectives: ['Asociaciones inclusivas con LEFT JOIN y valores nulos.'],
      theory: `### Conceptos
Inclusión completa de la tabla izquierda con \`LEFT JOIN\`.`,
      examples: [
        {
          title: 'LEFT JOIN',
          code: `SELECT p.nombre, a.encargado FROM proyectos p LEFT JOIN asignaciones a ON p.id = a.proyecto_id;`,
        },
      ],
      exercise: {
        statement: 'Muestra p.nombre_proyecto y a.encargado haciendo LEFT JOIN entre proyectos p y asignaciones a conectando p.id = a.proyecto_id.',
        initialCode: `-- LEFT JOIN aquí
`,
        solution: `SELECT p.nombre_proyecto, a.encargado FROM proyectos p LEFT JOIN asignaciones a ON p.id = a.proyecto_id;`,
        schemaSql: `CREATE TABLE proyectos (id INTEGER PRIMARY KEY, nombre_proyecto TEXT);
INSERT INTO proyectos VALUES (1, 'Plataforma Sentinel');
INSERT INTO proyectos VALUES (2, 'App Guardería');
INSERT INTO proyectos VALUES (3, 'HTML 30 Day Challenge');

CREATE TABLE asignaciones (proyecto_id INTEGER, encargado TEXT);
INSERT INTO asignaciones VALUES (1, 'Víctor López');
INSERT INTO asignaciones VALUES (3, 'Rubén Quiroz');`,
        testCases: [{ id: 'tc-1', output: 'Plataforma Sentinel|Víctor López\nApp Guardería|null\nHTML 30 Day Challenge|Rubén Quiroz\n' }],
        hints: ['FROM proyectos p LEFT JOIN asignaciones a ON p.id = a.proyecto_id;'],
      },
      approvalCriteria: 'Inclusión de registros sin coincidencia produciendo nulos.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'sql-11',
      title: 'Subconsultas y Tablas Derivadas',
      level: 'Avanzado',
      objectives: ['Anidamiento de consultas SELECT en cláusulas WHERE.'],
      theory: `### Conceptos
Subconsultas: \`WHERE nota > (SELECT AVG(nota) FROM evaluaciones)\`.`,
      examples: [
        {
          title: 'Subquery',
          code: `SELECT * FROM emp WHERE salario > (SELECT AVG(salario) FROM emp);`,
        },
      ],
      exercise: {
        statement: 'Muestra nombre y nota de evaluaciones donde la nota sea MAYOR que el promedio general de la clase calculado con una subconsulta (SELECT AVG(nota) FROM evaluaciones).',
        initialCode: `SELECT 
`,
        solution: `SELECT nombre, nota FROM evaluaciones WHERE nota > (SELECT AVG(nota) FROM evaluaciones);`,
        schemaSql: `CREATE TABLE evaluaciones (nombre TEXT, nota REAL);
INSERT INTO evaluaciones VALUES ('Carlos', 60);
INSERT INTO evaluaciones VALUES ('Josué', 95);
INSERT INTO evaluaciones VALUES ('Ana', 70);
INSERT INTO evaluaciones VALUES ('Rubén', 90);`,
        testCases: [{ id: 'tc-1', output: 'Josué|95.0\nRubén|90.0\n' }],
        hints: ['WHERE nota > (SELECT AVG(nota) FROM evaluaciones)'],
      },
      approvalCriteria: 'Subconsulta escalar anidada en el WHERE.',
      estimatedMinutes: 75,
      maxScore: 100,
    },
    {
      id: 'sql-12',
      title: 'Lógica Condicional con CASE WHEN',
      level: 'Avanzado',
      objectives: ['Bifurcación condicional en proyecciones SELECT.'],
      theory: `### Conceptos
Lógica condicional: \`CASE WHEN condicion THEN 'A' ELSE 'B' END AS alias\`.`,
      examples: [
        {
          title: 'CASE WHEN',
          code: `SELECT precio, CASE WHEN precio > 100 THEN 'Caro' ELSE 'Barato' END AS tipo FROM productos;`,
        },
      ],
      exercise: {
        statement: 'De transacciones muestra concepto, monto y una nueva columna alerta usando CASE WHEN. Si monto > 1000 "Gasto Fuerte", si no "Normal". Nombra la columna AS alerta.',
        initialCode: `SELECT concepto, monto,
    
FROM transacciones;`,
        solution: `SELECT concepto, monto, CASE WHEN monto > 1000 THEN 'Gasto Fuerte' ELSE 'Normal' END AS alerta FROM transacciones;`,
        schemaSql: `CREATE TABLE transacciones (concepto TEXT, monto REAL);
INSERT INTO transacciones VALUES ('Licencia Server', 1500.00);
INSERT INTO transacciones VALUES ('Dominio web', 15.50);
INSERT INTO transacciones VALUES ('Servicio Nube', 1200.00);
INSERT INTO transacciones VALUES ('Café', 5.00);`,
        testCases: [{ id: 'tc-1', output: 'Licencia Server|1500.0|Gasto Fuerte\nDominio web|15.5|Normal\nServicio Nube|1200.0|Gasto Fuerte\nCafé|5.0|Normal\n' }],
        hints: ['CASE WHEN monto > 1000 THEN \'Gasto Fuerte\' ELSE \'Normal\' END AS alerta'],
      },
      approvalCriteria: 'Creación de columna derivada mediante CASE WHEN.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'sql-13',
      title: 'Funciones de Texto y Fechas',
      level: 'Experto',
      objectives: ['Funciones UPPER, concatenación || y strftime en SQLite.'],
      theory: `### Conceptos
Operador de concatenación \`||\` y formato de fecha \`strftime('%Y', fecha)\`.`,
      examples: [
        {
          title: 'Text & Date',
          code: `SELECT UPPER(nombre) || ' - ' || strftime('%Y', fecha) FROM eventos;`,
        },
      ],
      exercise: {
        statement: 'De eventos_dev devuelve una columna llamada etiqueta con el formato UPPER(nombre) || " (Año: " || strftime("%Y", fecha_evento) || ")" AS etiqueta.',
        initialCode: `SELECT 

FROM eventos_dev;`,
        solution: `SELECT UPPER(nombre) || ' (Año: ' || strftime('%Y', fecha_evento) || ')' AS etiqueta FROM eventos_dev;`,
        schemaSql: `CREATE TABLE eventos_dev (nombre TEXT, fecha_evento TEXT);
INSERT INTO eventos_dev VALUES ('DevFest TGU', '2025-05-20');
INSERT INTO eventos_dev VALUES ('DevFest SPS', '2024-11-23');`,
        testCases: [{ id: 'tc-1', output: 'DEVFEST TGU (Año: 2025)\nDEVFEST SPS (Año: 2024)\n' }],
        hints: ['UPPER(nombre) || \' (Año: \' || strftime(\'%Y\', fecha_evento) || \')\' AS etiqueta'],
      },
      approvalCriteria: 'Concatenación y extracción de componentes de fecha en SQLite.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'sql-14',
      title: 'Restricciones y Claves Foráneas',
      level: 'Experto',
      objectives: ['Restricción DDL FOREIGN KEY y REFERENCES.'],
      theory: `### Conceptos
Integridad referencial: \`FOREIGN KEY (autor_id) REFERENCES usuarios(id)\`.`,
      examples: [
        {
          title: 'FK',
          code: `CREATE TABLE comentarios (id INT, post_id INT, FOREIGN KEY (post_id) REFERENCES posts(id));`,
        },
      ],
      exercise: {
        statement: 'Crea la tabla autores_articulos con dos columnas enteras articulo_id y autor_id, y define una FOREIGN KEY (autor_id) REFERENCES usuarios(id).',
        initialCode: `CREATE TABLE autores_articulos (
    articulo_id INTEGER,
    autor_id INTEGER,
    
);`,
        solution: `CREATE TABLE autores_articulos (
    articulo_id INTEGER,
    autor_id INTEGER,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);`,
        schemaSql: `CREATE TABLE usuarios (id INTEGER PRIMARY KEY);`,
        testCases: [{ id: 'tc-1', output: 'OK' }],
        hints: ['FOREIGN KEY (autor_id) REFERENCES usuarios(id)'],
      },
      approvalCriteria: 'Declaración DDL de clave foránea válida.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'sql-15',
      title: 'Proyecto Integrador: Plataforma Sentinel',
      level: 'Experto',
      objectives: ['Construir un reporte analítico multi-tabla con JOIN, GROUP BY, SUM y ORDER BY.'],
      theory: `### Proyecto Integrador Final
Consulta analítica para el dashboard de noticias de la plataforma Sentinel.`,
      examples: [
        {
          title: 'Query Analítico',
          code: `SELECT u.username, SUM(v.visitas) FROM users u JOIN visitas v GROUP BY u.username ORDER BY SUM(v.visitas) DESC;`,
        },
      ],
      exercise: {
        statement: 'Crea la consulta analítica para Sentinel: Haz INNER JOIN entre reporteros r y noticias n en r.id = n.reportero_id. Agrupa por r.username. Calcula SUM(n.visualizaciones) AS total_visualizaciones. Ordena por total_visualizaciones DESC.',
        initialCode: `-- Diseña tu super query analítico
`,
        solution: `SELECT r.username, SUM(n.visualizaciones) AS total_visualizaciones FROM reporteros r INNER JOIN noticias n ON r.id = n.reportero_id GROUP BY r.username ORDER BY total_visualizaciones DESC;`,
        schemaSql: `CREATE TABLE reporteros (id INTEGER PRIMARY KEY, username TEXT);
INSERT INTO reporteros VALUES (1, 'ruben_sentinel');
INSERT INTO reporteros VALUES (2, 'victor_news');

CREATE TABLE noticias (id INTEGER PRIMARY KEY, titulo TEXT, visualizaciones INTEGER, reportero_id INTEGER);
INSERT INTO noticias VALUES (10, 'Ataque de Phishing', 1500, 1);
INSERT INTO noticias VALUES (11, 'Nuevo framework JS', 5000, 1);
INSERT INTO noticias VALUES (12, 'Conferencia Tech', 1200, 2);`,
        testCases: [{ id: 'tc-1', output: 'ruben_sentinel|6500\nvictor_news|1200\n' }],
        hints: ['SELECT r.username, SUM(n.visualizaciones) AS total_visualizaciones FROM reporteros r INNER JOIN noticias n ON r.id = n.reportero_id GROUP BY r.username ORDER BY total_visualizaciones DESC;'],
      },
      approvalCriteria: 'Agregación multi-tabla ordenada y agrupada.',
      estimatedMinutes: 120,
      maxScore: 500,
    },
  ],
};
