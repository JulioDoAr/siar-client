# Review - tarea 3, Extender enum y servicio de datos para Diarios2

**Veredicto:** CHANGES_REQUESTED

## Criterios del plan

- C1: [x] - Se agrego `DataType.Daily2 = "Diarios2"` en `src/public/data/Models.ts` y existe cobertura unitaria que verifica el valor y la ruta `Diarios2/ESTACION`.
- C2: [ ] - Aunque la firma declara `GeneralResponse<Daily2Data[]>`, la implementacion de `fetchDaily2Data` no transforma desde el contrato interno `DatoDiario2` al modelo publico `Daily2Data`, por lo que el tipo publico no queda garantizado en runtime.

## Checkpoints (CHECKPOINTS.md)

- C1: [x] - Existen archivos base de agentes y documentos clave (`AGENTS.md`, `docs/architecture.md`, `docs/conventions.md`, `docs/verification.md`) y plan en `progress/`.
- C2: [x] - Estado de tareas coherente para revision; esta tarea se devuelve a `todo` con acciones requeridas.
- C3: [ ] - Hay desalineacion por capas: `src/client/data/DataService.ts` devuelve `Daily2Data` sin pasar por mapper pese a existir contrato interno `DatoDiario2`.
- C4: [x] - Verificacion tecnica obligatoria ejecutada: `npm run build` y `npm test` con exit code `0`; existe este reporte de revision por tarea.
- C5: [x] - El plan queda actualizado con el estado final real de la tarea y no se detectaron archivos temporales sospechosos `*.tmp` o `*.log`.

## Hallazgos

1. Severidad: alta
   - Archivo: src/client/data/DataService.ts
   - Evidencia: `fetchDaily2Data` usa `fetchData<Daily2Data[]>` y retorna `response.datos` directamente. El contrato interno existente para la respuesta SIAR es `DatoDiario2` (`src/internal/data/Models.ts`), con nombres de campo distintos (`IdProvincia`, `Año`, `Dia`, `Temp_40a_30`, etc.) frente al modelo publico (`provinceId`, `year`, `dayOfYear`, `temp40to30`, ...).
   - Accion requerida: ajustar el flujo para consumir `DatoDiario2[]` en servicio y convertir a `Daily2Data[]` mediante mapper (o no exponer `Daily2Data` hasta que exista dicha conversion).

2. Severidad: media
   - Archivo: tests/unit/PetitionService.test.js
   - Evidencia: el test de `fetchDaily2Data` usa un mock ya normalizado en formato `Daily2Data`, por lo que no detecta discrepancias con el payload real SIAR definido por `DatoDiario2`.
   - Accion requerida: agregar test unitario con payload estilo SIAR (`DatoDiario2`) que falle si no hay transformacion al modelo publico.

## Resultado de verificacion

- build: ok
- test: ok

## Decision final

- Se solicita cambios: la ruta `Diarios2` y el enum estan correctos, pero el contrato publico declarado no esta respaldado por una transformacion real desde el modelo interno.