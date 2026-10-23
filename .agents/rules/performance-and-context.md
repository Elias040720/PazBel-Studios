# Performance, Context Window & Subagent Execution Rules

Aplica a la orquestación de modelos y agentes autónomos en Antigravity IDE.

---

## 1. Gestión del Context Window (Regla del 80%)

- **Zona de Precisión (< 80% de contexto):**
  - Refactorizaciones complejas, migraciones de arquitectura y coordinación de más de dos componentes.
  - Al superar el 80% del context window, invocar `/compact` o transferir el estado mediante `PROGRESS.md`.
- **Zona de Baja Sensibilidad:**
  - Ediciones de un solo archivo, documentación, fixes puntuales de lint o CSS.

---

## 2. Ejecución Paralela de Especialistas

**SIEMPRE paralelizar tareas que no tengan dependencia secuencial directa:**

```markdown
# ✅ CORRECTO: Ejecución Concurrente en DAG
1. Paralelo A: @db-master implementa esquema e índices.
2. Paralelo B: @api-core implementa servicios y contratos.
3. Paralelo C: @ui-expert implementa componentes y tokens.
   ↓
Fase de Convergencia: @tech-lead valida integración con GitNexus y OWASP.

# ❌ INCORRECTO: Secuencia innecesaria
Hacer A, esperar, hacer B, esperar, hacer C...
```

---

## 3. Protocolo de Resolución de Errores de Build (`build-error-resolver`)

Ante cualquier error de compilación (`tsc`, `vite build`, `esbuild`):
1. **Pausar cualquier otra tarea inmediatamente**: No continuar programando sobre un build roto.
2. **Aislar el mensaje exacto**: Identificar archivo, línea y código de error (ej. `TS2307`, `TS2322`).
3. **Corregir de forma incremental y mínima**: Resolver la causa raíz sin atajos destructivos.
4. **Verificar inmediatamente**: Ejecutar `npm run typecheck` tras cada corrección.
