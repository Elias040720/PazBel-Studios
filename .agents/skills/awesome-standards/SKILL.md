---
name: awesome-standards
description: Curaduría de estándares web de excelencia mundial extraídos del ecosistema Awesome de Sindre Sorhus (Awesome SVG, Awesome Web Performance, Awesome CSS, Awesome Accessibility y Awesome Typography). Usar al diseñar, implementar o auditar código frontend para garantizar las mejores prácticas de la industria.
---

# Awesome Standards — Curated Web Excellence Framework

Basado en la curaduría canónica del ecosistema **Awesome** de Sindre Sorhus (`sindresorhus/awesome`). Define el listado de estándares dorados para interfaces web contemporáneas de máximo calibre.

---

## 1. Awesome Web Performance (Presupuesto de 60fps & Web Vitals)

1. **LCP (Largest Contentful Paint) < 1.2s**:
   - Carga anticipada de fuentes críticas en WOFF2 con `rel="preload"`.
   - Elementos hero optimizados; nunca bloquear el primer render con scripts pesados.
2. **CLS (Cumulative Layout Shift) = 0.00**:
   - Todo contenedor de imagen, canvas 3D o bento card DEBE reservar su espacio mediante `aspect-ratio` o altura explícita mínima.
3. **INP (Interaction to Next Paint) < 50ms**:
   - Las interacciones de clic y hover deben responder en menos de 100ms perceptuales.
   - Prohibido el cálculo pesado en el hilo principal durante eventos de scroll o mousemove.

---

## 2. Awesome CSS & Modern Layout

1. **Tokens Atómicos & Variables Semánticas**:
   - Toda propiedad de color, radio, espaciado y sombra se consume mediante `var(--token)`. Prohibidos los valores hexadecimales duros dispersos en componentes.
2. **Tipografía Fluida con `clamp()`**:
   - Utilizar funciones de interpolación continua: `font-size: clamp(min, preferred, max)` para evitar saltos bruscos entre breakpoints.
3. **Arquitectura de Superficies**:
   - Superficies anidadas con ratios concéntricos matemáticos (`innerRadius = outerRadius - padding`).

---

## 3. Awesome SVG & Vector Precision

1. **Iconografía SVG Limpia y Accesible**:
   - Los iconos decorativos llevan `aria-hidden="true"`.
   - Los botones sólo con icono llevan obligatoriamente `aria-label` descriptivo.
   - SVG vectoriales con `viewBox` escalable, `fill="currentColor"` o `stroke="currentColor"` para herencia reactiva.
   - Prohibido usar fuentes de iconos pesadas (como FontAwesome monolítico) o emojis como sustitutos de iconos corporativos.

---

## 4. Awesome Accessibility (a11y — WCAG 2.2 AA / AAA)

1. **Ratio de Contraste**:
   - Texto principal: mínimo 7:1 sobre fondos oscuros (AAA).
   - Texto secundario y controles interactivos: mínimo 4.5:1 (AA).
2. **Navegación por Teclado**:
   - Indicador de foco visible (`:focus-visible`) con contraste nítido (`outline: 2px solid var(--color-cyan)`).
   - Secuencia de tabulación natural (`tabindex="0"`, no índices positivos arbitrarios).
3. **Respeto a Preferencias del Usuario**:
   - `@media (prefers-reduced-motion: reduce)`: Desacopla animaciones de desplazamiento, scrub de GSAP y aceleraciones 3D sin perder contenido ni funcionalidad comercial.

---

## 5. Awesome Typography & Editorial Rhythm

1. **Escala Modular**:
   - Relación modular definida (Major Second 1.125, Minor Third 1.200 o Perfect Fourth 1.333).
2. **Jerarquía Visual Inconfundible**:
   - Un único `<h1>` por documento.
   - Contenedores display de gran amplitud para evitar líneas de 2 palabras (*orphan headings*).
3. **Longitud de Línea Óptima**:
   - Párrafos de lectura calibrados entre 45 y 75 caracteres por línea (`max-width: 60ch` a `70ch`).
