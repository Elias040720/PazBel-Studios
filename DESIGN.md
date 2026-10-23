# DESIGN.md — Dirección Artística y Sistema Visual: Chromatic Engineering

Este documento define la identidad visual, composición, jerarquía tipográfica, sistema de color y tokens de diseño para **PazBel Studios 2.0**.

---

## 1. Concepto Artístico: Chromatic Engineering

PazBel Studios no es una plantilla corporativa genérica ni una agencia de marketing convencional. La identidad visual se sintetiza bajo el concepto de **Chromatic Engineering**:
- **Ingeniería Digital de Vanguardia**: Precisión milimétrica, estructura modular, alineaciones rigurosas, acabado de hardware físico ("Double-Bezel") y contraste profundo.
- **Cromatismo Tridimensional**: Derivado directamente del monograma oficial PB, donde haces de luz cian, azul cobalto, violeta, magenta y coral atraviesan la penumbra de un grafito profundo.
- **Composición Editorial Monumental**: Grandes titulares que respiran con contenedores amplios (`max-w-5xl` o más), intercalando la fuerza geométrica de **Archivo Variable** con la sutileza humanista y sofisticada de **Instrument Serif Italic** en palabras clave.

---

## 2. Paleta de Color y Tokens Semánticos

### Fondos y Superficies (Graphite OLED System)
| Token | Hex | Propósito |
|---|---|---|
| `--color-bg-base` | `#07090e` | Fondo principal profundo, absorbe luz y resalta el render 3D |
| `--color-bg-surface` | `#0d111a` | Superficies secundarias y fondos de secciones alternas |
| `--color-bg-card` | `#131826` | Núcleo de tarjetas y paneles principales |
| `--color-bg-elevated` | `#1a2033` | Elementos flotantes (navbar, modales, tooltips) |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.08)` | Líneas divisorias de baja vibración |
| `--color-border-focus` | `rgba(0, 223, 255, 0.6)` | Indicador de foco accesible |

### Acentos Cromáticos del Monograma PB
| Token | Hex | Gradiente / Uso |
|---|---|---|
| `--color-cyan` | `#00dfff` | Inicio de haz cromático, live dots, foco y acentos interactivos |
| `--color-blue` | `#397cff` | Tono de conexión y enlaces primarios |
| `--color-violet` | `#8b4dff` | Tono medio de profundidad espacial e iluminaciones suaves |
| `--color-magenta` | `#e74bbd` | Acento de alta energía y puntos de contacto |
| `--color-coral` | `#ff647b` | Final del espectro cálido y llamadas a la acción destacadas |

### Gradiente Maestro PB (Chromatic Gradient)
```css
--gradient-chromatic: linear-gradient(135deg, #00dfff 0%, #397cff 28%, #8b4dff 58%, #e74bbd 82%, #ff647b 100%);
--gradient-chromatic-text: linear-gradient(105deg, #7ce1fc 0%, #b5a5ff 50%, #ffa3b5 100%);
```

### Tipografía y Jerarquía Textual
| Token | Hex | Contraste (WCAG) | Aplicación |
|---|---|---|---|
| `--color-text-primary` | `#f6f7fb` | > 14:1 sobre `#07090e` (AAA) | H1, H2, valores de precios y llamadas principales |
| `--color-text-secondary` | `#a6adbd` | > 7:1 sobre `#07090e` (AA) | Párrafos, subtítulos y descripciones técnicas |
| `--color-text-muted` | `#737b8e` | > 4.5:1 sobre `#07090e` (AA) | Micro-etiquetas, leyendas y notas comerciales |

---

## 3. Tipografía

El sistema tipográfico combina tres familias especializadas:
1. **Archivo Variable**: Para titulares monumentales, métricas y navegación. Gran densidad técnica y ajuste de anchura (`font-stretch`).
2. **Instrument Serif Italic**: Reservado exclusivamente para términos emotivos (`<em>dimensión</em>`, `<em>destacar</em>`, `<em>obsesión por el detalle</em>`), aportando la firma visual de un estudio de autor galardonado en Awwwards.
3. **Space Grotesk & Inter**: Para subtítulos monospace-like de ingeniería y legibilidad fluida en bloques de texto extendidos.

```css
--font-display: 'Archivo Variable', 'Space Grotesk', -apple-system, sans-serif;
--font-editorial: 'Instrument Serif', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

## 4. Component Architecture: The Double-Bezel System

Siguiendo la regla de oro de `high-end-visual-design`, los contenedores de mayor jerarquía nunca se colocan planos sobre el fondo:
1. **Bisel Exterior (Outer Shell)**:
   - Fondo sutil translúcido `rgba(255, 255, 255, 0.04)`.
   - Borde milimétrico `1px solid rgba(255, 255, 255, 0.1)`.
   - Padding exterior calibrado (`8px` a `12px`).
   - Radio curvo amplio (`border-radius: 24px` o `32px`).
2. **Núcleo Interior (Inner Core)**:
   - Superficie sólida `var(--color-bg-card)`.
   - Sombra interior reflectante (`inset 0 1px 1px rgba(255, 255, 255, 0.12)`).
   - Radio concéntrico exacto (`calc(24px - 8px) = 16px`).

### Nested Island Button
Todo botón principal con icono de flecha (`↗`) encierra el símbolo dentro de una cápsula interna circular (`w-7 h-7 rounded-full bg-white/10 flex items-center justify-center`), provocando una micro-tensión física cinética al posar el cursor o pulsar.

---

## 5. Espaciado y Ritmo Espacial

- **Padding macro entre escenas**: `min-height: 100svh`, con rellenos verticales generosos (`clamp(80px, 10vw, 140px)`). Cada capítulo se experimenta como una pantalla independiente con identidad propia.
- **Espacios negativos intencionados**: Se descartan rejillas abarrotadas en favor de respiración editorial.
