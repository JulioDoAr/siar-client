/**
 * Tipos de información disponibles en la API SIAR
 */
export enum TipoInformacion {
  CCAA = "CCAA",
  Provincias = "Provincias",
  Estaciones = "Estaciones",
  Accesos = "Accesos",
}

/**
 * Autonomous Community information
 */
export interface AutonomousCommunity {
  /** Identifier of the autonomous community */
  id: string;
  /** Description of the autonomous community */
  description: string;
}

/**
 * Province information
 */
export interface Province {
  /** Name of the province */
  name: string;
  /** Code of the province */
  code: string;
  /** Code of the autonomous community to which the province belongs */
  ccaaCode: string;
}

/**
 * Station information
 */
export interface Station {
  /** Code of the station */
  code: string;
  /** Description of the station */
  description: string;
  /** Altitude in meters */
  altitude: number;
  /** Installation date */
  installationDate: string;
  /** Deactivation date */
  deactivationDate: string | null;
  /** Time zone (UTC offset) */
  timezone: number;
  /** Latitude coordinate */
  latitude: string;
  /** Longitude coordinate */
  longitude: string;
  /** Municipality name */
  municipality: string;
  /** UTM X coordinate */
  utmX: number;
  /** UTM Y coordinate */
  utmY: number;
}

/**
 * Access information and limitations
 */
export interface AccessInformation {
  /** Number of accesses in the current minute */
  accessesCurrentMinute: number;
  /** Maximum accesses allowed per minute */
  maxAccessesPerMinute: number;
  /** Number of accesses in the current day */
  accessesCurrentDay: number;
  /** Maximum accesses allowed per day */
  maxAccessesPerDay: number;
  /** Number of records accumulated in the current minute */
  recordsCurrentMinute: number;
  /** Maximum records allowed per minute */
  maxRecordsPerMinute: number;
  /** Number of records accumulated in the current day */
  recordsCurrentDay: number;
  /** Maximum records allowed per day */
  maxRecordsPerDay: number;
}
