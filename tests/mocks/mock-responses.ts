import type {
  DatoHorario,
  DatoDiario,
  DatoSemanal,
  DatoMensual,
} from "../../src/internal/data/Models.js";
import type {
  CCAA,
  Provincia,
  Estacion,
  InformacionAccesos,
} from "../../src/internal/information/Models.js";
import type { RespuestaGeneral } from "../../src/internal/Models.js";
import type {
  AccessInformation,
  AutonomousCommunity,
  Province,
  Station,
} from "../../src/public/information/Models.js";
import type { GeneralResponse } from "../../src/public/Models.js";

/**
 * Respuesta exitosa con datos horarios
 */
export const mockDatoHorarioResponse: RespuestaGeneral<DatoHorario[]> = {
  Datos: [
    {
      HoraMin: 0,
      TempMedia: 15.5,
      HumedadMedia: 65,
      VelViento: 2.3,
      DirViento: 180,
      Radiacion: 0.5,
      Precipitacion: 0,
      TempSuelo1: null,
      TempSuelo2: null,
      Estacion: "EST001",
      Fecha: "2026-01-04T00:00:00Z",
    },
    {
      HoraMin: 30,
      TempMedia: 15.8,
      HumedadMedia: 63,
      VelViento: 2.5,
      DirViento: 185,
      Radiacion: 0.6,
      Precipitacion: 0,
      TempSuelo1: null,
      TempSuelo2: null,
      Estacion: "EST001",
      Fecha: "2026-01-04T00:30:00Z",
    },
  ],
  MensajeRespuesta: null,
};

/**
 * Respuesta exitosa con datos diarios
 */
export const mockDatoDiarioResponse: RespuestaGeneral<DatoDiario[]> = {
  Datos: [
    {
      TempMedia: 18.5,
      TempMax: 25.3,
      HorMinTempMax: 1430,
      TempMin: 12.1,
      HorMinTempMin: 630,
      HumedadMedia: 55,
      HumedadMax: 75,
      HorMinHumMax: 700,
      HumedadMin: 35,
      HorMinHumMin: 1500,
      VelViento: 3.2,
      DirViento: 180,
      VelVientoMax: 8.5,
      HorMinVelMax: 1400,
      DirVientoVelMax: 185,
      Radiacion: 25.4,
      Precipitacion: 0,
      TempSuelo1: 14.5,
      TempSuelo2: 15.2,
      EtPMon: 4.5,
      PePMon: 0,
      Estacion: "EST001",
      Fecha: "2026-01-04T00:00:00Z",
    },
  ],
  MensajeRespuesta: null,
};

/**
 * Respuesta exitosa con datos semanales
 */
export const mockDatoSemanalResponse: RespuestaGeneral<DatoSemanal[]> = {
  Datos: [
    {
      Año: 2026,
      Semana: 1,
      TempMedia: 17.8,
      TempMax: 26.5,
      DiaHorMinTempMax: "2026-01-04T14:30:00Z",
      TempMin: 10.2,
      DiaHorMinTempMin: "2026-01-02T06:30:00Z",
      HumedadMedia: 58,
      HumedadMax: 80,
      DiaHorMinHumMax: "2026-01-03T07:00:00Z",
      HumedadMin: 32,
      DiaHorMinHumMin: "2026-01-04T15:00:00Z",
      VelViento: 3.0,
      DirViento: 175,
      VelVientoMax: 10.2,
      DiaHorMinVelMax: "2026-01-04T14:00:00Z",
      DirVientoVelMax: 180,
      Radiacion: 178.5,
      Precipitacion: 2.5,
      EtPMon: 31.5,
      PePMon: 2.5,
      Estacion: "EST001",
    },
  ],
  MensajeRespuesta: null,
};

/**
 * Respuesta exitosa con datos mensuales
 */
export const mockDatoMensualResponse: RespuestaGeneral<DatoMensual[]> = {
  Datos: [
    {
      Año: 2026,
      Mes: 1,
      NumDias: 31,
      TempMedia: 16.5,
      TempMax: 28.3,
      DiaHorMinTempMax: "2026-01-15T15:00:00Z",
      TempMin: 8.1,
      DiaHorMinTempMin: "2026-01-05T06:00:00Z",
      HumedadMedia: 60,
      HumedadMax: 85,
      DiaHorMinHumMax: "2026-01-10T07:30:00Z",
      HumedadMin: 28,
      DiaHorMinHumMin: "2026-01-20T15:30:00Z",
      VelViento: 2.8,
      DirViento: 182,
      VelVientoMax: 12.5,
      DiaHorMinVelMax: "2026-01-12T13:00:00Z",
      DirVientoVelMax: 185,
      Radiacion: 735.2,
      Precipitacion: 45.8,
      EtPMon: 125.3,
      PePMon: 42.5,
      Estacion: "EST001",
    },
  ],
  MensajeRespuesta: null,
};

/**
 * Respuesta exitosa con mensaje
 */
export const mockResponseWithMessage: RespuestaGeneral<DatoHorario[]> = {
  Datos: [],
  MensajeRespuesta: "No hay datos disponibles para el período solicitado",
};

/**
 * Respuesta de error para simular fallo HTTP
 */
export const mockErrorResponse = {
  status: 401,
  statusText: "Unauthorized",
  ok: false,
};

export const mockCCAAResponse: RespuestaGeneral<CCAA[]> = {
  Datos: [
    { Identificador: "CCAA01", Descripcion: "Andalucía" },
    { Identificador: "CCAA02", Descripcion: "Madrid" },
  ],
  MensajeRespuesta: null,
};

export const expectedCCAAResponse: GeneralResponse<AutonomousCommunity[]> = {
  data: [
    { id: "CCAA01", description: "Andalucía" },
    { id: "CCAA02", description: "Madrid" },
  ],
  message: null,
};

export const mockProvinciasResponse: RespuestaGeneral<Provincia[]> = {
  Datos: [{ Provincia: "Cáceres", Codigo: "CC", Codigo_CCAA: "EXT" }],
  MensajeRespuesta: null,
};
export const expectedProvinciasResponse: GeneralResponse<Province[]> = {
  data: [{ name: "Cáceres", code: "CC", ccaaCode: "EXT" }],
  message: null,
};

export const mockEstacionesResponse: RespuestaGeneral<Estacion[]> = {
  Datos: [
    {
      Codigo: "EST001",
      Estacion: "Estación 1",
      Altitud: 100,
      Fecha_Instalacion: "2020-01-01",
      Fecha_Baja: null,
      Huso: 1,
      Latitud: "40.4168",
      Longitud: "-3.7038",
      Termino: "Madrid",
      XUTM: 500000,
      YUTM: 4500000,
    },
    {
      Codigo: "EST002",
      Estacion: "Estación 2",
      Altitud: 200,
      Fecha_Instalacion: "2019-01-01",
      Fecha_Baja: null,
      Huso: 1,
      Latitud: "41.3851",
      Longitud: "2.1734",
      Termino: "Barcelona",
      XUTM: 600000,
      YUTM: 4600000,
    },
  ],
  MensajeRespuesta: null,
};
export const expectedStationsResponse: GeneralResponse<Station[]> = {
  data: [
    {
      code: "EST001",
      description: "Estación 1",
      altitude: 100,
      installationDate: "2020-01-01",
      deactivationDate: null,
      timezone: 1,
      latitude: "40.4168",
      longitude: "-3.7038",
      municipality: "Madrid",
      utmX: 500000,
      utmY: 4500000,
    },
    {
      code: "EST002",
      description: "Estación 2",
      altitude: 200,
      installationDate: "2019-01-01",
      deactivationDate: null,
      timezone: 1,
      latitude: "41.3851",
      longitude: "2.1734",
      municipality: "Barcelona",
      utmX: 600000,
      utmY: 4600000,
    },
  ],
  message: null,
};

export const mockAccesosResponse: RespuestaGeneral<InformacionAccesos> = {
  Datos: {
    NumAccesosMinutoActual: 3,
    MaxAccesosMinuto: 60,
    NumAccesosDiaActual: 45,
    MaxAccesosDia: 2000,
    RegistrosAcumuladosMinuto: 120,
    MaxRegistrosMinuto: 1000,
    RegistrosAcumuladosDia: 20000,
    MaxRegistrosDia: 50000,
  },
  MensajeRespuesta: null,
};

export const expectedAccessesResponse: GeneralResponse<AccessInformation> = {
  data: {
    accessesCurrentMinute: 3,
    maxAccessesPerMinute: 60,
    accessesCurrentDay: 45,
    maxAccessesPerDay: 2000,
    recordsCurrentMinute: 120,
    maxRecordsPerMinute: 1000,
    recordsCurrentDay: 20000,
    maxRecordsPerDay: 50000,
  },
  message: null,
};
