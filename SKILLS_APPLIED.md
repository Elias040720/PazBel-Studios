# SKILLS_APPLIED.md — Metodología de Agent Skills en PazBel Studios 2.0

Este documento certifica la investigación, instalación, verificación y aplicación práctica de las colecciones oficiales de **Agent Skills** en la arquitectura de PazBel Studios 2.0, de acuerdo con la Fase 0 del plan de migración y la fase de expansión de diseño.

---

## 1. Inventario de Skills Instaladas y Disponibles

Todas las skills fueron clonadas desde sus fuentes canónicas, verificadas y copiadas en el directorio canónico `.agents/skills/` del workspace:

| Skill | Procedencia / Repositorio | Versión / Commit | Propósito Metodológico | Ubicación de Aplicación en Código |
|---|---|---|---|---|
| **ui-ux-pro-max** | `github.com/nextlevelbuilder/ui-ux-pro-max-skill` | `v2.15.0` | Inteligencia de diseño con 79 estilos, 192 paletas, 74 tipografías, 119 reglas UX y 17 presets GSAP. | `@ui-expert`, `@tech-lead`, motor `search.py`. |
| **ui-styling** | `github.com/nextlevelbuilder/ui-ux-pro-max-skill` | `v2.15.0` | Asistente de selección de estilos visuales y compatibilidad con frameworks. | `.agents/skills/ui-styling/` |
| **design-system** | `github.com/nextlevelbuilder/ui-ux-pro-max-skill` | `v2.15.0` | Generación y persistencia de sistemas de diseño (`MASTER.md`). | `.agents/skills/design-system/` |
| **apple-design** | `github.com/emilkowalski/skills` | `2d22863` | Estética de hardware de alta gama estilo Apple, micro-bordes y radios concéntricos. | `.agents/skills/apple-design/`, `src/components/ui/` |
| **break-ui** | `github.com/emilkowalski/skills` | `2d22863` | Testing adversarial: rotura de layout, zoom 200%, overflow, textos desmesurados. | `@tech-lead`, pruebas de QA en viewport 375px. |
| **ask-sonner** | `github.com/emilkowalski/skills` | `2d22863` | Notificaciones no intrusivas y confirmaciones sensoriales. | `.agents/skills/ask-sonner/` |
| **pick-ui-library** | `github.com/emilkowalski/skills` | `2d22863` | Criterio de sobriedad en dependencias frontend para evitar bloating. | `@arch`, evaluación de paquetes. |
| **prototype** | `github.com/emilkowalski/skills` | `2d22863` | Iteración ágil de prototipado e interacción. | `.agents/skills/prototype/` |
| **awesome-standards** | `github.com/sindresorhus/awesome` | `Canónico` | Estándares dorados de SVG, Web Performance, Modern CSS, a11y y tipografía. | `.agents/rules/frontend-excellence.md` |
| **emil-design-eng** | `github.com/emilkowalski/skills` | `2d22863` | Filosofía de pulido UI, microinteracciones, detalles invisibles y percepción de velocidad. | `src/styles/tokens.css`, `src/components/ui/`, botones, cards, navegación. |
| **animate** | `github.com/emilkowalski/skills` | `2d22863` | Decisiones de easing, duración, origen físico (`transform-origin`) y jerarquía de animación. | `src/styles/tokens.css`, hooks de animación y componentes interactivos. |
| **animation-performance** | `github.com/emilkowalski/skills` | `2d22863` | Presupuesto de 60fps: animar sólo `transform` y `opacity`, evitar layout thrashing y optimizar capas GPU. | `src/three/`, `src/scenes/`, `src/styles/global.css`. |
| **improve-animations** | `github.com/emilkowalski/skills` | `2d22863` | Auditoría de fricción en movimiento y transiciones interruptibles. | Análisis de transiciones del cotizador y navegación. |
| **review-animations** | `github.com/emilkowalski/skills` | `2d22863` | Validación antes/después en formato tabular estricto. | Verificación final en `QA_REPORT.md`. |
| **animation-vocabulary** | `github.com/emilkowalski/skills` | `2d22863` | Taxonomía precisa de motion design (stagger, spring settle, scrub, pin). | `MOTION.md` y documentación de timelines. |
| **gsap-core** | `github.com/greensock/gsap-skills` | `aed9cfd` | Fundamentos de tweens, defaults, `gsap.matchMedia()`, duraciones y easings globales. | `src/components/motion/MotionProvider.tsx`. |
| **gsap-react** | `github.com/greensock/gsap-skills` | `aed9cfd` | Integración oficial en React con `useGSAP()`, `scope`, refs y limpieza estricta en unmount. | Todas las escenas en `src/scenes/*/`. |
| **gsap-scrolltrigger** | `github.com/greensock/gsap-skills` | `aed9cfd` | Scrollytelling, pinning controlado, scrub sincronizado y orden de refresh. | `src/scenes/ProcessScene`, `PortfolioScene`, `HeroScene`. |
| **gsap-timeline** | `github.com/greensock/gsap-skills` | `aed9cfd` | Coreografías secuenciales, anidamiento de timelines y control de playhead. | Coreografía de entrada del Hero y transición entre etapas. |
| **gsap-performance** | `github.com/greensock/gsap-skills` | `aed9cfd` | `gsap.quickTo()` para mouse tracking, batching y supresión de tweens huérfanos. | Cursor tracking del CameraRig y efectos hover magnéticos. |
| **high-end-visual-design** | `github.com/sickn33/agentic-awesome-skills` | `8bda5fa` | Estética de agencia Awwwards ($150k+ feel), ritmo espacial macro, arquitectura de tarjetas "Double-Bezel" y contrastes profundos. | `DESIGN.md`, `src/styles/tokens.css`, `src/components/layout/`. |
| **gpt-taste** | `github.com/sickn33/agentic-awesome-skills` | `8bda5fa` | Estructura AIDA, contenedores ultra-anchos en titulares para evitar wrapping forzado, eliminación de meta-etiquetas genéricas. | Arquitectura de escenas y copywriting visual. |
| **frontend-design** | `github.com/sickn33/agentic-awesome-skills` | `8bda5fa` | Composición editorial premium, contraste y jerarquía tipográfica calibrada. | Sistema tipográfico con Archivo Variable e Instrument Serif. |
| **design-taste-frontend** | `github.com/sickn33/agentic-awesome-skills` | `8bda5fa` | Calibración de color cromático sobre fondo grafito OLED, evitando gradientes púrpura genéricos. | Paleta basada en el monograma oficial de PazBel. |
| **threejs-fundamentals** | `github.com/sickn33/agentic-awesome-skills` | `8bda5fa` | Setup limpio de escena WebGL, jerarquía Object3D, cálculo de frustum y cámara adaptativa. | `src/three/ExperienceCanvas.tsx`, `CameraRig.tsx`. |
| **threejs-materials** | `github.com/sickn33/agentic-awesome-skills` | `8bda5fa` | PBR (`MeshPhysicalMaterial`) con clearcoat, iridiscencia, rugosidad y sheen cromático. | `src/three/materials/ChromaticPBMaterial.ts`. |
| **threejs-lighting** | `github.com/sickn33/agentic-awesome-skills` | `8bda5fa` | Iluminación de tres puntos con luces de acento cian (#00DFFF), violeta (#8B4DFF) y coral (#FF647B). | `src/three/Lighting.tsx`. |
| **threejs-shaders** | `github.com/sickn33/agentic-awesome-skills` | `8bda5fa` | Shaders GLSL de dispersión cromática, efecto Fresnel y onda fluida en tiempo real. | `src/three/PBExperience.tsx`. |
| **impeccable** | `github.com/pbakaus/impeccable` | `5cb95ee` (v4.7.0) | Protocolo de init (`PRODUCT.md`), auditoría de diseño (`DESIGN.md`), fidelidad de componentes y craft floor. | `PRODUCT.md`, `DESIGN.md`, detector y checklist de pulido. |

---

## 2. Metodología de Implementación en los Agentes

### A. `@ui-expert` (Especialista en Frontend & Motion)
- **Consulta paramétrica**: Antes de diseñar o rediseñar cualquier componente, ejecuta:
  ```bash
  python .agents/skills/ui-ux-pro-max/scripts/search.py "<componente_o_industria>" --domain <ux|style|color|gsap>
  ```
- **Aplicación de las 10 prioridades UX**: Prioriza Accesibilidad (P1), Touch Targets 44x44px (P2) y Performance CLS (P3) por encima de efectos puramente estéticos.
- **Física táctil Emil Kowalski**: Todo botón lleva `:active { transform: scale(0.97); }` con curva `--ease-out` a 160ms.

### B. `@tech-lead` (Orquestador DAG & Certificador)
- **Stress-testing con `break-ui`**: Verifica que los componentes soporten títulos largos sin romper el grid, funcionen en viewport de 375px y no tengan overflow horizontal.
- **Auditoría Impeccable**: Ejecuta el checklist de craft floor antes de otorgar `STATUS: APPROVED 🟢`.
- **Verificación de Radio de Impacto**: Ejecuta `gitnexus impact` y `gitnexus detect-changes` para certificar que el rediseño no rompe contratos ni APIs.

### C. `@arch` (Arquitecto de Contratos & Sistema de Tokens)
- **Fuente única de verdad**: Centraliza tokens en `src/styles/tokens.css` y `DESIGN.md`.
- **Concentric Radii**: Garantiza que los radios internos sigan la fórmula matemática concéntrica `innerRadius = outerRadius - padding`.
