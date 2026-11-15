# PazBel Studios — Fusión Cinemática

**Propuesta de diseño y desarrollo (HTML + CSS + JavaScript, sin compilación).**

## Cómo abrirlo

1. Descomprime el ZIP.
2. Entra a la carpeta `PazBel_Studios_Fusion_Cinematica`.
3. Abre `index.html` con Chrome, Edge, Brave o Firefox.
4. Prueba el menú, la navegación a Proyectos, Servicios, Proceso, Inversión, Cotizar y Contacto.

No requiere Node, npm, Vite, React, servidor ni base de datos. El acceso a Internet **solo se requiere** para cargar las tipografías opcionales de Google Fonts y para abrir recursos externos como WhatsApp; las tipografías tienen fallback local. Todos los JS, CSS, logos, capturas verificadas y el pequeño vídeo están dentro del ZIP.

Para desplegar, puedes alojar esta carpeta en cualquier servidor estático o usar el contenido en `public_html`. Se usa navegación `#/ruta` para que también funcione en `file://` sin reglas especiales.

## Estructura

- `index.html`: vistas y contenido semántico de cada página.
- `styles.css`: lenguaje visual, diseño responsive y motion CSS.
- `app.js`: router, transiciones, canvas, filtros, casos, acordeones, cotizador, contacto y controles de showreel.
- `assets/brand/`: el monograma y logo oficiales de la versión anterior de PazBel.
- `assets/portfolio/`: dos capturas empaquetadas (Ávila y Dual), capturas públicas archivadas de otros ocho proyectos mediante URL GitHub y portadas conceptuales locales de respaldo.
- `assets/motion/`: showreel breve original hecho a partir de las capturas y su poster.
- `previews/`: vistas ilustrativas capturadas en Chromium durante QA con tipografías fallback.
- `CAMBIOS_Y_FUENTES.md`: decisiones, límites de verificación y procedencia de datos.

## Navegación

Inicio, archivo ampliado de 23 Proyectos, ficha individual por proyecto, seis Servicios y su ficha individual, Estudio, Proceso, Inversión, Cotizador y Contacto.

## Controles

- El Hero conserva la idea que te gustó de DeepSeek: título PAZBEL centrado, fondo oscuro con campo de luz y tipografía editorial.
- El proceso integra una visualización propia inspirada en la narrativa **Plano a obra** de `xd.html`.
- El showreel **no se reproduce automáticamente**: se activa con su botón.
- El selector de proyectos filtra por categoría.
- El cotizador utiliza los importes base existentes en el repositorio entregado; los extras requieren cotización personalizada.
- El formulario de contacto **no guarda ni envía datos a un backend**: construye un enlace a WhatsApp oficial y requiere que el usuario envíe el mensaje allí.
- Para ver el panel de pruebas de animación, abre `index.html?demo=1` (o añade `?demo=1` antes del `#` si ya hay una ruta).

## Avisos de autoría y contenido

Los 23 proyectos están identificados como referencias del sitio o trabajos referenciados de integrantes del equipo. **No se atribuyen automáticamente como encargos comerciales de PazBel**. Dos capturas verificadas están empaquetadas; otras ocho capturas archivadas se obtienen del repositorio público del portafolio. Cuatro proyectos mantienen imágenes conceptuales identificadas. Para incorporarlas offline se incluye `PREPARAR_FOTOS.cmd`. Las fichas no inventan métricas, resultados ni características técnicas que no se hayan confirmado.

Las tarifas base fueron tomadas del código `src/data/pricing.ts` del proyecto del usuario enviado previamente. Deben reconfirmarse antes de publicar ofertas comerciales. No se ha cambiado el número oficial `+51 916 666 934`.

## Validación

Se ejecutaron pruebas de sintaxis JavaScript, inspección de estructura HTML, verificaciones básicas de navegador en Chromium a 1440 px y 390 px, acceso a rutas individuales y comportamiento de filtros y cotizador. También se comprobó la preparación del enlace de contacto por WhatsApp. No son una certificación WCAG, no incluyen pruebas de todos los dispositivos reales ni mediciones de Core Web Vitals en producción. Consulta `CAMBIOS_Y_FUENTES.md`.

## Portafolio con fotos

Hay 23 proyectos: dos capturas reales empaquetadas, ocho capturas archivadas del portafolio y trece representaciones conceptuales identificadas; las capturas archivadas también se pueden descargar desde GitHub. En Windows ejecuta `PREPARAR_FOTOS.cmd` para guardar las ocho imágenes como archivos locales. `CAPTURAR_SITIOS_ACTUALES.cmd` intenta capturar las vistas públicas con Chrome/Brave/Edge. Ver `EVIDENCIA_CAPTURAS.md`.


## Nuevo archivo editorial (23 proyectos)

La sección **Proyectos** tiene tres casos destacados documentados, una galería completa con búsqueda por nombre/sector, filtros por especialidad, orden curado o alfabético, vista galería/lista, carga progresiva de nueve fichas, estado vacío con restablecimiento, controles y estados accesibles. Mantiene la estética DeepSeek del Hero de Inicio sin alterarla.

Se incorporaron como referencias del archivo personal: HopperCode, Dra. Blue, Librería Yarin, GOCCTA Studio, Intranet Zephyra, Lotus, Pastelería, LEE-ACH y Veterinaria. Las últimas nueve portadas son **composiciones conceptuales** y no capturas de sitios web. Los vínculos externos se muestran únicamente cuando se conoce una demo pública; no se enlaza código fuente. Los proyectos privados y de terceros sin autorización (p. ej., GLPI o Kryphos) no se publican automáticamente.
