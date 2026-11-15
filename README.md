# PazBel Studios — Fusión Cinemática

Sitio estático en HTML, CSS y JavaScript. La experiencia pública no requiere framework, servidor de aplicación ni dependencias de producción; Node y Playwright solo se usan para las verificaciones automatizadas.

## Cómo abrirlo

1. Abre `index.html` con Chrome, Edge, Brave o Firefox.
2. También puedes servir esta carpeta con cualquier servidor estático.
3. Explora Proyectos, Servicios, Proceso, Inversión, Cotizar y Contacto.

El sitio no requiere Node, npm, Vite, React ni base de datos. Las herramientas de desarrollo usan Node 22 para ejecutar pruebas, validar HTML y lanzar Chromium. Internet permite cargar Google Fonts, capturas archivadas remotas y WhatsApp; hay fallback tipográfico y visual local.

Para desplegar, puedes alojar esta carpeta en cualquier servidor estático o usar el contenido en `public_html`. Se usa navegación `#/ruta` para que también funcione en `file://` sin reglas especiales.

## Estructura

- `index.html`: vistas y contenido semántico de cada página.
- `styles.css`: lenguaje visual, diseño responsive y motion CSS.
- `app.js`: router, transiciones, canvas, filtros, casos, acordeones, cotizador, contacto y controles de showreel.
- `assets/brand/`: el monograma y logo oficiales de la versión anterior de PazBel.
- `assets/portfolio/`: dos capturas empaquetadas (Ávila y Dual), capturas públicas archivadas de otros ocho proyectos mediante URL GitHub y portadas conceptuales locales de respaldo.
- `assets/motion/`: showreel breve original hecho a partir de las capturas y su poster.
- `previews/`: comparativas y capturas de QA.
- `CAMBIOS_Y_FUENTES.md`: decisiones, límites de verificación y procedencia de datos.
- `PRODUCT.md`: propósito, público y principios del estudio.
- `tests/`: integridad de datos, navegación, cotizador, contacto, responsive y axe.
- `.github/workflows/quality.yml`: verificaciones en cada pull request y push a `main`.

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

## Verificaciones locales

Requiere Node 22. Instala las herramientas y el navegador de prueba, y ejecuta los mismos checks que CI:

```sh
npm ci
npx playwright install chromium firefox webkit
npm run lint:html
npm run check
```

La suite automatizada recorre los 23 detalles, filtros, búsqueda, vista lista, paginación, menú, cotizador, validación del contacto, URL de WhatsApp (sin abrir ni enviar mensajes), diez anchos de pantalla y reglas axe WCAG. `npm run check` también valida la sintaxis JS. CI no despliega el sitio. Estas pruebas no certifican WCAG ni sustituyen QA en lectores de pantalla, dispositivos reales o métricas Core Web Vitals de producción.

## Portafolio con fotos

Hay 23 proyectos: dos capturas reales empaquetadas, ocho capturas archivadas del portafolio y trece representaciones conceptuales identificadas; las capturas archivadas también se pueden descargar desde GitHub. En Windows ejecuta `PREPARAR_FOTOS.cmd` para guardar las ocho imágenes como archivos locales. `CAPTURAR_SITIOS_ACTUALES.cmd` intenta capturar las vistas públicas con Chrome/Brave/Edge. Ver `EVIDENCIA_CAPTURAS.md`.


## Nuevo archivo editorial (23 proyectos)

La sección **Proyectos** tiene tres casos destacados documentados, una galería completa con búsqueda por nombre/sector, filtros por especialidad, orden curado o alfabético, vista galería/lista, carga progresiva de nueve fichas, estado vacío con restablecimiento, controles y estados accesibles. Mantiene la estética DeepSeek del Hero de Inicio sin alterarla.

Se incorporaron como referencias del archivo personal: HopperCode, Dra. Blue, Librería Yarin, GOCCTA Studio, Intranet Zephyra, Lotus, Pastelería, LEE-ACH y Veterinaria. Las últimas nueve portadas son **composiciones conceptuales** y no capturas de sitios web. Los vínculos externos se muestran únicamente cuando se conoce una demo pública; no se enlaza código fuente. Los proyectos privados y de terceros sin autorización (p. ej., GLPI o Kryphos) no se publican automáticamente.
