# PazBel Studios

Landing corporativa en español peruano, construida con HTML, CSS y JavaScript. Sin instalación de paquetes, backend ni proceso de compilación.

## Abrir el proyecto

Desde esta carpeta, ejecuta `node server.cjs` y abre http://127.0.0.1:4173. Requiere Node.js. Para detener el servidor, Ctrl+C. También puedes abrir `index.html` directamente; el servidor es preferible para portapapeles y pruebas.

## Archivos

- `index.html`: estructura, contenido editorial, metadatos y diálogo de contacto.
- `css/styles.css`: sistema visual, seis rangos adaptables y movimiento reducido.
- `js/config.js`: teléfono, marca, redes, precios, suscripciones, proyectos, estados y condiciones comerciales.
- `js/main.js`: cotizador, demos, contactos contextuales, navegación, FAQ y animaciones.
- `assets/logo/pazbel-original.jpeg`: imagen oficial original, sin redibujar. El recorte del monograma en navegación se hace con CSS; el logo completo aparece al final.
- `assets/fonts/`: Inter y Space Grotesk en WOFF2 local, siete pesos, licencias OFL.
- `assets/vendor/`: GSAP 3.13.0 y ScrollTrigger 3.13.0 locales, con cabeceras de licencia conservadas.
- `BENCHMARK.md`: fuentes y decisiones que informan el diseño.
- `qa.html`: banco de pruebas reproducible en navegador, sin paquetes externos.
- `tests/`: resultados y capturas de revisión.
- `TESTS.md`: metodología y límites de la verificación.

## Configurar WhatsApp y redes

En `js/config.js`, asigna `whatsapp` al número oficial completo con código internacional, sin espacios, por ejemplo código de país + número real. El valor vacío es intencional. No uses un número ficticio en producción.

Con el número vacío o inválido, los botones abren un diálogo que explica la configuración pendiente y muestra el mensaje para copiarlo. Con número válido abren `https://wa.me/` con `encodeURIComponent`, `noopener` y `noreferrer`. El sitio no envía mensajes automáticamente: la persona confirma el envío dentro de WhatsApp.

Para redes, agrega objetos `{ name: 'Instagram', url: 'https://…' }` en `socials` con enlaces oficiales verificados. No se muestran enlaces inventados. Actualiza el nombre de marca en la configuración y, si cambia la identidad, en el título, logotipo y contenido editorial de `index.html`.

## Editar precios y proyectos

Los cuatro precios iniciales y tres mensualidades están centralizados en `plans` y `subscriptions`. Las tarjetas, FAQ relacionadas, opciones, importes y mensajes se generan desde esos datos. `from: true` conserva la distinción entre precio fijo y precio de entrada referencial. No se suman pagos únicos y mensuales en un total ambiguo.

Cada proyecto tiene nombre, categoría, descripción, tecnologías, estado y CTA. Las vistas actuales son HTML/SVG conceptuales rotuladas. MOVA y Chambi se contrastaron con documentación/código local, sin modificar esos repositorios. No se verificaron despliegues. La documentación local de MOVA indica Railway, diferente del Azure citado en el brief; por ello se omite el proveedor activo. CARWASHALITA requiere confirmar estado y funcionalidades.

## Dirección creativa

“Del primer píxel a tu próxima oportunidad”: composición editorial oscura, Space Grotesk + Inter, cinta cian/violeta/coral derivada del lenguaje del logo. El hero presenta una interfaz, la narrativa conecta diseño, operación y crecimiento; el portafolio usa apilamiento en escritorio y tarjetas normales en móvil. Las cuatro demos cambian marca ficticia, colores, composición gráfica, titular y CTA de ejemplo. No usan IA ni APIs.

Los recursos críticos se sirven localmente. Si GSAP no carga, siguen disponibles navegación, precios, demos, cotizador y contactos; la narrativa conserva su contenido y actualización con IntersectionObserver. La preferencia de movimiento reducido desactiva animaciones, fijación y scroll suave. No hay medición publicitaria ni formularios que guarden datos.

## Antes de publicar

1. Número oficial de WhatsApp y enlaces de redes.
2. Dominio y alojamiento finales; añadir URL canónica, `og:url`, imagen social absoluta y sitemap cuando exista el dominio real.
3. Confirmación fiscal de IGV.
4. Alcance contractual de Landing Page Pro: secciones, contenido y revisiones; número de productos/integraciones de tienda; límites de soporte y condiciones de hosting.
5. Estados públicos, URLs autorizadas y capturas reales de los tres proyectos. Sustituir demostraciones solo con evidencia disponible.
6. Condiciones comerciales, identificación legal y textos aplicables revisados por el negocio; no se inventan políticas, plazos ni direcciones.

Esta entrega es local y no ha sido publicada. Para alojamiento estático, subir `index.html`, `css/`, `js/` y `assets/`. No subir `qa.html`, `server.cjs`, documentos ni `tests/` como páginas comerciales. No hay credenciales ni backend que configurar.

## Repetir las pruebas

Con el servidor activo, abre http://127.0.0.1:4173/qa.html y pulsa “Ejecutar pruebas”. El banco abre el sitio en un marco real a cada ancho; valida importes, mensajes y estados. El selector “Ver” permite inspeccionar secciones a 375, 430, 768, 1024, 1440 y 1920 px. El escenario de movimiento reducido simula la consulta de medios de JavaScript y activa las mismas reglas CSS dentro del marco; no cambia preferencias del sistema.

## Recursos y licencias

- Logo: proporcionado por el usuario.
- Inter y Space Grotesk: paquetes `@fontsource/inter@5.3.0` y `@fontsource/space-grotesk@5.3.0`, archivos latinos WOFF2. Licencias junto a las fuentes.
- GSAP/ScrollTrigger 3.13.0: https://gsap.com/standard-license/ y https://gsap.com/docs/v3/Plugins/ScrollTrigger/.
- Ilustraciones de cinta, automóvil y mockups: código SVG/CSS/HTML creado para esta landing. No representan capturas ni resultados de clientes.
