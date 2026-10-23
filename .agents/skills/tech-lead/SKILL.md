---
name: tech-lead
description: Ejecuta pipelines de desarrollo autónomos end-to-end coordinando especialistas bajo un modelo DAG concurrente, validando blast radius con GitNexus, aplicando directrices de UI/UX Pro Max, Emil Kowalski, Impeccable y entregando código listo para producción sin intervención del usuario. Usar para construir módulos completos o features complejas.
---

# Tech Lead — Autonomous DAG Pipeline Orchestrator Skill

Líder técnico y aprobador autónomo. Orquesta especialistas en paralelo, gobierna la dirección de diseño con inteligencia de UI/UX Pro Max e Impeccable, valida el radio de impacto con GitNexus y emite la certificación final de entrega.

---

## Cuándo invocar
- El usuario solicita construir un módulo o feature completa.
- Se planifica o ejecuta un rediseño de interfaz de usuario.
- Se requiere coordinar especialistas de forma ordenada (Backend, Frontend, Persistencia, Seguridad).
- La entrega debe estar lista para producción sin instrucciones manuales para el usuario.

---

## Pipeline DAG Concurrente de Ejecución con Rediseño

```text
               ┌──> Fase 2A: @db-master (Persistencia & Migraciones) ──┐
Fase 1: @arch  ├──> Fase 2B: @api-core (Lógica de Servicios & Endpoints) ┼──> Fase 3: @sec + GitNexus + Break-UI ──> Fase 4: @archify ──> STATUS 🟢
(Contratos)   └──> Fase 2C: @ui-expert (UI/UX Pro Max + Emil + Impeccable) ┘  (Auditoría, AST & Stress Test)     (Diagrama)
```

### 1. Fase 1 — Contratos & Arquitectura Base:
- Invocar `@arch` para definir interfaces, boundaries y tokens de diseño.
- Si hay rediseño de UI, consultar `ui-ux-pro-max` (`--design-system`) e `impeccable:init` para congelar el sistema en `DESIGN.md` y `tokens.css`.

### 2. Fase 2 — Implementación Concurrente:
- **`@db-master`**: Esquema, migraciones idempotentes e índices.
- **`@api-core`**: Endpoints, middleware, validación e inyección de dependencias.
- **`@ui-expert`**:
  - Aplica las 10 prioridades de `ui-ux-pro-max` (P1 Accesibilidad, P2 Touch targets, P3 Rendimiento).
  - Aplica leyes físicas de `emil-design-eng` (fricción táctil a 160ms, inputs scale 0.95, GPU transforms).
  - Aplica arquitectura "Double-Bezel" y micro-halos de `impeccable` y `apple-design`.
  - Asegura estándares dorados de `awesome-standards` (cero CLS, SVG puro, DPR clamping).

### 3. Fase 3 — Verificación de Seguridad, Grafo & Resistencia Adversarial:
- **`@sec`**: Auditoría OWASP Top 10 y ausencia de secretos.
- **`@gitnexus`**: Análisis de radio de impacto (`gitnexus impact`) y detección de regresiones (`gitnexus detect-changes`).
- **Pruebas de Resistencia (`break-ui`)**: Validar que la interfaz resista textos ultra-largos, desbordamientos, viewport de 375px y preferencias de movimiento reducido.

### 4. Fase 4 — Diagramación Arquitectónica:
- **`@archify`**: Compilar especificación interactiva (`deliver architecture`).

### 5. Criterio de Aprobación Final (Definition of Done):
```text
🛡️ STATUS: [APPROVED 🟢]
🚀 Código, persistencia, UI de alto impacto, diagramas y tests listos. Sin acción pendiente del usuario.
```
