# Frontend Excellence & Creative Engineering Governance Rules

Aplica a todo desarrollo y rediseño de interfaces de usuario en el proyecto (React 19, TypeScript, Vite, Three.js, GSAP, CSS Tokens).

---

## Pilares de Gobernanza (UI/UX Pro Max + Emil Kowalski + Impeccable + Awesome Standards)

### 1. Reglas Obligatorias (ALWAYS DO)

1. **Jerarquía UX de 10 Prioridades (UI/UX Pro Max)**:
   - **P1 Accesibilidad (CRÍTICO):** Contraste de texto ≥ 4.5:1 (cuerpo) y ≥ 7:1 (display sobre fondo OLED). Indicador de foco visible de 2px con `:focus-visible`.
   - **P2 Interacción Táctil (CRÍTICO):** Todo elemento interactivo debe tener un área táctil mínima de 44×44px y separación mínima de 8px.
   - **P3 Rendimiento & Layout (ALTO):** Cero Cumulative Layout Shift (CLS = 0). Todo contenedor dinámico, imagen o canvas WebGL DEBE reservar su espacio mediante `aspect-ratio` o altura mínima fija.
   - **P4 Selección de Estilo:** Coherencia estilística total (Chromatic Engineering / Dark Mode OLED con Double-Bezel). Iconografía mediante SVG vectorial puro con `aria-hidden="true"`; prohibido el uso de emojis como iconos.
   - **P5 Responsive Fluido:** Enfoque mobile-first verificado en viewport de 375px sin scroll horizontal involuntario (`overflow-x: clip`).

2. **Leyes Sensoriales de Movimiento (Emil Kowalski)**:
   - **Física Táctil en Botones:** Todo control interactivo responde en `:active` con `transform: scale(0.97)` a 160ms con curva `--ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`).
   - **Prohibición de `scale(0)`:** Ningún elemento emerge desde la nada. Los estados iniciales parten de `scale(0.95)` y `opacity: 0`.
   - **Animación Exclusiva en GPU:** Manipular únicamente `transform` (`x`, `y`, `scale`, `rotation`) y `opacity`. Terminantemente prohibido animar `width`, `height`, `top` o `left`.
   - **Accesibilidad Motriz:** Todo timeline de GSAP o efecto CSS DEBE desacoplarse o simplificarse ante `@media (prefers-reduced-motion: reduce)`.

3. **Artesanía y Craft Floor (Impeccable Style)**:
   - **Double-Bezel Architecture:** Las tarjetas maestras usan bisel exterior translúcido con micro-borde de 1px y núcleo interior concéntrico mathematically aligned (`radiusInner = radiusOuter - padding`).
   - **Tipografía Editorial Monumental:** Titulares en contenedores ultra-anchos (`max-w-5xl+`) para evitar saltos forzados de línea, contrastando la fuerza técnica geométrica con cursiva de autor para conceptos clave.

4. **Estándares Web Dorados (Awesome Standards)**:
   - Tipografía fluida con funciones `clamp()`.
   - Carga de fuentes locales WOFF2 con `font-display: swap`.
   - DPR Clamping en WebGL (`dpr={[1, 1.75]}`) para evitar sobrecalentamiento térmico en pantallas de alta densidad.

---

### 2. Reglas Prohibidas (NEVER DO)

- ❌ **NEVER** animar propiedades de layout (`width`, `height`, `padding`, `margin`) que provoquen recalculo de geometría.
- ❌ **NEVER** diseñar botones con áreas táctiles menores a 44x44px en móviles.
- ❌ **NEVER** crear timelines de GSAP sin limpieza en desmontaje (`useGSAP()` con scope cerrado obligatorio).
- ❌ **NEVER** usar emojis como iconos en interfaces de nivel comercial o corporativo.
- ❌ **NEVER** dejar controles interactivos sin confirmación visual sensorial (< 100ms de feedback).
- ❌ **NEVER** declarar una tarea completada sin validación responsive (desktop, tablet y móvil de 375px).
