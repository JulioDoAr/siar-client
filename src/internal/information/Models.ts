/**
 * Información de una Comunidad Autónoma
 */
export interface CCAA {
  /** Identificador de la CCAA */
  Identificador: string;
  /** Descripción de la CCAA */
  Descripcion: string;
}

/**
 * Información de una Provincia
 */
export interface Provincia {
  /** Nombre de la Provincia */
  Provincia: string;
  /** Código de la Provincia */
  Codigo: string;
  /** Código de la Comunidad Autónoma a la que pertenece la Provincia*/
  Codigo_CCAA: string;
}

/**
 * Información de una Estación
 */
export interface Estacion {
  /** Altitud de la estación en metros */
  Altitud: number;
  /** Código de la estación */
  Codigo: string;
  /** Nombre de la estación */
  Estacion: string;
  /** Fecha de baja de la estación */
  Fecha_Baja: string | null;
  /** Fecha de instalación de la estación */
  Fecha_Instalacion: string;
  /** Huso horario */
  Huso: number;
  /** Latitud de la estación */
  Latitud: string;
  /** Longitud de la estación */
  Longitud: string;
  /** Término municipal */
  Termino: string;
  /** Coordenada X UTM */
  XUTM: number;
  /** Coordenada Y UTM */
  YUTM: number;
}

/**
 * Información sobre accesos y limitaciones
 */
export interface InformacionAccesos {
  /** Número de accesos realizados en el minuto actual */
  NumAccesosMinutoActual: number;
  /** Número máximo de accesos permitidos por minuto */
  MaxAccesosMinuto: number;
  /** Número de accesos realizados en el día actual */
  NumAccesosDiaActual: number;
  /** Número máximo de accesos permitidos por día */
  MaxAccesosDia: number;
  /** Número de registros acumulados en el minuto actual */
  RegistrosAcumuladosMinuto: number;
  /** Número máximo de registros permitidos por minuto */
  MaxRegistrosMinuto: number;
  /** Número de registros acumulados en el día actual */
  RegistrosAcumuladosDia: number;
  /** Número máximo de registros permitidos por día */
  MaxRegistrosDia: number;
}
