# Arquitectura - Que significa "hacer un buen trabajo"

> Este documento define el estandar de calidad tecnica del repositorio.
> Los agentes revisores evaluan cambios contra este archivo.
> Si no esta aqui, no es requisito.

## Principios

1. **Capas claras.** El proyecto se organiza en capas con responsabilidades explicitas:
   - `src/public/` - contrato publico y modelos expuestos al consumidor.
   - `src/client/` - servicios de dominio (authentication, data, information).
   - `src/mappers/` - transformaciones entre respuestas SIAR y modelos internos/publicos.
   - `src/internal/` - modelos y constantes internas de soporte.
   No introducir capas nuevas sin una necesidad documentada en un plan de `progress/`.

2. **Cliente liviano.** Mantener dependencias minimas y evitar acoplamientos innecesarios.
   Cualquier dependencia nueva debe justificarse en un plan tecnico y en su impacto.

3. **Errores explicitos y tipados.** Las rutas de error deben ser predecibles:
   - lanzar errores claros con contexto;
   - no devolver valores ambiguos para representar fallo;
   - mantener consistencia entre servicios y API publica.

4. **Contratos publicos estables.** Cambios en `src/public/` requieren analisis de compatibilidad.
   Si un cambio rompe contrato, es obligatorio incrementar version mayor (SemVer major)
   y documentar estrategia de migracion.

5. **Mapeo determinista.** Los mapeos deben ser puros, previsibles y testeables.
   No mezclar llamadas de red o side effects dentro de `src/mappers/`.

6. **Separacion de responsabilidades.**
   - `src/client/` orquesta llamadas y validaciones de servicio.
   - `src/mappers/` transforma datos.
   - `src/public/` define lo que el usuario consume.
   - `src/internal/` no se expone como API de consumo.

## Flujo de datos esperado

```text
Consumidor
  -> src/public/SIARClient.ts
      -> src/client/<domain>/*Service.ts
          -> peticion SIAR
          -> src/mappers/Mappers.ts
              -> src/internal/*Models.ts
      -> salida tipada definida en src/public/*Models.ts
```

## Criterios de diseno por capa

### src/public/
- Debe permanecer orientado al consumidor.
- Nombres y tipos deben ser estables y autoexplicativos.
- Evitar exponer estructuras internas del backend SIAR sin normalizar.

### src/client/
- Responsabilidad: comunicacion con SIAR, validacion de parametros y orquestacion.
- No acoplar logica de presentacion o consumo.
- Reutilizar componentes de dominio existentes antes de duplicar servicios.

### src/mappers/
- Funciones puras, sin side effects.
- Convertir formatos externos en modelos consistentes para la libreria.
- Toda regla no trivial de transformacion debe tener test.

### src/internal/
- Soporte interno y contratos no publicos.
- Puede cambiar con mas libertad, pero sin romper dependencias internas.

## Que NO hacer

- No editar `src/public/` sin evaluar impacto en consumidores.
- No introducir cambios breaking en API publica sin incremento de version mayor.
- No mezclar transformacion de datos con logica de transporte en una misma funcion.
- No duplicar modelos equivalentes entre `src/internal/` y `src/public/` sin justificacion.
- No acoplar tests a implementaciones internas cuando se valida contrato publico.
- No cerrar una tarea sin evidencia de build y tests verdes.
