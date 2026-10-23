# Guía Maestra de Indicaciones de Alto Rendimiento — PazBel Studios 2.0

> Esta guía te enseña cómo dar indicaciones a tus agentes de IA para obtener resultados de nivel producción a la primera, aprovechando las 41 skills instaladas (UI/UX Pro Max, Emil Kowalski, Impeccable, Everything-Claude-Code y Awesome Standards).

---

## 1. El Framework P-A-C-E (Estructura de una Indicación Perfecta)

Cuando des una instrucción, usa la fórmula **P-A-C-E**:

```text
[P] Propósito:     ¿Qué resultado exacto buscas? (No solo la tarea, sino el objetivo visual o funcional)
[A] Agente:        ¿Quién lo lidera? (@tech-lead, @ui-expert, @arch, @sec, @code-reviewer)
[C] Condiciones:   ¿Qué reglas debe respetar? (Paleta PB, responsive 375px, WhatsApp oficial, no mutaciones)
[E] Evidencia:     ¿Cómo se demuestra que funciona? (0 errores de build, 60fps, verificación GitNexus)
```

---

## 2. Comparativa: Indicaciones Comunes vs. Indicaciones de Alto Rendimiento

### Caso 1: Rediseñar una Sección Visual
- ❌ **Indicación débil:**  
  *"Haz que el Hero se vea mejor y más moderno."*  
  *(El agente puede inventar colores, romper el 3D o meter librerías innecesarias).*
- ✅ **Indicación de Alto Rendimiento:**  
  ```text
  /tech-lead @ui-expert 
  Rediseña la Escena 01 (Hero) aplicando UI/UX Pro Max (estilo dark-mode-oled) y arquitectura Double-Bezel de Emil Kowalski.
  - Conserva el canvas 3D con TorusKnot cromático y el fallback 2D.
  - Asegura que los botones respondan con física táctil a 160ms (:active scale 0.97).
  - Titular monumental con Archivo Variable e Instrument Serif cursiva.
  - Verifica que no exista desbordamiento en viewport de 375px.
  - Entrega con 0 errores de build.
  ```

### Caso 2: Crear un Nuevo Módulo o Componente
- ❌ **Indicación débil:**  
  *"Agrega un formulario para que los clientes agenden citas."*  
  *(Faltan validaciones, contratos, estado tipado y conexión a WhatsApp).*
- ✅ **Indicación de Alto Rendimiento:**  
  ```text
  /tech-lead 
  Construye el módulo de Agendamiento de Citas Técnicas bajo el pipeline DAG:
  - @arch: Diseña el contrato tipado y DTOs inmutables en src/data/appointments.ts.
  - @ui-expert: Implementa el selector de fecha y hora usando Double-Bezel, touch targets de 44x44px (UI/UX Pro Max P2) y envío directo a WhatsApp (+51 916 666 934).
  - @sec: Sanitiza los inputs de cliente.
  - Valida blast radius con GitNexus y ejecuta npm run typecheck.
  ```

### Caso 3: Control de Calidad y Pruebas
- ❌ **Indicación débil:**  
  *"Revisa si todo está bien."*
- ✅ **Indicación de Alto Rendimiento:**  
  ```text
  /tech-lead 
  Ejecuta una auditoría integral de calidad:
  1. Ejecuta el verification-loop de 6 fases (build, typecheck, lint, tests, security scan, diff review).
  2. Ejecuta break-ui sobre el cotizador y el portafolio (textos largos, zoom 200%, 375px).
  3. Ejecuta gitnexus detect-changes y reporta el nivel de riesgo.
  4. Emite el reporte bajo protocolo canónico CAHP.
  ```

### Caso 4: Reparar Errores de Código o Build
- ❌ **Indicación débil:**  
  *"No compila, arréglalo."*
- ✅ **Indicación de Alto Rendimiento:**  
  ```text
  @build-error-resolver 
  Diagnostica y repara el error de compilación actual.
  - No uses git reset --hard ni elimines archivos existentes.
  - Corrige la causa raíz en los tipos o rutas.
  - Verifica que npm run typecheck y vite build pasen con 0 errores.
  ```

---

## 3. Catálogo de Comandos Rápidos Disponibles

Puedes usar estos comandos directamente en cualquier mensaje:

| Comando | Agente Invocado | Cuándo Usarlo |
|---|---|---|
| **`/tech-lead <tarea>`** | `@tech-lead` | Para coordinar módulos completos, rediseños o features de punta a punta. |
| **`/ui <componente>`** | `@ui-expert` | Para crear o refinar interfaces, animaciones GSAP, tarjetas y micro-interacciones. |
| **`/plan <funcionalidad>`** | `@planner` | Para crear un plan paso a paso con riesgos y dependencias antes de codificar. |
| **`/review`** | `@code-reviewer` | Para auditar la calidad, seguridad, inmutabilidad y limpieza del último diff de Git. |
| **`/build-fix`** | `@build-error-resolver` | Cuando haya un fallo en `npm run build` o `tsc`. |
| **`/verify`** | `verification-loop` | Para correr el checklist completo de 6 fases antes de dar por cerrada una sesión. |
| **`/break-ui <escena>`** | `break-ui` | Para someter una pantalla a pruebas adversariales (textos imposibles, wrapping, móvil). |
| **`/search-ui <término>`** | `ui-ux-pro-max` | Para buscar paletas, estilos o reglas UX en el motor local (`search.py`). |

---

## 4. Reglas que Tus Agentes Seguirán Automáticamente

A partir de ahora, cuando des cualquier indicación, tus agentes ya tienen activas estas reglas internas:
1. **Inmutabilidad estricta**: Nunca mutarán arrays ni objetos directamente; siempre usarán patrones inmutables (`...spread`).
2. **Muchos archivos pequeños**: Evitarán crear archivos monolíticos gigantes (mantendrán entre 200 y 400 líneas).
3. **Física táctil instantánea**: Todo botón nuevo tendrá respuesta táctil inmediata a 160ms.
4. **Respeto a reduced-motion**: Toda animación GSAP o Three.js se simplifica limpiamente si el usuario tiene activado movimiento reducido.
5. **Cero errores de compilación**: No declararán una tarea aprobada sin verificar que `npm run typecheck` pase en verde.
6. **Protocolo CAHP**: Todo traspaso terminará con el bloque canónico:
   ```text
   [CAMBIÓ]: ...
   [AFECTA]: ...
   [RIESGO]: bajo | medio | alto | crítico
   [SIGUIENTE]: ...
   ```
