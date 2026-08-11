Quiroz Systems — Anexo de Evaluación y Certificación
Este anexo define las reglas de negocio, métricas de evaluación y plantillas de salida para la finalización de cualquier curso dentro de la plataforma Quiroz Systems. La siguiente especificación aplica de manera universal a todos los lenguajes y tecnologías documentados.
1. Reglas de Progreso y Bloqueo
Completitud de Lección
Una lección cambia su estado a "Completada" única y exclusivamente cuando el estudiante supera el ejercicio práctico, cumpliendo al 100% con el criterio de aprobación definido para dicha lección (lo que implica que el código compila/ejecuta sin errores y pasa los 3 casos de prueba en el validador o entorno simulado).
Visualizar la teoría, copiar el código base o ejecutar pruebas fallidas no otorgan el estado de completitud.
Bloqueo Secuencial (Gating)
El progreso del curso es estrictamente lineal para garantizar la curva de dificultad pedagógica.
La lección N+1 permanece bloqueada (contenido ofuscado o inaccesible) hasta que la lección N registre oficialmente el estado "Completada" en la base de datos del usuario.
Cálculo del Progreso Global
El progreso de cada estudiante se visualiza en un panel (dashboard) como un porcentaje entero.
Fórmula: Progreso (%) = (Total de lecciones completadas / Total de lecciones del curso) * 100
2. Rúbrica de Evaluación (Sistema de Notas)
Cálculo del Puntaje por Lección
El puntaje obtenido en cada lección se calcula sobre el "Puntaje máximo de la lección" (100 pts para lecciones regulares y 500 pts para el Proyecto Integrador). El cálculo algorítmico se divide en 3 ponderaciones estrictas:
70% - Funcionalidad del código: Se obtiene íntegramente al pasar todos los casos de prueba y cumplir el criterio de aprobación. (Condición de paro: Si no se aprueba el código, la lección no avanza y el puntaje temporal es 0).
20% - Eficiencia de intentos: Se otorga el 20% completo si el usuario resuelve el ejercicio en un margen de 1 a 3 intentos de ejecución sin solicitar pistas. Se penaliza restando un 5% de este rubro por cada intento fallido adicional o por cada "Pista progresiva" desbloqueada.
10% - Tiempo de resolución: Se otorga el 10% completo si el estudiante resuelve el ejercicio dentro del "Tiempo estimado de la lección". Si excede el 150% del tiempo estimado, este rubro baja al 5%; si excede el 200%, baja al 0%.
Cálculo de la Nota Final del Curso
La nota final es la sumatoria acumulada del rendimiento del estudiante.
Fórmula: Nota Final (%) = (Σ Puntajes Obtenidos / Σ Puntajes Máximos Totales) * 100
El resultado se expresa en una escala porcentual (0.0% a 100.0%).
3. Plantilla del Reporte de Nota y Aprendizaje
Esta plantilla se renderiza en la UI y se envía por correo electrónico al estudiante automáticamente al aprobar el Proyecto Integrador.
Plaintext
====================================================================
REPORTE DE NOTA Y APRENDIZAJE — QUIROZ SYSTEMS
====================================================================

Estudiante: [Nombre del Estudiante]
Curso: Quiroz Systems — [Lenguaje]
Nota Final Global: [XX.X]%

### ⏱️ Métricas de Progreso
- Fecha de Inicio: [DD/MM/AAAA]
- Fecha de Finalización: [DD/MM/AAAA]
- Tiempo Total Invertido: [XX] horas y [XX] minutos
- Número de intentos promedio por ejercicio: [X.X]

### 📊 Desglose por Lección
| ID      | Título de la Lección           | Puntaje       | Intentos | Tiempo Invertido |
|---------|--------------------------------|---------------|----------|------------------|
| [L-01]  | [Título Lección 1]             | [X]/100 pts   | [X]      | [X] min          |
| [...]   | [...]                          | [...]         | [...]    | [...]            |
| [L-15]  | Proyecto Integrador            | [X]/500 pts   | [X]      | [X] min          |

### 🧠 Perfil Analítico de Aprendizaje
- Fortalezas (Dominio sólido): 
  [Lista generada automáticamente listando los temas/lecciones 
   resueltos en menor tiempo y sin uso de pistas]

- Áreas de mejora (Oportunidades de repaso): 
  [Lista generada automáticamente listando los temas donde se 
   consumieron todas las pistas o hubo mayor tasa de errores]

====================================================================
*El conocimiento es el código fuente del futuro.*
====================================================================

4. Plantilla del Certificado PDF de Finalización
Especificación estructural y textual para el motor de generación de PDFs (formato Horizontal/Landscape).
Plaintext
--------------------------------------------------------------------------------
[LOGOTIPO VISUAL DE QUIROZ SYSTEMS]

QUIROZ SYSTEMS

Otorga el presente certificado a:

[Nombre del Estudiante]

Por haber completado satisfactoriamente y con excelencia el curso:
Quiroz Systems — [Lenguaje]

Dominando la progresión pedagógica desde nivel cero absoluto hasta nivel experto,
y demostrando la capacidad de construir e integrar proyectos de software reales.

Nota Final: [XX.X]%
Horas de Estudio: [XX] Horas
Fecha de Emisión: [DD/MM/AAAA]


[SELLO INSTITUCIONAL]
Quiroz Systems — Certificación Oficial

Código de Verificación Único: [UUID_O_HASH_ALFANUMÉRICO]
Valide la autenticidad de este certificado en: quirozsystems.com/verify/[UUID]
--------------------------------------------------------------------------------
