# Verificacion - Como demostrar que el trabajo funciona

> Regla de oro: el agente no dice "funciona", lo demuestra con evidencia reproducible.

## Niveles de verificacion

### Nivel 1 - Build de TypeScript (obligatorio)

Todo cambio debe compilar sin errores de tipos.

Comando:

```bash
npm run build
```

Criterio:
- compilacion exitosa;
- artefactos generados sin errores.

### Nivel 2 - Suite de pruebas (obligatorio)

Todo cambio funcional debe pasar pruebas automaticas relevantes.

Comando base:

```bash
npm test
```

Si necesitas evidencia de cobertura:

```bash
npm run test:coverage
```

Criterio:
- tests en verde;
- nuevas rutas de comportamiento cubiertas por test.
- cobertura global >= 80%.

Politica de cobertura:
- umbral minimo global: 80%;
- si una tarea baja el porcentaje por debajo de 80%, no se considera lista.

### Nivel 3 - Verificacion por alcance (obligatorio segun tipo de cambio)

- Cambio en `src/mappers/`: al menos test unitario de transformacion feliz y edge case.
- Cambio en `src/client/`: test unitario y, si aplica, integracion del servicio.
- Cambio en `src/public/`: test e2e o de contrato publico que cubra el nuevo comportamiento.

## Evidencia minima por PR o tarea

Cada tarea debe dejar evidencia trazable en su plan de `progress/`:

1. Comandos ejecutados.
2. Resultado (pass/fail).
3. Archivos de test agregados o modificados.
4. Riesgo residual si hubo limitaciones.

## Anti-patrones (no hacer)

- Decir "deberia funcionar" sin ejecutar comandos.
- Cambiar comportamiento sin agregar/ajustar tests.
- Validar solo camino feliz cuando hay errores esperables.
- Cerrar tarea con build o tests fallando.
- Introducir breaking changes en `src/public/` sin plan de migracion y sin bump major.

## Checklist de cierre

Antes de cerrar una tarea, confirmar:

1. `npm run build` en verde.
2. `npm test` en verde.
3. `npm run test:coverage` con cobertura global >= 80%.
4. Tests nuevos/modificados cubren el cambio real.
5. Si hubo cambio en API publica, se reviso compatibilidad y ejemplos.
6. Si hubo cambio breaking en API publica, se hizo bump major obligatorio.
7. Se actualizo el archivo de plan en `progress/` con estado final y evidencia.

## Manejo de bloqueos

Si build o tests fallan y no se puede resolver en la sesion:

1. Registrar bloqueo en el archivo de plan correspondiente en `progress/`.
2. Documentar causa, evidencia y siguiente accion sugerida.
3. No marcar la tarea como lista hasta resolver el bloqueo.
