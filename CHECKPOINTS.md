# CHECKPOINTS — Evaluacion del estado final

## C1 — Base del flujo multi-agente

- [ ] Existen los archivos base: `AGENTS.md`, `.github/agents/leader.agent.md`, `.github/agents/implementer.agent.md`, `.github/agents/reviewer.agent.md`.
- [ ] Existen los documentos clave: `docs/architecture.md`, `docs/conventions.md`, `docs/verification.md`.
- [ ] Existe al menos un plan de trabajo en `progress/` para el cambio evaluado.

## C2 — Estado de tareas coherente

- [ ] Las tareas nuevas se crean en estado `todo`.
- [ ] El implementador solo mueve estados a `review` o `blocked`.
- [ ] El revisor es quien mueve una tarea a `done` (o la devuelve a `todo` con acciones requeridas).
- [ ] No hay mas de una tarea en `review` para el mismo cambio, salvo que el plan lo justifique explicitamente.

## C3 — Codigo alineado con arquitectura

- [ ] Los cambios respetan capas y contratos definidos en `docs/architecture.md`.
- [ ] No hay cambios publicos en `src/public/` sin evaluar impacto en consumidores.
- [ ] No hay codigo de depuracion residual (logs temporales, codigo comentado de prueba o TODO sin contexto).

## C4 — Verificacion tecnica real

- [ ] `npm run build` termina con exit code `0`.
- [ ] `npm test` termina con exit code `0`.
- [ ] La tarea revisada incluye pruebas nuevas o ajustadas en `tests/unit`, `tests/integration` o `tests/e2e` cuando aplica.
- [ ] El reporte de revision existe en un archivo por tarea/cambio: `progress/review_<slug>.md`.

## C5 — Cierre de sesion consistente

- [ ] El plan en `progress/` refleja el estado final real de la tarea (`done`, `todo` o `blocked`).
- [ ] Si hubo bloqueo, el plan documenta causa, evidencia y siguiente accion.
- [ ] No quedan archivos temporales sospechosos en raiz o en carpetas de codigo (`*.tmp`, `*.log`, artefactos manuales no ignorados).
