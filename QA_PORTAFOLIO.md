# QA — Archivo de proyectos, actualización 15 de noviembre de 2026

## Resultado de las verificaciones ejecutadas

- **23 proyectos** únicos en datos; 14 anteriores y 9 nuevos.
- Sintaxis de `app.js`: `node --check` — **PASS**.
- Chromium mediante HTML/CSS/JS embebidos en una página aislada: **PASS** para interacciones indicadas abajo. La navegación directa a `file://`/`localhost` desde este entorno estaba bloqueada por política, por lo que la prueba utilizó una simulación con los mismos archivos embebidos.
- Resoluciones **320, 390, 768 y 1440 px** — sin desbordamiento horizontal ni excepciones de JavaScript.
- Búsqueda por nombre `HopperCode` — 1 resultado, correcto.
- Filtro Salud — 2 casos (`Dra. Blue`, `Veterinaria`), correcto.
- Filtros, contador, ordenar A–Z, vista galería/lista — correctos.
- `Mostrar más`: 12 → 21 → 23 proyectos visibles — correcto.
- Búsqueda sin resultados y botón de reinicio — correcto.
- Navegación de caso `/proyectos/lee-ach`, regreso al portafolio y ruta Contacto — correcto.
- Páginas con `id` duplicado — ninguno.
- Corrección aplicada: revelado que ocultaba tarjetas cuando se animaba el `clip-path` del contenedor. Se cambió a un revelado por escala visible al desplazarse.
- Se corrigió el título editorial para conservar la palabra en cursiva y eliminar el contorno de foco de un H1 que recibe enfoque programático.

## Limitaciones

- No equivale a QA integral de producción, evaluación WCAG manual ni prueba en dispositivos físicos.
- Se inspeccionó Chromium con fuente fallback (los servicios externos estaban bloqueados). No se ejecutó Firefox/WebKit en este entorno.
- Las capturas archivadas de ocho proyectos no se empaquetaron: dependen de GitHub hasta ejecutar `PREPARAR_FOTOS.cmd`. Todas las composiciones nuevas son conceptuales, con indicaciones visibles.
- Las demos públicas se indican según el portafolio previo; disponibilidad actual no confirmada para todas.
- No hubo cambios en el Hero original de DeepSeek, presupuestos ni canal de WhatsApp.
