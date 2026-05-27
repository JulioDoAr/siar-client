# Plan de trabajo: Implementacion de servicio Diarios2

## 1. Resumen de la solicitud

Solicitud: revisar servicios definidos en el manual SIAR, contrastar contra lo implementado en la libreria y preparar la implementacion de un servicio pendiente.

Resultado del contraste:

- Implementados actualmente:
  - Autenticacion: cifrarCadena y obtenerToken.
  - Info: CCAA, PROVINCIAS, ESTACIONES, ACCESOS, CODIGOSVALIDACION.
  - Datos: Horarios, Diarios, Semanales, Mensuales.
- Pendiente detectado:
  - Datos tipo Diarios2.

Evidencia tecnica revisada:

- El manual describe Diarios2 como tipo de salida de Datos.
- En codigo, DataType no incluye Diarios2 y no existe metodo fetchDaily2Data.
- No existe modelo interno/publico ni mapper para Diarios2.
- No hay cobertura de pruebas para Diarios2 en unit/integration/e2e.

## 2. Alcance y no-alcance

### Alcance

- Incorporar soporte completo para Datos/Diarios2 en la libreria:
  - contrato interno,
  - contrato publico,
  - mapeo,
  - servicio interno de datos,
  - superficie publica SIARClient,
  - exportaciones en entrypoint,
  - pruebas unitarias, de integracion y e2e.

### No-alcance

- No modificar comportamiento existente de Horarios, Diarios, Semanales o Mensuales.
- No redisenar manejo global de errores fuera de lo necesario para Diarios2.
- No cambios de versionado/publicacion en este ciclo (solo preparacion e implementacion tecnica).

## 3. Tipo y complejidad del cambio

- Tipo: cambio de servicio de dominio + API publica + mapeo + pruebas.
- Complejidad estimada: media-alta (impacto transversal en capas).

## 4. Alcance tecnico por capas

- src/client: extender DataService con nueva operacion Diarios2 y uso de DataType.
- src/public: exponer nuevo tipo de dato y metodo de cliente.
- src/internal: agregar modelo interno de respuesta Diarios2.
- src/mappers: agregar mapper interno -> publico para Diarios2.
- tests: agregar cobertura en unit, integration y e2e.

## 5. Lista numerada de tareas

1. [done] Confirmar contrato funcional Diarios2
   - Objetivo funcional: cerrar ambiguedad de contrato segun manual (parametros y campos exactos).
   - Archivos/capas impactadas: docs/manual-siar-v2.2.md, src/client/data/Information.md, progress.
   - Tareas de implementacion: documentar decision sobre nombre de tipo y metodo publico (propuesta: Daily2Data + fetchDaily2Data).
   - Tareas de pruebas: definir casos minimos esperados para payload Diarios2.
   - Riesgos y mitigaciones: ambiguedad del manual sobre listado de tipoDatos; mitigar dejando supuesto explicito y test de URL final.
   - Criterios de aceptacion: contrato decidido y registrado en el plan sin preguntas bloqueantes.
   - Evidencia de implementacion: actualizado `src/client/data/Information.md` con decision de contrato (`Daily2Data`, `fetchDaily2Data`, `tipoDatos=Diarios2`), supuesto explicito de ambiguedad documental y casos minimos esperados para payload/URL.
   - Evidencia de verificacion: `npm run build` OK (tsc + bundle CJS) y `npm test` OK (7 suites en verde, 1 suite omitida, 53 tests totales con 46 passing y 7 skipped).

2. [done] Extender modelos de datos (interno y publico)
   - Objetivo funcional: representar Diarios2 tipado extremo a extremo.
   - Archivos/capas impactadas: src/internal/data/Models.ts, src/public/data/Models.ts, src/index.ts.
   - Tareas de implementacion: crear interfaces DatoDiario2 y Daily2Data; exportar tipo en entrypoint.
   - Tareas de pruebas: unit de tipos/shape mediante fixtures y compilacion TypeScript.
   - Riesgos y mitigaciones: inconsistencias de tipos numericos/null; mitigar con tipado estricto y mocks realistas.
   - Criterios de aceptacion: build TS sin errores y tipo publico exportado.
   - Resultado de revision: CHANGES_REQUESTED en progress/review_diarios2_tarea2.md.
   - Acciones requeridas de revision: dejar `npm test` en verde (resolver precondicion `SIAR_API_KEY` en e2e) y aportar evidencia de pruebas de shape/tipado o acuerdo explicito de alcance para esta tarea.

3. [done] Extender enum y servicio de datos para Diarios2
   - Objetivo funcional: habilitar peticion HTTP al endpoint Datos/Diarios2.
   - Archivos/capas impactadas: src/public/data/Models.ts, src/client/data/DataService.ts.
   - Tareas de implementacion: agregar DataType.Daily2 = Diarios2; crear fetchDaily2Data(scope, params) reutilizando fetchData.
   - Tareas de pruebas: unit sobre construccion URL y ruta tipoDatos=Diarios2.
   - Riesgos y mitigaciones: regresion en buildUrl compartido; mitigar con tests de URL para tipos existentes + Diarios2.
   - Criterios de aceptacion: nuevo metodo retorna GeneralResponse<Daily2Data[]> y mantiene compatibilidad con API actual.
   - Evidencia de implementacion: agregado `DataType.Daily2 = "Diarios2"` en `src/public/data/Models.ts`; agregado `fetchDaily2Data(ambito, params)` en `src/client/data/DataService.ts` reutilizando `fetchData` y retorno `GeneralResponse<Daily2Data[]>`.
   - Evidencia de verificacion: agregadas pruebas unitarias en `tests/unit/PetitionService.test.js` para validar valor de enum (`Diarios2`) y construccion de ruta `Diarios2/ESTACION`; verificacion ejecutada con `npm run build` y `npm test` en verde.
   - Resultado de revision: CHANGES_REQUESTED en progress/review_diarios2_tarea3.md.
   - Acciones requeridas de revision: consumir `DatoDiario2[]` en `fetchDaily2Data` y convertir a `Daily2Data[]` (mapper), y reforzar pruebas unitarias con payload SIAR real para evitar falsos positivos por mocks ya normalizados.
   - Cierre de correccion: resuelta mediante Tarea 11, con veredicto APPROVED en `progress/review_diarios2_tarea11.md`.

4. [review] Implementar mapper Diarios2
   - Objetivo funcional: transformar payload SIAR Diarios2 a modelo publico coherente.
   - Archivos/capas impactadas: src/mappers/Mappers.ts.
   - Tareas de implementacion: crear mapDatoDiario2ToDaily2Data y usar nomenclatura consistente con mappers actuales.
   - Tareas de pruebas: unit del mapper con fixture representativo.
   - Riesgos y mitigaciones: mapeo incorrecto de campos Temp\_\*; mitigar con pruebas campo a campo.
   - Criterios de aceptacion: mapeo determinista y cubierto por tests.
   - Evidencia de implementacion: validado uso consistente del mapper en `fetchDaily2Data` (`src/client/data/DataService.ts`) mediante `response.datos.map(mapDatoDiario2ToDaily2Data)`; agregada prueba unitaria dedicada en `tests/unit/Mappers.test.ts` con fixture SIAR representativo y asercion campo a campo.
   - Evidencia de verificacion: ejecutados `npm run build` y `npm test` en verde tras los cambios de Tarea 4.

5. [todo] Exponer Diarios2 en API publica
   - Objetivo funcional: permitir consumo desde SIARClient.
   - Archivos/capas impactadas: src/public/SIARClient.ts, src/index.ts.
   - Tareas de implementacion: agregar fetchDaily2Data en SIARClient y exportar tipo asociado.
   - Tareas de pruebas: e2e de superficie publica para nuevo metodo.
   - Riesgos y mitigaciones: drift entre servicio interno y wrapper publico; mitigar con prueba e2e de llamada delegada.
   - Criterios de aceptacion: metodo disponible en cliente publico y tipado accesible desde import principal.

6. [todo] Cobertura de pruebas unitarias
   - Objetivo funcional: validar mapper, servicio y rutas de error para Diarios2.
   - Archivos/capas impactadas: tests/unit/PetitionService.test.js, tests/unit/\* (si se requiere nuevo archivo).
   - Tareas de implementacion: agregar casos de exito, error HTTP y error de parse/network para fetchDaily2Data.
   - Tareas de pruebas: ejecutar npm test focalizado de unit.
   - Riesgos y mitigaciones: falsos positivos por mocks incompletos; mitigar reutilizando patron de tests existentes.
   - Criterios de aceptacion: tests unit nuevos en verde y sin romper existentes.

7. [todo] Cobertura de integracion
   - Objetivo funcional: validar integracion de DataService con Diarios2 y mapping.
   - Archivos/capas impactadas: tests/integration/DataService.integration.test.js.
   - Tareas de implementacion: agregar flujo Diarios2 con mock de respuesta realista.
   - Tareas de pruebas: ejecutar suite integration.
   - Riesgos y mitigaciones: discrepancia entre mock y contrato real; mitigar alineando fixture con manual.
   - Criterios de aceptacion: test de integracion Diarios2 en verde.

8. [todo] Cobertura e2e de cliente publico
   - Objetivo funcional: verificar que SIARClient expone y delega Diarios2 correctamente.
   - Archivos/capas impactadas: tests/e2e/SIARClient.test.ts.
   - Tareas de implementacion: agregar escenario fetchDaily2Data con mocks.
   - Tareas de pruebas: ejecutar suite e2e.
   - Riesgos y mitigaciones: cobertura parcial de contrato; mitigar con asserts de forma de salida y mensaje.
   - Criterios de aceptacion: e2e de nuevo metodo en verde.

9. [todo] Verificacion final de calidad
   - Objetivo funcional: asegurar integridad global antes de cerrar.
   - Archivos/capas impactadas: proyecto completo.
   - Tareas de implementacion: ninguna de producto; solo validacion.
   - Tareas de pruebas: ejecutar npm run build y npm test.
   - Riesgos y mitigaciones: tiempo de suite; mitigar ejecutando primero pruebas afectadas y luego suite completa.
   - Criterios de aceptacion: build y tests completos en verde.

10. [done] Correccion de Tarea 2 tras review

- Objetivo funcional: subsanar observaciones del reviewer para poder aprobar Tarea 2.
- Archivos/capas impactadas: tests/e2e/SIARClient.test.ts, tests/unit/\* (si aplica), progress.
- Tareas de implementacion: agregar manejo de entorno sin SIAR_API_KEY en e2e para no romper npm test; incorporar evidencia de prueba de shape/tipado para modelos Diarios2 o ajustar criterio documentado en plan.
- Tareas de pruebas: ejecutar npm test y npm run build.
- Riesgos y mitigaciones: afectar comportamiento e2e real; mitigar con skip condicional solo cuando no exista credencial.
- Criterios de aceptacion: veredicto APPROVED en nueva revision de Tarea 2 y actualizacion de estado a done.
- Evidencia de implementacion: e2e usa `describe.skip` condicional cuando falta `SIAR_API_KEY`; con credencial presente la suite e2e se ejecuta normalmente.
- Evidencia de tipado/shape: agregado `tests/unit/Daily2Models.test.ts` con muestras tipadas `DatoDiario2` y `Daily2Data` y asserts de forma.

11. [done] Correccion de Tarea 3 tras review

- Objetivo funcional: resolver desalineacion entre contrato interno/publico en `fetchDaily2Data` y fortalecer pruebas para payload SIAR real.
- Archivos/capas impactadas: src/client/data/DataService.ts, src/mappers/Mappers.ts, tests/unit/PetitionService.test.js, progress.
- Tareas de implementacion: ajustar `fetchDaily2Data` para consumir `DatoDiario2[]` y mapear a `Daily2Data[]` mediante mapper; actualizar o agregar pruebas unitarias con fixture estilo SIAR (no normalizado).
- Tareas de pruebas: ejecutar `npm run build` y `npm test` con evidencia en reporte de review.
- Riesgos y mitigaciones: duplicar logica de mapeo o romper tipos existentes; mitigar reutilizando mapper unico y cubriendo casos de shape en tests.
- Criterios de aceptacion: reviewer aprueba correccion y la Tarea 3 puede pasar a done sin hallazgos de severidad alta/media.
- Evidencia de implementacion: `fetchDaily2Data` ahora consume `DatoDiario2[]` y transforma a `Daily2Data[]` usando `mapDatoDiario2ToDaily2Data`; agregado mapper en `src/mappers/Mappers.ts`; test unitario `fetchDaily2Data` actualizado con payload SIAR no normalizado (`IdProvincia`, `Año`, `Temp_40a_30`, etc.) para validar transformacion real.
- Evidencia de verificacion: `npm run build` OK (tsc + bundle CJS) y `npm test` OK (7 suites passed, 1 skipped; 48 passed, 7 skipped).
- Resultado de revision: APPROVED en `progress/review_diarios2_tarea11.md`.

## 6. Matriz de pruebas

| Nivel       | Cobertura objetivo                                                                            | Archivos objetivo                                                     | Estado inicial |
| ----------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------- |
| Unit        | Mapper Diarios2, DataService.fetchDaily2Data (ok/http/parse/network), URL con DataType.Daily2 | tests/unit/PetitionService.test.js (o nuevo test unitario especifico) | pendiente      |
| Integration | Integracion DataService + mapeo respuesta Diarios2                                            | tests/integration/DataService.integration.test.js                     | pendiente      |
| E2E         | Superficie publica SIARClient.fetchDaily2Data                                                 | tests/e2e/SIARClient.test.ts                                          | pendiente      |

## 7. Riesgos, supuestos y preguntas abiertas

### Riesgos

- Ambiguedad documental: el manual lista tipoDatos sin Diarios2 en una seccion, pero lo define en valores de salida.
- Posible variacion real de campos o nulabilidad en respuesta Diarios2.
- Riesgo de ruptura de tipado/exportaciones al ampliar API publica.

### Mitigaciones

- Fijar contrato minimo en plan y testear URL/shape de salida.
- Crear fixture Diarios2 basado en manual y ajustar tras validacion con respuesta real si se dispone.
- Ejecutar build y test completo al final.

### Supuestos

- El endpoint Datos/Diarios2 esta disponible en v2 del servicio SIAR.
- Reutiliza los mismos parametros de consulta que otros tipos de Datos.
- El patron de respuesta mantiene envoltorio datos + MensajeRespuesta.

### Preguntas abiertas

- Confirmar si Diarios2 acepta DatosCalculados o lo ignora.
- Confirmar si IdEstacion debe exponerse como string (segun manual) o number en algun caso.

## 8. Orden recomendado de ejecucion

1. Tarea 1 (cerrar contrato)
2. Tarea 2 (modelos)
3. Tarea 3 (servicio y enum)
4. Tarea 4 (mapper)
5. Tarea 5 (API publica)
6. Tareas 6, 7 y 8 (pruebas por nivel)
7. Tarea 9 (build y test global)

## 9. Definition of Done

- Existe soporte completo Diarios2 en capas internal, mappers, client y public.
- SIARClient expone fetchDaily2Data con tipado publico.
- Se exporta el nuevo tipo desde el entrypoint principal.
- Hay pruebas unit, integration y e2e para Diarios2 en verde.
- npm run build y npm test finalizan sin errores.
- El plan refleja estado de tareas y no quedan dudas funcionales bloqueantes sin registrar.
