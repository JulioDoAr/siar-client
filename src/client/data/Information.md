# Servicio Datos

## Descripción general

Este servicio permite consultar datos agroclimáticos en función del ámbito de consulta y el tipo de dato solicitado.

- **Método HTTP:** GET
- **Endpoint:** `{BaseURL}/API/V1/Datos/{tipoDatos}/{ambito}?<parámetros_de_consulta>`

## Parámetros de ruta

| Nombre | Obligatorio | Descripción |
|--------|-------------|-------------|
| tipoDatos | Sí | Define el tipo de datos solicitado. Admite uno de los siguientes valores:<br>• `Horarios`<br>• `Diarios`<br>• `Diarios2`<br>• `Semanales`<br>• `Mensuales` |
| ambito | Sí | Determina el ámbito de consulta de los datos. Admite uno de los siguientes valores:<br>• `CCAA`<br>• `PROVINCIA`<br>• `ESTACION` |

## Parámetros de consulta

| Nombre | Obligatorio | Tipo | Descripción |
|--------|-------------|------|-------------|
| token | Sí | String | Token de autenticación válido. |
| Id | Sí | String | Identificador de la CCAA, provincia o estación, según el valor de `tipoDatos`.<br><br>El parámetro `Id` debe corresponder con el tipo de dato solicitado. Por ejemplo:<br>• Si `tipoDatos=ESTACION`, el valor será el código de estación (HU01, AB02, etc.).<br>• Si `tipoDatos=PROVINCIA`, será el código de la provincia (AB, VA, etc.).<br>• Si `tipoDatos=CCAA`, será el código de comunidad autónoma (AND, CAT, etc.).<br><br>Puede accederse a estos códigos mediante el servicio INFO, consultando el atributo 'Codigo' de la respuesta.<br><br>Si se quiere solicitar varios Id, deben separarse en la petición de la forma:<br>`...&Id={id1}&Id={id2}...` |
| FechaInicial | Sí | String | Fecha de inicio del periodo de consulta (formato YYYY-MM-DD). |
| FechaFinal | Sí | String | Fecha de fin del periodo de consulta (formato YYYY-MM-DD). |
| FechaUltModificacion | No | String | Fecha de última modificación del periodo de consulta (formato YYYY-MM-DD). |
| DatosCalculados | No | Boolean | Indica si se deben mostrar en los resultados las variables calculadas.<br>• Este parámetro solo aplica cuando el valor de `tipoDatos` es Diarios, Semanales o Mensuales.<br>• Si no se indica nada, el valor por defecto es `false`. |

## Ejemplos de peticiones

### Datos horarios para Comunidad Autónoma

Datos horarios para la Comunidad Autónoma de Andalucía entre el 12/05/2025 y el 13/05/2025, solicitando datos calculados:

```
https://servicio.mapa.gob.es/siarapi/API/V1/Datos/Horarios/CCAA?token=1Ab&Id=AND&FechaInicial=2025-01-12&FechaFinal=2025-05-13&DatosCalculados=true
```

### Datos diarios para múltiples estaciones

Datos diarios para las Estaciones "HU01" y "HU02" entre 01/01/2025 y el 01/05/2025, solicitando datos calculados:

```
https://servicio.mapa.gob.es/siarapi/API/V1/Datos/Diarios/ESTACION?token=1Ab&Id=HU01&Id=HU02&FechaInicial=2025-01-01&FechaFinal=2025-05-01&DatosCalculados=true
```

## Valores de salida

Los valores de salida dependen del valor del parámetro de ruta `tipoDatos`.

---

### Si `tipoDatos = Horarios`

El servicio devuelve una lista de registros con las variables meteorológicas observadas en franjas horarias concretas. Los datos varían en función de la estación y el intervalo solicitado.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Fecha | String | Fecha del dato registrado |
| Estacion | String | Código Nemo de la estación |
| HorMin | Integer | Hora y minuto del dato (formato HHMM, por ejemplo, 1430). |
| TempMedia | Float | Temperatura media del aire (°C). |
| HumedadMedia | Float | Humedad relativa media (%). |
| VelViento | Float | Velocidad media del viento (km/h o m/s según configuración). |
| DirViento | Float | Dirección media del viento (grados). |
| Radiacion | Float | Radiación solar (W/m²). |
| Precipitacion | Float | Precipitación acumulada (mm). |
| TempSuelo1 | Float | Temperatura del suelo a nivel 1 (°C). |
| TempSuelo2 | Float | Temperatura del suelo a nivel 2 (°C). |
| IdProvincia | Integer | ID numérico que identifica a la provincia para su uso en los servicios de la Web API. |
| IdEstacion | Integer | Identificador interno único de la estación. |

---

### Si `tipoDatos = Diarios`

El servicio devuelve un conjunto de registros con estadísticas meteorológicas diarias por estación.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Fecha | String | Fecha del dato registrado |
| Estacion | String | Código Nemo de la estación |
| TempMedia | Float | Temperatura media del aire (°C). |
| TempMax | Float | Temperatura máxima diaria (°C) |
| HorMinTempMax | Integer | Hora y minuto de la temperatura máxima (formato HHMM) |
| TempMin | Float | Temperatura mínima diaria (°C) |
| HorMinTempMin | Integer | Hora y minuto de la temperatura mínima (formato HHMM) |
| HumedadMedia | Float | Humedad relativa media diaria (%) |
| HumedadMax | Float | Humedad máxima diaria (%) |
| HorMinHumMax | Integer | Hora y minuto de la humedad máxima |
| humedadMin | Float | Humedad mínima diaria (%) |
| HorMinHumMin | Integer | Hora y minuto de la humedad mínima |
| VelViento | Float | Velocidad media diaria del viento |
| DirViento | Float | Dirección media del viento (grados) |
| VelVientoMax | Float | Velocidad máxima del viento (km/h o m/s) |
| HorMinVelMax | Integer | Hora y minuto de la velocidad máxima del viento |
| DirVientoVelMax | Float | Dirección del viento en el momento de máxima velocidad |
| Radiacion | Float | Radiación solar diaria acumulada (MJ/m² o W/m² según configuración) |
| Precipitacion | Float | Precipitación diaria total (mm) |
| TempSuelo1 | Float | Temperatura del suelo a nivel 1 |
| TempSuelo2 | Float | Temperatura del suelo a nivel 2 |
| IdProvincia | Integer | ID numérico que identifica a la provincia para su uso en los servicios de la Web API. |
| IdEstacion | Integer | Identificador interno único de la estación. |

#### Variables calculadas (`DatosCalculados = true`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| EtPMon | Float | Evapotranspiración por Penman-Monteith |
| PePMon | Float | Precipitación efectiva por Penman-Monteith |

---

### Si `tipoDatos = Diarios2`

El servicio permitirá buscar los datos diarios de las integrales térmicas y calmas de las estaciones.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| IdProvincia | Integer | Identificador numérico de la provincia. |
| IdEstacion | String | Código identificador de la estación. |
| Año | Integer | Año del registro. |
| Dia | Integer | Día del año (1–365/366). |
| Calmas | Integer | Número de observaciones horarias sin viento (calmas). |
| NoCalmas | Integer | Número de observaciones horarias con viento (>0 m/s o km/h). |
| Temp_40a_30 | Integer | Número de horas con temperatura entre 40 °C y 30 °C. |
| Temp_30a_20 | Integer | Número de horas con temperatura entre 30 °C y 20 °C. |
| Temp_20a_10 | Integer | Número de horas con temperatura entre 20 °C y 10 °C. |
| Temp_10a_0 | Integer | Número de horas con temperatura entre 10 °C y 0 °C. |
| Temp_0a_10 | Integer | Número de horas con temperatura entre 0 °C y 10 °C. |
| Temp_10a_20 | Integer | Número de horas con temperatura entre 10 °C y 20 °C. |
| Temp_20a_30 | Integer | Número de horas con temperatura entre 20 °C y 30 °C. |
| Temp_30a_40 | Integer | Número de horas con temperatura entre 30 °C y 40 °C. |
| Temp_40a_50 | Integer | Número de horas con temperatura entre 40 °C y 50 °C. |
| Temp_50a_60 | Integer | Número de horas con temperatura entre 50 °C y 60 °C. |

## Decision de contrato Diarios2 (Tarea 1)

Decision funcional confirmada para la libreria:

- Nombre de tipo publico: `Daily2Data`.
- Nombre de metodo publico: `fetchDaily2Data`.
- Valor de ruta para `tipoDatos`: `Diarios2`.
- Ambitos admitidos: `CCAA`, `PROVINCIA`, `ESTACION`.
- Parametros de consulta: mismos que en `Datos` (`token`, `Id`, `FechaInicial`, `FechaFinal`, `FechaUltModificacion`, `DatosCalculados`).

Supuesto explicito por ambiguedad del manual:

- Aunque en la tabla de "Parametros de ruta" no aparece `Diarios2`, se adopta como contrato valido porque SI aparece definido en "Valores de salida".
- Se mantiene `DatosCalculados` como parametro opcional de paso (sin asumir efecto funcional especifico para `Diarios2`).

Casos minimos esperados para payload `Diarios2`:

1. Respuesta con `datos` no vacio y todos los campos documentados (`IdProvincia`, `IdEstacion`, `Año`, `Dia`, `Calmas`, `NoCalmas`, `Temp_40a_30` ... `Temp_50a_60`) con tipos correctos.
2. Respuesta con `datos` vacio y `MensajeRespuesta` nulo o informativo, sin error de parseo.
3. Construccion de URL final con `tipoDatos=Diarios2` y serializacion repetible de `Id` (`...&Id={id1}&Id={id2}`).

---

### Si `tipoDatos = Semanales`

El servicio proporciona información climática a nivel de semana, incluyendo medias, extremos y fechas asociadas, además de variables calculadas si se solicitan.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Año | Integer | Año natural del dato |
| Semana | Integer | Número de semana (1–52/53) |
| Estacion | String | Código nemo de la estación |
| TempMedia | Float | Temperatura media semanal (°C) |
| TempMax | Float | Temperatura máxima registrada durante la semana (°C) |
| DiaHorMinTempMax | String | Día y hora en que se registró la temperatura máxima (formato "DDHHMM") |
| TempMin | Float | Temperatura mínima semanal (°C) |
| DiaHorMinTempMin | String | Día y hora de la temperatura mínima (formato "DDHHMM") |
| HumedadMedia | Float | Humedad relativa media (%) |
| HumedadMax | Float | Humedad relativa máxima (%) |
| DiaHorMinHumMax | String | Día y hora de humedad máxima |
| HumedadMin | Float | Humedad relativa mínima (%) |
| DiaHorMinHumMin | String | Día y hora de humedad mínima |
| VelViento | Float | Velocidad media del viento semanal |
| DirViento | Float | Dirección media del viento (grados) |
| VelVientoMax | Float | Velocidad máxima del viento |
| DiaHorMinVelMax | String | Día y hora de velocidad máxima del viento |
| DirVientoVelMax | Float | Dirección del viento en la velocidad máxima |
| Radiacion | Float | Radiación solar acumulada semanal |
| Precipitacion | Float | Precipitación acumulada semanal (mm) |

#### Variables calculadas (`DatosCalculados = true`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| EtPMon | Float | Evapotranspiración por Penman-Monteith |
| PePMon | Float | Precipitación efectiva por Penman-Monteith |

---

### Si `tipoDatos = Mensuales`

El servicio proporciona información climática a nivel mensual, incluyendo medias, extremos y fechas asociadas, además de variables calculadas si se solicitan.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Año | Integer | Año natural del dato |
| Mes | Integer | Número del mes (1 a 12). |
| Estacion | String | Código nemo de la estación |
| TempMedia | Float | Temperatura media mensual (°C). |
| TempMax | Float | Temperatura máxima registrada en el mes (°C). |
| DiaHorMinTempMax | String | Día y hora de la temperatura máxima |
| TempMin | Float | Temperatura mínima registrada en el mes (°C). |
| DiaHorMinTempMin | String | Día y hora de la temperatura mínima |
| HumedadMedia | Float | Humedad relativa media mensual (%). |
| HumedadMax | Float | Humedad relativa máxima mensual (%). |
| DiaHorMinHumMax | String | Día y hora de la humedad máxima. |
| HumedadMin | Float | Humedad relativa mínima mensual (%). |
| HorMinHumMin | String | Día y hora de la humedad mínima. |
| VelViento | Float | Velocidad media del viento mensual. |
| DirViento | Float | Dirección media del viento mensual (grados). |
| VelVientoMax | Float | Velocidad máxima del viento mensual. |
| DiaHorMinVelMax | String | Día y hora de la velocidad máxima. |
| DirVientoVelMax | Float | Dirección del viento en el momento de máxima velocidad. |
| Radiacion | Float | Radiación solar mensual acumulada (MJ/m² o W/m²). |
| Precipitacion | Float | Precipitación total mensual (mm). |

#### Variables calculadas (`DatosCalculados = true`)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| EtPMon | Float | Evapotranspiración por Penman-Monteith |
| PePMon | Float | Precipitación efectiva por Penman-Monteith |
