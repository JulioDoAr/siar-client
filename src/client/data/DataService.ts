import { BASE_URL } from "../../internal/Consts.js";
import type {
  DatoHorario,
  DatoDiario,
  DatoSemanal,
  DatoMensual,
} from "../../internal/data/Models.js";
import type { RespuestaGeneral } from "../../internal/Models.js";
import {
  mapDatoHorarioToHourlyData,
  mapDatoDiarioToDailyData,
  mapDatoSemanalToWeeklyData,
  mapDatoMensualToMonthlyData,
} from "../../mappers/Mappers.js";
import {
  Scope,
  DataType,
  type HourlyData,
  type DailyData,
  type WeeklyData,
  type MonthlyData,
} from "../../public/data/Models.js";
import type { GeneralResponse } from "../../public/Models.js";

/**
 * Parámetros para realizar una petición de datos
 */
export interface DataPetitionParams {
  /** Identificadores de ámbito (pueden ser uno o varios) */
  ids: string[];
  /** Fecha inicial en formato AAAA-MM-DD */
  startDate: string;
  /** Fecha final en formato AAAA-MM-DD */
  endDate: string;
  /** OPCIONAL: Fecha de última modificación en formato AAAA-MM-DD */
  lastModifiedDate?: string;
  /** OPCIONAL: Indica si se deben mostrar las variables calculadas (solo para Diarios, Semanales y Mensuales) */
  calculatedData?: boolean;
}

/**
 * Servicio para realizar peticiones de datos a la Web API SIAR
 */
export class DataPetitionService {
  private baseUrl: string;
  private apiKey: string;

  /**
   * Constructor del servicio
   * @param apiKey Clave de cliente API de 50 caracteres
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = BASE_URL + "/API/V1/Datos";
  }

  /**
   * Construye la URL completa para una petición de datos
   * @param tipoDatos Tipo de datos a solicitar
   * @param ambito Ámbito de la petición
   * @param params Parámetros de la petición
   * @returns URL completa para la petición
   */
  private buildUrl(
    tipoDatos: DataType,
    ambito: Scope,
    params: DataPetitionParams,
  ): string {
    const { ids, startDate, endDate, lastModifiedDate, calculatedData } =
      params;

    // Construir la URL base con tipo de datos y ámbito
    let url = `${this.baseUrl}/${tipoDatos}/${ambito}?`;

    // Agregar los identificadores
    const idParams = ids.map((id) => `Id=${encodeURIComponent(id)}`).join("&");
    url += idParams;

    // Agregar fechas y clave API
    url += `&FechaInicial=${startDate}`;
    url += `&FechaFinal=${endDate}`;
    url += `&token=${this.apiKey}`;

    // Agregar fecha de última modificación si está presente
    if (lastModifiedDate) {
      url += `&FechaUltModificacion=${lastModifiedDate}`;
    }

    // Agregar datos calculados si está presente
    if (calculatedData !== undefined) {
      url += `&DatosCalculados=${calculatedData}`;
    }

    return url;
  }

  /**
   * Realiza una petición de datos a la API
   * @param tipoDatos Tipo de datos a solicitar
   * @param ambito Ámbito de la petición
   * @param params Parámetros de la petición
   * @returns Promesa con la respuesta de la API
   */
  private async fetchData<T>(
    tipoDatos: DataType,
    ambito: Scope,
    params: DataPetitionParams,
  ): Promise<RespuestaGeneral<T>> {
    const url = this.buildUrl(tipoDatos, ambito, params);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data: RespuestaGeneral<T> =
        (await response.json()) as RespuestaGeneral<T>;
      if (!response.ok) {
        return {
          MensajeRespuesta: data.MensajeRespuesta,
          error: {
            type: "http",
            statusCode: response.status,
            details: `HTTP error! status: ${response.status}`,
          },
        };
      }

      return data;
    } catch (error) {
      return {
        MensajeRespuesta: null,
        error: {
          type: error instanceof TypeError ? "network" : "parse",
          details: error instanceof Error ? error.message : String(error),
        },
      };
    }
  }

  /**
   * Obtiene datos horarios (se registra cada media hora, 48 datos por día)
   * @param scope Ámbito de la petición (CCAA, Provincia, Estacion)
   * @param params Parámetros de la petición
   * @returns Promesa con los datos horarios
   */
  async fetchHourlyData(
    scope: Scope,
    params: DataPetitionParams,
  ): Promise<GeneralResponse<HourlyData[]>> {
    const response = await this.fetchData<DatoHorario[]>(
      DataType.Hourly,
      scope,
      params,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = response.datos.map(mapDatoHorarioToHourlyData);

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }

  /**
   * Obtiene datos diarios
   * @param ambito Ámbito de la petición (CCAA, Provincia, Estacion)
   * @param params Parámetros de la petición
   * @returns Promesa con los datos diarios
   */
  async fetchDailyData(
    ambito: Scope,
    params: DataPetitionParams,
  ): Promise<GeneralResponse<DailyData[]>> {
    const response = await this.fetchData<DatoDiario[]>(
      DataType.Daily,
      ambito,
      params,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = response.datos.map(mapDatoDiarioToDailyData);

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }

  /**
   * Obtiene datos semanales
   * @param ambito Ámbito de la petición (CCAA, Provincia, Estacion)
   * @param params Parámetros de la petición
   * @returns Promesa con los datos semanales
   */
  async fetchWeeklyData(
    ambito: Scope,
    params: DataPetitionParams,
  ): Promise<GeneralResponse<WeeklyData[]>> {
    const response = await this.fetchData<DatoSemanal[]>(
      DataType.Weekly,
      ambito,
      params,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = response.datos.map(mapDatoSemanalToWeeklyData);

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }

  /**
   * Obtiene datos mensuales
   * @param ambito Ámbito de la petición (CCAA, Provincia, Estacion)
   * @param params Parámetros de la petición
   * @returns Promesa con los datos mensuales
   */
  async fetchMonthlyData(
    ambito: Scope,
    params: DataPetitionParams,
  ): Promise<GeneralResponse<MonthlyData[]>> {
    const response = await this.fetchData<DatoMensual[]>(
      DataType.Monthly,
      ambito,
      params,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = response.datos.map(mapDatoMensualToMonthlyData);

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }
}
