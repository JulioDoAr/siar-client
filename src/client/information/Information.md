# Servicio Info

## Descripción general
El servicio Info permite obtener datos de referencia utilizados por otras operaciones de la Web API. Su objetivo principal es ofrecer información estructurada que facilita la configuración y parametrización de las solicitudes realizadas por el usuario, como, por ejemplo: qué comunidades autónomas, provincias, estaciones, términos municipales o códigos de validación están disponibles en el sistema.

- **Método HTTP:** GET  
- **Endpoint:** `{BaseURL}/API/V1/Info/{PeticionInfo}?token={token}`

## Parámetros de entrada

| Nombre        | Obligatorio | Descripción                                                                                       |
|---------------|-------------|---------------------------------------------------------------------------------------------------|
| PeticionInfo  | Sí          | Admite uno de los siguientes valores: CCAA, PROVINCIAS, ESTACIONES, ACCESOS, CODIGOSVALIDACION. Para obtener una descripción detallada de los datos que devuelve el servicio en cada caso, consulte el apartado “Valores de salida”. |
| token         | Sí          | Token del usuario obtenido a través del servicio “Obtener Token”.                                 |

## Valores de salida
Los valores de salida dependen del valor del parámetro de entrada `PeticionInfo`.

### Si `PeticionInfo = CCAA`
Devuelve un listado en formato JSON de las comunidades autónomas. Tiene la siguiente estructura:

| Campo | Tipo   | Descripción                                                                                     |
|-------|--------|-------------------------------------------------------------------------------------------------|
| CCAA  | String | Nombre de la comunidad autónoma.                                                                |
| Código| String | Código de tres letras que identifica a la C.A. para su uso en los servicios de la Web API.    |

- **Ejemplo de petición:**  
    `https://servicio.mapa.gob.es/siarapi/API/V1/Info/CCAA?token=1Ab`
    
- **Ejemplo de respuesta:**
    ```json
    {
        "datos": [
            { "CCAA": "Andalucía", "Codigo": "AND" },
            { "CCAA": "Aragón", "Codigo": "ARA" }
        ],
        "MensajeRespuesta": null
    }
    ```

### Si `PeticionInfo = PROVINCIAS`
Devuelve un listado en formato JSON de las provincias y su relación con la comunidad autónoma. Tiene la siguiente estructura:

| Campo        | Tipo     | Descripción                                                                                     |
|--------------|----------|-------------------------------------------------------------------------------------------------|
| Provincia    | String   | Nombre de la provincia.                                                                          |
| Codigo       | String   | Código que identifica a la provincia para su uso en los servicios de la Web API.              |
| Codigo_CCCAA | String   | Código de tres letras que identifica a la C.A.                                                |
| IdProvincia  | Integer  | ID numérico                                                                                     |

- **Ejemplo de petición:**  
    `https://servicio.mapa.gob.es/siarapi/API/V1/Info/PROVINCIAS?token=1Ab`
    
- **Ejemplo de respuesta:**
    ```json
    {
        "datos": [
            { "Provincia": "Cáceres", "Codigo": "CC", "Codigo_CCAA": "EXT", "IdProvincia": 10 }
        ],
        "MensajeRespuesta": null
    }
    ```

### Si `PeticionInfo = ESTACIONES`
Devuelve un listado en formato JSON con la información detallada de las estaciones meteorológicas. Tiene la siguiente estructura:

| Campo               | Tipo     | Descripción                                                                                     |
|---------------------|----------|-------------------------------------------------------------------------------------------------|
| Estacion            | String   | Nombre de la estación metereológica.                                                           |
| Codigo              | String   | Código identificador de la estación (único dentro de la provincia), para su uso en los servicios de la Web API. |
| Termino             | String   | Nombre del término municipal donde está ubicada la estación.                                   |
| Longitud            | String   | Coordenada de longitud en formato DMS (grados, minutos, segundos).                            |
| Latitud             | String   | Coordenada de latitud en formato DMS (grados, minutos, segundos).                             |
| Altitud             | Integer  | Altura de la estación sobre el nivel del mar (en metros).                                     |
| XUTM                | Integer  | Coordenada UTM en el eje X (Este).                                                            |
| YUTM                | Integer  | Coordenada UTM en el eje Y (Norte).                                                            |
| Huso                | Integer  | Huso geográfico UTM correspondiente.                                                           |
| Fecha_Instalacion   | String   | Fecha de instalación de la estación (formato ISO 8601).                                       |
| Fecha_Baja          | String   | Fecha de baja de la estación (si procede). Puede ser null si está activa.                     |
| Red_estacion        | String   | Literal que indica si la estación es del ministerio o de C.A.                                 |
| IdProvincia         | Integer  | ID numérico que identifica a la provincia para su uso en los servicios de la Web API.        |
| IdEstacion          | Integer  | Identificador interno único de la estación.                                                    |

- **Ejemplo de petición:**  
    `https://servicio.mapa.gob.es/siarapi/API/V1/Info/ESTACIONES?token=1Ab`
    
- **Ejemplo de respuesta:**
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
                "IdEstacion": "1"
            }
        ],
        "MensajeRespuesta": null
    }
    ```

### Si `PeticionInfo = ACCESOS`
Devuelve un objeto JSON con la información sobre los límites y el uso actual del token. Tiene la siguiente estructura:

| Campo                     | Tipo     | Descripción                                                                                     |
|---------------------------|----------|-------------------------------------------------------------------------------------------------|
| NumAccesosMinutoActual    | Integer  | Número de peticiones realizadas por el usuario en el último minuto.                            |
| MaxAccesosMinuto         | Integer  | Número máximo de peticiones permitidas por minuto con el token actual.                         |
| NumAccesosDiaActual      | Integer  | Número total de peticiones realizadas en el día actual.                                        |
| MaxAccesosDia            | Integer  | Número máximo de peticiones permitidas por día.                                               |
| RegistrosAcumuladosMinuto | Integer  | Número total de registros descargados en el último minuto.                                     |
| MaxRegistrosMinuto       | Integer  | Límite máximo de registros que pueden descargarse por minuto.                                  |
| RegistrosAcumuladosDia    | Integer  | Total, de registros descargados en el día actual.                                             |
| MaxRegistrosDia          | Integer  | Límite máximo de registros que se pueden descargar en un solo día.                            |

- **Ejemplo de petición:**  
    `https://preservicio.mapa.gob.es/siarapi/API/V1/Info/ACCESOS?token=1Ab`
    
- **Ejemplo de respuesta:**
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
                "MaxRegistrosDia": 1000000
            }
        ],
        "MensajeRespuesta": null
    }
    ```

### Si `PeticionInfo = CODIGOSVALIDACION`
Devuelve un listado en formato JSON con la descripción de los códigos de validación. Tiene la siguiente estructura:

| Campo                   | Tipo   | Descripción                                                                                     |
|-------------------------|--------|-------------------------------------------------------------------------------------------------|
| Descripción             | String | Texto explicativo del estado o nivel de validación aplicado al dato.                          |
| IdCodigoValidacion      | String | Código numérico (como cadena de texto) que identifica el tipo de validación.                  |

- **Ejemplo de petición:**  
    `https://servicio.mapa.gob.es/siarapi/API/V1/Info/CODIGOSVALIDACION?token=1Ab`
    
- **Ejemplo de respuesta:**
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