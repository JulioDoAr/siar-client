import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { DataPetitionService } from "../../src/client/data/DataService.js";
import { Scope } from "../../src/public/data/Models.js";
import {
  mockDatoHorarioResponse,
  mockDatoDiarioResponse,
  mockDatoSemanalResponse,
  mockDatoMensualResponse,
} from "../mocks/mock-responses.js";
import { basicParams } from "../mocks/sample-params.js";

// Integration-style tests using real mapping via the service (mocked fetch)

global.fetch = jest.fn();

describe("DataPetitionService Integration", () => {
  let service;
  const mockApiKey = "test-api-key-1234567890-abcdefghijklmnopqrstuvwxyz";

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    service = new DataPetitionService(mockApiKey);
  });

  it("fetches hourly, daily, weekly, monthly sequentially and maps results", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoDiarioResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoSemanalResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoMensualResponse,
      });

    const hourly = await service.fetchHourlyData(Scope.Station, basicParams);
    const daily = await service.fetchDailyData(Scope.Province, basicParams);
    const weekly = await service.fetchWeeklyData(Scope.Province, basicParams);
    const monthly = await service.fetchMonthlyData(
      Scope.AutonomousCommunity,
      basicParams
    );

    // Basic shape checks without relying on mappers directly
    expect(hourly.data.length).toBeGreaterThan(0);
    expect(hourly.data[0]).toMatchObject({
      station: expect.any(String),
      date: expect.any(String),
      avgTemperature: expect.any(Number),
    });
    expect(daily.data[0]).toMatchObject({
      station: expect.any(String),
      date: expect.any(String),
      maxTemperature: expect.any(Number),
    });
    expect(weekly.data[0]).toMatchObject({
      station: expect.any(String),
      year: expect.any(Number),
      week: expect.any(Number),
    });
    expect(monthly.data[0]).toMatchObject({
      station: expect.any(String),
      year: expect.any(Number),
      month: expect.any(Number),
    });

    const urls = global.fetch.mock.calls.map((c) => c[0]);
    expect(urls[0]).toContain("Datos/Horarios/Estacion");
    expect(urls[1]).toContain("Datos/Diarios/Provincia");
    expect(urls[2]).toContain("Datos/Semanales/Provincia");
    expect(urls[3]).toContain("Datos/Mensuales/CCAA");
    urls.forEach((u) => expect(u).toContain(`ClaveAPI=${mockApiKey}`));
  });
});
