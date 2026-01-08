import type {
  CCAA,
  Provincia,
  Estacion,
  InformacionAccesos,
} from "../../internal/information/Models.js";
import type { RespuestaGeneral } from "../../internal/Models.js";
import {
  mapCCAA,
  mapProvincia,
  mapEstacion,
  mapInformacionAccesos,
} from "../../mappers/Mappers.js";
import {
  TipoInformacion,
  type AutonomousCommunity,
  type Province,
  type Station,
  type AccessInformation,
} from "../../public/information/Models.js";
import type { GeneralResponse } from "../../public/Models.js";

/**
 * Servicio para obtener información de permisos y accesos en la Web API SIAR
 */
export class InformationService {
  private baseUrl: string =
    "https://servicio.mapama.gob.es/apisiar/API/v1/Info";
  private apiKey: string;

  /**
   * Constructor del servicio
   * @param apiKey Clave de cliente API de 50 caracteres
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Construye la URL completa para una petición de información
   * @param tipoInformacion Tipo de información a solicitar
   * @returns URL completa para la petición
   */
  private buildUrl(tipoInformacion: TipoInformacion): string {
    return `${this.baseUrl}/${tipoInformacion}?ClaveAPI=${this.apiKey}`;
  }

  /**
   * Realiza una petición de información a la API
   * @param tipoInformacion Tipo de información a solicitar
   * @returns Promesa con la respuesta de la API
   */
  private async fetchInformation<T>(
    tipoInformacion: TipoInformacion
  ): Promise<RespuestaGeneral<T>> {
    const url = this.buildUrl(tipoInformacion);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        return {
          MensajeRespuesta: null,
          error: {
            type: "http",
            statusCode: response.status,
            details: `HTTP error! status: ${response.status}`,
          },
        };
      }

      const data: RespuestaGeneral<T> =
        (await response.json()) as RespuestaGeneral<T>;
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
   * Obtiene los identificadores y descripciones de las comunidades autónomas
   * sobre cuyos datos tiene autorización el cliente
   * @returns Promesa con la lista de comunidades autónomas
   */
  async fetchAutonomousCommunities(): Promise<
    GeneralResponse<AutonomousCommunity[]>
  > {
    const response = await this.fetchInformation<CCAA[]>(TipoInformacion.CCAA);

    const mappedData = response.Datos?.map(mapCCAA) ?? [];

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }

  /**
   * Obtiene los identificadores y descripciones de las provincias
   * sobre cuyos datos tiene autorización el cliente
   * @returns Promesa con la lista de provincias
   */
  async fetchProvinces(): Promise<GeneralResponse<Province[]>> {
    const response = await this.fetchInformation<Provincia[]>(
      TipoInformacion.Provincias
    );

    const mappedData = response.Datos?.map(mapProvincia) ?? [];

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }

  /**
   * Obtiene los identificadores y descripciones de las estaciones
   * sobre cuyos datos tiene autorización el cliente
   * @returns Promesa con la lista de estaciones
   */
  async fetchStations(): Promise<GeneralResponse<Station[]>> {
    const response = await this.fetchInformation<Estacion[]>(
      TipoInformacion.Estaciones
    );

    const mappedData = response.Datos?.map(mapEstacion) ?? [];

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }

  /**
   * Obtiene información acerca de las limitaciones en el número de accesos
   * máximos a realizar por minuto y por día así como la cifra real de accesos
   * realizados por el cliente
   * @returns Promesa con la información de accesos
   */
  async fetchAccessData(): Promise<GeneralResponse<AccessInformation>> {
    const response = await this.fetchInformation<InformacionAccesos>(
      TipoInformacion.Accesos
    );

    const mappedData = response.Datos
      ? mapInformacionAccesos(response.Datos)
      : {
          accessesCurrentMinute: 0,
          maxAccessesPerMinute: 0,
          accessesCurrentDay: 0,
          maxAccessesPerDay: 0,
          recordsCurrentMinute: 0,
          maxRecordsPerMinute: 0,
          recordsCurrentDay: 0,
          maxRecordsPerDay: 0,
        };

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }
}
