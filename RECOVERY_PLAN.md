# RECOVERY_PLAN.md — PazBel Studios 2.0 (Plan de Recuperación Post-Interrupción)

Fecha de auditoría: 2026-10-23  
Rol: Tech Lead / Autonomous Orchestrator  
Rama Git activa: `master` (último commit: `86b1ce7 chore: snapshot original static landing`)

---

## 1. Estado Real del Proyecto

El análisis exhaustivo del workspace confirmó que la sesión anterior avanzó sustancialmente en la migración a React 19 + TypeScript + Vite 6 + Three.js + GSAP antes del cierre inesperado. 

- **Estructura base**: Completamente montada en `src/` con carpetas para componentes, datos, hooks, escenas, estilos y 3D.
- **Legacy preservado**: La versión estática original fue respaldada en `legacy/` e indexada bajo el commit `86b1ce7` sin pérdida de datos.
- **Skills instaladas**: Colecciones de **Emil Kowalski** (`emil-design-eng`, `animate`, `animation-performance`, `improve-animations`, `review-animations`, `animation-vocabulary`), **Awesome Skills** (`frontend-design`, `gpt-taste`, `high-end-visual-design`, `design-taste-frontend`, `threejs-*`), **GSAP** (`gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance`) e **Impeccable** (`impeccable`).
- **Logo oficial**: Localizado y preservado en `public/brand/pazbel-original.jpeg` (PB tridimensional con degradados cromáticos).
- **Tipografías locales**: `@fontsource-variable/archivo` e Instrument Serif instalados; Inter y Space Grotesk en `public/fonts/`.
- **Compilación TypeScript**: `npm run typecheck` (`tsc -b`) reporta **0 errores de tipo**.
- **Punto exacto de interrupción**: El agente anterior terminó las escenas individuales y los componentes UI, pero la sesión se bloqueó **justo antes de crear `src/App.tsx`, `src/main.tsx` y enlazar las escenas complementarias (`FaqScene`, `ClosingScene`)**.

---

## 2. Matriz de Recuperación y Auditoría

| Elemento | Estado Real | Evidencia en Código | Próxima Acción |
|---|---|---|---|
| **Migración React / Vite** | Parcial (90%) | `package.json`, `vite.config.ts`, `tsconfig.*` listos. Falta `main.tsx` y `App.tsx`. | Crear `src/main.tsx` y `src/App.tsx`. |
| **Arquitectura por Escenas** | Parcial (80%) | 8 escenas creadas en `src/scenes/`. Faltan `FaqScene` y `ClosingScene`. | Implementar `FaqScene` y `ClosingScene`. |
| **Hero 3D (Three.js / R3F)** | Completado y verificado | `ExperienceCanvas.tsx`, `PBExperience.tsx`, `Lighting.tsx`, `CameraRig.tsx`. TorusKnot cromático iridiscente con fallback 2D. | Validar renderizado e interactividad en navegador. |
| **Animaciones GSAP** | Implementado | `useGSAP()` con scope en `HeroScene`, `ProblemScene`, `ServicesScene`, `ProcessScene`, `PortfolioScene`. | Probar fluidéz de scrub y refresco de ScrollTrigger. |
| **Portafolio Inmersivo** | Completado | `PortfolioScene.tsx` con mockups de MOVA, Chambi Motors y CarWashAlita, arquitectura técnica y CTAs. | Validar scroll pinning. |
| **Precios Claros** | Completado | `PricingScene.tsx` con Landing Pro (S/89), Corporativa (S/499), E-commerce (S/1,200), Software (desde S/1,890). | Validar enlaces a WhatsApp y notas legales. |
| **Suscripciones de Continuidad** | Completado | `MarketingScene.tsx` con Mantenimiento (S/89), Tracción (S/349), Growth (S/690). | Validar separación clara de costos publicitarios. |
| **Cotizador Dinámico** | Completado | `CalculatorScene.tsx` con cálculo separado inicial + mensual y generador de mensaje WhatsApp. | Validar reactividad de selectores. |
| **Demo Interactiva por Rubro** | Completado | `DemoScene.tsx` (Restaurante, Taller, Moda, Profesional). | Enlazar en el flujo de la aplicación. |
| **WhatsApp Oficial** | Configurado y verificado | Número oficial confirmado `+51 916 666 934` en `src/data/siteConfig.ts` y hook `useWhatsApp.ts`. | Integrado en CTAs y FloatingWhatsApp. |
| **Skills Aplicadas** | Instaladas y verificadas | 21 skills en `.agents/skills/`. Principios Emil Kowalski y High-End aplicados en tokens y componentes. | Continuar aplicando en QA visual. |
| **Responsive & Accesibilidad** | Diseñado | Tokens y estilos móviles en `global.css`, `prefers-reduced-motion` contemplado en todos los hooks y timelines. | Probar en viewport móvil real (375px, 768px). |

---

## 3. Problemas Detectados

1. **Build bloqueado por falta de entrypoint**: `vite build` falla con `[vite:build-html] Failed to resolve /src/main.tsx from index.html`.
2. **Ausencia de `src/App.tsx`**: Las escenas no están ensambladas en una sola experiencia orquestada con Header, Footer y FloatingWhatsApp.
3. **Escenas pendientes**:
   - `FaqScene`: El dataset con 8 preguntas existe en `src/data/faq.ts`, pero no tenía componente de vista.
   - `ClosingScene`: Falta la escena 09 de cierre cinematográfico con llamada a la acción hacia WhatsApp y resumen de propuesta de valor.
4. **Pnpm no disponible en el entorno**: La regla de gobernanza sugiere `pnpm dlx gitnexus@latest`, pero en Windows se debe invocar con `npx -y gitnexus@latest` o el motor compatible.

---

## 4. Plan y Orden Óptimo de Implementación

```text
[Paso 1: Estabilización de Build]
  ├── Crear src/scenes/FaqScene/FaqScene.tsx (con acordeón fluido y diseño Double-Bezel)
  ├── Crear src/scenes/ClosingScene/ClosingScene.tsx (cierre cinematográfico y llamada a WhatsApp)
  ├── Crear src/App.tsx (ensamblador maestro de escenas, layout, header, footer, floating WA)
  └── Crear src/main.tsx (montaje en React 19 con global.css)
        ↓
[Paso 2: Verificación de Tipos y Compilación]
  ├── Ejecutar tsc -b --pretty (garantizar 0 errores)
  └── Ejecutar vite build (garantizar bundle de producción limpio)
        ↓
[Paso 3: Verificación Visual en Navegador]
  ├── Iniciar servidor dev con Vite (puerto 5173)
  ├── Abrir con browser_subagent / navegador
  ├── Auditar Hero 3D (Three.js WebGL + fallback)
  ├── Auditar Scrollytelling GSAP (Proceso, Portafolio, Bento)
  ├── Auditar Cotizador y enlaces de WhatsApp
  └── Validar comportamiento responsive (desktop, tablet, mobile)
        ↓
[Paso 4: Auditoría de Calidad y Cierre]
  ├── Aplicar checklist de Emil Kowalski & Impeccable
  ├── Actualizar PROGRESS.md
  └── Entregar reporte completo sin instrucciones pendientes
```

---

## 5. Criterios de Aprobación (Definition of Done)

1. `npm run typecheck` pasa con 0 errores.
2. `npm run build` genera el bundle de producción sin fallos.
3. Las 9 escenas principales (Hero 3D, Propuesta, Servicios, Proceso, Portafolio, Precios, Suscripciones, Cotizador, Contacto/Cierre) más las escenas enriquecidas (Demo y FAQ) se visualizan y funcionan fluidamente.
4. Todos los botones y cotizaciones abren WhatsApp con mensajes contextuales para el número oficial `+51 916 666 934`.
5. Rendimiento a 60fps con Three.js y GSAP sin errores de consola ni fugas de memoria.
