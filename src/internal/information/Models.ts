/**
 * Información de una Comunidad Autónoma
 */
export interface CCAA {
  /** Identificador de la CCAA */
  CCAA: string;
  /** Descripción de la CCAA */
  Codigo: string;
}

/**
 * Información de una Provincia
 */
export interface Provincia {
  /** Nombre de la Provincia */
  Provincia: string;
  /** Código que identifica a la provincia para su uso en los servicios de la Web API. */
  Codigo: string;
  /** Código de tres letras que identifica a la C.A. */
  Codigo_CCAA: string;
  /** ID numérico */
  IdProvincia: number;
}

/**
 * Información de una Estación
 */
export interface Estacion {
  /** Nombre de la estación meteorológica */
  Estacion: string;
  /** Código identificador de la estación (único dentro de la provincia) */
  Codigo: string;
  /** Nombre del término municipal donde está ubicada la estación */
  Termino: string;
  /** Coordenada de longitud en formato DMS (grados, minutos, segundos) */
  Longitud: string;
  /** Coordenada de latitud en formato DMS (grados, minutos, segundos) */
  Latitud: string;
  /** Altura de la estación sobre el nivel del mar (en metros) */
  Altitud: number;
  /** Coordenada UTM en el eje X (Este) */
  XUTM: number;
  /** Coordenada UTM en el eje Y (Norte) */
  YUTM: number;
  /** Huso geográfico UTM correspondiente */
  Huso: number;
  /** Fecha de instalación de la estación (formato ISO 8601) */
  Fecha_Instalacion: string;
  /** Fecha de baja de la estación (null si está activa) */
  Fecha_Baja: string | null;
  /** Indica si la estación es del ministerio o de C.A. */
  Red_estacion: string;
  /** ID numérico que identifica a la provincia */
  IdProvincia: number;
  /** Identificador interno único de la estación */
  IdEstacion: number;
}

/**
 * Información sobre accesos y limitaciones
 */
export interface InformacionAccesos {
  /** Número de peticiones realizadas por el usuario en el último minuto */
  NumAccesosMinutoActual: number;
  /** Número máximo de peticiones permitidas por minuto con el token actual */
  MaxAccesosMinuto: number;
  /** Número total de peticiones realizadas en el día actual */
  NumAccesosDiaActual: number;
  /** Número máximo de peticiones permitidas por día */
  MaxAccesosDia: number;
  /** Número total de registros descargados en el último minuto */
  RegistrosAcumuladosMinuto: number;
  /** Límite máximo de registros que pueden descargarse por minuto */
  MaxRegistrosMinuto: number;
  /** Total de registros descargados en el día actual */
  RegistrosAcumuladosDia: number;
  /** Límite máximo de registros que se pueden descargar en un solo día */
  MaxRegistrosDia: number;
}

/**
 * Información de un código de validación
 */
export interface CodigoValidacion {
  /** Descripción del código de validación */
  Descripcion: string;
  /** ID del código de validación */
  IdCodigoValidacion: string;
}
