# MIGRATION.md — Plan y Registro de Migración a PazBel 2.0

Este documento detalla la auditoría profunda del proyecto estático previo, la clasificación de sus componentes y la estrategia de migración a la arquitectura moderna React 19 + TypeScript + Three.js + GSAP.

---

## 1. Auditoría del Estado Inicial

El proyecto original consistía en una landing estática sin herramientas de compilación (`index.html`, `css/styles.css`, `js/config.js`, `js/main.js` y `assets/`).

### Clasificación de Componentes

| Clasificación | Elemento | Estado Original | Destino en PazBel 2.0 |
|---|---|---|---|
| **CONSERVAR** | Precios y Planes Comerciales | Definidos en `js/config.js` (Landing S/89, Corporativa S/499, E-commerce S/1,200, Software desde S/1,890; Suscripciones S/89, S/349, S/690). | Centralizados tipados en `src/data/pricing.ts` y verificados al 100%. |
| **CONSERVAR** | Datos de Proyectos | MOVA (EdTech), Chambi Motors (Automotriz), CARWASHALITA (Gestión). | Centralizados en `src/data/projects.ts` con sus tecnologías reales y rotulado conceptual honesto. |
| **CONSERVAR** | Preguntas Frecuentes (FAQ) | 8 preguntas directas sobre costos, alcance, hosting y marketing. | Tipadas en `src/data/faq.ts` y renderizadas con animación fluida de acordeón. |
| **CONSERVAR** | Equipo Humano y Filosofía | "Somos Elías y Abel. Unimos diseño, tecnología y visión de negocio desde Perú." | Preservado en `src/scenes/ProcessScene/TeamSection.tsx`. |
| **CONSERVAR** | Demostración Interactiva por Rubro | Selector de Restaurante, Taller, Moda y Profesional. | Componente interactivo React en `src/scenes/DemoScene/IndustryDemo.tsx`. |
| **CONSERVAR** | Logo Oficial Original | Archivo `pazbel-original.jpeg` con monograma PB tridimensional. | Ubicado en `public/brand/pazbel-original.jpeg`, respetando silueta y colores sin deformación. |
| **MEJORAR** | WhatsApp y Enlaces Comerciales | Originalmente vacío (`whatsapp: ''`), requería abrir diálogo de copia. | Integrado con el número oficial confirmado `+51 916666934`, centralizado en `src/data/siteConfig.ts` y con generador contextual `useWhatsApp`. |
| **MEJORAR** | Hero y Entrada Visual | Cinta SVG estática con inclinación CSS básica. | Transformado en experiencia 3D en tiempo real con Three.js / React Three Fiber, con escultura PB cromática, shaders iridiscentes e iluminación dinámica. |
| **MEJORAR** | Portafolio | Tres tarjetas pequeñas apiladas con mockups compactos. | Cada proyecto pasa a ser un capítulo visual de pantalla completa con mockups inmersivos, detalles de arquitectura y CTAs directos. |
| **MEJORAR** | Cotizador Interactivo | Formulario de radios con actualización básica de texto. | Herramienta reactiva con cálculo en tiempo real, desglose visual de pago inicial vs mensualidad y botón de envío directo a WhatsApp. |
| **REESCRIBIR** | Arquitectura Frontend | Código monolítico en `index.html` (45 líneas minificadas) y `js/main.js`. | Arquitectura modular React 19 + TypeScript con Vite 6, separación por escenas (`src/scenes/`), datos (`src/data/`) y componentes reusables (`src/components/`). |
| **REESCRIBIR** | Gestión de Animaciones | GSAP embebido con scripts globales en `<head>` compitiendo con `IntersectionObserver`. | Orquestación mediante `@gsap/react` (`useGSAP`), scopes cerrados por componente y limpieza estricta en desmontaje. |
| **ELIMINAR** | Código muerto y observadores en conflicto | Doble cálculo de scroll entre listeners nativos de window y ScrollTrigger. | Centralizado en ScrollTrigger con `gsap.matchMedia()` y `prefers-reduced-motion`. |

---

## 2. Preservación y Copia de Respaldo

Antes de iniciar la reestructuración:
1. Se generó un commit de respaldo en Git:
   - Commit: `86b1ce7` ("chore: snapshot original static landing (pre-React migration)").
   - Tag: `legacy-static-v1`.
2. Se reubicaron todos los archivos del sitio estático en la carpeta `legacy/` (`legacy/index.html`, `legacy/css/`, `legacy/js/`, `legacy/assets/`, `legacy/tests/`, etc.).
3. El servidor estático original sigue accesible mediante `npm run legacy` (ejecutando `node legacy/server.cjs`) para auditorías comparativas en cualquier momento.

---

## 3. Plan de Arquitectura React

```
src/
├── app/
│   ├── App.tsx                   # Controlador maestro de escenas y contexto
│   └── routes.tsx                # Rutas para casos de estudio y landing principal
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Navbar flotante "Double-Bezel" con glassmorphism
│   │   └── Footer.tsx            # Pie de página editorial con créditos y navegación
│   ├── ui/
│   │   ├── Button.tsx            # Botón con física táctil (scale 0.97) y micro-halo
│   │   ├── Badge.tsx             # Chips de estado y micro-etiquetas
│   │   └── Modal.tsx             # Diálogo accesible con foco atrapado
│   └── whatsapp/
│       └── FloatingWhatsApp.tsx  # Botón flotante contextual con badge de disponibilidad
├── scenes/
│   ├── HeroScene/                # Capítulo 01: Hero 3D, identidad y titulares principales
│   ├── ProblemScene/             # Capítulo 02: De depender de redes a destacar con presencia propia
│   ├── ServicesScene/            # Capítulo 03: Los 5 servicios digitales estructurados
│   ├── ProcessScene/             # Capítulo 04: Scrollytelling de metodología (Diseñamos / Desarrollamos / Impulsamos)
│   ├── PortfolioScene/           # Capítulo 05: Showcase inmersivo (MOVA, Chambi, Carwashalita)
│   ├── DemoScene/                # Capítulo 06: Demostración interactiva por rubro
│   ├── PricingScene/             # Capítulo 07: Presentación editorial de planes
│   ├── MarketingScene/           # Capítulo 08: Suscripciones de continuidad y crecimiento
│   ├── CalculatorScene/          # Capítulo 09: Cotizador interactivo con presupuesto a WhatsApp
│   ├── FaqScene/                 # Capítulo 10: Acordeones de respuestas transparentes
│   └── ClosingScene/             # Capítulo 11: Cierre cinematográfico y llamada a la acción
├── three/
│   ├── ExperienceCanvas.tsx      # Canvas R3F optimizado con DPR adaptativo
│   ├── PBExperience.tsx          # Escultura 3D inspirada en el monograma PB
│   ├── CameraRig.tsx             # Interacción suave con cursor y scroll
│   └── Lighting.tsx              # Setup de luces de acento cromáticas
├── hooks/
│   ├── useReducedMotion.ts       # Detección reactiva de preferencias de accesibilidad
│   ├── useWhatsApp.ts            # Generador tipado de mensajes contextuales
│   └── useScrollProgress.ts      # Progreso de lectura por capítulo
├── data/
│   ├── siteConfig.ts             # Configuración central (WhatsApp +51 916666934, marca)
│   ├── projects.ts               # Modelos de proyectos con datos técnicos reales
│   ├── services.ts               # Catálogo de servicios
│   ├── pricing.ts                # Planes de desarrollo y suscripciones mensuales
│   └── faq.ts                    # Preguntas frecuentes
└── styles/
    ├── tokens.css                # Design tokens (colores cromáticos, curvas Emil Kowalski, radios)
    ├── typography.css            # Archivo Variable + Instrument Serif + Space Grotesk
    └── global.css                # Resets, utilidades y accesibilidad
```
