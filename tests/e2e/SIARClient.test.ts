import { Scope, SIARClient } from "../../src/index.js";
import { describe, it, expect, beforeAll } from "@jest/globals";
import type {
  AutonomousCommunity,
  Province,
  Station,
} from "../../src/public/information/Models.js";
import type { GeneralResponse } from "../../src/public/Models.js";
import type { DataPetitionParams } from "../../src/client/data/DataService.js";

describe("SIARClient", () => {
  let service: SIARClient;
  let communities: GeneralResponse<AutonomousCommunity[]>;
  let provinces: GeneralResponse<Province[]>;
  let stations: GeneralResponse<Station[]>;

  beforeAll(() => {
    const apiKey = process.env.SIAR_API_KEY;
    if (!apiKey) {
      throw new Error("SIAR_API_KEY not set");
    }
    service = new SIARClient(apiKey);
  });

  it("should fetch real autonomous communities", async () => {
    communities = await service.fetchAutonomousCommunities();
    expect(communities.data).toBeDefined();
    expect(Array.isArray(communities.data)).toBe(true);
    if (!communities.data) {
      console.error(
        "No autonomous communities data fetched. Possible issue: ",
        communities.message
      );
    }
  });

  it("should fetch real provinces", async () => {
    provinces = await service.fetchProvinces();
    expect(provinces.data).toBeDefined();
    expect(Array.isArray(provinces.data)).toBe(true);
    if (!provinces.data) {
      console.error(
        "No provinces data fetched. Possible issue: ",
        provinces.message
      );
    }
  });

  it("should fetch real stations", async () => {
    stations = await service.fetchStations();
    expect(stations.data).toBeDefined();
    expect(Array.isArray(stations.data)).toBe(true);
    if (!stations.data) {
      console.error(
        "No stations data fetched. Possible issue: ",
        stations.message
      );
    }
  });

  it("should fetch real hourly data", async () => {
    // This test runs after the previous one, so stations is populated
    expect(stations.data).toBeDefined();
    if (!stations.data || stations.data.length === 0) {
      throw new Error("No stations available for testing hourly data fetch");
    }
    expect(stations.data.length).toBeGreaterThan(0);

    if (!stations.data[0]) {
      throw new Error("No stations available for testing hourly data fetch");
    }
    const station: Station = stations.data[0];

    const stationCode = station.code;
    const scope: Scope = Scope.Station;
    const params: DataPetitionParams = {
      startDate: "2023-01-01",
      endDate: "2023-01-02",
      ids: [stationCode],
    };
    const hourlyData = await service.fetchHourlyData(scope, params);

    if (hourlyData.message) {
      expect(hourlyData.message).toBeDefined();
      expect(hourlyData.data).not.toBeDefined();
      console.warn("Hourly data fetch message:", hourlyData.message);
    } else {
      expect(hourlyData.data).toBeDefined();
      expect(hourlyData.message).toBeNull();
      expect(Array.isArray(hourlyData.data)).toBe(true);
      console.log("Hourly data:", hourlyData.data);
    }
  });

  it("should fetch real daily data from an station", async () => {
    expect(stations.data).toBeDefined();
    if (!stations.data || stations.data.length === 0) {
      throw new Error("No stations available for testing daily data fetch");
    }
    if (!stations.data[0] || !stations.data[0].code) {
      throw new Error("No stations available for testing daily data fetch");
    }

    const station = stations.data[0];
    const stationCode = station.code;
    const scope: Scope = Scope.Station;
    const params: DataPetitionParams = {
      startDate: "2023-01-01",
      endDate: "2023-01-10",
      ids: [stationCode],
    };
    const dailyData = await service.fetchDailyData(scope, params);
    expect(dailyData.data).toBeDefined();
    expect(Array.isArray(dailyData.data)).toBe(true);
  });
});
