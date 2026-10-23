# Registro de pruebas

Fecha: 22 de octubre de 2026 (America/Bogota).

## Resultado

96/96 verificaciones correctas en el banco local de navegador. Registro completo: `tests/results.txt`.

- Respuesta HTTP 200 y comprobación de sintaxis de `main.js` y `config.js`.
- Marcos de navegador a 375, 430, 768, 1024, 1440 y 1920 píxeles, con medición de ancho del documento y límites de contenido principal.
- Presencia de cuatro planes, tres suscripciones, tres proyectos y ocho FAQ.
- Destinos de todos los enlaces internos existentes.
- Las 16 combinaciones de desarrollo y acompañamiento en cada tamaño: importes separados y mensajes personalizados.
- Cuatro rubros: cambio de estado, contenido y mensaje asociado.
- Teléfono vacío: no genera URL falsa. Codificación de acentos, símbolos y espacios comprobada con un número de prueba solo en memoria, sin abrirlo ni enviar mensajes.
- Menú móvil: abre y se cierra al seleccionar un enlace. FAQ nativo: apertura.
- ScrollTrigger registrado y capítulo tercero activado al desplazarse en escritorio.
- Carga sin los dos scripts de animación: contenido e interacciones operativos.
- Movimiento reducido simulado en el marco: consulta de medios de JavaScript forzada y mismas reglas CSS activadas. Sin ScrollTriggers, sin sticky y sin desplazamiento suave.
- Ningún error JavaScript capturado durante la matriz final. La consola del sitio principal tampoco mostró errores o advertencias en la consulta realizada.
- Interacción directa en el navegador principal: CTA del hero abre el aviso de configuración, conserva mensaje con caracteres correctos y se cierra con Escape.
- Revisión visual de muestras en los seis anchos. Capturas en `tests/` (incluyen la interfaz del banco de pruebas).

## Corrección durante las pruebas

Tras optimizar las fuentes se observó una inconsistencia en la activación del capítulo al saltar largas distancias. Se eliminaron actualizaciones competidoras de IntersectionObserver en escritorio cuando ScrollTrigger controla el recorrido y se refrescaron sus medidas tras cargar fuentes. La matriz ampliada pasó después de la corrección.

## Límites

No se midieron Core Web Vitals ni PageSpeed, y no se afirma una puntuación. Los anchos se probaron en marcos del navegador integrado, no en seis dispositivos físicos. El modo de movimiento reducido se simuló sin cambiar la preferencia del sistema. Pendiente una comprobación en Safari/iOS y dispositivos reales antes de producción.

No se envió WhatsApp: falta el número real. No se verificó apertura de la aplicación móvil ni recepción de mensajes. No se publicó el sitio ni se verificaron dominios de proyectos. El botón de copia tiene manejo de error si el navegador no permite portapapeles; no se modificó el portapapeles del usuario durante la prueba.

No hubo una auditoría completa de lectores de pantalla ni de contraste de cada detalle decorativo. Se implementaron foco visible, etiquetas, radios nativos, diálogo nativo, Escape, enlace de salto, `aria-live`, menú con `aria-expanded` y `prefers-reduced-motion`.
