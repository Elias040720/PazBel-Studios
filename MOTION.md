# MOTION.md — Sistema de Movimiento, Coreografía y Scrollytelling

Este documento define la física, curvas de aceleración, duraciones, reglas de microinteracción y coreografía de scrollytelling con GSAP y Three.js para **PazBel Studios 2.0**.

---

## 1. Filosofía de Movimiento (Emil Kowalski Framework)

El movimiento en PazBel Studios cumple un propósito de feedback, jerarquía y continuidad espacial. Nunca es decorativo sin sentido ni retrasa al usuario.

### Principios Fundamentales
1. **La velocidad percibida importa más que los frames brutos**:
   - Una interacción frecuente (hover, clic) debe sentirse instantánea (120ms - 180ms).
   - Las transiciones narrativas de capítulos son gobernadas por el scroll del usuario (scrub), otorgándole control total y reversibilidad inmediata.
2. **Origen Físico (`transform-origin`)**:
   - Menús desplegables y popovers escalan desde el punto de origen de su disparador (`transform-origin: top right`).
   - Modales de contacto centran su origen en la pantalla (`transform-origin: center`).
3. **Prohibición de `scale(0)`**:
   - Todo elemento que entra en escena parte de `scale(0.95)` y `opacity: 0`, simulando que el objeto ya existe en el espacio antes de cobrar visibilidad.
4. **Respuesta Táctil en Botones**:
   - `:active { transform: scale(0.97); }` con transición de 160ms `ease-out`. Provee confirmación sensorial instantánea de que el sistema ha recibido la interacción.
5. **Animar Exclusivamente en GPU**:
   - Queda terminantemente prohibido animar `width`, `height`, `top` o `left`. Solo se manipulan `transform` (`x`, `y`, `scale`, `rotation`) y `opacity`.

---

## 2. Tokens de Movimiento

```css
:root {
  /* Curvas de aceleración */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);       /* Para entradas ágiles y feedback UI */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);   /* Para transformaciones de estado y morphs */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Para micro-rebotes sutiles en badges */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* Para deslizamiento de paneles laterales */

  /* Duraciones */
  --duration-instant: 120ms; /* Toggles, hovers básicos */
  --duration-snappy: 180ms;  /* Clics, apertura de dropdowns */
  --duration-normal: 260ms;  /* Transición de acordeones, modales */
  --duration-scenic: 600ms;  /* Revelación de tarjetas y escenas */
}
```

---

## 3. Coreografía GSAP por Escenas (Scrollytelling)

### Escena 01 — Hero (Entrada Cinematográfica)
- **Timeline de Entrada (`gsap.timeline`)**:
  1. `0.0s`: Iluminación ambiental y escultura PB 3D inician rotación axial con dispersión iridiscente.
  2. `0.2s`: Titular principal revela sus palabras con máscara vertical (`y: 35`, `opacity: 0` a `y: 0`, `opacity: 1`, `duration: 0.9s`, `--ease-out`).
  3. `0.45s`: Micro-badge y párrafo de soporte entran en cascada (`stagger: 0.08s`).
  4. `0.65s`: CTAs de acción revelan su cápsula interna con rebote sutil.
- **ScrollTrigger Scrub**: Conforme el usuario se desplaza, la cámara 3D se desplaza en profundidad hacia el capítulo 02, desacelerando suavemente.

### Escena 04 — Proceso: Scrollytelling en Tres Etapas
La sección utiliza un contenedor con `pin: true` en pantallas de escritorio (> 800px):
1. **01 — DISEÑAMOS**: La tarjeta visual inicial revela wireframe de interfaz, tipografías y paleta cromática.
2. **02 — DESARROLLAMOS**: Transición al estado 2: los bloques de diseño se repliegan y surgen nodos de arquitectura, bases de datos y APIs.
3. **03 — IMPULSAMOS**: Se despliega el flujo continuo de analítica, conversiones por WhatsApp y optimización mensual.

### Escena 05 — Portafolio Inmersivo
- Cada proyecto (**MOVA**, **CHAMBI MOTORS**, **CARWASHALITA**) ocupa un capítulo visual destacado.
- Al desplazarse, el mockup del proyecto previo sufre una sutil inclinación tridimensional (`perspective: 1000px`, `rotateY: -4deg`, `scale: 0.95`) mientras la siguiente tarjeta entra suavemente en vista, eliminando el clásico mosaico plano.

---

## 4. Modo de Movimiento Reducido (`prefers-reduced-motion`)

Cuando el usuario tiene configurada la preferencia de reducción de movimiento en su sistema:
- Los ScrollTriggers con scrub y fijación (`pin: true`) se desactivan automáticamente.
- El canvas Three.js detiene giros bruscos y se limita a una iluminación estática elegante.
- Las animaciones se reducen a transiciones simples de opacidad sin desplazamientos (`transform: none`).
- El sitio mantiene el 100% de su contenido, interactividad, cotizador y enlaces comerciales.
