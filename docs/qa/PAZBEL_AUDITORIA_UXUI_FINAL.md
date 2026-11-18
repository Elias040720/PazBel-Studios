# PazBel Studios — Auditoría UX/UI y QA visual

**Fecha de ejecución:** 17 de noviembre de 2026 (hora local de Lima)  
**Código base:** `origin/main` en `1b9c474771e08cce85095b80120ee31b554925e5`  
**Rama de trabajo:** `fix/pazbel-ux-polish-20261117`  
**Alcance:** correcciones locales, pruebas automatizadas, capturas locales y observación de las dos publicaciones públicas.

## Resumen ejecutivo

Se implementaron correcciones localizadas manteniendo el hero PAZBEL cinematográfico y la identidad aprobada. La versión local contiene los 23 proyectos y seis fichas de servicio, conserva el cotizador y el flujo de WhatsApp, y mejora navegación, acceso por teclado, degradación cuando falta `IntersectionObserver` y ciclo de movimiento del cursor/Canvas.

**Estado general: PASS local con bloqueos de publicación.** La suite local terminó 24/24; las nueve pruebas unitarias, lint HTML, sintaxis JS y auditoría de dependencias de producción pasaron. GitHub Pages todavía muestra el comportamiento anterior porque los cambios están en una rama local no publicada. La página de Vercel disponible no parece corresponder a este repositorio y requiere acceso al proyecto/cuenta correctos antes de poder actualizarse.

## Hallazgos reproducidos, causa y corrección

| Estado | Hallazgo | Evidencia y causa | Corrección |
|---|---|---|---|
| PASS local / pendiente de publicar | Las seis disciplinas de Inicio llevaban al índice general de servicios. | En `index.html` los enlaces apuntaban a `#/servicios` aunque existen páginas detalladas. | Enlaces directos a cada ficha. “Crecimiento digital” conduce a la ficha combinada real “Experiencias digitales y crecimiento”, sin inventar servicio. |
| PASS local / pendiente de publicar | La inicialización dependía de `IntersectionObserver`. | Si el navegador no ofrece la API, reveals/proceso/canvas podían interrumpir la inicialización o quedar sin estado. | Fallback visible y funcional; prueba completa del router, menú, búsqueda y proceso con API ausente. |
| PASS local / pendiente de publicar | El RAF del cursor podía continuar sin necesidad y activarse en dispositivos táctiles. | El ciclo no se detenía de forma explícita en pestaña oculta, baja animación o salida. | Cursor condicionado a puntero fino, RAF iniciado bajo demanda y detenido al ocultar/salir/reducir movimiento. |
| PASS local / pendiente de publicar | El Canvas no coordinaba del todo visibilidad, ruta, tamaño y preferencia de movimiento. | La animación podía estar activa fuera de la vista útil. | Render solo cuando visible, con dimensiones válidas, página visible y movimiento permitido; actualización al navegar y redimensionar. |
| PASS local / pendiente de publicar | Selector de modo sin movimiento duplicaba `.no-motion`. | El selector no coincidía con la clase aplicada al documento. | Corregido a `.no-motion .hero__sub`; probado con el control manual. |
| PASS local / pendiente de publicar | Saltar al contenido desplazaba, pero no aseguraba foco en `main`. | El destino no era enfocable y el router interceptaba el hash. | `main` tiene `tabindex=-1` y el controlador mueve el foco antes del desplazamiento. |
| PASS local / pendiente de publicar | Fichas repetían retos y tecnologías no confirmadas. | Datos compartidos se presentaban como case study individual y stack confirmado. | Se oculta el reto genérico y se omite stack no verificado; se evita contenido boilerplate y se aclara el alcance de Murex. |
| PASS local / pendiente de publicar | Estado activo de navegación no reflejaba rutas hijas. | El router no normalizaba slugs detalle al padre de navegación. | Se mapea proyecto/servicio a su sección principal y se evita renderizar una ficha equivocada ante slugs desconocidos. |
| PASS local / pendiente de publicar | Header de fichas de servicio podía juntar breadcrumb y número de capacidad. | Faltaba una composición responsive entre ambos metadatos. | Fila flexible con separación, salto controlado y margen coherente. |
| BLOCKED publicación | Vercel muestra una página distinta y desborda en móviles estrechos. | QA público halló ancho de documento 365 px a 320 y 360 px, además de texto recortado a 320. La página visual no coincide con el hero/código del repositorio. Las cuentas conectadas no tienen el proyecto ni despliegue `paz-bel-studios`. | No se modificó dominio ni se creó proyecto en una cuenta ajena. Se necesita acceso del owner al proyecto Vercel correcto. |
| BLOCKED publicación | GitHub Pages aún devuelve enlaces antiguos y falla la prueba pública sin `IntersectionObserver`. | En la versión pública, la disciplina “Diseño web” todavía va a `#/servicios`; la prueba pública esperaba el router con fallback pero encontró el comportamiento previo. | Cambios están en la rama local; falta publicar por el flujo autorizado y volver a ejecutar QA sobre Pages. |

## Cambios aplicados

- `index.html`: landmark principal enfocable, rutas correctas de disciplinas, semántica del menú móvil, metadatos para ocultar información técnica no confirmada, nota de alcance y estructura flexible de cabecera de servicio.
- `app.js`: ciclo de cursor/Canvas limitado a contexto visible, fallbacks de observadores, foco del skip link, estado de navegación, manejo de rutas desconocidas, trampa de foco y Escape del menú, estado alternativo del proceso, contenido de proyecto sin afirmaciones no verificadas.
- `styles.css`: selector de movimiento reducido corregido, cabecera de servicio con separación responsive, objetivos de enlace de Inicio de al menos 44 px y ficha con una sola característica.
- `tests/browser.test.cjs`, `tests/site-integrity.test.cjs`: pruebas de rutas, foco, menú, ausencia de IO, motion normal/reducido, controles del portafolio y contenido honesto.
- `pazbel-qa-visual.cjs`: script de QA público adjunto, con soporte para ejecutable Chromium instalado, detección de recorte que ignora scrollers horizontales intencionales y 11 tamaños solicitados.
- `package.json`: comando`npm run qa:public`.
- `.gitignore`: evidencia temporal local fuera del commit.

## Evidencia visual

**Antes — GitHub Pages público (versión previa):**

- [Inicio 390 px](evidence/before/github-pages-home-390.png)
- [Disciplinas 1440 px](evidence/before/github-pages-disciplines-1440.png)
- [Portafolio 320 px](evidence/before/github-pages-portfolio-320.png)
- [Vercel 320 px](evidence/before/vercel-home-320.png)
- [Vercel página completa 1440 px](evidence/before/vercel-home-full-1440.png)

**Después — ejecución local de la rama actual:**

- [Inicio móvil 390 px](evidence/after/home-mobile.jpg)
- [Inicio escritorio completo](evidence/after/home-desktop.jpg)
- [Inicio 320 px](evidence/after/home-320.jpg)
- [Portafolio 320 px](evidence/after/portfolio-320.jpg)
- [Servicio Diseño UX/UI móvil, página completa](evidence/after/service-design-mobile.jpg)
- [Proyecto Mova móvil](evidence/after/project-mova-mobile.jpg)
- [Proyecto conceptual privado DPP móvil](evidence/after/project-private-dpp-mobile.jpg)
- [Contacto visual de las 23 fichas](evidence/after/project-details-contact.png)
- [Contacto visual de las seis fichas de servicio](evidence/after/service-details-contact.png)

Las capturas posteriores son de la app local ejecutada en Edge/Chromium con viewport móvil o escritorio; no representan una publicación ya actualizada.

## Pruebas ejecutadas

| Verificación | Resultado |
|---|---|
|`npm test` (unitarias + navegador) | **PASS 24/24** |
| Navegación, filtros, búsqueda, orden, vista, Mostrar más y 23 rutas de proyecto | **PASS** |
| Seis servicios, rutas rápidas e historial | **PASS** |
| Cotizador y paso de selección a contacto | **PASS** |
| Formulario de contacto y preparación de WhatsApp con apertura interceptada | **PASS**; no se envió mensaje |
| Menú móvil, Escape, backdrop y restauración de foco | **PASS** |
| App con `IntersectionObserver` ausente | **PASS** |
| Motion normal: Canvas/cursor ejecutan y paran según visibilidad | **PASS** |
| Movimiento reducido y texto/CTA del hero | **PASS** |
| Matriz responsive local en Chromium, Firefox y WebKit; vistas principales en tamaños múltiples | **PASS** |
| axe en vistas principales dentro de la suite | **PASS, sin hallazgos reportados por el test** |
|`npm run test:unit` | **PASS 9/9** |
|`npm run lint:html` | **PASS** |
|`node --check app.js` y`node --check pazbel-qa-visual.cjs` | **PASS** |
|`npm audit --omit=dev` | **PASS: 0 vulnerabilidades de dependencias de producción** |
| `git diff --check` | **PASS** |
| QA público: 10 rutas GitHub Pages + Inicio Vercel en 11 viewports | **121 combinaciones ejecutadas**; 5 alertas (ver arriba) |

## Responsive y accesibilidad

La suite local de Playwright ejercitó Chromium, Firefox y WebKit y tamaños de teléfono, tablet y escritorio. El script público cubrió 320×720, 360×800, 375×812, 390×844, 430×932, 640×900, 768×1024, 1024×768, 1280×800, 1440×900 y 1920×1080.

**Zoom real del navegador al 200 %: NOT TESTED.** No se simuló con cambio de viewport y no se declara como probado. **Dispositivo móvil físico / lector de pantalla: NOT TESTED.** La prueba axe está limitada a las vistas principales cubiertas por la suite, no a auditoría manual WCAG completa de cada proyecto.

## Rendimiento

Se verificó el ciclo funcional de RAF del Canvas/cursor (activo bajo condiciones visibles y pausado al ocultar la pestaña) y se ejecutó auditoría de dependencias de producción. **LCP, INP, CLS de campo, Lighthouse, CPU/memoria bajo perfil y throttling de red: NOT TESTED.** No se declaran objetivos Core Web Vitals alcanzados sin medición trazable.

## Estado de publicaciones y Git

- **Git local:** rama `fix/pazbel-ux-polish-20261117`, basada en `origin/main` SHA `1b9c474771e08cce85095b80120ee31b554925e5`.
- **GitHub Pages:** [sitio público](https://elias040720.github.io/PazBel-Studios/#/). QA confirma que aún es la versión anterior. **No se declara el deploy nuevo.**
- **Vercel:** [sitio público](https://paz-bel-studios.vercel.app/). Contenido distinto al repo; proyecto/permiso correcto **BLOCKED** en las cuentas conectadas. No se cambió la configuración.
- **Commit de código:** `7764301d3c6605a5106666dfdb789d1c2162d80e`, rama publicada `fix/pazbel-ux-polish-20261117`.
- **PR:** [#2](https://github.com/Elias040720/PazBel-Studios/pull/2), abierta contra `main`.
- **CI de GitHub:** [ejecución 44208450490](https://github.com/Elias040720/PazBel-Studios/actions/runs/44208450490), **PASS**; el job completo, incluidas pruebas de navegador, terminó con éxito.
- **Vercel Preview:** **FAIL/BLOCKED** para despliegue `HQb3NgQBJd24FCGjg1R3DYvSJTj3`. La lectura de logs devuelve 403 para equipo `elias-6ce0`; los dos perfiles Vercel conectados no reconocen el equipo al intentar autorizar acceso. Causa del fallo de build no confirmada.
- **Merge a main y publicación de Pages:** pendientes hasta resolver el fallo de Vercel Preview y validar el despliegue. No se ignoró el estado fallido ni se hizo force push/deploy manual.

## Pendientes reales

1. Publicar la rama validada a través del acceso GitHub disponible, esperar checks e integrar sin reescritura de historial.
2. Volver a correr las 121 combinaciones y verificar que GitHub Pages entrega el SHA/contenido esperado.
3. Obtener acceso del equipo/owner correcto a Vercel y publicar mediante el flujo existente; repetir su QA luego.
4. Medir Core Web Vitals de laboratorio/campo y hacer prueba física/zoom 200 % si se requiere declaración completa de accesibilidad/rendimiento.

**No hay PASS global de publicaciones:** el código local está validado, pero GitHub Pages sigue antiguo y Vercel no está bajo el proyecto conectado disponible.

## Actualización tras la validación remota

El commit `7764301d3c6605a5106666dfdb789d1c2162d80e` fue enviado a la rama de trabajo y la PR #2 quedó abierta. GitHub Actions completó el job de calidad con **PASS**, incluyendo pruebas funcionales, responsive y de accesibilidad automatizada. El chequeo de Vercel asociado a la PR terminó **FAIL**. Aunque la integración identifica el proyecto `paz-bel-studios` dentro del equipo `elias-6ce0`, la conexión Vercel disponible recibe 403 al leer eventos y no puede autorizar ese equipo porque no aparece en ninguno de sus perfiles conectados. Por tanto, no hay logs suficientes para atribuir la causa al código ni al entorno.

No se integró la PR ni se actualizó GitHub Pages porque la misión requiere verificar el resultado de publicación y el chequeo conectado de Vercel está fallido. El deploy actual de Pages sigue reflejando el código previo. Para continuar con la misma misión, la identidad Vercel conectada necesita acceso al equipo que posee `paz-bel-studios`; después se podrán leer los logs, corregir la causa si corresponde, repetir el preview y, con todas las verificaciones satisfactorias, integrar y confirmar Pages.
