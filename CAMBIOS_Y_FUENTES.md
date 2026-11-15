# PazBel Studios — Decisiones de diseño y evidencia

## Refinamiento UX/UI del 15 de noviembre de 2026

- Se conservaron el Hero tipográfico centrado, el campo de luz, el fondo atmosférico y el tratamiento editorial aprobado.
- Se eliminaron la cápsula decorativa de estudio/ubicación y el punto animado del Hero, el indicador “Desliza”, el encabezado numerado y la regla del manifiesto, las estadísticas obsoletas y la nota repetida sobre procedencia.
- Se eliminó la barra global de progreso de scroll (marcado, estilos y listener de cálculo). La navegación aún actualiza su fondo al desplazarse.
- Se preservó la ubicación comercial en Contacto. El contenido valioso del manifiesto permanece sin rótulo ni huecos generados por las eliminaciones.
- El menú móvil devuelve el foco al control de apertura al cerrarse y acepta cierre al pulsar el fondo exterior; su listener se limpia al cerrar.
- La verificación de esta edición está documentada en `QA_FINAL.md`; las capturas recientes están en `previews/*-final.png`.

## Qué fue analizado

- **`deepseek_html_20261113_61f627.html` (archivo adjunto):** HTML/CSS/JS completo. El Hero gigante, centrado y tipográfico fue la prioridad visual porque el propietario indicó que era su referencia favorita. Se conservaron el título monumental, el campo de luz, la atmósfera obsidiana y la navegación por rutas hash.
- **`xd.html` (archivo adjunto):** propuesta editorial «Del plano a la obra». Se incorporó como hilo visual de la página Proceso (trazos SVG, transición de wireframe a interfaz, iluminación técnica) y como criterio de composición.
- **Archivos del proyecto PazBel compartidos en una conversación previa:** logo oficial, dos capturas verificadas, catálogo de 14 proyectos, precios base y número de WhatsApp.
- **Wix y ChatGPT Site:** se intentó acceder a los dos enlaces publicados en el mensaje. En este entorno, las páginas alojadas no pudieron recuperarse, por lo que **no se afirma haber verificado sus animaciones reales**. Los aportes del diseño ChatGPT/XD se interpretaron a partir de los materiales adjuntos y el contexto proporcionado.

## Qué cambió con relación a DeepSeek

1. Se conservó y refinó el **Hero** original, sin sustituirlo por logo a un lado o tarjeta genérica.
2. Se corrigió un fallo funcional en la inicialización del Canvas: el selector genérico `.field` capturaba también campos de formulario y provocaba `getContext is not a function`; ahora se limita a `canvas[data-field]`.
3. Se añadió un **interludio audiovisual** con showreel breve original, poster, botón reproducir/pausar y reproducción solo voluntaria.
4. Se incorporaron **dos capturas auténticas** y etiquetas claras que distinguen los visuales conceptuales.
5. Se corrigieron los datos del archivo: MOVA es una plataforma educativa y Chambi Motors una solución para el seguimiento de vehículos en taller. Se sustituyeron las historias, años y stacks inventados por descripciones de referencia conservadoras.
6. Se amplió el archivo a **14 proyectos**, con filtros y ficha individual.
7. Se completaron **seis fichas de servicio individuales**, reutilizando el sistema de diseño principal.
8. Se agregó una escena de **Plano a obra** a la metodología existente, con movimiento y fallback para movimiento reducido.
9. Se reemplazaron las tarifas inventadas del HTML DeepSeek por los importes base del código PazBel proporcionado: Landing Page Pro S/ 89; Web Corporativa S/ 499; E-commerce S/ 1,200; Software desde S/ 1,890; además de los planes mensuales originales.
10. Se reformuló el cotizador para no fingir que los módulos y plazos tienen un precio fijo no verificado. Se muestra el precio base y los extras pasan a "a cotizar".
11. El formulario prepara y abre un mensaje real hacia `https://wa.me/51916666934` tras validación, sin fingir envío a un backend.
12. Se corrigió el desbordamiento horizontal detectado en móvil a 390 px, se mejoraron atributos ARIA de los acordeones y el estado del menú móvil.
13. El panel de demostración está oculto para visitantes; se habilita con `?demo=1`.

## Verificaciones realizadas

- `node --check app.js`: PASS.
- HTML: vistas y enlaces inspeccionados; 82 IDs únicos y no repetidos (en estructura base); recursos locales verificados.
- Chromium, 1440 y 390 px: Hero cargó sin errores JavaScript y las rutas Inicio/Proyectos funcionaron.
- Chromium, 390 px: fichas `#/proyectos/avila-parfums`, `#/servicios/software`, y cotizador renderizaron su vista activa sin desbordamiento horizontal ni errores JavaScript.
- Archivo de proyectos: 14 entradas; filtro de software muestra 4.
- Cotizador: cambio de Landing a Web Corporativa muestra base desde S/ 499; activar Motion avanzado marca cotización por alcance.
- Contacto: envío de prueba con datos sintéticos generó la URL a WhatsApp y estado informativo, sin errores JavaScript.

## Pruebas que aún faltan antes de publicar

- Revisión visual y de interacción en dispositivos físicos.
- Firefox, Safari/WebKit y emulación de navegación lenta.
- Auditoría WCAG 2.2 AA completa, incluidas pruebas manuales con lector de pantalla.
- Core Web Vitals medidos en una versión alojada.
- Verificación final de precios, fotos y atribución comercial con los responsables.
- Revisión real de todos los enlaces públicos externos en una red sin restricciones de navegación.

## No se hizo

No se realizó ningún despliegue remoto, push a GitHub ni modificación de la rama `main`. La entrega es una propuesta en HTML/CSS/JS que funciona localmente y sirve para evaluar la dirección artística antes de producción.


## Actualización de imágenes del portafolio (14/11/2026)

- 14 proyectos conservados.
- Dos capturas en archivos locales (Ávila, Dual).
- Ocho vistas archivadas disponibles desde el repositorio del portafolio (MOVA, Cruzial, TalentLens, Gimnasio publicado como Lima, JNA, Elixia, Fragance Obsession y Goccta), con fallback visual conceptual cuando no hay conexión.
- Chambi, CarWash Alita, DPP Control y Paco Fragance muestran un visual conceptual hasta contar con capturas públicas autorizadas.
- DPP Control dispone de enlace público de acceso y un script de captura local opcional.
- Se añadieron URLs verificadas en el catálogo de proyectos del GitHub del usuario, y scripts de preparación de imágenes para Windows.
- No se generaron capturas en vivo de los sitios desde este entorno por restricciones de red; no se presentan las vistas archivadas como imágenes actuales.
- Documento detallado: `EVIDENCIA_CAPTURAS.md`.
