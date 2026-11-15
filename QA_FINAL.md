# Informe de QA final — PazBel Studios

Fecha: 15 de noviembre de 2026. Entorno: Windows, Chromium 1248 headless, archivo temporal combinado para respetar el acceso `file://` del sitio estático.

## Cambios realizados

- Se retiraron del Hero la cápsula de estudio y ubicación, el punto turquesa, sus estilos y su animación.
- Se retiraron “Desliza” y su línea animada; no se agregó otro indicador.
- Se quitó el encabezado “01 — Manifiesto” y la regla. Se conserva el texto editorial con jerarquía natural.
- Se eliminaron las tres estadísticas obsoletas y la nota explicativa de procedencia.
- Se eliminó la barra de progreso global junto con el marcado, los estilos y su cálculo durante scroll. Se conserva el fondo y borde de la navegación al desplazarse.
- El menú móvil devuelve el foco al botón al cerrarse y cierra al hacer clic en el backdrop. El listener del backdrop se instala y elimina en cada apertura/cierre.

## Verificaciones ejecutadas

| Área | Resultado | Evidencia |
|---|---|---|
| Sintaxis JavaScript | PASS — `node --check app.js` | Sin salida de error |
| Portafolio | PASS — 23 slugs únicos; 3 destacados y 9 fichas iniciales | Datos de `app.js`; flujo Chromium |
| Búsqueda | PASS — HopperCode devuelve un resultado; vacío muestra estado y restablecimiento | Chromium |
| Filtros, orden, vista y paginación | PASS — A–Z empieza por Ávila Parfums; lista se activa; Mostrar más aumenta de 9 a 18 | Chromium |
| Detalle de proyecto | PASS — HopperCode conserva navegación atrás y adelante | Chromium |
| Detalle de servicio | PASS — la ruta `#/servicios/desarrollo-web` abre la plantilla individual sin errores | Chromium |
| Cotizador | PASS — base cambia de S/ 89 a “A cotizar · base S/ 1,200” al elegir e-commerce y módulo CMS | Chromium |
| Validación de contacto | PASS — se muestran errores para nombre, correo y mensaje inválidos | Chromium, valores sintéticos; no se abrió ni envió WhatsApp |
| Overflow horizontal | PASS — 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 y 1920 px; `scrollWidth == clientWidth` | Chromium |
| Errores JavaScript | PASS en recorridos principales; cero excepciones registradas | Chromium |
| Elementos solicitados | PASS — no quedan textos, IDs ni selectores dedicados en HTML/CSS/JS | Búsqueda estática |

Las capturas reales están en `previews/hero-escritorio-final.png`, `previews/hero-movil-final.png`, `previews/portafolio-escritorio-final.png`, `previews/detalle-proyecto-final.png`, `previews/servicios-final.png`, `previews/metodologia-final.png`, `previews/precios-final.png`, `previews/cotizador-final.png` y `previews/contacto-final.png`.

## Pendientes y límites reales

- No se ejecutó zoom 200 %, pruebas en dispositivos físicos, Firefox/WebKit, lector de pantalla, Lighthouse ni medición de Core Web Vitals.
- No se verificó disponibilidad de enlaces/demo externos en producción ni las fuentes remotas en una red pública.
- No se probaron envíos a WhatsApp para no iniciar una comunicación externa.
- El clic en backdrop y retorno de foco se revisaron en código, pero no se repitieron como interacción automatizada.
- El workspace entregado no contiene `.git`; no fue posible crear rama ni commit sin inventar historial.
- No se incluyó video. No hubo push, merge ni despliegue.
