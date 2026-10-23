# Immutability & Clean Code Governance Rules

Aplica a todo el código fuente del proyecto (TypeScript, React, Node.js, Python, CSS).

---

## 1. Regla de Oro: Inmutabilidad Absoluta (CRITICAL)

**NUNCA mutar objetos ni arrays existentes; crear siempre nuevas instancias:**

```typescript
// ❌ INCORRECTO: Mutación destructiva
function updatePlan(plan: Plan, newPrice: number) {
  plan.price = newPrice;
  return plan;
}

// ✅ CORRECTO: Inmutabilidad con spread operator
function updatePlan(plan: Plan, newPrice: number): Plan {
  return {
    ...plan,
    price: newPrice,
  };
}
```

- En React: Nunca mutar `state` directamente. Usar setters funcionales (`setItems(prev => [...prev, newItem])`).
- En Three.js / R3F: Las mutaciones de orientación física (`rotation`, `position`) se limitan a `useFrame` manipulando referencias directas sin alterar el árbol de estado de React.

---

## 2. Organización: Principio de "Muchos Archivos Pequeños"

- **200 a 400 líneas típicas por archivo (límite duro: 800 líneas)**.
- Alta cohesión, bajo acoplamiento: Extraer utilidades y subcomponentes cuando un componente sobrepase 300 líneas.
- Organizar por dominio/feature (`src/scenes/`, `src/components/`, `src/data/`), no por tipo genérico.

---

## 3. Manejo Integral de Errores y Validación

- Prohibido dejar promesas sin capturar (`.catch()` o `try/catch`).
- Mensajes de error claros, amigables para el usuario y con contexto para depuración.
- Validación tipada en límites de entrada (TypeScript strict mode, interfaces tipadas).

---

## 4. Checklist de Aprobación de Código
Antes de declarar un hito terminado:
- [ ] Código legible con nombres descriptivos (sin `x`, `tmp`, `data1`).
- [ ] Funciones pequeñas (< 50 líneas).
- [ ] Cero `console.log` en código de producción.
- [ ] Cero valores mágicos sin constante o token asociado.
- [ ] Patrones inmutables verificados.
