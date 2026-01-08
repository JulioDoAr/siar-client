import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { DataPetitionService } from "../../src/client/data/DataService.js";
import { DataType, Scope } from "../../src/public/data/Models.js";
import {
  mapDatoHorarioToHourlyData,
  mapDatoDiarioToDailyData,
  mapDatoSemanalToWeeklyData,
  mapDatoMensualToMonthlyData,
} from "../../src/mappers/Mappers.js";
import {
  mockDatoHorarioResponse,
  mockDatoDiarioResponse,
  mockDatoSemanalResponse,
  mockDatoMensualResponse,
  mockResponseWithMessage,
  mockErrorResponse,
} from "../mocks/mock-responses.js";
import {
  basicParams,
  multipleIdsParams,
  paramsWithModificationDate,
  specialCharsParams,
} from "../mocks/sample-params.js";

// Mock global fetch
global.fetch = jest.fn();

describe("DataPetitionService", () => {
  let service;
  const mockApiKey = "test-api-key-1234567890-abcdefghijklmnopqrstuvwxyz";

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    global.fetch = jest.fn();
    service = new DataPetitionService(mockApiKey);
  });

  describe("Constructor", () => {
    it("should create an instance with the provided API key", () => {
      expect(service).toBeInstanceOf(DataPetitionService);
    });
  });

  describe("fetchHourlyData", () => {
    it("should fetch hourly data successfully", async () => {
      // Mock successful response
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      });

      const result = await service.fetchHourlyData(Scope.Station, basicParams);

      expect(result).toEqual({
        data: mockDatoHorarioResponse.Datos.map(mapDatoHorarioToHourlyData),
        message: mockDatoHorarioResponse.MensajeRespuesta,
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Horarios/Estacion"),
        expect.objectContaining({
          method: "GET",
          headers: { Accept: "application/json" },
        })
      );
    });

    it("should include all parameters in the URL", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      });

      await service.fetchHourlyData("Estacion", basicParams);

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain("Id=EST001");
      expect(callUrl).toContain("FechaInicial=2026-01-01");
      expect(callUrl).toContain("FechaFinal=2026-01-07");
      expect(callUrl).toContain(`ClaveAPI=${mockApiKey}`);
    });

    it("should handle multiple IDs in the request", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      });

      await service.fetchHourlyData("Provincia", multipleIdsParams);

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain("Id=EST001");
      expect(callUrl).toContain("Id=EST002");
      expect(callUrl).toContain("Id=EST003");
    });

    it("should include optional lastModifiedDate when provided", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      });

      await service.fetchHourlyData("Estacion", paramsWithModificationDate);

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain("FechaUltModificacion=2026-01-03");
    });

    it("should properly encode special characters in IDs", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      });

      await service.fetchHourlyData("Estacion", specialCharsParams);

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain("EST%26001"); // & encoded as %26
      expect(callUrl).toContain("EST%2B002"); // + encoded as %2B
    });

    it("should work with CCAA ambito", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      });

      await service.fetchHourlyData("CCAA", basicParams);

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain("Horarios/CCAA");
    });
  });

  describe("fetchDailyData", () => {
    it("should fetch daily data successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoDiarioResponse,
      });

      const result = await service.fetchDailyData("Estacion", basicParams);

      expect(result).toEqual({
        data: mockDatoDiarioResponse.Datos.map(mapDatoDiarioToDailyData),
        message: mockDatoDiarioResponse.MensajeRespuesta,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Diarios/Estacion"),
        expect.any(Object)
      );
    });

    it("should handle responses with messages", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponseWithMessage,
      });

      const result = await service.fetchDailyData("Estacion", basicParams);

      expect(result.data).toEqual([]);
      expect(result.message).toBe(
        "No hay datos disponibles para el período solicitado"
      );
    });
  });

  describe("fetchWeeklyData", () => {
    it("should fetch weekly data successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoSemanalResponse,
      });

      const result = await service.fetchWeeklyData("Provincia", basicParams);

      expect(result).toEqual({
        data: mockDatoSemanalResponse.Datos.map(mapDatoSemanalToWeeklyData),
        message: mockDatoSemanalResponse.MensajeRespuesta,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Semanales/Provincia"),
        expect.any(Object)
      );
    });
  });

  describe("fetchMonthlyData", () => {
    it("should fetch monthly data successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoMensualResponse,
      });

      const result = await service.fetchMonthlyData("CCAA", basicParams);

      expect(result).toEqual({
        data: mockDatoMensualResponse.Datos.map(mapDatoMensualToMonthlyData),
        message: mockDatoMensualResponse.MensajeRespuesta,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Mensuales/CCAA"),
        expect.any(Object)
      );
    });
  });

  describe("URL Construction", () => {
    it("should construct URL with correct base path", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      });

      await service.fetchHourlyData("Estacion", basicParams);

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain(
        "https://servicio.mapama.gob.es/apisiar/API/v1/Datos"
      );
    });

    it("should not include FechaUltModificacion when not provided", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockDatoHorarioResponse,
      });

      await service.fetchHourlyData("Estacion", basicParams);

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).not.toContain("FechaUltModificacion");
    });
  });
});
