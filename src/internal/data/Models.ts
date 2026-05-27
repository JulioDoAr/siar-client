/**
 * Datos horarios - Se registra cada media hora (48 datos por día)
 */
export interface DatoHorario {
  /** Hora y minutos (0-30) */
  HoraMin: number;
  /** Temperatura media en °C */
  TempMedia: number;
  /** Humedad media en % */
  HumedadMedia: number;
  /** Velocidad del viento en m/s */
  VelViento: number;
  /** Dirección del viento en grados */
  DirViento: number;
  /** Radiación solar en MJ/m² */
  Radiacion: number;
  /** Precipitación en mm */
  Precipitacion: number;
  /** Temperatura del suelo 1 en °C (puede ser null) */
  TempSuelo1: number | null;
  /** Temperatura del suelo 2 en °C (puede ser null) */
  TempSuelo2: number | null;
  /** Código de la estación */
  Estacion: string;
  /** Fecha del dato (formato ISO 8601) */
  Fecha: string;
  /** ID numérico que identifica a la provincia */
  IdProvincia: number;
  /** Identificador interno único de la estación */
  IdEstacion: number;
}

/**
 * Datos diarios
 */
export interface DatoDiario {
  /** Temperatura media en °C */
  TempMedia: number;
  /** Temperatura máxima en °C */
  TempMax: number;
  /** Hora y minuto de la temperatura máxima (formato HHMM) */
  HorMinTempMax: number;
  /** Temperatura mínima en °C */
  TempMin: number;
  /** Hora y minuto de la temperatura mínima (formato HHMM) */
  HorMinTempMin: number;
  /** Humedad media en % */
  HumedadMedia: number;
  /** Humedad máxima en % */
  HumedadMax: number;
  /** Hora y minuto de la humedad máxima (formato HHMM) */
  HorMinHumMax: number;
  /** Humedad mínima en % */
  HumedadMin: number;
  /** Hora y minuto de la humedad mínima (formato HHMM) */
  HorMinHumMin: number;
  /** Velocidad media del viento en m/s */
  VelViento: number;
  /** Dirección media del viento en grados */
  DirViento: number;
  /** Velocidad máxima del viento en m/s */
  VelVientoMax: number;
  /** Hora y minuto de la velocidad máxima del viento (formato HHMM) */
  HorMinVelMax: number;
  /** Dirección del viento a velocidad máxima en grados */
  DirVientoVelMax: number;
  /** Radiación solar en MJ/m² */
  Radiacion: number;
  /** Precipitación en mm */
  Precipitacion: number;
  /** Temperatura del suelo 1 en °C (puede ser null) */
  TempSuelo1: number | null;
  /** Temperatura del suelo 2 en °C (puede ser null) */
  TempSuelo2: number | null;
  /** Evapotranspiración de referencia método Penman-Monteith en mm */
  EtPMon: number;
  /** Precipitación efectiva método Penman-Monteith en mm */
  PePMon: number;
  /** Código de la estación */
  Estacion: string;
  /** Fecha del dato (formato ISO 8601) */
  Fecha: string;
  /** ID numérico que identifica a la provincia */
  IdProvincia: number;
  /** Identificador interno único de la estación */
  IdEstacion: number;
}

/**
 * Datos diarios2
 */
export interface DatoDiario2 {
  /** ID numérico que identifica a la provincia */
  IdProvincia: number;
  /** Código identificador de la estación */
  IdEstacion: string;
  /** Año del registro */
  Año: number;
  /** Día del año (1-365/366) */
  Dia: number;
  /** Observaciones horarias sin viento */
  Calmas: number;
  /** Observaciones horarias con viento (> 0) */
  NoCalmas: number;
  /** Horas con temperatura entre 40 °C y 30 °C */
  Temp_40a_30: number;
  /** Horas con temperatura entre 30 °C y 20 °C */
  Temp_30a_20: number;
  /** Horas con temperatura entre 20 °C y 10 °C */
  Temp_20a_10: number;
  /** Horas con temperatura entre 10 °C y 0 °C */
  Temp_10a_0: number;
  /** Horas con temperatura entre 0 °C y 10 °C */
  Temp_0a_10: number;
  /** Horas con temperatura entre 10 °C y 20 °C */
  Temp_10a_20: number;
  /** Horas con temperatura entre 20 °C y 30 °C */
  Temp_20a_30: number;
  /** Horas con temperatura entre 30 °C y 40 °C */
  Temp_30a_40: number;
  /** Horas con temperatura entre 40 °C y 50 °C */
  Temp_40a_50: number;
  /** Horas con temperatura entre 50 °C y 60 °C */
  Temp_50a_60: number;
}

/**
 * Datos semanales
 */
export interface DatoSemanal {
  /** Año */
  Año: number;
  /** Número de semana */
  Semana: number;
  /** Temperatura media en °C */
  TempMedia: number;
  /** Temperatura máxima en °C */
  TempMax: number;
  /** Día, hora y minuto de la temperatura máxima (formato ISO 8601) */
  DiaHorMinTempMax: string;
  /** Temperatura mínima en °C */
  TempMin: number;
  /** Día, hora y minuto de la temperatura mínima (formato ISO 8601) */
  DiaHorMinTempMin: string;
  /** Humedad media en % */
  HumedadMedia: number;
  /** Humedad máxima en % */
  HumedadMax: number;
  /** Día, hora y minuto de la humedad máxima (formato ISO 8601) */
  DiaHorMinHumMax: string;
  /** Humedad mínima en % */
  HumedadMin: number;
  /** Día, hora y minuto de la humedad mínima (formato ISO 8601) */
  DiaHorMinHumMin: string;
  /** Velocidad media del viento en m/s */
  VelViento: number;
  /** Dirección media del viento en grados */
  DirViento: number;
  /** Velocidad máxima del viento en m/s */
  VelVientoMax: number;
  /** Día, hora y minuto de la velocidad máxima del viento (formato ISO 8601) */
  DiaHorMinVelMax: string;
  /** Dirección del viento a velocidad máxima en grados */
  DirVientoVelMax: number;
  /** Radiación solar en MJ/m² */
  Radiacion: number;
  /** Precipitación en mm */
  Precipitacion: number;
  /** Evapotranspiración de referencia método Penman-Monteith en mm */
  EtPMon: number;
  /** Precipitación efectiva método Penman-Monteith en mm */
  PePMon: number;
  /** Código de la estación */
  Estacion: string;
}

/**
 * Datos mensuales
 */
export interface DatoMensual {
  /** Año */
  Año: number;
  /** Mes (1-12) */
  Mes: number;
  /** Número de días del mes */
  NumDias: number;
  /** Temperatura media en °C */
  TempMedia: number;
  /** Temperatura máxima en °C */
  TempMax: number;
  /** Día, hora y minuto de la temperatura máxima (formato ISO 8601) */
  DiaHorMinTempMax: string;
  /** Temperatura mínima en °C */
  TempMin: number;
  /** Día, hora y minuto de la temperatura mínima (formato ISO 8601) */
  DiaHorMinTempMin: string;
  /** Humedad media en % */
  HumedadMedia: number;
  /** Humedad máxima en % */
  HumedadMax: number;
  /** Día, hora y minuto de la humedad máxima (formato ISO 8601) */
  DiaHorMinHumMax: string;
  /** Humedad mínima en % */
  HumedadMin: number;
  /** Día, hora y minuto de la humedad mínima (formato ISO 8601) */
  DiaHorMinHumMin: string;
  /** Velocidad media del viento en m/s */
  VelViento: number;
  /** Dirección media del viento en grados */
  DirViento: number;
  /** Velocidad máxima del viento en m/s */
  VelVientoMax: number;
  /** Día, hora y minuto de la velocidad máxima del viento (formato ISO 8601) */
  DiaHorMinVelMax: string;
  /** Dirección del viento a velocidad máxima en grados */
  DirVientoVelMax: number;
  /** Radiación solar en MJ/m² */
  Radiacion: number;
  /** Precipitación en mm */
  Precipitacion: number;
  /** Evapotranspiración de referencia método Penman-Monteith en mm */
  EtPMon: number;
  /** Precipitación efectiva método Penman-Monteith en mm */
  PePMon: number;
  /** Código de la estación */
  Estacion: string;
}
