Quiroz Systems — HTML y CSS
Descripción del curso: El curso "Quiroz Systems — HTML y CSS" está diseñado para dominar las tecnologías fundamentales que construyen y estilizan la web. Comenzando desde las etiquetas semánticas de HTML5 hasta arquitecturas visuales complejas con CSS Grid, Flexbox y Custom Properties. Este curso sentará las bases para construir interfaces modernas, accesibles y altamente responsivas, preparándote para la integración con frameworks de JavaScript y el desarrollo frontend avanzado.
Nivel objetivo: Cero absoluto a Experto. Prerequisitos: Ninguno. Duración estimada total: 45 horas.
Resultados de aprendizaje (Learning Outcomes):
Estructurar documentos web utilizando HTML5 semántico de forma accesible.
Dominar el flujo de los elementos en el DOM y el Modelo de Caja (Box Model).
Seleccionar y estilizar elementos eficazmente utilizando selectores CSS específicos y en cascada.
Crear arquitecturas de diseño responsivas (RWD) usando Media Queries, Flexbox y CSS Grid.
Implementar animaciones visuales y variables de CSS para sistemas de diseño temáticos.
Construir la interfaz (UI) completa para una plataforma digital desde cero.
Tabla de Contenido
Lección 1: Estructura Básica y Etiquetas de Texto (Básico)
Lección 2: Enlaces, Rutas e Imágenes (Básico)
Lección 3: Listas y Estructuración de Datos (Básico)
Lección 4: Introducción a CSS y Selectores (Básico)
Lección 5: Tipografía y Colores (Básico)
Lección 6: El Modelo de Caja (Box Model) (Intermedio)
Lección 7: Posicionamiento en CSS (Intermedio)
Lección 8: Formularios y Controles de Entrada (Intermedio)
Lección 9: HTML5 Semántico (Intermedio)
Lección 10: Flexbox: Diseño Unidimensional (Avanzado)
Lección 11: CSS Grid: Diseño Bidimensional (Avanzado)
Lección 12: Diseño Responsivo y Media Queries (Avanzado)
Lección 13: Transiciones y Estados (Hover/Focus) (Avanzado)
Lección 14: Variables CSS (Custom Properties) (Experto)
Lección 15: Proyecto Integrador: Maquetación de Sentinel (Experto)
Lección 1: Estructura Básica y Etiquetas de Texto
1. ID de lección
htmlcss-01
2. Título
Estructura Básica y Etiquetas de Texto
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar la estructura de árbol del DOM (Document Object Model).
Declarar el boilerplate estándar de un documento HTML5.
Utilizar etiquetas de encabezado (<h1> a <h6>) y párrafos (<p>).
5. Contenido teórico
Conceptos: HTML (HyperText Markup Language) no es un lenguaje de programación, sino de marcado. Usa etiquetas (tags) para decirle al navegador qué es cada contenido. Todo documento válido requiere una declaración <!DOCTYPE html> y los nodos principales <html>, <head> y <body>.
Sintaxis: Una etiqueta se abre con <tag> y generalmente se cierra con </tag>.
Buenas prácticas: Debe existir estrictamente un solo <h1> por página, que representa el título principal. La indentación (espaciado) ayuda a la lectura, aunque al navegador no le importa.
Errores comunes: Olvidar cerrar una etiqueta (ej. poner <p>Texto sin </p>), lo que puede causar que el resto de la página se renderice como un solo párrafo.
6. Ejemplos de código comentados
Ejemplo 1: Esqueleto HTML5
HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Metadatos, no se ven en la página web -->
    <meta charset="UTF-8">
    <title>Mi Primera Web</title>
</head>
<body>
    <!-- Contenido visible -->
    <h1>Bienvenido</h1>
    <p>Este es el contenido de mi página.</p>
</body>
</html>

7. Ejercicio práctico
Enunciado: Construye dentro del <body> un encabezado principal <h1> con el texto "Quiroz Systems". Debajo, añade un párrafo <p> con el texto "Iniciando el reto de 30 días de HTML". Código inicial:
HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reto HTML</title>
</head>
<body>
    <!-- Tu código aquí -->
    
</body>
</html>

Solución esperada:
HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reto HTML</title>
</head>
<body>
    <h1>Quiroz Systems</h1>
    <p>Iniciando el reto de 30 días de HTML</p>
</body>
</html>

Casos de prueba (Validación del DOM):
Caso 1: Comprobar la existencia del nodo <h1> y que su innerText sea exactamente "Quiroz Systems".
Caso 2: Comprobar la existencia del nodo <p> y que su innerText sea "Iniciando el reto de 30 días de HTML".
Caso 3: Validar estructuralmente que el <h1> y el <p> son hijos directos del nodo <body> y no están anidados entre sí. Pistas progresivas:
Abre tu etiqueta <h1>, escribe el título y ciérrala con </h1>.
Justo debajo, abre una etiqueta <p>, escribe el párrafo y ciérrala con </p>.
Asegúrate de que ambas etiquetas estén dentro del bloque <body>.
8. Criterio de aprobación de la lección
Estructuración semántica exitosa inyectando nodos de texto en el árbol principal del DOM.
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 2: Enlaces, Rutas e Imágenes
1. ID de lección
htmlcss-02
2. Título
Enlaces, Rutas e Imágenes
3. Nivel
Básico
4. Objetivos de aprendizaje
Insertar hipervínculos para conectar páginas usando la etiqueta <a>.
Mostrar gráficos utilizando la etiqueta de auto-cierre <img>.
Configurar atributos vitales como href, src y el texto alternativo alt.
5. Contenido teórico
Conceptos: Las etiquetas en HTML pueden tener atributos que proveen información adicional sobre cómo deben comportarse. Los enlaces y las imágenes dependen completamente de los atributos href y src para funcionar.
Sintaxis: <a href="URL">Texto</a>. <img src="ruta.jpg" alt="Descripción">. Note que <img> no tiene etiqueta de cierre (</img>).
Buenas prácticas: Siempre incluir el atributo alt en las imágenes. Es crucial para los lectores de pantalla (accesibilidad) y para el SEO, además de mostrarse si la imagen falla al cargar.
Errores comunes: Confundir src (source) con href (hypertext reference). Escribir rutas relativas erróneas (ej. olvidar un ../ al buscar una imagen en otra carpeta).
6. Ejemplos de código comentados
Ejemplo 1: Enlaces
HTML
<!-- target="_blank" abre el enlace en una nueva pestaña -->
<a href="https://quirozsystems.com" target="_blank">Visitar Quiroz Systems</a>

Ejemplo 2: Imágenes
HTML
<!-- Etiqueta de auto-cierre con atributo alt obligatorio -->
<img src="logo.png" alt="Logotipo oficial de CatraCode">

7. Ejercicio práctico
Enunciado: Dentro del <body>, crea un enlace (<a>) que dirija a "https://ejemplo.com" con el texto "Ir al proyecto". Debajo, añade una imagen (<img>) cuya fuente (src) sea "banner.jpg" y su texto alternativo (alt) sea "Banner principal". Código inicial:
HTML
<body>
    <!-- Tu enlace e imagen aquí -->
    
</body>

Solución esperada:
HTML
<body>
    <a href="https://ejemplo.com">Ir al proyecto</a>
    <img src="banner.jpg" alt="Banner principal">
</body>

Casos de prueba (Validación del DOM):
Caso 1: Validar que existe un elemento a cuyo atributo href es "https://ejemplo.com".
Caso 2: Validar que existe un elemento img cuyo atributo src es "banner.jpg".
Caso 3: Comprobar que el atributo alt del img es exactamente "Banner principal". Pistas progresivas:
Para el enlace usa <a href="...">...</a>.
Para la imagen usa <img src="...">.
Recuerda que la etiqueta <img> no se cierra con </img>, solo debes añadirle el atributo alt="Banner principal".
8. Criterio de aprobación de la lección
Inyección de nodos con atributos correctamente formateados y referenciados.
9. Tiempo estimado de la lección
40 minutos
10. Puntaje máximo de la lección
100 pts
Lección 3: Listas y Estructuración de Datos
1. ID de lección
htmlcss-03
2. Título
Listas y Estructuración de Datos
3. Nivel
Básico
4. Objetivos de aprendizaje
Estructurar listas desordenadas (viñetas) con <ul>.
Estructurar listas ordenadas (numeradas) con <ol>.
Anidar elementos de lista hijos (<li>) correctamente.
5. Contenido teórico
Conceptos: Las listas organizan datos secuenciales. Una lista desordenada (<ul>, Unordered List) usa viñetas, mientras que una ordenada (<ol>, Ordered List) numera los ítems automáticamente.
Sintaxis: El contenedor padre es <ul> u <ol>. Cada hijo debe ser obligatoriamente un <li> (List Item).
Buenas prácticas: Las listas <ul> son la estructura estándar para construir menús de navegación en la web moderna (luego se estilizan con CSS para quitarles los puntos y ponerlas horizontales).
Errores comunes: Colocar texto u otras etiquetas directamente dentro de un <ul> o <ol> sin envolverlas primero en un <li>. El único hijo directo válido de una lista es <li>.
6. Ejemplos de código comentados
Ejemplo 1: Lista Desordenada
HTML
<ul>
    <li>Python</li>
    <li>JavaScript</li>
    <li>C++</li>
</ul>

Ejemplo 2: Lista Ordenada (Top 3)
HTML
<ol>
    <li>Diseñar la base de datos</li>
    <li>Crear el backend</li>
    <li>Construir el frontend</li>
</ol>

7. Ejercicio práctico
Enunciado: Crea una lista desordenada. Dentro de ella, añade exactamente tres ítems de lista con las siguientes tecnologías: "HTML", "CSS", "JavaScript". Código inicial:
HTML
<body>
    <!-- Tu lista aquí -->
    
</body>

Solución esperada:
HTML
<body>
    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>
</body>

Casos de prueba (Validación del DOM):
Caso 1: Existe un nodo ul en el documento.
Caso 2: El nodo ul contiene exactamente 3 nodos hijos de tipo li.
Caso 3: El innerText del primer, segundo y tercer li coinciden respectivamente con "HTML", "CSS" y "JavaScript". Pistas progresivas:
Abre el contenedor principal con <ul> y ciérralo al final.
Dentro del contenedor, escribe el primer ítem: <li>HTML</li>.
Repite el paso anterior para "CSS" y "JavaScript".
8. Criterio de aprobación de la lección
Jerarquía de árbol validada mediante anidación estricta de elementos li dentro de su nodo padre correspondiente.
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 4: Introducción a CSS y Selectores
1. ID de lección
htmlcss-04
2. Título
Introducción a CSS y Selectores
3. Nivel
Básico
4. Objetivos de aprendizaje
Explicar la sintaxis de las reglas de Hojas de Estilo en Cascada (CSS).
Diferenciar entre estilos en línea, etiqueta <style> y archivos externos.
Seleccionar elementos del DOM por Etiqueta, Clase (.) e Identificador (#).
5. Contenido teórico
Conceptos: CSS se encarga del diseño, presentación y maquetación de los elementos HTML. Las reglas constan de un Selector (a qué aplicarlo) y un bloque de Declaraciones (propiedad: valor).
Sintaxis: selector { propiedad: valor; }. Una clase se invoca con punto .mi-clase, un id con numeral #mi-id.
Buenas prácticas: Nunca usar estilos en línea (atributo style en el HTML). Siempre usar hojas de estilo externas (<link rel="stylesheet">) o la etiqueta <style> en el <head>. Preferir clases sobre IDs para dar estilos, ya que las clases son reutilizables y los IDs son únicos por página.
Errores comunes: Olvidar el punto y coma (;) al final de una declaración, lo que arruina todas las reglas siguientes en ese bloque.
6. Ejemplos de código comentados
Ejemplo 1: Reglas CSS Básicas
HTML
<head>
    <style>
        /* Selector de Etiqueta (afecta a todos los p) */
        p {
            color: gray; 
        }
        
        /* Selector de Clase (afecta a elementos con class="alerta") */
        .alerta {
            color: red;
        }

        /* Selector de ID (afecta solo al elemento con id="principal") */
        #principal {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <p>Texto normal</p>
    <p class="alerta">Texto en rojo</p>
    <p id="principal">Texto negrita</p>
</body>

7. Ejercicio práctico
Enunciado: En el HTML se proveen dos párrafos, uno tiene la clase resaltado. Escribe dentro de la etiqueta <style> una regla que seleccione la clase resaltado y le asigne un color rojo (red). Código inicial:
HTML
<head>
    <style>
        /* Tu regla CSS aquí */
        
    </style>
</head>
<body>
    <p>Párrafo normal</p>
    <p class="resaltado">Párrafo importante</p>
</body>

Solución esperada:
HTML
<head>
    <style>
        .resaltado {
            color: red;
        }
    </style>
</head>
<body>
    <p>Párrafo normal</p>
    <p class="resaltado">Párrafo importante</p>
</body>

Casos de prueba (Validación del DOM/CSSOM):
Caso 1: Validar que existe una regla en la hoja de estilos cuyo selector es exactamente .resaltado.
Caso 2: La propiedad color de dicho selector está definida y es igual a red.
Caso 3: El párrafo con la clase resaltado computa visualmente el color rojo, mientras el otro no. Pistas progresivas:
Para seleccionar una clase debes empezar con un punto: .resaltado.
Abre y cierra llaves { }.
Adentro declara la propiedad: color: red; (no olvides el punto y coma).
8. Criterio de aprobación de la lección
Vinculación exitosa del motor de renderizado aplicando mutaciones visuales mediante selectores de clase.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 5: Tipografía y Colores
1. ID de lección
htmlcss-05
2. Título
Tipografía y Colores
3. Nivel
Básico
4. Objetivos de aprendizaje
Aplicar colores mediante palabras clave, códigos Hexadecimales y RGB.
Alterar el tamaño, peso y familia tipográfica de las fuentes.
Utilizar las propiedades background-color y color.
5. Contenido teórico
Conceptos: CSS ofrece un control absoluto sobre el texto y los fondos. color cambia el color de la letra; background-color cambia el color del bloque.
Sintaxis: font-family: Arial, sans-serif;, font-size: 16px;, font-weight: bold;.
Buenas prácticas: Al usar font-family, siempre proveer una fuente genérica de respaldo al final (como sans-serif o serif) por si la fuente principal no está instalada en el dispositivo del usuario.
Errores comunes: Usar valores de tamaño sin unidad (ej. font-size: 16; será ignorado). Siempre se debe especificar la unidad, como px, rem, o em.
6. Ejemplos de código comentados
Ejemplo 1: Estilos de fuente
CSS
h1 {
    font-family: 'Helvetica', sans-serif; /* Tipografía */
    font-size: 32px;                      /* Tamaño */
    color: #333333;                       /* Gris oscuro en Hexadecimal */
    text-align: center;                   /* Alineación */
}

.caja {
    background-color: rgb(0, 120, 255);   /* Azul en RGB */
    color: white;                         /* Texto blanco */
}

7. Ejercicio práctico
Enunciado: Modifica el estilo del <h1> (usando el selector de etiqueta). Asignale un font-size de 24px, un color hexadecimal #ff0000 (rojo) y cambia su font-family a sans-serif. Código inicial:
HTML
<style>
    /* Estiliza el h1 aquí */
    
</style>
<h1>Sentinel News</h1>

Solución esperada:
HTML
<style>
    h1 {
        font-size: 24px;
        color: #ff0000;
        font-family: sans-serif;
    }
</style>
<h1>Sentinel News</h1>

Casos de prueba (Validación CSSOM):
Caso 1: La regla para el selector h1 posee un font-size de 24px.
Caso 2: La regla para el selector h1 posee un color igual a #ff0000 (o rgb(255, 0, 0)).
Caso 3: La regla posee font-family: sans-serif;. Pistas progresivas:
Abre tu bloque selector: h1 { ... }.
Asigna el tamaño: font-size: 24px;.
Asigna el color y tipografía separando cada instrucción con punto y coma.
8. Criterio de aprobación de la lección
Mutación precisa del texto aplicando las propiedades base de pintado del render engine de CSS.
9. Tiempo estimado de la lección
40 minutos
10. Puntaje máximo de la lección
100 pts
Lección 6: El Modelo de Caja (Box Model)
1. ID de lección
htmlcss-06
2. Título
El Modelo de Caja (Box Model)
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Explicar conceptualmente el Box Model (Content, Padding, Border, Margin).
Aplicar márgenes (margin) para el espaciado exterior y rellenos (padding) para el interior.
Normalizar el modelo de caja utilizando box-sizing: border-box.
5. Contenido teórico
Conceptos: En CSS, todo elemento es una caja rectangular. El tamaño final de esa caja se calcula sumando el contenido (width/height) + relleno interior (padding) + borde (border) + espaciado exterior (margin).
Sintaxis: padding: 10px 20px; (10px arriba/abajo, 20px izquierda/derecha).
Buenas prácticas: Aplicar universalmente box-sizing: border-box; al inicio de tus hojas de estilo. Esto cambia las matemáticas de CSS para que el width que declares incluya el padding y el border, evitando que las cajas se desborden de su contenedor.
Errores comunes: Confundir margin con padding. Si quieres que el fondo (background) de una caja se extienda, usa padding. Si quieres separar dos cajas distintas, usa margin.
6. Ejemplos de código comentados
Ejemplo 1: Reset y Caja básica
CSS
/* Selector Universal (*) para resetear el Box Model en toda la página */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.tarjeta {
    width: 300px;         /* Ancho total será 300px gracias a border-box */
    padding: 20px;        /* Espacio dentro de la tarjeta */
    border: 2px solid black; /* Borde visible */
    margin: 15px;         /* Separación con otras tarjetas */
}

7. Ejercicio práctico
Enunciado: Estiliza el elemento con la clase .box. Asígnale un ancho (width) de 200px, un relleno (padding) de 20px por todos sus lados, un borde sólido (border) de 1px solid black, y finalmente cambia su modelo matemático con box-sizing: border-box;. Código inicial:
HTML
<style>
    .box {
        background-color: lightgray;
        /* Tu código aquí */
        
    }
</style>
<div class="box">Caja de Contenido</div>

Solución esperada:
HTML
<style>
    .box {
        background-color: lightgray;
        width: 200px;
        padding: 20px;
        border: 1px solid black;
        box-sizing: border-box;
    }
</style>
<div class="box">Caja de Contenido</div>

Casos de prueba (Validación Computada):
Caso 1: El ancho total computado de la caja (ancho visual) es exactamente 200px.
Caso 2: La propiedad padding está establecida a 20px.
Caso 3: Validar la presencia estricta de la regla box-sizing: border-box. Pistas progresivas:
Escribe width: 200px; y padding: 20px;.
Para el borde, la sintaxis requiere tres valores: border: 1px solid black;.
Agrega la propiedad mágica al final: box-sizing: border-box;.
8. Criterio de aprobación de la lección
Control absoluto de la volumetría de elementos de bloque mediante la alteración matemática del flujo de caja.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 7: Posicionamiento en CSS
1. ID de lección
htmlcss-07
2. Título
Posicionamiento en CSS
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Entender el flujo normal del documento (position: static).
Extraer elementos del flujo mediante position: absolute y fixed.
Crear contextos de anclaje utilizando position: relative.
5. Contenido teórico
Conceptos: La propiedad position altera cómo se coloca una caja. static es el defecto (apila de arriba a abajo). relative permite moverlo con respecto a su posición original. absolute lo extrae del flujo y lo posiciona en relación a su primer padre que no sea static. fixed lo pega a la ventana del navegador (ideal para barras de navegación).
Sintaxis: position: absolute; top: 10px; right: 0;.
Buenas prácticas: Para que un elemento absoluto no se escape hasta la raíz de la página, asegúrate de ponerle position: relative al contenedor padre donde quieres que se quede atrapado.
Errores comunes: Intentar mover un elemento con top o left sin haber cambiado su position (las propiedades de coordenadas no funcionan en position: static).
6. Ejemplos de código comentados
Ejemplo 1: Contexto Relativo / Absoluto
CSS
.contenedor {
    /* Crea la "cárcel" para el hijo absoluto */
    position: relative; 
    width: 500px;
    height: 500px;
    background-color: gray;
}

.notificacion {
    /* Se mueve en base a .contenedor, NO a la pantalla */
    position: absolute; 
    top: 10px;          /* 10px desde el borde superior del padre */
    right: 10px;        /* 10px desde el borde derecho del padre */
    background-color: red;
}

7. Ejercicio práctico
Enunciado: Tienes un <div class="padre"> y dentro un <div class="hijo">. Haz que el padre tenga position: relative;. Luego, haz que el hijo tenga position: absolute; y pósalo exactamente pegado abajo y a la derecha (usando las propiedades bottom: 0; y right: 0;). Código inicial:
HTML
<style>
    .padre {
        width: 300px; height: 300px; background: lightblue;
        /* Estilos del padre aquí */
    }
    .hijo {
        width: 50px; height: 50px; background: darkblue;
        /* Estilos del hijo aquí */
    }
</style>
<div class="padre">
    <div class="hijo"></div>
</div>

Solución esperada:
HTML
<style>
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
</div>

Casos de prueba (Validación del Computador de Estilos):
Caso 1: El .padre tiene computado position: relative.
Caso 2: El .hijo tiene computado position: absolute.
Caso 3: El .hijo posee las declaraciones bottom: 0px y right: 0px. Pistas progresivas:
Agrega position: relative; al bloque .padre.
Agrega position: absolute; al bloque .hijo.
Mueve el hijo a la esquina usando bottom: 0; right: 0;.
8. Criterio de aprobación de la lección
Alteración del flujo estático del DOM encapsulando coordenadas de renderizado absolutas dentro de un bloque relativo.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 8: Formularios y Controles de Entrada
1. ID de lección
htmlcss-08
2. Título
Formularios y Controles de Entrada
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Declarar formularios para recolección de datos usando <form>.
Emplear etiquetas de entrada <input> con diferentes tipos (text, email, password).
Vincular textos descriptivos utilizando la etiqueta <label> y el atributo for.
5. Contenido teórico
Conceptos: Los formularios son la interfaz de comunicación interactiva de la web. Agrupan campos de entrada y botones de envío.
Sintaxis: <form action="/ruta" method="POST"> ... </form>.
Buenas prácticas: Cada <input> debe tener un <label> asociado. Esto se logra haciendo coincidir el atributo id del input con el atributo for del label. Esto permite que al hacer clic en el texto del label, el cursor se enfoque automáticamente en el input (vital para usabilidad y accesibilidad).
Errores comunes: Omitir el atributo name en los inputs; sin el name, el backend no podrá identificar qué dato es cuál cuando el formulario se envíe.
6. Ejemplos de código comentados
Ejemplo 1: Formulario Accesible
HTML
<form action="/login" method="POST">
    <div>
        <!-- El for="correo" vincula este texto con el input de abajo -->
        <label for="correo">Correo Electrónico:</label>
        <input type="email" id="correo" name="email" required>
    </div>
    
    <div>
        <label for="pass">Contraseña:</label>
        <input type="password" id="pass" name="password" required>
    </div>
    
    <button type="submit">Ingresar</button>
</form>

7. Ejercicio práctico
Enunciado: Construye un mini-formulario de inicio de sesión. Dentro de la etiqueta <form>, crea un <label> con el texto "Usuario". Configura su atributo for como usuario. Debajo, crea un <input> de tipo text, asígnale el id="usuario" y el name="username". Por último, crea un botón <button type="submit">Entrar</button>. Código inicial:
HTML
<form>
    <!-- Tu label, input y botón aquí -->
    
</form>

Solución esperada:
HTML
<form>
    <label for="usuario">Usuario</label>
    <input type="text" id="usuario" name="username">
    <button type="submit">Entrar</button>
</form>

Casos de prueba (Validación del DOM):
Caso 1: Validar que el atributo for del label y el id del input coinciden exactamente ("usuario").
Caso 2: Verificar que el input tenga el atributo name seteado a "username".
Caso 3: Validar la presencia del botón submit. Pistas progresivas:
<label for="usuario">Usuario</label>
<input type="text" id="usuario" name="username">
<button type="submit">Entrar</button>
8. Criterio de aprobación de la lección
Formulario estructurado mediante vinculación sintáctica accesible garantizando compatibilidad con lectores de pantalla.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 9: HTML5 Semántico
1. ID de lección
htmlcss-09
2. Título
HTML5 Semántico
3. Nivel
Intermedio
4. Objetivos de aprendizaje
Explicar la importancia de la semántica en SEO (Search Engine Optimization) y accesibilidad.
Reemplazar etiquetas genéricas (<div>) por componentes semánticos.
Implementar etiquetas estructurales: <header>, <nav>, <main>, <footer>.
5. Contenido teórico
Conceptos: Antes de HTML5, las páginas se construían usando puros <div> (divitis), lo cual es ilegible para las máquinas (Google Bot, Lectores para ciegos). HTML5 introdujo etiquetas con significado intrínseco.
Etiquetas Core:
<header>: Cabecera (logo, menú principal).
<nav>: Bloque de enlaces de navegación principal.
<main>: El contenido principal y único de la página.
<article>: Contenido autocontenido y publicable independientemente (ej. un post del blog).
<footer>: Pie de página (derechos de autor, links legales).
Buenas prácticas: Utiliza siempre un único <main> por documento. Si te encuentras poniendo class="header", es un indicador de que debes usar la etiqueta semántica correspondiente en su lugar.
Errores comunes: Usar <section> solo para aplicar estilos o layouts. Si no tiene una estructura lógica temática (usualmente con su propio título h2), usa un <div> común.
6. Ejemplos de código comentados
Ejemplo 1: Arquitectura Semántica
HTML
<body>
    <header>
        <h1>Sentinel Platform</h1>
        <nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Noticias</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Lanzamiento de HTML5</h2>
            <p>El estándar que revolucionó la web semántica...</p>
        </article>
    </main>

    <footer>
        <p>&copy; 2026 Quiroz Systems. Todos los derechos reservados.</p>
    </footer>
</body>

7. Ejercicio práctico
Enunciado: Tienes una estructura hecha puramente con divs genéricos. Refactorízala (cámbiale los nombres a las etiquetas) usando las etiquetas semánticas de HTML5. Reemplaza <div class="cabecera"> por <header>, <div class="navegacion"> por <nav>, y <div class="principal"> por <main>. Código inicial:
HTML
<body>
    <div class="cabecera">
        <h1>Mi Blog</h1>
    </div>
    <div class="navegacion">
        <a href="/">Inicio</a>
    </div>
    <div class="principal">
        <p>Contenido del blog aquí.</p>
    </div>
</body>

Solución esperada:
HTML
<body>
    <header>
        <h1>Mi Blog</h1>
    </header>
    <nav>
        <a href="/">Inicio</a>
    </nav>
    <main>
        <p>Contenido del blog aquí.</p>
    </main>
</body>

Casos de prueba (Validación del DOM):
Caso 1: Ausencia estricta de elementos div en la solución.
Caso 2: Presencia verificada de los nodos semánticos header, nav y main.
Caso 3: Mantenimiento correcto de la jerarquía de los hijos (el h1 dentro del header, etc). Pistas progresivas:
Borra la palabra div junto con la clase y cámbiala por header. No olvides cambiar el tag de cierre </header>.
Haz lo mismo sustituyendo por <nav> y </nav>.
Finalmente con el <main> y </main>.
8. Criterio de aprobación de la lección
Refactorización de la estructura de marcado orientada a máquinas aplicando el estándar semántico universal HTML5.
9. Tiempo estimado de la lección
30 minutos
10. Puntaje máximo de la lección
100 pts
Lección 10: Flexbox: Diseño Unidimensional
1. ID de lección
htmlcss-10
2. Título
Flexbox: Diseño Unidimensional
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Establecer un contexto de formato flexible mediante display: flex.
Controlar la dirección de flujo con flex-direction.
Distribuir el espacio libre a través de justify-content y align-items.
5. Contenido teórico
Conceptos: Flexible Box Layout Module soluciona los problemas históricos para alinear cajas. Transforma un contenedor en un plano unidimensional (fila o columna) donde los hijos (flex items) pueden estirarse o encogerse fluidamente para rellenar el espacio.
Sintaxis: display: flex; justify-content: center; align-items: center;.
Buenas prácticas: Usar Flexbox para elementos de UI a pequeña escala (barras de navegación, listas de tarjetas, centrado de un elemento).
Errores comunes: Intentar aplicar propiedades flex directamente a los hijos. Propiedades como justify-content solo funcionan si se aplican a la etiqueta Padre que tiene el display: flex.
6. Ejemplos de código comentados
Ejemplo 1: Centrado absoluto moderno
CSS
.contenedor {
    display: flex;
    /* Eje Principal (Horizontal por defecto): centra el contenido */
    justify-content: center; 
    /* Eje Transversal (Vertical por defecto): centra el contenido */
    align-items: center;     
    height: 100vh; /* Ocupa el 100% de la altura de la pantalla */
}

Ejemplo 2: Barra de navegación separada
CSS
.navbar {
    display: flex;
    /* Separa los hijos: el primero a la izq, el último a la der */
    justify-content: space-between; 
}

7. Ejercicio práctico
Enunciado: Aplica Flexbox al contenedor .navbar. Haz que sea un contenedor flexible (display: flex). Alinea sus hijos verticalmente al centro (align-items: center) y distribúyelos horizontalmente empujándolos hacia los extremos de la barra (justify-content: space-between). Código inicial:
HTML
<style>
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
</div>

Solución esperada:
HTML
<style>
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
</div>

Casos de prueba (Validación CSSOM):
Caso 1: El contenedor computa la regla display: flex.
Caso 2: Computa la regla de alineación transversal align-items: center.
Caso 3: Computa la regla de distribución principal justify-content: space-between. Pistas progresivas:
Inicia convirtiendo la caja a flexible: display: flex;.
Centra verticalmente: align-items: center;.
Sepáralos horizontalmente: justify-content: space-between;.
8. Criterio de aprobación de la lección
Configuración arquitectónica responsiva aplicando distribución y alineación unidimensional a través de ejes flexibles.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 11: CSS Grid: Diseño Bidimensional
1. ID de lección
htmlcss-11
2. Título
CSS Grid: Diseño Bidimensional
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Implementar maquetas complejas utilizando el módulo display: grid.
Definir columnas y filas estructuradas con grid-template-columns.
Manejar la separación fluida entre celdas utilizando la propiedad gap.
5. Contenido teórico
Conceptos: Mientras Flexbox es para 1 dimensión (solo fila o solo columna), Grid se usa para construir la arquitectura entera de la página web (filas y columnas al mismo tiempo). Introduce la unidad fraccional fr que calcula proporciones matemáticas del espacio libre.
Sintaxis: display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 20px;.
Buenas prácticas: Utilizar la función repeat() para simplificar cuadrículas (ej. repeat(3, 1fr) es lo mismo que 1fr 1fr 1fr).
Errores comunes: Usar márgenes engorrosos en los hijos para separarlos. En Grid, la separación se define limpiamente en el padre con la propiedad gap.
6. Ejemplos de código comentados
Ejemplo 1: Cuadrícula Básica (3 Columnas Iguales)
CSS
.galeria {
    display: grid;
    /* Crea 3 columnas que ocupan exactamente 1 fracción del espacio cada una */
    grid-template-columns: repeat(3, 1fr);
    /* Separación de 15 píxeles entre filas y columnas (remplaza a margin) */
    gap: 15px;
}

7. Ejercicio práctico
Enunciado: Estiliza la .cuadricula. Habilita el modo grid (display: grid). Crea una estructura de dos columnas exactas utilizando fracciones (grid-template-columns: 1fr 1fr). Finalmente, establece un espacio entre los ítems de 10px utilizando la propiedad gap. Código inicial:
HTML
<style>
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
</div>

Solución esperada:
HTML
<style>
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
</div>

Casos de prueba (Validación CSSOM):
Caso 1: El motor de render identifica .cuadricula con display: grid.
Caso 2: La cuadrícula computa exactamente dos columnas fluidas 1fr 1fr.
Caso 3: Verifica la aplicación de la brecha estructural gap: 10px. Pistas progresivas:
Declara el modelo base: display: grid;.
Para las columnas proporcionales escribe: grid-template-columns: 1fr 1fr; (o también puedes usar repeat(2, 1fr)).
Espácialos con gap: 10px;.
8. Criterio de aprobación de la lección
Orquestación bidimensional avanzada resolviendo layout arquitectónico libre de flotantes o tablas.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 12: Diseño Responsivo y Media Queries
1. ID de lección
htmlcss-12
2. Título
Diseño Responsivo y Media Queries
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Explicar la directiva Viewport necesaria para dispositivos móviles.
Construir interfaces fluidas que se adapten a diferentes resoluciones (RWD).
Escribir puntos de ruptura condicionales (Breakpoints) usando @media.
5. Contenido teórico
Conceptos: Responsive Web Design asegura que tu sitio se vea bien en celulares, tablets y monitores. Las Media Queries permiten que el CSS pregunte: "¿Es la pantalla más pequeña que X píxeles?". Si la respuesta es sí, aplica reglas diferentes de CSS sobreescribiendo las anteriores.
Sintaxis: @media (max-width: 768px) { .clase { nueva-regla; } }.
Buenas prácticas: Mobile First (Desarrolla primero pensando en celulares y usa min-width para pantallas grandes). Asegúrate de tener <meta name="viewport" content="width=device-width, initial-scale=1.0"> en el <head>, de lo contrario el celular escalará la web como si fuera de escritorio (haciéndola diminuta).
Errores comunes: Definir anchos fijos agresivos (ej. width: 800px;) en lugar de máximos (max-width: 800px;), provocando desbordamiento y barras de scroll horizontales indeseadas en móviles.
6. Ejemplos de código comentados
Ejemplo 1: Cambiando layout en móviles
CSS
.contenedor {
    display: flex;
    flex-direction: row; /* Horizontal para monitores */
}

/* Si el ancho de pantalla es 768px o menos (Tablets y móviles) */
@media (max-width: 768px) {
    .contenedor {
        /* Sobreescribe a vertical */
        flex-direction: column; 
    }
}

7. Ejercicio práctico
Enunciado: La .caja tiene un fondo azul por defecto. Escribe una Media Query configurada para un tamaño máximo (max-width) de 600px. Dentro de esa media query, sobrescribe la clase .caja para que su background-color cambie a rojo (red). Esto simula un cambio de UI en un celular. Código inicial:
HTML
<style>
    .caja {
        background-color: blue;
        padding: 50px;
        color: white;
    }
    
    /* Tu Media Query aquí */
    
</style>
<div class="caja">Contenedor Dinámico</div>

Solución esperada:
HTML
<style>
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
<div class="caja">Contenedor Dinámico</div>

Casos de prueba (Simulación de Viewport):
Caso 1: En un viewport superior a 600px, el fondo computado es blue.
Caso 2: En un viewport simulado de 400px, el fondo computado cambia a red.
Caso 3: Validar sintaxis bloque condicional de hojas de estilo @media. Pistas progresivas:
Abre el bloque condicional: @media (max-width: 600px) { ... }.
Adentro, vuelve a seleccionar la caja: .caja { ... }.
Adentro del selector, coloca la nueva regla: background-color: red;.
8. Criterio de aprobación de la lección
Condicionamiento condicional de la pintura del motor render basado en inspección de media queries del hardware de visualización.
9. Tiempo estimado de la lección
60 minutos
10. Puntaje máximo de la lección
100 pts
Lección 13: Transiciones y Estados (Hover/Focus)
1. ID de lección
htmlcss-13
2. Título
Transiciones y Estados (Hover/Focus)
3. Nivel
Avanzado
4. Objetivos de aprendizaje
Aplicar pseudo-clases de estado interactivo (:hover, :focus).
Crear microinteracciones visuales fluidas sin JavaScript.
Utilizar la propiedad transition para suavizar cambios de estado.
5. Contenido teórico
Conceptos: Las pseudo-clases se activan bajo eventos del usuario (como pasar el ratón por encima). Sin transiciones, los cambios ocurren instantáneamente. La propiedad transition instruye al navegador para interpolar los valores a lo largo del tiempo (animación sutil).
Sintaxis: Pseudo-clase: .boton:hover. Animación: transition: background-color 0.3s ease;.
Buenas prácticas: Las transiciones DEBEN declararse en la clase original (estado de reposo), NUNCA dentro del bloque :hover. Si la pones en el hover, la animación de salida será brusca. Evitar animar propiedades que causen reflows pesados (como width o margin); es preferible animar opacity o transform.
Errores comunes: Escribir un espacio entre la clase y la pseudo-clase (.boton :hover en vez de .boton:hover), lo que selecciona a los hijos del botón, no al botón mismo.
6. Ejemplos de código comentados
Ejemplo 1: Botón interactivo
CSS
.btn {
    background-color: black;
    color: white;
    /* Propiedad, duración y curva de aceleración. Puesto en estado reposo. */
    transition: background-color 0.4s ease-in-out; 
}

/* Estado cuando el cursor pasa por encima */
.btn:hover {
    background-color: red;
}

7. Ejercicio práctico
Enunciado: Tienes una clase .tarjeta. Añádele una regla transition: background-color 0.5s; a su bloque base. Luego crea un nuevo bloque para la pseudo-clase .tarjeta:hover y haz que el background-color cambie a darkblue. Código inicial:
HTML
<style>
    .tarjeta {
        background-color: lightblue;
        padding: 40px;
        color: white;
        /* Tu transición aquí */
        
    }
    
    /* Bloque para el hover aquí */
    
</style>
<div class="tarjeta">Pasa el ratón aquí</div>

Solución esperada:
HTML
<style>
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
<div class="tarjeta">Pasa el ratón aquí</div>

Casos de prueba (Validación CSSOM):
Caso 1: La clase base computa la regla transition correctamente.
Caso 2: La pseudo-clase estructural :hover se ha definido sin espacios.
Caso 3: En simulación de hover, el fondo es darkblue. Pistas progresivas:
Dentro de .tarjeta, añade: transition: background-color 0.5s;.
Afuera del bloque, crea uno nuevo: .tarjeta:hover { ... }.
Adentro del hover, pon: background-color: darkblue;.
8. Criterio de aprobación de la lección
Animación del motor compositivo (CSS Transitions) enlazando estados estructurales del DOM en tiempo de ejecución de interfaz.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 14: Variables CSS (Custom Properties)
1. ID de lección
htmlcss-14
2. Título
Variables CSS (Custom Properties)
3. Nivel
Experto
4. Objetivos de aprendizaje
Explicar los beneficios de un sistema de diseño DRY (Don't Repeat Yourself).
Declarar variables personalizadas (Custom Properties) en la pseudo-clase raíz :root.
Inyectar las variables en los selectores utilizando la función var().
5. Contenido teórico
Conceptos: Las variables CSS permiten almacenar un valor (como el color primario de una marca) en un solo lugar y usarlo en 100 lugares distintos. Si el cliente quiere cambiar el color, solo editas 1 línea. Tienen herencia y alcance del DOM nativo, a diferencia de las variables preprocesadas de SASS.
Sintaxis: Declaración (con dos guiones): --mi-color: blue;. Uso: color: var(--mi-color);.
Buenas prácticas: Declarar las variables globales en el selector :root (el elemento <html>) para que estén disponibles en toda la página. Nombrarlas semánticamente (ej. --color-primario, no --color-azul).
Errores comunes: Olvidar escribir los dos guiones -- al principio del nombre de la variable, o escribir la función mal var(--color).
6. Ejemplos de código comentados
Ejemplo 1: Tema Global
CSS
:root {
    --brand-primary: #ff5722;
    --spacing-md: 16px;
}

.boton {
    /* Si la marca cambia de color, esto se actualiza automáticamente */
    background-color: var(--brand-primary);
    padding: var(--spacing-md);
}

.alerta {
    color: var(--brand-primary);
}

7. Ejercicio práctico
Enunciado: Crea el bloque :root. Define en su interior una variable llamada --color-marca con el valor #3498db. Luego, en la clase .encabezado, asigna a su propiedad color la función var() referenciando a esa variable. Código inicial:
HTML
<style>
    /* Declara el :root y la variable aquí */
    
    .encabezado {
        font-size: 2rem;
        /* Utiliza la variable aquí */
        
    }
</style>
<h1 class="encabezado">Sistema Dinámico</h1>

Solución esperada:
HTML
<style>
    :root {
        --color-marca: #3498db;
    }
    
    .encabezado {
        font-size: 2rem;
        color: var(--color-marca);
    }
</style>
<h1 class="encabezado">Sistema Dinámico</h1>

Casos de prueba (Validación Cascading/Variables):
Caso 1: Existencia del bloque pseudo-raíz :root.
Caso 2: La variable --color-marca está registrada globalmente con el hex correcto.
Caso 3: La clase .encabezado computa el color final dinámicamente evaluado mediante la API var(). Pistas progresivas:
Crea el bloque: :root { --color-marca: #3498db; }.
En .encabezado, escribe color: y llama a la función.
La función es var(--color-marca);.
8. Criterio de aprobación de la lección
Escalabilidad de mantenibilidad en cascada instanciando tokens de diseño dinámicos inyectados en runtime.
9. Tiempo estimado de la lección
45 minutos
10. Puntaje máximo de la lección
100 pts
Lección 15: Proyecto Integrador: Maquetación de Sentinel
1. ID de lección
htmlcss-15
2. Título
Proyecto Integrador: Maquetación de Sentinel
3. Nivel
Experto
4. Objetivos de aprendizaje
Consolidar la estructuración semántica de HTML5 en la construcción de layouts.
Implementar simultáneamente Flexbox para microcomponentes y Grid para la arquitectura global.
Demostrar el dominio del Modelo de Caja, tipografías y Custom Properties.
5. Contenido teórico
Conceptos: Un proyecto frontend profesional unifica todo el conocimiento. Empiezas "Limpiando" los estilos del navegador (box-sizing, margin: 0), defines un Sistema de Diseño básico en :root, maquetas la estructura principal con <header>, <main> y <aside> controlados por un CSS Grid, y finalizas refinando el interior de los bloques usando Flexbox.
Sintaxis: Integración masiva de CSS y HTML semántico.
Buenas prácticas: Seguir la filosofía Component-Driven. Trabajar desde afuera hacia adentro (primero la estructura global Grid, luego el centrado Flexbox de los hijos, luego los colores y paddings).
6. Ejemplos de código comentados
(Estructura mental sugerida para un Layout Sagrado (Holy Grail))
CSS
body {
    display: grid;
    /* 1 columna lateral fija de 250px, el resto para el contenido */
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr 50px;
}

7. Ejercicio práctico
Enunciado: Construye una tarjeta (Card) para las noticias de Sentinel. Crea un div con la clase card. Adentro, coloca un h2 con la clase titulo (texto "Nueva Versión V1.0"), y un p con la clase resumen (texto "Detalles técnicos"). En el CSS (etiqueta <style>):
La .card debe tener border: 1px solid black;, padding: 20px;, y estar modelada con Flexbox en formato de columna (display: flex; flex-direction: column;) con un espacio entre los hijos de 15px (gap: 15px;).
El .titulo debe tener el color extraído de una variable llamada --color-primario (el cual debes declarar en :root como #ff5722). Código inicial:
HTML
<style>
    /* Estilos globales y variables */
    
    /* Estilos de la tarjeta */
    
</style>

<!-- Estructura HTML -->


Solución esperada:
HTML
<style>
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
</div>

Casos de prueba (Validación Integral Multimodular):
Caso 1: Jerarquía de DOM correcta (Card como contenedor, h2 y p como hijos).
Caso 2: La tarjeta ha instanciado un modelo flexible vertical (flex-direction: column).
Caso 3: El sistema de tokens (Custom Properties) rige el color del encabezado h2. Pistas progresivas:
Haz la estructura HTML de la tarjeta div conteniendo el h2 y p, asignando las clases pedidas.
En CSS haz el :root con la variable requerida.
El .card lleva las propiedades de caja y Flexbox.
El .titulo lleva la asignación a través de la API var().
8. Criterio de aprobación de la lección
Orquestación arquitectónica moderna en un microcomponente, unificando semántica estricta y diseño algorítmico multidimensional de Flexbox.
9. Tiempo estimado de la lección
180 minutos
10. Puntaje máximo de la lección
500 pts
