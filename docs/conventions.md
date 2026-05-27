# Convenciones de codigo

> Homogeneidad primero. El repositorio debe verse y comportarse de forma consistente.

## Stack y estilo

- **Lenguaje:** TypeScript.
- **Modulo:** ESM (`"type": "module"`).
- **Runtime minimo:** Node >= 14.
- **Formato general:** mantener consistencia con el estilo actual del repositorio.
- **Indentacion:** 2 espacios.
- **Longitud de linea:** objetivo <= 100 caracteres cuando sea razonable.

## Nombres

| Tipo | Convencion | Ejemplo |
|------|------------|---------|
| Archivos TS | `PascalCase.ts` para servicios/modelos existentes | `DataService.ts` |
| Clases | `PascalCase` | `SIARClient` |
| Funciones y metodos | `camelCase` | `getDailyData` |
| Variables | `camelCase` | `requestParams` |
| Constantes | `UPPER_SNAKE_CASE` | `BASE_URL` |
| Tipos e interfaces | `PascalCase` | `DataResponseModel` |

## Estructura y responsabilidades

- `src/public/`: API publica y tipos de consumo.
- `src/client/`: servicios por dominio y orquestacion de llamadas.
- `src/mappers/`: transformaciones de respuesta.
- `src/internal/`: modelos y constantes internas.

Regla: cada cambio debe caer en la capa correcta. Si una funcion cambia de responsabilidad, moverla.

## Imports

- Preferir imports explicitos sobre imports comodin.
- Orden recomendado: externos, luego internos.
- Evitar ciclos entre capas (`public` no debe depender de `internal` sin pasar por contrato definido).

## Tipado

- Evitar `any` salvo caso excepcional documentado.
- Preferir tipos concretos e interfaces reutilizables.
- Modelar opcionalidad de forma explicita (`?` o uniones), no implicita.
- No ocultar errores de tipos con casts innecesarios.

## Manejo de errores

- Error messages claros y accionables.
- Mantener consistencia de comportamiento de error entre servicios homologos.
- Si una operacion puede fallar por entrada invalida, validar temprano.

## Comentarios

- Por defecto, pocos comentarios.
- Solo comentar cuando explica un "por que" no obvio.
- No comentar lo evidente que ya expresa el codigo.

## Tests

- Ubicacion:
  - unitarios en `tests/unit/`
  - integracion en `tests/integration/`
  - end-to-end en `tests/e2e/`
- Nombrado recomendado estilo BDD: `it('<behavior>')`.
- Cada cambio funcional debe actualizar o crear tests relevantes.

## Cambios en API publica

- Cualquier cambio en `src/public/` requiere:
  - revisar impacto en consumidores;
  - actualizar ejemplos de uso si aplica (`docs/examples.md`);
  - cobertura de test para comportamiento nuevo o modificado.
