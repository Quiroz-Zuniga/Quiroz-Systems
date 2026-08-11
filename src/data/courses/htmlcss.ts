import { Course } from '../../types';

export const htmlcssCourse: Course = {
  id: 'htmlcss',
  title: 'Quiroz Systems — HTML y CSS',
  languageName: 'HTML / CSS',
  monacoLanguage: 'html',
  description: 'Marcado semántico, Box Model, Flexbox, CSS Grid, Media Queries, Custom Properties y maquetación frontend profesional.',
  levelRange: 'Básico → Experto',
  estimatedHours: 45,
  iconName: 'Layout',
  color: 'from-pink-600 to-rose-700',
  lessons: [
    {
      id: 'htmlcss-01',
      title: 'Estructura Básica y Etiquetas de Texto',
      level: 'Básico',
      objectives: ['Declarar etiquetas h1 y p dentro de body.'],
      theory: `### Conceptos
HTML es un lenguaje de marcado semántico. Elementos principales: \`<h1>\`, \`<p>\`.`,
      examples: [
        {
          title: 'HTML5',
          code: `<h1>Título</h1><p>Texto</p>`,
        },
      ],
      exercise: {
        statement: 'Construye dentro del <body> un <h1> con el texto "Quiroz Systems". Debajo, un párrafo <p> con "Iniciando el reto de 30 días de HTML".',
        initialCode: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reto HTML</title>
</head>
<body>
    <!-- Tu código aquí -->
    
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reto HTML</title>
</head>
<body>
    <h1>Quiroz Systems</h1>
    <p>Iniciando el reto de 30 días de HTML</p>
</body>
</html>`,
        testCases: [
          { id: 'tc-1', output: 'h1:Quiroz Systems|p:Iniciando el reto de 30 días de HTML' },
        ],
        hints: ['<h1>Quiroz Systems</h1>', '<p>Iniciando el reto de 30 días de HTML</p>'],
      },
      approvalCriteria: 'Estructura DOM con h1 y p dentro de body.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'htmlcss-02',
      title: 'Enlaces, Rutas e Imágenes',
      level: 'Básico',
      objectives: ['Atributos href en <a> y src/alt en <img>.'],
      theory: `### Conceptos
Enlaces \`<a href="...">\` e imágenes auto-cerradas \`<img src="..." alt="...">\`.`,
      examples: [
        {
          title: 'Link & Img',
          code: `<a href="https://quirozsystems.com">Link</a>\n<img src="logo.png" alt="Logo">`,
        },
      ],
      exercise: {
        statement: 'Crea un enlace <a> dirigido a "https://ejemplo.com" con texto "Ir al proyecto". Debajo, una imagen <img> con src="banner.jpg" y alt="Banner principal".',
        initialCode: `<body>
    <!-- Tu enlace e imagen aquí -->
    
</body>`,
        solution: `<body>
    <a href="https://ejemplo.com">Ir al proyecto</a>
    <img src="banner.jpg" alt="Banner principal">
</body>`,
        testCases: [
          { id: 'tc-1', output: 'a[href="https://ejemplo.com"]:Ir al proyecto|img[src="banner.jpg"][alt="Banner principal"]' },
        ],
        hints: ['<a href="https://ejemplo.com">Ir al proyecto</a>', '<img src="banner.jpg" alt="Banner principal">'],
      },
      approvalCriteria: 'Atributos href, src y alt configurados correctamente.',
      estimatedMinutes: 40,
      maxScore: 100,
    },
    {
      id: 'htmlcss-03',
      title: 'Listas y Estructuración de Datos',
      level: 'Básico',
      objectives: ['Listas desordenadas <ul> y li.'],
      theory: `### Conceptos
Estructuras de lista: \`<ul>\` con hijos \`<li>\`.`,
      examples: [
        {
          title: 'UL LI',
          code: `<ul><li>HTML</li><li>CSS</li></ul>`,
        },
      ],
      exercise: {
        statement: 'Crea una lista desordenada <ul> con 3 elementos <li>: "HTML", "CSS", "JavaScript".',
        initialCode: `<body>
    <!-- Tu lista aquí -->
    
</body>`,
        solution: `<body>
    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>
</body>`,
        testCases: [
          { id: 'tc-1', output: 'ul > li:3 (HTML, CSS, JavaScript)' },
        ],
        hints: ['<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>'],
      },
      approvalCriteria: 'Anidación estricta de 3 elementos li en ul.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'htmlcss-04',
      title: 'Introducción a CSS y Selectores',
      level: 'Básico',
      objectives: ['Reglas CSS con selectores de clase .'],
      theory: `### Conceptos
CSS selectores de clase \`.clase { propiedad: valor; }\`.`,
      examples: [
        {
          title: 'Clase CSS',
          code: `.alerta { color: red; }`,
        },
      ],
      exercise: {
        statement: 'Escribe dentro de <style> una regla que seleccione la clase .resaltado y le asigne color: red;.',
        initialCode: `<head>
    <style>
        /* Tu regla CSS aquí */
        
    </style>
</head>
<body>
    <p>Párrafo normal</p>
    <p class="resaltado">Párrafo importante</p>
</body>`,
        solution: `<head>
    <style>
        .resaltado {
            color: red;
        }
    </style>
</head>
<body>
    <p>Párrafo normal</p>
    <p class="resaltado">Párrafo importante</p>
</body>`,
        testCases: [
          { id: 'tc-1', output: '.resaltado { color: red }' },
        ],
        hints: ['.resaltado { color: red; }'],
      },
      approvalCriteria: 'Aplicación de estilo de color mediante selector de clase.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'htmlcss-05',
      title: 'Tipografía y Colores',
      level: 'Básico',
      objectives: ['Propiedades font-size, color y font-family.'],
      theory: `### Conceptos
Propiedades tipográficas: \`font-size\`, \`color\`, \`font-family\`.`,
      examples: [
        {
          title: 'Tipografía',
          code: `h1 { font-size: 24px; color: #ff0000; font-family: sans-serif; }`,
        },
      ],
      exercise: {
        statement: 'En <style>, para el selector h1 asigna font-size: 24px;, color: #ff0000; y font-family: sans-serif;.',
        initialCode: `<style>
    /* Estiliza el h1 aquí */
    
</style>
<h1>Sentinel News</h1>`,
        solution: `<style>
    h1 {
        font-size: 24px;
        color: #ff0000;
        font-family: sans-serif;
    }
</style>
<h1>Sentinel News</h1>`,
        testCases: [
          { id: 'tc-1', output: 'h1 { font-size: 24px, color: #ff0000, font-family: sans-serif }' },
        ],
        hints: ['font-size: 24px;', 'color: #ff0000;', 'font-family: sans-serif;'],
      },
      approvalCriteria: 'Configuración exacta de las 3 propiedades en h1.',
      estimatedMinutes: 40,
      maxScore: 100,
    },
    {
      id: 'htmlcss-06',
      title: 'El Modelo de Caja (Box Model)',
      level: 'Intermedio',
      objectives: ['Propiedades width, padding, border y box-sizing.'],
      theory: `### Conceptos
Box Model: content + padding + border + margin. Normalización con \`box-sizing: border-box;\`.`,
      examples: [
        {
          title: 'Box Sizing',
          code: `.box { width: 200px; padding: 20px; border: 1px solid black; box-sizing: border-box; }`,
        },
      ],
      exercise: {
        statement: 'Estiliza .box: width de 200px, padding de 20px, border de 1px solid black, y box-sizing: border-box;.',
        initialCode: `<style>
    .box {
        background-color: lightgray;
        /* Tu código aquí */
        
    }
</style>
<div class="box">Caja de Contenido</div>`,
        solution: `<style>
    .box {
        background-color: lightgray;
        width: 200px;
        padding: 20px;
        border: 1px solid black;
        box-sizing: border-box;
    }
</style>
<div class="box">Caja de Contenido</div>`,
        testCases: [
          { id: 'tc-1', output: '.box { width: 200px, padding: 20px, border: 1px solid black, box-sizing: border-box }' },
        ],
        hints: ['box-sizing: border-box;'],
      },
      approvalCriteria: 'Modelado volumétrico de caja con border-box.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'htmlcss-07',
      title: 'Posicionamiento en CSS',
      level: 'Intermedio',
      objectives: ['Contexto position: relative y position: absolute.'],
      theory: `### Conceptos
\`position: relative\` en el padre y \`position: absolute\` en el hijo.`,
      examples: [
        {
          title: 'Posicionamiento',
          code: `.padre { position: relative; } .hijo { position: absolute; bottom: 0; right: 0; }`,
        },
      ],
      exercise: {
        statement: 'Asigna a .padre position: relative;. Haz que .hijo tenga position: absolute;, bottom: 0; y right: 0;.',
        initialCode: `<style>
    .padre {
        width: 300px; height: 300px; background: lightblue;
        /* Estilos del padre */
    }
    .hijo {
        width: 50px; height: 50px; background: darkblue;
        /* Estilos del hijo */
    }
</style>
<div class="padre">
    <div class="hijo"></div>
</div>`,
        solution: `<style>
    .padre {
        width: 300px; height: 300px; background: lightblue;
        position: relative;
    }
    .hijo {
        width: 50px; height: 50px; background: darkblue;
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>
<div class="padre">
    <div class="hijo"></div>
</div>`,
        testCases: [
          { id: 'tc-1', output: '.padre { position: relative } | .hijo { position: absolute, bottom: 0, right: 0 }' },
        ],
        hints: ['bottom: 0; right: 0; en el hijo absolute.'],
      },
      approvalCriteria: 'Anclaje de coordenadas absolutas en contenedor relativo.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'htmlcss-08',
      title: 'Formularios y Controles de Entrada',
      level: 'Intermedio',
      objectives: ['Vinculación accesible label for e input id.'],
      theory: `### Conceptos
Formularios accesibles: \`<label for="id">\` e \`<input id="id">\`.`,
      examples: [
        {
          title: 'Form',
          code: `<label for="user">Usuario</label><input type="text" id="user">`,
        },
      ],
      exercise: {
        statement: 'Crea un <label for="usuario">Usuario</label>, un <input type="text" id="usuario" name="username"> y un <button type="submit">Entrar</button> dentro del <form>.',
        initialCode: `<form>
    <!-- Tu label, input y botón aquí -->
    
</form>`,
        solution: `<form>
    <label for="usuario">Usuario</label>
    <input type="text" id="usuario" name="username">
    <button type="submit">Entrar</button>
</form>`,
        testCases: [
          { id: 'tc-1', output: 'label[for="usuario"] | input[id="usuario"][name="username"] | button[type="submit"]' },
        ],
        hints: ['<label for="usuario">Usuario</label>', '<input type="text" id="usuario" name="username">'],
      },
      approvalCriteria: 'Coincidencia de label for con input id.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'htmlcss-09',
      title: 'HTML5 Semántico',
      level: 'Intermedio',
      objectives: ['Reemplazar div genéricos con <header>, <nav>, <main>.'],
      theory: `### Conceptos
Etiquetas semánticas: \`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`.`,
      examples: [
        {
          title: 'Semántica',
          code: `<header><h1>Título</h1></header><main><p>Contenido</p></main>`,
        },
      ],
      exercise: {
        statement: 'Refactoriza los divs genéricos por etiquetas semánticas: <header>, <nav>, y <main>. Elimina los divs.',
        initialCode: `<body>
    <div class="cabecera">
        <h1>Mi Blog</h1>
    </div>
    <div class="navegacion">
        <a href="/">Inicio</a>
    </div>
    <div class="principal">
        <p>Contenido del blog aquí.</p>
    </div>
</body>`,
        solution: `<body>
    <header>
        <h1>Mi Blog</h1>
    </header>
    <nav>
        <a href="/">Inicio</a>
    </nav>
    <main>
        <p>Contenido del blog aquí.</p>
    </main>
</body>`,
        testCases: [
          { id: 'tc-1', output: 'header > h1 | nav > a | main > p (divs: 0)' },
        ],
        hints: ['Reemplaza los divs por <header>, <nav> y <main>'],
      },
      approvalCriteria: 'Estructura semántica sin uso de divs genéricos.',
      estimatedMinutes: 30,
      maxScore: 100,
    },
    {
      id: 'htmlcss-10',
      title: 'Flexbox: Diseño Unidimensional',
      level: 'Avanzado',
      objectives: ['Contenedor flexible con display: flex, align-items, justify-content.'],
      theory: `### Conceptos
Flexbox: \`display: flex;\`, \`align-items: center;\`, \`justify-content: space-between;\`.`,
      examples: [
        {
          title: 'Flexbox',
          code: `.navbar { display: flex; align-items: center; justify-content: space-between; }`,
        },
      ],
      exercise: {
        statement: 'En .navbar habilita display: flex;, align-items: center;, y justify-content: space-between;.',
        initialCode: `<style>
    .navbar {
        background: #333;
        color: white;
        padding: 1rem;
        /* Tu código Flexbox aquí */
        
    }
</style>
<div class="navbar">
    <div class="logo">Logo</div>
    <div class="links">Links</div>
</div>`,
        solution: `<style>
    .navbar {
        background: #333;
        color: white;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
<div class="navbar">
    <div class="logo">Logo</div>
    <div class="links">Links</div>
</div>`,
        testCases: [
          { id: 'tc-1', output: '.navbar { display: flex, align-items: center, justify-content: space-between }' },
        ],
        hints: ['display: flex;', 'align-items: center;', 'justify-content: space-between;'],
      },
      approvalCriteria: 'Distribución unidimensional con Flexbox.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'htmlcss-11',
      title: 'CSS Grid: Diseño Bidimensional',
      level: 'Avanzado',
      objectives: ['Cuadrícula con display: grid, grid-template-columns y gap.'],
      theory: `### Conceptos
CSS Grid: \`display: grid;\`, \`grid-template-columns: 1fr 1fr;\`, \`gap: 10px;\`.`,
      examples: [
        {
          title: 'Grid',
          code: `.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }`,
        },
      ],
      exercise: {
        statement: 'Estiliza .cuadricula: display: grid;, grid-template-columns: 1fr 1fr;, y gap: 10px;.',
        initialCode: `<style>
    .cuadricula {
        /* Define el grid aquí */
        
    }
    .item { background: orange; padding: 20px; }
</style>
<div class="cuadricula">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
    <div class="item">Item 4</div>
</div>`,
        solution: `<style>
    .cuadricula {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    .item { background: orange; padding: 20px; }
</style>
<div class="cuadricula">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
    <div class="item">Item 4</div>
</div>`,
        testCases: [
          { id: 'tc-1', output: '.cuadricula { display: grid, grid-template-columns: 1fr 1fr, gap: 10px }' },
        ],
        hints: ['grid-template-columns: 1fr 1fr;'],
      },
      approvalCriteria: 'Estructura bidimensional de columnas y brechas.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'htmlcss-12',
      title: 'Diseño Responsivo y Media Queries',
      level: 'Avanzado',
      objectives: ['Reglas condicionales con @media (max-width: 600px).'],
      theory: `### Conceptos
Media queries: \`@media (max-width: 600px) { .caja { background-color: red; } }\`.`,
      examples: [
        {
          title: 'Media Query',
          code: `@media (max-width: 600px) { .box { background: red; } }`,
        },
      ],
      exercise: {
        statement: 'Escribe una Media Query para un max-width de 600px. Dentro, sobrescribe .caja para que background-color sea red.',
        initialCode: `<style>
    .caja {
        background-color: blue;
        padding: 50px;
        color: white;
    }
    
    /* Tu Media Query aquí */
    
</style>
<div class="caja">Contenedor Dinámico</div>`,
        solution: `<style>
    .caja {
        background-color: blue;
        padding: 50px;
        color: white;
    }
    
    @media (max-width: 600px) {
        .caja {
            background-color: red;
        }
    }
</style>
<div class="caja">Contenedor Dinámico</div>`,
        testCases: [
          { id: 'tc-1', output: '@media (max-width: 600px) { .caja { background-color: red } }' },
        ],
        hints: ['@media (max-width: 600px) { .caja { background-color: red; } }'],
      },
      approvalCriteria: 'Bloque condicional @media configurado correctamente.',
      estimatedMinutes: 60,
      maxScore: 100,
    },
    {
      id: 'htmlcss-13',
      title: 'Transiciones y Estados (Hover/Focus)',
      level: 'Avanzado',
      objectives: ['Propiedad transition y pseudo-clase :hover.'],
      theory: `### Conceptos
Animaciones suaves: \`transition: background-color 0.5s;\` y \`.tarjeta:hover { ... }\`.`,
      examples: [
        {
          title: 'Hover transition',
          code: `.btn { transition: background 0.3s; } .btn:hover { background: red; }`,
        },
      ],
      exercise: {
        statement: 'En .tarjeta añade transition: background-color 0.5s;. Crea el bloque .tarjeta:hover cambiando background-color a darkblue.',
        initialCode: `<style>
    .tarjeta {
        background-color: lightblue;
        padding: 40px;
        color: white;
        /* Tu transición */
        
    }
    
    /* Bloque hover */
    
</style>
<div class="tarjeta">Pasa el ratón aquí</div>`,
        solution: `<style>
    .tarjeta {
        background-color: lightblue;
        padding: 40px;
        color: white;
        transition: background-color 0.5s;
    }
    
    .tarjeta:hover {
        background-color: darkblue;
    }
</style>
<div class="tarjeta">Pasa el ratón aquí</div>`,
        testCases: [
          { id: 'tc-1', output: '.tarjeta { transition } | .tarjeta:hover { background-color: darkblue }' },
        ],
        hints: ['transition: background-color 0.5s;', '.tarjeta:hover { background-color: darkblue; }'],
      },
      approvalCriteria: 'Transición en estado de reposo y pseudo-clase :hover.',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'htmlcss-14',
      title: 'Variables CSS (Custom Properties)',
      level: 'Experto',
      objectives: ['Declaración en :root y lectura con var().'],
      theory: `### Conceptos
Tokens globales: \`:root { --color-marca: #3498db; }\` y \`color: var(--color-marca);\`.`,
      examples: [
        {
          title: 'Custom Properties',
          code: `:root { --primary: red; } h1 { color: var(--primary); }`,
        },
      ],
      exercise: {
        statement: 'Crea el bloque :root con la variable --color-marca: #3498db;. En .encabezado asigna color: var(--color-marca);.',
        initialCode: `<style>
    /* Declara el :root y la variable */
    
    .encabezado {
        font-size: 2rem;
        /* Utiliza la variable */
        
    }
</style>
<h1 class="encabezado">Sistema Dinámico</h1>`,
        solution: `<style>
    :root {
        --color-marca: #3498db;
    }
    
    .encabezado {
        font-size: 2rem;
        color: var(--color-marca);
    }
</style>
<h1 class="encabezado">Sistema Dinámico</h1>`,
        testCases: [
          { id: 'tc-1', output: ':root { --color-marca: #3498db } | .encabezado { color: var(--color-marca) }' },
        ],
        hints: [':root { --color-marca: #3498db; }', 'color: var(--color-marca);'],
      },
      approvalCriteria: 'Declaración en :root y llamada con var().',
      estimatedMinutes: 45,
      maxScore: 100,
    },
    {
      id: 'htmlcss-15',
      title: 'Proyecto Integrador: Maquetación de Sentinel',
      level: 'Experto',
      objectives: ['Maquetación completa de tarjeta de noticias combinando Flexbox, Custom Properties y semántica.'],
      theory: `### Proyecto Integrador Final
Construcción de una tarjeta de noticias de Sentinel combinando todos los módulos de CSS y HTML.`,
      examples: [
        {
          title: 'Tarjeta Sentinel',
          code: `<div class="card"><h2 class="titulo">Noticia</h2></div>`,
        },
      ],
      exercise: {
        statement: 'Crea <div class="card"><h2 class="titulo">Nueva Versión V1.0</h2><p class="resumen">Detalles técnicos</p></div>. En <style>: :root con --color-primario: #ff5722;. .card con border: 1px solid black;, padding: 20px;, display: flex;, flex-direction: column;, y gap: 15px;. .titulo con color: var(--color-primario);.',
        initialCode: `<style>
    /* Estilos globales y variables */
    
    /* Estilos de la tarjeta */
    
</style>

<!-- Estructura HTML -->`,
        solution: `<style>
    :root {
        --color-primario: #ff5722;
    }
    
    .card {
        border: 1px solid black;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .titulo {
        color: var(--color-primario);
    }
</style>

<div class="card">
    <h2 class="titulo">Nueva Versión V1.0</h2>
    <p class="resumen">Detalles técnicos</p>
</div>`,
        testCases: [
          { id: 'tc-1', output: '.card { display: flex, flex-direction: column, gap: 15px } | .titulo { color: var(--color-primario) }' },
        ],
        hints: ['flex-direction: column;', 'color: var(--color-primario);'],
      },
      approvalCriteria: 'Orquestación de Flexbox, Custom Properties y estructura semántica.',
      estimatedMinutes: 180,
      maxScore: 500,
    },
  ],
};
