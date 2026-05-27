# Manual Web API SiAR

Versión 2  
Mayo 2025

## Índice

- [Descripción de los servicios de la Web API](#descripción-de-los-servicios-de-la-web-api)
  - [Acceso a la Web API](#acceso-a-la-web-api)
  - [Consideraciones generales](#consideraciones-generales)
  - [Servicio Obtener Token](#servicio-obtener-token)
    - [1. Cifrado del identificador del usuario](#1-cifrado-del-identificador-del-usuario)
    - [2. Cifrado de la contraseña](#2-cifrado-de-la-contraseña)
    - [3. Obtención del token](#3-obtención-del-token)
  - [Servicio Info](#servicio-info)
    - [Descripción general](#descripción-general)
    - [Parámetros de entrada (Info)](#parámetros-de-entrada-info)
    - [Valores de salida (Info)](#valores-de-salida-info)
      - [Petición `CCAA`](#petición-ccaa)
      - [Petición `PROVINCIAS`](#petición-provincias)
      - [Petición `ESTACIONES`](#petición-estaciones)
      - [Petición `ACCESOS`](#petición-accesos)
      - [Petición `CODIGOSVALIDACION`](#petición-codigosvalidacion)
  - [Servicio Datos](#servicio-datos)
    - [Parámetros de ruta](#parámetros-de-ruta)
    - [Parámetros de consulta](#parámetros-de-consulta)
    - [Valores de salida (Datos)](#valores-de-salida-datos)
      - [`tipoDatos = Horarios`](#tipodatos--horarios)
      - [`tipoDatos = Diarios`](#tipodatos--diarios)
      - [`tipoDatos = Diarios2`](#tipodatos--diarios2)
      - [`tipoDatos = Semanales`](#tipodatos--semanales)
      - [`tipoDatos = Mensuales`](#tipodatos--mensuales)

## Descripción de los servicios de la Web API

La API SiAR ofrece flexibilidad y autonomía a los usuarios mediante un servicio `HTTPS` que devuelve datos en formato `JSON`. Lenguajes como `JavaScript`, `Java` o `C#` permiten realizar peticiones y procesar respuestas.

### Acceso a la Web API

La solicitud de acceso a la Web API SiAR puede realizarse de dos maneras:

- **Usuarios nuevos del SiAR:** solicitando el acceso en el proceso de alta como usuario en SiAR y seleccionando la opción "Sí" en el desplegable "Deseo darme de alta en API SiAR".
- **Usuarios ya registrados en SiAR:** para los usuarios que no solicitaron el alta en API SiAR durante el registro, la solicitud puede realizarse desde "Editar perfil" en "Mi SiAR", seleccionando "Sí" en el desplegable "Deseo darme de alta en API SiAR".

### Consideraciones generales

#### URL de los servicios de la Web API

La URL base de API SiAR en producción es:

- `{URL_Base}`

A lo largo del documento, esta URL se indicará mediante el término `{URL_Base}`.

#### Servicios protegidos por token

Para acceder a los servicios protegidos de la Web API de SIAR, es necesario disponer de un token de autenticación. El token identifica de forma única al usuario.

Todas las peticiones a servicios protegidos deben incluir el token como parámetro de URL, usando la clave `token`.

Ejemplo:

- Ruta: `{URL_Base}/API/V1/ServicioAPI?token={token}`
- URL completa (token ficticio): `{URL_Base}/API/V1/ServicioAPI?token=1Ab`

Importante: en los ejemplos se usa el token ficticio no funcional `1Ab`.

### Servicio Obtener Token

Para acceder a las funcionalidades protegidas de la Web API de SIAR es obligatorio disponer de token. El proceso recomendado consta de tres pasos secuenciales.

#### 1. Cifrado del identificador del usuario

El usuario debe estar previamente dado de alta en el sistema `REGEUS` del `MAPA`.

- Método HTTP: `GET`
- Endpoint: `{URL_Base}/API/V1/Autenticacion/cifrarCadena?cadena={NIF}`

Este método devuelve una cadena cifrada del identificador que se utiliza en el paso 3.

#### 2. Cifrado de la contraseña

La contraseña asociada al usuario debe cifrarse con el mismo método del paso anterior.

- Método HTTP: `GET`
- Endpoint: `{URL_Base}/API/V1/Autenticacion/cifrarCadena?cadena={password}`

Este método devuelve una cadena cifrada de la contraseña que se utiliza en el paso 3.

#### 3. Obtención del token

Con las dos cadenas cifradas (identificador y contraseña), se invoca el endpoint de obtención de token.

- Método HTTP: `GET`
- Endpoint: `{URL_Base}/API/V1/Autenticacion/obtenerToken?Usuario={DNI_cifrado_paso_1}&Password={password_cifrada_paso_2}`

Si la autenticación es correcta, la API devuelve el token de acceso.

### Servicio Info

#### Descripción general

El servicio `Info` permite obtener datos de referencia utilizados por otras operaciones de la Web API. Facilita la parametrización de consultas (por ejemplo, comunidades autónomas, provincias, estaciones, límites de acceso y códigos de validación).

- Método HTTP: `GET`
- Endpoint: `{URL_Base}/API/V1/Info/{PeticionInfo}?token={token}`

#### Parámetros de entrada (Info)

| Nombre         | Obligatorio | Descripción                                                                 |
| -------------- | ----------- | --------------------------------------------------------------------------- |
| `PeticionInfo` | Sí          | Admite: `CCAA`, `PROVINCIAS`, `ESTACIONES`, `ACCESOS`, `CODIGOSVALIDACION`. |
| `token`        | Sí          | Token del usuario obtenido mediante el servicio `Obtener Token`.            |

#### Valores de salida (Info)

Los valores de salida dependen del valor enviado en `PeticionInfo`.

##### Petición `CCAA`

Devuelve un listado JSON de comunidades autónomas.

| Campo    | Tipo     | Descripción                                                       |
| -------- | -------- | ----------------------------------------------------------------- |
| `CCAA`   | `String` | Nombre de la comunidad autónoma.                                  |
| `Codigo` | `String` | Código de tres letras de la C.A. para uso en servicios de la API. |

Ejemplo de petición:

- `{URL_Base}/API/V1/Info/CCAA?token=1Ab`

Ejemplo de respuesta:

```json
{
  "datos": [
    { "CCAA": "Andalucía", "Codigo": "AND" },
    { "CCAA": "Aragón", "Codigo": "ARA" }
  ],
  "MensajeRespuesta": null
}
```

##### Petición `PROVINCIAS`

Devuelve un listado JSON de provincias y su relación con la comunidad autónoma.

| Campo         | Tipo      | Descripción                                          |
| ------------- | --------- | ---------------------------------------------------- |
| `Provincia`   | `String`  | Nombre de la provincia.                              |
| `Codigo`      | `String`  | Código de provincia para uso en servicios de la API. |
| `Codigo_CCAA` | `String`  | Código de tres letras de la comunidad autónoma.      |
| `IdProvincia` | `Integer` | Identificador numérico interno de provincia.         |

Ejemplo de petición:

- `{URL_Base}/API/V1/Info/PROVINCIAS?token=1Ab`

Ejemplo de respuesta:

```json
{
  "datos": [
    {
      "Provincia": "Cáceres",
      "Codigo": "CC",
      "Codigo_CCAA": "EXT",
      "IdProvincia": 10
    }
  ],
  "MensajeRespuesta": null
}
```

##### Petición `ESTACIONES`

Devuelve un listado JSON con el detalle de estaciones meteorológicas.

| Campo               | Tipo      | Descripción                                        |
| ------------------- | --------- | -------------------------------------------------- | ------------------------------------- |
| `Estacion`          | `String`  | Nombre de la estación meteorológica.               |
| `Codigo`            | `String`  | Código de estación (único dentro de la provincia). |
| `Termino`           | `String`  | Término municipal donde se ubica la estación.      |
| `Longitud`          | `String`  | Coordenada de longitud en formato `DMS`.           |
| `Latitud`           | `String`  | Coordenada de latitud en formato `DMS`.            |
| `Altitud`           | `Integer` | Altura sobre el nivel del mar (m).                 |
| `XUTM`              | `Integer` | Coordenada UTM eje X (Este).                       |
| `YUTM`              | `Integer` | Coordenada UTM eje Y (Norte).                      |
| `Huso`              | `Integer` | Huso geográfico UTM.                               |
| `Fecha_Instalacion` | `String`  | Fecha de instalación (`ISO 8601`).                 |
| `Fecha_Baja`        | `String   | null`                                              | Fecha de baja; `null` si está activa. |
| `Red_Estacion`      | `String`  | Literal de titularidad de red (ministerio o C.A.). |
| `IdProvincia`       | `Integer` | Identificador numérico de provincia.               |
| `IdEstacion`        | `Integer` | Identificador interno único de estación.           |

Ejemplo de petición:

- `{URL_Base}/API/V1/Info/ESTACIONES?token=1Ab`

Ejemplo de respuesta:

```json
{
  "datos": [
    {
      "Estacion": "Tarazona",
      "Codigo": "AB01",
      "Termino": "Tarazona de la Mancha",
      "Longitud": "015512000W",
      "Latitud": "391520000N",
      "Altitud": 722,
      "XUTM": 593160,
      "YUTM": 4345720,
      "Huso": 30,
      "Fecha_Instalacion": "1999-10-12T22:00:00",
      "Fecha_Baja": null,
      "Red_Estacion": "Red de estaciones del Ministerio",
      "IdProvincia": 2,
      "IdEstacion": 1
    }
  ],
  "MensajeRespuesta": null
}
```

##### Petición `ACCESOS`

Devuelve un objeto JSON con límites y uso actual del token.

| Campo                       | Tipo      | Descripción                                         |
| --------------------------- | --------- | --------------------------------------------------- |
| `NumAccesosMinutoActual`    | `Integer` | Número de peticiones del último minuto.             |
| `MaxAccesosMinuto`          | `Integer` | Máximo de peticiones permitidas por minuto.         |
| `NumAccesosDiaActual`       | `Integer` | Número de peticiones en el día actual.              |
| `MaxAccesosDia`             | `Integer` | Máximo de peticiones permitidas por día.            |
| `RegistrosAcumuladosMinuto` | `Integer` | Total de registros descargados en el último minuto. |
| `MaxRegistrosMinuto`        | `Integer` | Máximo de registros descargables por minuto.        |
| `RegistrosAcumuladosDia`    | `Integer` | Total de registros descargados en el día actual.    |
| `MaxRegistrosDia`           | `Integer` | Máximo de registros descargables por día.           |

Ejemplo de petición:

- `https://preservicio.mapa.gob.es/siarapi/API/V1/Info/ACCESOS?token=1Ab`

Ejemplo de respuesta:

```json
{
  "datos": [
    {
      "NumAccesosMinutoActual": 1,
      "MaxAccesosMinuto": 30,
      "NumAccesosDiaActual": 24,
      "MaxAccesosDia": 1000,
      "RegistrosAcumuladosMinuto": 0,
      "MaxRegistrosMinuto": 1000000,
      "RegistrosAcumuladosDia": 13142,
      "MaxRegistrosDia": null
    }
  ],
  "MensajeRespuesta": null
}
```

##### Petición `CODIGOSVALIDACION`

Devuelve un listado JSON con la descripción de códigos de validación.

| Campo                | Tipo     | Descripción                                                  |
| -------------------- | -------- | ------------------------------------------------------------ |
| `Descripcion`        | `String` | Texto descriptivo del estado o nivel de validación del dato. |
| `IdCodigoValidacion` | `String` | Código numérico del tipo de validación.                      |

Ejemplo de petición:

- `{URL_Base}/API/V1/Info/CODIGOSVALIDACION?token=1Ab`

Ejemplo de respuesta:

```json
{
  "datos": [
    {
      "Descripcion": "Dato incorporado sin ningún error (Nivel 1)",
      "IdCodigoValidacion": "100"
    }
  ],
  "MensajeRespuesta": null
}
```

### Servicio Datos

Este servicio permite consultar datos agroclimáticos según el ámbito y el tipo de dato solicitado.

- Método HTTP: `GET`
- Endpoint: `{URL_Base}/API/V1/Datos/{tipoDatos}/{ambito}?<parametros_de_consulta>`

#### Parámetros de ruta

| Nombre      | Obligatorio | Descripción                                              |
| ----------- | ----------- | -------------------------------------------------------- |
| `tipoDatos` | Sí          | Admite: `Horarios`, `Diarios`, `Semanales`, `Mensuales`. |
| `ambito`    | Sí          | Admite: `CCAA`, `PROVINCIA`, `ESTACION`.                 |

#### Parámetros de consulta

| Nombre                 | Obligatorio | Tipo                 | Descripción                                                                                                           |
| ---------------------- | ----------- | -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `token`                | Sí          | `String`             | Token de autenticación válido.                                                                                        |
| `Id`                   | Sí          | `String` (repetible) | Identificador de ámbito según `ambito`: código de CCAA, provincia o estación. Puede repetirse (`&Id={id1}&Id={id2}`). |
| `FechaInicial`         | Sí          | `String`             | Fecha inicial del período en formato `YYYY-MM-DD`.                                                                    |
| `FechaFinal`           | Sí          | `String`             | Fecha final del período en formato `YYYY-MM-DD`.                                                                      |
| `FechaUltModificacion` | No          | `String`             | Fecha de última modificación en formato `YYYY-MM-DD`.                                                                 |
| `DatosCalculados`      | No          | `Boolean`            | `true` o `false`. Aplica para `Diarios`, `Semanales` y `Mensuales`. Por defecto: `false`.                             |

Ejemplos de petición:

- Datos horarios para la CCAA de Andalucía:
  - `{URL_Base}/API/V1/Datos/Horarios/CCAA?token=1Ab&Id=AND&FechaInicial=2025-01-12&FechaFinal=2025-05-13&DatosCalculados=true`
- Datos diarios para estaciones `HU01` y `HU02`:
  - `{URL_Base}/API/V1/Datos/Diarios/ESTACION?token=1Ab&Id=HU01&Id=HU02&FechaInicial=2025-01-01&FechaFinal=2025-05-01&DatosCalculados=true`

#### Valores de salida (Datos)

Los valores de salida dependen de `tipoDatos`.

##### `tipoDatos = Horarios`

| Campo           | Tipo      | Descripción                                          |
| --------------- | --------- | ---------------------------------------------------- |
| `Fecha`         | `String`  | Fecha del dato registrado.                           |
| `Estacion`      | `String`  | Código `Nemo` de la estación.                        |
| `HorMin`        | `Integer` | Hora y minuto del dato (`HHMM`, por ejemplo `1430`). |
| `TempMedia`     | `Float`   | Temperatura media del aire (`°C`).                   |
| `HumedadMedia`  | `Float`   | Humedad relativa media (`%`).                        |
| `VelViento`     | `Float`   | Velocidad media del viento (`km/h` o `m/s`).         |
| `DirViento`     | `Float`   | Dirección media del viento (grados).                 |
| `Radiacion`     | `Float`   | Radiación solar (`W/m²`).                            |
| `Precipitacion` | `Float`   | Precipitación acumulada (`mm`).                      |
| `TempSuelo1`    | `Float`   | Temperatura del suelo a nivel 1 (`°C`).              |
| `TempSuelo2`    | `Float`   | Temperatura del suelo a nivel 2 (`°C`).              |
| `IdProvincia`   | `Integer` | Identificador numérico de provincia.                 |
| `IdEstacion`    | `Integer` | Identificador interno único de estación.             |

##### `tipoDatos = Diarios`

| Campo             | Tipo      | Descripción                                          |
| ----------------- | --------- | ---------------------------------------------------- |
| `Fecha`           | `String`  | Fecha del dato registrado.                           |
| `Estacion`        | `String`  | Código `Nemo` de la estación.                        |
| `TempMedia`       | `Float`   | Temperatura media diaria (`°C`).                     |
| `TempMax`         | `Float`   | Temperatura máxima diaria (`°C`).                    |
| `HorMinTempMax`   | `Integer` | Hora y minuto de temperatura máxima (`HHMM`).        |
| `TempMin`         | `Float`   | Temperatura mínima diaria (`°C`).                    |
| `HorMinTempMin`   | `Integer` | Hora y minuto de temperatura mínima (`HHMM`).        |
| `HumedadMedia`    | `Float`   | Humedad relativa media diaria (`%`).                 |
| `HumedadMax`      | `Float`   | Humedad relativa máxima diaria (`%`).                |
| `HorMinHumMax`    | `Integer` | Hora y minuto de humedad máxima.                     |
| `HumedadMin`      | `Float`   | Humedad relativa mínima diaria (`%`).                |
| `HorMinHumMin`    | `Integer` | Hora y minuto de humedad mínima.                     |
| `VelViento`       | `Float`   | Velocidad media diaria del viento.                   |
| `DirViento`       | `Float`   | Dirección media del viento (grados).                 |
| `VelVientoMax`    | `Float`   | Velocidad máxima del viento.                         |
| `HorMinVelMax`    | `Integer` | Hora y minuto de velocidad máxima del viento.        |
| `DirVientoVelMax` | `Float`   | Dirección del viento en velocidad máxima.            |
| `Radiacion`       | `Float`   | Radiación solar diaria acumulada (`MJ/m²` o `W/m²`). |
| `Precipitacion`   | `Float`   | Precipitación diaria total (`mm`).                   |
| `TempSuelo1`      | `Float`   | Temperatura del suelo a nivel 1.                     |
| `TempSuelo2`      | `Float`   | Temperatura del suelo a nivel 2.                     |
| `IdProvincia`     | `Integer` | Identificador numérico de provincia.                 |
| `IdEstacion`      | `Integer` | Identificador interno único de estación.             |

Si `DatosCalculados = true`, se añaden:

| Campo    | Tipo    | Descripción                                 |
| -------- | ------- | ------------------------------------------- |
| `EtPMon` | `Float` | Evapotranspiración por Penman-Monteith.     |
| `PePMon` | `Float` | Precipitación efectiva por Penman-Monteith. |

##### `tipoDatos = Diarios2`

| Campo         | Tipo      | Descripción                                    |
| ------------- | --------- | ---------------------------------------------- |
| `IdProvincia` | `Integer` | Identificador numérico de provincia.           |
| `IdEstacion`  | `String`  | Código identificador de estación.              |
| `Año`         | `Integer` | Año del registro.                              |
| `Dia`         | `Integer` | Día del año (`1-365/366`).                     |
| `Calmas`      | `Integer` | Observaciones horarias sin viento.             |
| `NoCalmas`    | `Integer` | Observaciones horarias con viento (`> 0`).     |
| `Temp_40a_30` | `Integer` | Horas con temperatura entre `40 °C` y `30 °C`. |
| `Temp_30a_20` | `Integer` | Horas con temperatura entre `30 °C` y `20 °C`. |
| `Temp_20a_10` | `Integer` | Horas con temperatura entre `20 °C` y `10 °C`. |
| `Temp_10a_0`  | `Integer` | Horas con temperatura entre `10 °C` y `0 °C`.  |
| `Temp_0a_10`  | `Integer` | Horas con temperatura entre `0 °C` y `10 °C`.  |
| `Temp_10a_20` | `Integer` | Horas con temperatura entre `10 °C` y `20 °C`. |
| `Temp_20a_30` | `Integer` | Horas con temperatura entre `20 °C` y `30 °C`. |
| `Temp_30a_40` | `Integer` | Horas con temperatura entre `30 °C` y `40 °C`. |
| `Temp_40a_50` | `Integer` | Horas con temperatura entre `40 °C` y `50 °C`. |
| `Temp_50a_60` | `Integer` | Horas con temperatura entre `50 °C` y `60 °C`. |

##### `tipoDatos = Semanales`

| Campo              | Tipo      | Descripción                                  |
| ------------------ | --------- | -------------------------------------------- |
| `Año`              | `Integer` | Año natural del dato.                        |
| `Semana`           | `Integer` | Número de semana (`1-52/53`).                |
| `Estacion`         | `String`  | Código `Nemo` de la estación.                |
| `TempMedia`        | `Float`   | Temperatura media semanal (`°C`).            |
| `TempMax`          | `Float`   | Temperatura máxima semanal (`°C`).           |
| `DiaHorMinTempMax` | `String`  | Día y hora de temperatura máxima (`DDHHMM`). |
| `TempMin`          | `Float`   | Temperatura mínima semanal (`°C`).           |
| `DiaHorMinTempMin` | `String`  | Día y hora de temperatura mínima (`DDHHMM`). |
| `HumedadMedia`     | `Float`   | Humedad relativa media (`%`).                |
| `HumedadMax`       | `Float`   | Humedad relativa máxima (`%`).               |
| `DiaHorMinHumMax`  | `String`  | Día y hora de humedad máxima.                |
| `HumedadMin`       | `Float`   | Humedad relativa mínima (`%`).               |
| `DiaHorMinHumMin`  | `String`  | Día y hora de humedad mínima.                |
| `VelViento`        | `Float`   | Velocidad media semanal del viento.          |
| `DirViento`        | `Float`   | Dirección media del viento (grados).         |
| `VelVientoMax`     | `Float`   | Velocidad máxima del viento.                 |
| `DiaHorMinVelMax`  | `String`  | Día y hora de velocidad máxima del viento.   |
| `DirVientoVelMax`  | `Float`   | Dirección del viento en velocidad máxima.    |
| `Radiacion`        | `Float`   | Radiación solar semanal acumulada.           |
| `Precipitacion`    | `Float`   | Precipitación semanal acumulada (`mm`).      |

Si `DatosCalculados = true`, se añaden:

| Campo    | Tipo    | Descripción                                 |
| -------- | ------- | ------------------------------------------- |
| `EtPMon` | `Float` | Evapotranspiración por Penman-Monteith.     |
| `PePMon` | `Float` | Precipitación efectiva por Penman-Monteith. |

##### `tipoDatos = Mensuales`

| Campo              | Tipo      | Descripción                                           |
| ------------------ | --------- | ----------------------------------------------------- |
| `Año`              | `Integer` | Año natural del dato.                                 |
| `Mes`              | `Integer` | Número de mes (`1-12`).                               |
| `Estacion`         | `String`  | Código `Nemo` de la estación.                         |
| `TempMedia`        | `Float`   | Temperatura media mensual (`°C`).                     |
| `TempMax`          | `Float`   | Temperatura máxima mensual (`°C`).                    |
| `DiaHorMinTempMax` | `String`  | Día y hora de temperatura máxima.                     |
| `TempMin`          | `Float`   | Temperatura mínima mensual (`°C`).                    |
| `DiaHorMinTempMin` | `String`  | Día y hora de temperatura mínima.                     |
| `HumedadMedia`     | `Float`   | Humedad relativa media mensual (`%`).                 |
| `HumedadMax`       | `Float`   | Humedad relativa máxima mensual (`%`).                |
| `DiaHorMinHumMax`  | `String`  | Día y hora de humedad máxima.                         |
| `HumedadMin`       | `Float`   | Humedad relativa mínima mensual (`%`).                |
| `DiaHorMinHumMin`  | `String`  | Día y hora de humedad mínima.                         |
| `VelViento`        | `Float`   | Velocidad media mensual del viento.                   |
| `DirViento`        | `Float`   | Dirección media mensual del viento (grados).          |
| `VelVientoMax`     | `Float`   | Velocidad máxima mensual del viento.                  |
| `DiaHorMinVelMax`  | `String`  | Día y hora de velocidad máxima del viento.            |
| `DirVientoVelMax`  | `Float`   | Dirección del viento en velocidad máxima.             |
| `Radiacion`        | `Float`   | Radiación solar mensual acumulada (`MJ/m²` o `W/m²`). |
| `Precipitacion`    | `Float`   | Precipitación total mensual (`mm`).                   |

Si `DatosCalculados = true`, se añaden:

| Campo    | Tipo    | Descripción                                 |
| -------- | ------- | ------------------------------------------- |
| `EtPMon` | `Float` | Evapotranspiración por Penman-Monteith.     |
| `PePMon` | `Float` | Precipitación efectiva por Penman-Monteith. |
