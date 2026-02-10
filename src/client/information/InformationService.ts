import { BASE_URL } from "../../internal/Consts.js";
import type {
  CCAA,
  Provincia,
  Estacion,
  InformacionAccesos,
  CodigoValidacion,
} from "../../internal/information/Models.js";
import type { RespuestaGeneral } from "../../internal/Models.js";
import {
  mapCCAA,
  mapProvincia,
  mapEstacion,
  mapInformacionAccesos,
  mapCodigoValidacion,
} from "../../mappers/Mappers.js";
import {
  InformationCategory,
  type AutonomousCommunity,
  type Province,
  type Station,
  type AccessInformation,
  type ValidationCode,
} from "../../public/information/Models.js";
import type { GeneralResponse } from "../../public/Models.js";

/**
 * Servicio para obtener información de permisos y accesos en la Web API SIAR
 */
export class InformationService {
  private baseUrl: string;
  private apiKey: string;

  /**
   * Constructor del servicio
   * @param apiKey Clave de cliente API de 50 caracteres
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = BASE_URL + "/API/V1/Info";
  }

  /**
   * Construye la URL completa para una petición de información
   * @param informationCategory Tipo de información a solicitar
   * @returns URL completa para la petición
   */
  private buildUrl(informationCategory: InformationCategory): string {
    return `${this.baseUrl}/${informationCategory}?token=${this.apiKey}`;
  }

  /**
   * Realiza una petición de información a la API
   * @param informationCategory Tipo de información a solicitar
   * @returns Promesa con la respuesta de la API
   */
  private async fetchInformation<T>(
    informationCategory: InformationCategory,
  ): Promise<RespuestaGeneral<T>> {
    const url = this.buildUrl(informationCategory);
    console.log(`Fetching information from URL: ${url}`);

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
        console.error(
          `HTTP error! status: ${response.status} - ${response.statusText}`,
        );
        return {
          MensajeRespuesta: data.MensajeRespuesta,
          error: {
            type: "http",
            statusCode: response.status,
            details: `HTTP error! status: ${response.status} - ${response.statusText}`,
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
   * Obtiene los identificadores y descripciones de las comunidades autónomas
   * sobre cuyos datos tiene autorización el cliente
   * @returns Promesa con la lista de comunidades autónomas
   */
  async fetchAutonomousCommunities(): Promise<
    GeneralResponse<AutonomousCommunity[]>
  > {
    const response = await this.fetchInformation<CCAA[]>(
      InformationCategory.AutonomousCommunity,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = response.datos.map(mapCCAA);

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
      InformationCategory.Province,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = response.datos.map(mapProvincia);

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
      InformationCategory.Station,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = response.datos.map(mapEstacion);

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
      InformationCategory.Access,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = mapInformacionAccesos(response.datos);

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }

  /**
   * Obtiene la descripción de los códigos de validación
   * @returns Promesa con la lista de códigos de validación
   */
  async fetchValidationCodes(): Promise<GeneralResponse<ValidationCode[]>> {
    const response = await this.fetchInformation<CodigoValidacion[]>(
      InformationCategory.ValidationCode,
    );

    // If there's no datos field, return only the message (error case)
    if (!response.datos) {
      return {
        message: response.MensajeRespuesta,
      };
    }

    const mappedData = response.datos.map(mapCodigoValidacion);

    return {
      data: mappedData,
      message: response.MensajeRespuesta,
    };
  }
}
