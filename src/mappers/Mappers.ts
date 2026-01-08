import type {
  AutonomousCommunity,
  Province,
  Station,
  AccessInformation,
} from "../public/information/Models.js";
import type {
  HourlyData,
  DailyData,
  WeeklyData,
  MonthlyData,
} from "../index.js";
import type {
  DatoHorario,
  DatoDiario,
  DatoSemanal,
  DatoMensual,
} from "../internal/data/Models.js";
import type {
  CCAA,
  Provincia,
  Estacion,
  InformacionAccesos,
} from "../internal/information/Models.js";

/**
 * Maps DatoHorario to HourlyData
 */
export function mapDatoHorarioToHourlyData(dato: DatoHorario): HourlyData {
  return {
    timeMinutes: dato.HoraMin,
    avgTemperature: dato.TempMedia,
    avgHumidity: dato.HumedadMedia,
    windSpeed: dato.VelViento,
    windDirection: dato.DirViento,
    radiation: dato.Radiacion,
    precipitation: dato.Precipitacion,
    soilTemperature1: dato.TempSuelo1,
    soilTemperature2: dato.TempSuelo2,
    station: dato.Estacion,
    date: dato.Fecha,
  };
}

/**
 * Maps DatoDiario to DailyData
 */
export function mapDatoDiarioToDailyData(dato: DatoDiario): DailyData {
  return {
    avgTemperature: dato.TempMedia,
    maxTemperature: dato.TempMax,
    timeMaxTemperature: dato.HorMinTempMax,
    minTemperature: dato.TempMin,
    timeMinTemperature: dato.HorMinTempMin,
    avgHumidity: dato.HumedadMedia,
    maxHumidity: dato.HumedadMax,
    timeMaxHumidity: dato.HorMinHumMax,
    minHumidity: dato.HumedadMin,
    timeMinHumidity: dato.HorMinHumMin,
    avgWindSpeed: dato.VelViento,
    avgWindDirection: dato.DirViento,
    maxWindSpeed: dato.VelVientoMax,
    timeMaxWindSpeed: dato.HorMinVelMax,
    windDirectionAtMaxSpeed: dato.DirVientoVelMax,
    radiation: dato.Radiacion,
    precipitation: dato.Precipitacion,
    soilTemperature1: dato.TempSuelo1,
    soilTemperature2: dato.TempSuelo2,
    etPenmanMonteith: dato.EtPMon,
    pePenmanMonteith: dato.PePMon,
    station: dato.Estacion,
    date: dato.Fecha,
  };
}

/**
 * Maps DatoSemanal to WeeklyData
 */
export function mapDatoSemanalToWeeklyData(dato: DatoSemanal): WeeklyData {
  return {
    year: dato.Año,
    week: dato.Semana,
    avgTemperature: dato.TempMedia,
    maxTemperature: dato.TempMax,
    timeMaxTemperature: dato.DiaHorMinTempMax,
    minTemperature: dato.TempMin,
    timeMinTemperature: dato.DiaHorMinTempMin,
    avgHumidity: dato.HumedadMedia,
    maxHumidity: dato.HumedadMax,
    timeMaxHumidity: dato.DiaHorMinHumMax,
    minHumidity: dato.HumedadMin,
    timeMinHumidity: dato.DiaHorMinHumMin,
    avgWindSpeed: dato.VelViento,
    avgWindDirection: dato.DirViento,
    maxWindSpeed: dato.VelVientoMax,
    timeMaxWindSpeed: dato.DiaHorMinVelMax,
    windDirectionAtMaxSpeed: dato.DirVientoVelMax,
    radiation: dato.Radiacion,
    precipitation: dato.Precipitacion,
    etPenmanMonteith: dato.EtPMon,
    pePenmanMonteith: dato.PePMon,
    station: dato.Estacion,
  };
}

/**
 * Maps DatoMensual to MonthlyData
 */
export function mapDatoMensualToMonthlyData(dato: DatoMensual): MonthlyData {
  return {
    year: dato.Año,
    month: dato.Mes,
    numDays: dato.NumDias,
    avgTemperature: dato.TempMedia,
    maxTemperature: dato.TempMax,
    timeMaxTemperature: dato.DiaHorMinTempMax,
    minTemperature: dato.TempMin,
    timeMinTemperature: dato.DiaHorMinTempMin,
    avgHumidity: dato.HumedadMedia,
    maxHumidity: dato.HumedadMax,
    timeMaxHumidity: dato.DiaHorMinHumMax,
    minHumidity: dato.HumedadMin,
    timeMinHumidity: dato.DiaHorMinHumMin,
    avgWindSpeed: dato.VelViento,
    avgWindDirection: dato.DirViento,
    maxWindSpeed: dato.VelVientoMax,
    timeMaxWindSpeed: dato.DiaHorMinVelMax,
    windDirectionAtMaxSpeed: dato.DirVientoVelMax,
    radiation: dato.Radiacion,
    precipitation: dato.Precipitacion,
    etPenmanMonteith: dato.EtPMon,
    pePenmanMonteith: dato.PePMon,
    station: dato.Estacion,
  };
}

/**
 * Maps CCAA to AutonomousCommunity
 */
export function mapCCAA(ccaa: CCAA): AutonomousCommunity {
  return {
    id: ccaa.Identificador,
    description: ccaa.Descripcion,
  };
}

/**
 * Maps Provincia to ProvinceInfo
 */
export function mapProvincia(provincia: Provincia): Province {
  return {
    name: provincia.Provincia,
    code: provincia.Codigo,
    ccaaCode: provincia.Codigo_CCAA,
  };
}

/**
 * Maps Estacion to StationInfo
 */
export function mapEstacion(estacion: Estacion): Station {
  return {
    code: estacion.Codigo,
    description: estacion.Estacion,
    altitude: estacion.Altitud,
    installationDate: estacion.Fecha_Instalacion,
    deactivationDate: estacion.Fecha_Baja,
    timezone: estacion.Huso,
    latitude: estacion.Latitud,
    longitude: estacion.Longitud,
    municipality: estacion.Termino,
    utmX: estacion.XUTM,
    utmY: estacion.YUTM,
  };
}

/**
 * Maps InformacionAccesos to AccessInformation
 */
export function mapInformacionAccesos(
  info: InformacionAccesos
): AccessInformation {
  return {
    accessesCurrentMinute: info.NumAccesosMinutoActual,
    maxAccessesPerMinute: info.MaxAccesosMinuto,
    accessesCurrentDay: info.NumAccesosDiaActual,
    maxAccessesPerDay: info.MaxAccesosDia,
    recordsCurrentMinute: info.RegistrosAcumuladosMinuto,
    maxRecordsPerMinute: info.MaxRegistrosMinuto,
    recordsCurrentDay: info.RegistrosAcumuladosDia,
    maxRecordsPerDay: info.MaxRegistrosDia,
  };
}
