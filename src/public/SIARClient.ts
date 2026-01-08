import {
  DataPetitionService,
  type DataPetitionParams,
} from "../client/data/DataService.js";
import { InformationService } from "../client/information/InformationService.js";
import type { Scope } from "./data/Models.js";

/**
 * Wrapper around the SIAR API services.
 */
export class SIARClient {
  private apiKey: string;
  private dataPetitionService: DataPetitionService;
  private informationService: InformationService;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.dataPetitionService = new DataPetitionService(this.apiKey);
    this.informationService = new InformationService(this.apiKey);
  }

  /**
   * Fetch hourly data (recorded every 30 minutes, 48 data points per day).
   * @param ambito — Scope of the petition (CCAA, Province, Station)
   * @param params — Petition parameters
   * @returns — Promise resolving to hourly data
   */
  public fetchHourlyData(scope: Scope, params: DataPetitionParams) {
    return this.dataPetitionService.fetchHourlyData(scope, params);
  }

  /**
   * Fetch daily data.
   * @param ambito Scope of the petition (CCAA, Province, Station)
   * @param params Petition parameters
   * @returns Promise resolving to daily data
   */
  public fetchDailyData(scope: Scope, params: DataPetitionParams) {
    return this.dataPetitionService.fetchDailyData(scope, params);
  }

  /**
   * Fetch weekly data.
   * @param ambito Scope of the petition (CCAA, Province, Station)
   * @param params Petition parameters
   * @returns Promise resolving to weekly data
   */
  public fetchWeeklyData(scope: Scope, params: DataPetitionParams) {
    return this.dataPetitionService.fetchWeeklyData(scope, params);
  }

  /**
   * Fetch monthly data.
   * @param ambito Scope of the petition (CCAA, Province, Station)
   * @param params Petition parameters
   * @returns Promise resolving to monthly data
   */
  public fetchMonthlyData(scope: Scope, params: DataPetitionParams) {
    return this.dataPetitionService.fetchMonthlyData(scope, params);
  }

  /**
   * Fetch identifiers and descriptions of authorized autonomous communities.
   * @returns Promise resolving to the list of autonomous communities
   */
  public fetchAutonomousCommunities() {
    return this.informationService.fetchAutonomousCommunities();
  }

  /**
   * Fetch identifiers and descriptions of authorized provinces.
   * @returns Promise resolving to the list of provinces
   */
  public fetchProvinces() {
    return this.informationService.fetchProvinces();
  }

  /**
   * Fetch identifiers and descriptions of authorized stations.
   * @returns Promise resolving to the list of stations
   */
  public fetchStations() {
    return this.informationService.fetchStations();
  }
}
