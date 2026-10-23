# Build Module & Redesign Workflow (DAG Model)

Construye módulos, rediseños o funcionalidades completas end-to-end de manera autónoma, coordinando especialistas en un Grafo Acíclico Dirigido (DAG) concurrente sin interacción manual requerida del usuario.

---

## Pasos de Ejecución

### Fase 1 — Contratos, Arquitectura & Inteligencia de Diseño
1. Invocar `@arch` para diseñar la separación de capas y declarar interfaces públicas y DTOs tipados.
2. Si el módulo incluye interfaz visual o rediseño, consultar **UI/UX Pro Max** (`search.py --design-system`) e **Impeccable** (`impeccable:init`) para establecer tokens y paleta semántica.
3. Congelar contratos de comunicación entre Backend, Persistencia y Frontend en `src/styles/tokens.css` y `DESIGN.md`.

### Fase 2 — Implementación Concurrente (Paralelizable)
- **Persistencia:** Invocar `@db-master` para generar el modelo DDL, índices y script de migración versionado.
- **Backend:** Invocar `@api-core` para implementar endpoints, controladores, validación de entrada e inyección de dependencias.
- **Frontend:** Invocar `@ui-expert` para implementar pantallas, componentes y micro-animaciones bajo la tríada:
  - **UI/UX Pro Max:** Reglas de accesibilidad (P1), touch targets de 44px (P2) y rendimiento CLS (P3).
  - **Emil Kowalski:** Micro-animaciones con `:active { transform: scale(0.97); }` y transiciones GPU a 60fps.
  - **Impeccable & Apple Design:** Arquitectura Double-Bezel, ritmo editorial y contraste OLED.
  - **Awesome Standards:** Iconografía SVG pura y fluid typography.

### Fase 3 — Verificación de Integridad, Seguridad, Grafo y Resistencia
1. Invocar `@sec` para auditar el checklist OWASP Top 10 sobre todo el código generado.
2. Invocar `@gitnexus` para ejecutar:
   - `npx -y gitnexus@latest impact "<SímboloPrincipal>" --direction upstream`
   - `npx -y gitnexus@latest detect-changes --scope all`
3. Ejecutar pruebas de resistencia visual (`break-ui`): verificar viewport de 375px y texto extendido.
4. Si el riesgo es ALTO o CRÍTICO, resolver dependencias antes de continuar.

### Fase 4 — Documentación Visual Interactiva
1. Invocar `@archify` para actualizar la especificación JSON-IR (`docs/architecture/*.architecture.json`).
2. Compilar el diagrama interactivo a HTML con `archify deliver`.

### Fase 5 — Certificación y Aprobación
Emitir bloque canónico CAHP y estado final:
```text
[CAMBIÓ]: <archivos modificados>
[AFECTA]: <componentes impactados>
[RIESGO]: bajo | medio | alto | crítico
[SIGUIENTE]: <@agente o @usuario>

🛡️ STATUS: [APPROVED 🟢]
🚀 Módulo completado, validado por GitNexus, protegido por OWASP y pulido con UI/UX Pro Max + Emil Kowalski. Sin acción requerida del usuario.
```
