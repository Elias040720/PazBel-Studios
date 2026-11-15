# Auditoría técnica, UX/UI y publicación — PazBel Studios

**Fecha:** 15 de noviembre de 2026
**Carpeta oficial trabajada:** `C:\Users\ABEL\Downloads\PazBel_Studios_Portafolio_23_Proyectos_UXUI\PazBel_Studios`
**Arquitectura:** sitio estático HTML5, CSS3 y JavaScript; navegación hash; Canvas; sin dependencias de producción.

## Hallazgos y correcciones

| Hallazgo reproducible | Causa | Corrección |
|---|---|---|
| Texto auxiliar y metadatos fallaban contraste en axe. | El token `--faint` usaba 34 % de opacidad sobre fondos oscuros; una etiqueta de proyecto estaba en `#727582`; los pasos de metodología se atenuaban al 38 %. | Se elevó `--faint` al 58 %, el texto secundario a `#8b8e99` y se retiró la opacidad que atenuaba contenido legible. El campo oscuro, los colores de marca y el Hero aprobado se conservaron. |
| Axe encontraba seis enlaces enfocables dentro de paneles de acordeón con `aria-hidden="true"`. | Los paneles se cerraban visualmente y se ocultaban al árbol accesible, pero no se excluían del orden de tabulación. | Los paneles cerrados empiezan en `inert`; al abrir se actualizan `inert`, `aria-hidden` y `aria-expanded` juntos. |
| Los enlaces del menú cerrado podían aparecer en el análisis estático como contenido oculto enfocable. | El estado `aria-hidden` no cambiaba por sí solo la tabulación del navegador. | Los enlaces del menú usan `tabindex="-1"` cerrado y recuperan su orden normal al abrir; Escape y clic en el fondo devuelven el foco al botón. |
| La validación HTML detectó un atributo `style` duplicado, tipos omitidos en botones, un `for` redundante, un título dinámico vacío y un formulario de cotización sin acción de envío. | Marcado residual y controles interactivos con semántica innecesaria o incompleta. | Se corrigió el atributo duplicado, se tiparon los botones, se eliminó el `for` redundante, se dio texto inicial al título y el cotizador pasó a contenedor no enviable; su cálculo y selección se mantienen. |
| Algunas capturas archivadas no están guardadas localmente, incluida la ruta histórica de MOVA. | El portafolio depende de una captura remota opcional; la copia de captura no está en `assets/portfolio/capturas/`. | Se mantuvo la captura remota opcional y se verificó que cada ficha dispone de un respaldo local marcado como conceptual. El test de desconexión comprueba el fallback para las 23 imágenes. |

La discrepancia «Gimnasio Murex» frente a la captura archivada de «Gimnasio Lima» permanece documentada en el registro del proyecto; no se fusionaron nombres ni se afirmó una identidad comercial sin confirmación. No se cambiaron tarifas ni se enviaron comunicaciones reales por WhatsApp.

## Verificaciones ejecutadas

- `node --check app.js`: aprobado.
- `npm run lint:html` con `html-validate`: aprobado. Se conserva el estilo de etiquetas vacías existente y los estilos inline usados para valores/delays visuales; esas dos reglas están excluidas explícitamente del validador.
- `npm test`: 12 subpruebas aprobadas, entre ellas 23 slugs únicos y completos, IDs únicos, anclas internas, Hero aprobado, rutas de los 23 proyectos, seis servicios, filtros, búsqueda sin acento, estado vacío, lista/galería, paginación, cotizador, validación de formulario, menú, historial, navegación rápida y fallback visual sin red.
- axe-core: cero hallazgos automatizados WCAG en Inicio, Archivo, detalle de proyecto, Servicios, detalle de servicio, Estudio, Metodología, Inversión, Cotizador y Contacto. Esto no constituye certificación WCAG.
- Responsive: las diez vistas principales se midieron a 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 y 1920 px en Chromium, Firefox y WebKit; también se comprobó el ancho CSS de 640 px, equivalente aproximado al espacio disponible en escritorio de 1280 px con zoom de navegador al 200 %. No hubo overflow horizontal ni errores JavaScript.
- Movimiento reducido: las pruebas de navegador se ejecutaron con `prefers-reduced-motion: reduce`; existe una regla CSS específica para reducir movimiento.
- `npm audit`: cero vulnerabilidades reportadas en dependencias de prueba. No hay dependencias de runtime para el sitio.
- `git diff --check`: aprobado.
- Navegación con la red externa bloqueada: las 23 tarjetas terminan con una imagen local válida.

## Revisión visual

Se capturaron las pantallas con Chromium, con el mismo tamaño de escritorio antes/después para el Hero y una captura móvil del Hero y del archivo. También se grabó un recorrido breve con Inicio, filtros, caso y Contacto.

- Antes del último refinamiento: [Hero escritorio](previews/hero-escritorio.webp).
- Después: [Hero escritorio](previews/hero-escritorio-final.png), [Hero móvil](previews/hero-movil-final.png), [Archivo escritorio](previews/portafolio-escritorio-final.png), [Archivo móvil](previews/portafolio-movil-final.png).
- Recorrido: [Video QA](previews/recorrido-qa.webm).

La revisión visual confirma que el título PAZBEL centrado, la atmósfera oscura, el campo de luz, la paleta y las llamadas a la acción siguen intactos. El Hero no se rediseñó. En el archivo, el encabezado editorial da paso a destacados y controles de exploración; el portafolio mantiene la distinción entre capturas archivadas y conceptos.

## Rendimiento, seguridad y límites

HTML, CSS y JavaScript pesan aproximadamente 206 KB sin comprimir; los assets locales suman 1.01 MB (28 archivos), incluido el showreel de 200 KB. No medí LCP, CLS o INP en producción, ni el costo de CPU en equipos de gama baja; no hay un despliegue activo que permita afirmarlos. Tampoco ejecuté Lighthouse, un lector de pantalla real, dispositivos físicos ni una conexión móvil limitada. Se validaron las rutas de WhatsApp con datos sintéticos interceptando `window.open`, sin abrir la URL ni mandar mensajes.

La prueba de secretos cubre patrones comunes en el HTML y JavaScript del sitio; no sustituye un escáner de secretos de todo el historial Git. Los sitios externos y los nombres/atribuciones comerciales aún requieren confirmación humana. La revisión automática cubre contraste de texto, teclado y estructura principal, pero no afirma cumplimiento WCAG 2.2 AA total.

## Git, publicación y CI

El pull request se preparó sobre el SHA remoto `22635d096144cae1af651b10d4dcb2afaf6526d0`, sin reescribir historia. Se añade GitHub Actions para pull requests y pushes a `main`: valida JavaScript, HTML, rutas/funciones, responsive, axe y `npm audit`. El workflow no despliega el sitio.

GitNexus actualizó el índice a 242 nodos, 597 aristas y 18 flujos. `detect-changes --scope all` marcó riesgo medio por los cambios del flujo de menú (un proceso afectado). El análisis advierte que 28 puntos de entrada no se trazaron y 119 llamadas se omitieron por límite de ramificación; esa cobertura parcial no se interpreta como prueba de ausencia de otros flujos.

CI remoto para `3930f28c0011897f9b81c9db087f42ae87e4aa33`: aprobado en la ejecución 43774235697 (12 subpruebas; matriz Chromium, Firefox y WebKit; `npm audit` sin vulnerabilidades). Pull request #1: https://github.com/Elias040720/PazBel-Studios/pull/1, abierto y mergeable; base `main` permanece en `22635d096144cae1af651b10d4dcb2afaf6526d0`. El chequeo automático de vista previa de Vercel falla; la cuenta conectada no tiene acceso al equipo que muestra los registros (403). Para respetar el límite de no desplegar, no se integró a `main`; el PR queda listo para revisar cuando el propietario de Vercel resuelva ese fallo o confirme una ruta de integración que no active despliegue.
