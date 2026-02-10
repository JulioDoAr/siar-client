/**
 * Tipos de datos disponibles en la API SIAR
 */
export enum DataType {
  Hourly = "Horarios",
  Daily = "Diarios",
  Weekly = "Semanales",
  Monthly = "Mensuales",
}

/**
 * Ámbitos de petición disponibles
 */
export enum Scope {
  AutonomousCommunity = "CCAA",
  Province = "PROVINCIA",
  Station = "ESTACION",
}

/**
 * Hourly data - Recorded every half hour (48 data points per day)
 */
export interface HourlyData {
  /** Hour and minutes (0-30) */
  timeMinutes: number;
  /** Average temperature in °C */
  avgTemperature: number;
  /** Average humidity in % */
  avgHumidity: number;
  /** Wind speed in m/s */
  windSpeed: number;
  /** Wind direction in degrees */
  windDirection: number;
  /** Solar radiation in MJ/m² */
  radiation: number;
  /** Precipitation in mm */
  precipitation: number;
  /** Soil temperature 1 in °C (can be null) */
  soilTemperature1: number | null;
  /** Soil temperature 2 in °C (can be null) */
  soilTemperature2: number | null;
  /** Station code */
  station: string;
  /** Data date (ISO 8601 format) */
  date: string;
  /** Province ID */
  provinceId: number;
  /** Station ID */
  stationId: number;
}

/**
 * Daily data
 */
export interface DailyData {
  /** Average temperature in °C */
  avgTemperature: number;
  /** Maximum temperature in °C */
  maxTemperature: number;
  /** Hour and minute of maximum temperature (HHMM format) */
  timeMaxTemperature: number;
  /** Minimum temperature in °C */
  minTemperature: number;
  /** Hour and minute of minimum temperature (HHMM format) */
  timeMinTemperature: number;
  /** Average humidity in % */
  avgHumidity: number;
  /** Maximum humidity in % */
  maxHumidity: number;
  /** Hour and minute of maximum humidity (HHMM format) */
  timeMaxHumidity: number;
  /** Minimum humidity in % */
  minHumidity: number;
  /** Hour and minute of minimum humidity (HHMM format) */
  timeMinHumidity: number;
  /** Average wind speed in m/s */
  avgWindSpeed: number;
  /** Average wind direction in degrees */
  avgWindDirection: number;
  /** Maximum wind speed in m/s */
  maxWindSpeed: number;
  /** Hour and minute of maximum wind speed (HHMM format) */
  timeMaxWindSpeed: number;
  /** Wind direction at maximum wind speed in degrees */
  windDirectionAtMaxSpeed: number;
  /** Solar radiation in MJ/m² */
  radiation: number;
  /** Precipitation in mm */
  precipitation: number;
  /** Soil temperature 1 in °C (can be null) */
  soilTemperature1: number | null;
  /** Soil temperature 2 in °C (can be null) */
  soilTemperature2: number | null;
  /** Reference evapotranspiration Penman-Monteith method in mm */
  etPenmanMonteith: number;
  /** Effective precipitation Penman-Monteith method in mm */
  pePenmanMonteith: number;
  /** Station code */
  station: string;
  /** Data date (ISO 8601 format) */
  date: string;
  /** Province ID */
  provinceId: number;
  /** Station ID */
  stationId: number;
}

/**
 * Weekly data
 */
export interface WeeklyData {
  /** Year */
  year: number;
  /** Week number */
  week: number;
  /** Average temperature in °C */
  avgTemperature: number;
  /** Maximum temperature in °C */
  maxTemperature: number;
  /** Day, hour and minute of maximum temperature (ISO 8601 format) */
  timeMaxTemperature: string;
  /** Minimum temperature in °C */
  minTemperature: number;
  /** Day, hour and minute of minimum temperature (ISO 8601 format) */
  timeMinTemperature: string;
  /** Average humidity in % */
  avgHumidity: number;
  /** Maximum humidity in % */
  maxHumidity: number;
  /** Day, hour and minute of maximum humidity (ISO 8601 format) */
  timeMaxHumidity: string;
  /** Minimum humidity in % */
  minHumidity: number;
  /** Day, hour and minute of minimum humidity (ISO 8601 format) */
  timeMinHumidity: string;
  /** Average wind speed in m/s */
  avgWindSpeed: number;
  /** Average wind direction in degrees */
  avgWindDirection: number;
  /** Maximum wind speed in m/s */
  maxWindSpeed: number;
  /** Day, hour and minute of maximum wind speed (ISO 8601 format) */
  timeMaxWindSpeed: string;
  /** Wind direction at maximum wind speed in degrees */
  windDirectionAtMaxSpeed: number;
  /** Solar radiation in MJ/m² */
  radiation: number;
  /** Precipitation in mm */
  precipitation: number;
  /** Reference evapotranspiration Penman-Monteith method in mm */
  etPenmanMonteith: number;
  /** Effective precipitation Penman-Monteith method in mm */
  pePenmanMonteith: number;
  /** Station code */
  station: string;
}

/**
 * Monthly data
 */
export interface MonthlyData {
  /** Year */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Number of days in the month */
  numDays: number;
  /** Average temperature in °C */
  avgTemperature: number;
  /** Maximum temperature in °C */
  maxTemperature: number;
  /** Day, hour and minute of maximum temperature (ISO 8601 format) */
  timeMaxTemperature: string;
  /** Minimum temperature in °C */
  minTemperature: number;
  /** Day, hour and minute of minimum temperature (ISO 8601 format) */
  timeMinTemperature: string;
  /** Average humidity in % */
  avgHumidity: number;
  /** Maximum humidity in % */
  maxHumidity: number;
  /** Day, hour and minute of maximum humidity (ISO 8601 format) */
  timeMaxHumidity: string;
  /** Minimum humidity in % */
  minHumidity: number;
  /** Day, hour and minute of minimum humidity (ISO 8601 format) */
  timeMinHumidity: string;
  /** Average wind speed in m/s */
  avgWindSpeed: number;
  /** Average wind direction in degrees */
  avgWindDirection: number;
  /** Maximum wind speed in m/s */
  maxWindSpeed: number;
  /** Day, hour and minute of maximum wind speed (ISO 8601 format) */
  timeMaxWindSpeed: string;
  /** Wind direction at maximum wind speed in degrees */
  windDirectionAtMaxSpeed: number;
  /** Solar radiation in MJ/m² */
  radiation: number;
  /** Precipitation in mm */
  precipitation: number;
  /** Reference evapotranspiration Penman-Monteith method in mm */
  etPenmanMonteith: number;
  /** Effective precipitation Penman-Monteith method in mm */
  pePenmanMonteith: number;
  /** Station code */
  station: string;
}
