# AGENTS.md — Mapa de navegacion para agentes de IA

## 1. Antes de empezar (obligatorio)

1. Lee README.md para entender el objetivo de la libreria y el dominio SIAR.
2. Lee package.json para identificar scripts disponibles y restricciones de entorno.
3. Si vienes a planificar trabajo, usa el agente leader y revisa primero progress/.
4. Si vienes a implementar cambios, define una sola tarea concreta antes de editar codigo.

## 2. Mapa del repositorio

| Archivo / carpeta              | Que contiene                                              | Cuando leerlo                             |
| ------------------------------ | --------------------------------------------------------- | ----------------------------------------- |
| README.md                      | Vision general del proyecto y enlaces de referencia       | Siempre, al empezar                       |
| package.json                   | Scripts de build/test y metadatos de publicacion          | Siempre, al empezar                       |
| tsconfig.json                  | Configuracion de TypeScript                               | Antes de tocar tipos o compilacion        |
| jest.config.ts                 | Configuracion de pruebas                                  | Antes de crear o ajustar tests            |
| .github/agents/leader.agent.md | Definicion del agente lider/orquestador                   | Si vas a planificar y descomponer trabajo |
| progress/                      | Planes de tareas por cambio y estado de investigacion     | Para coordinar trabajo o retomar contexto |
| progress/research/             | Hallazgos de subagentes de investigacion                  | Si una tarea requiere exploracion previa  |
| src/                           | Codigo fuente de la libreria                              | Para implementar                          |
| src/client/                    | Servicios por dominio (authentication, data, information) | Para cambios de logica de negocio         |
| src/public/                    | API publica consumida por usuarios                        | Para cambios de contratos publicos        |
| src/internal/                  | Modelos y constantes internas                             | Para cambios de soporte interno           |
| src/mappers/                   | Transformaciones entre respuestas y modelos               | Para cambios de mapeo/normalizacion       |
| tests/                         | Suite de pruebas unit, integration y e2e                  | Para verificar comportamiento             |
| docs/examples.md               | Ejemplos de uso del cliente                               | Antes de tocar experiencia de consumo     |

## 3. Reglas duras (no negociables)

- Una sola solicitud principal por ciclo de trabajo. No mezcles objetivos.
- No declares una tarea como cerrada sin ejecutar pruebas relevantes.
- Antes de exponer cambios en API publica, evalua impacto en consumidores.
- Si hay breaking change en API publica, el bump major es obligatorio.
- Si hay ambiguedad funcional, documenta supuestos y preguntas en `progress/`.

## 4. Flujo recomendado por tipo de trabajo

### 4.1 Planificacion (agente leader)

1. Recibe una modificacion o adicion.
2. Evalua impacto tecnico por capas: src/client, src/public, src/internal, src/mappers, tests.
3. Crea o actualiza un plan en progress/YYYY-MM-DD\_<slug-cambio>.md.
4. Si hace falta investigacion, delega y guarda hallazgos en progress/research/.

### 4.2 Implementacion (agente general o especializado)

1. Toma un plan existente en progress/.
2. Implementa por pasos pequenos y verificables.
3. Mantiene consistencia de tipos y contratos publicos.
4. Agrega o actualiza pruebas en tests/unit, tests/integration o tests/e2e segun corresponda.

### 4.3 Verificacion

1. Ejecuta npm run build.
2. Ejecuta npm test (o npm run test:coverage si necesitas validar cobertura).
3. Si algo falla, corrige y vuelve a verificar antes de cerrar.

## 5. Cierre de ciclo

Antes de terminar:

1. Deja registro en progress.md del estado final (listo o bloqueo).
2. Si hubo bloqueos, documenta causa, evidencia y siguiente accion sugerida.
3. Asegura que no queden cambios de depuracion temporales.
4. Mantiene el repositorio en estado coherente para que otro agente pueda continuar.

## 6. Si te bloqueas

- Relee primero README.md y la zona afectada del codigo.
- Revisa pruebas relacionadas en tests/ para inferir comportamiento esperado.
- Si persiste la incertidumbre, documenta el bloqueo en progress/<plan>.md y para.
- No inventes contratos ni respuestas del API SIAR sin evidencia en codigo o documentacion.
