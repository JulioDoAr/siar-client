import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { InformationService } from "../../src/client/information/InformationService.js";
import {
  mapCCAA,
  mapProvincia,
  mapEstacion,
  mapInformacionAccesos,
} from "../../src/mappers/Mappers.js";
import {
  mockCCAAResponse,
  expectedCCAAResponse,
  mockProvinciasResponse,
  mockEstacionesResponse,
  mockAccesosResponse,
  mockResponseWithMessage,
  expectedProvinciasResponse,
} from "../mocks/mock-responses.js";

// Mock global fetch
global.fetch = jest.fn();

describe("InformationService", () => {
  let service;
  const mockApiKey = "test-api-key-1234567890-abcdefghijklmnopqrstuvwxyz";

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    service = new InformationService(mockApiKey);
  });

  describe("Constructor", () => {
    it("should create an instance with the provided API key", () => {
      expect(service).toBeInstanceOf(InformationService);
    });
  });

  describe("fetchAutonomousCommunities", () => {
    it("should fetch autonomous communities successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockCCAAResponse,
      });

      const result = await service.fetchAutonomousCommunities();

      expect(result).toEqual(expectedCCAAResponse);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Info/CCAA"),
        expect.objectContaining({
          method: "GET",
          headers: { Accept: "application/json" },
        })
      );
    });

    it("should handle responses with messages", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponseWithMessage,
      });

      const result = await service.fetchAutonomousCommunities();

      expect(result.data).toEqual([]);
      expect(result.message).toBe(
        "No hay datos disponibles para el período solicitado"
      );
    });
  });

  describe("fetchProvinces", () => {
    it("should fetch provinces successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProvinciasResponse,
      });

      const result = await service.fetchProvinces();

      expect(result).toEqual(expectedProvinciasResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Info/Provincias"),
        expect.any(Object)
      );
    });
  });

  describe("fetchStations", () => {
    it("should fetch stations successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEstacionesResponse,
      });

      const result = await service.fetchStations();

      expect(result).toEqual({
        data: mockEstacionesResponse.Datos.map(mapEstacion),
        message: mockEstacionesResponse.MensajeRespuesta,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Info/Estaciones"),
        expect.any(Object)
      );
    });
  });

  describe("fetchAccessData", () => {
    it("should fetch access information successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockAccesosResponse,
      });

      const result = await service.fetchAccessData();

      expect(result).toEqual({
        data: mapInformacionAccesos(mockAccesosResponse.Datos),
        message: mockAccesosResponse.MensajeRespuesta,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Info/Accesos"),
        expect.any(Object)
      );
    });

    it("should return defaults when Datos is missing", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ Datos: undefined, MensajeRespuesta: null }),
      });

      const result = await service.fetchAccessData();

      expect(result.data).toEqual({
        accessesCurrentMinute: 0,
        maxAccessesPerMinute: 0,
        accessesCurrentDay: 0,
        maxAccessesPerDay: 0,
        recordsCurrentMinute: 0,
        maxRecordsPerMinute: 0,
        recordsCurrentDay: 0,
        maxRecordsPerDay: 0,
      });
      expect(result.message).toBeNull();
    });
  });

  describe("URL Construction", () => {
    it("should construct URL with correct base path", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockCCAAResponse,
      });

      await service.fetchAutonomousCommunities();

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain(
        "https://servicio.mapama.gob.es/apisiar/API/v1/Info"
      );
    });

    it("should include ClaveAPI in the URL", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProvinciasResponse,
      });

      await service.fetchProvinces();

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain(`ClaveAPI=${mockApiKey}`);
    });

    it("should call the correct endpoints", async () => {
      // CCAA
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockCCAAResponse,
      });
      await service.fetchAutonomousCommunities();
      expect(global.fetch.mock.calls[0][0]).toContain("Info/CCAA");

      // Provincias
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProvinciasResponse,
      });
      await service.fetchProvinces();
      expect(global.fetch.mock.calls[1][0]).toContain("Info/Provincias");

      // Estaciones
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEstacionesResponse,
      });
      await service.fetchStations();
      expect(global.fetch.mock.calls[2][0]).toContain("Info/Estaciones");

      // Accesos
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockAccesosResponse,
      });
      await service.fetchAccessData();
      expect(global.fetch.mock.calls[3][0]).toContain("Info/Accesos");
    });
  });
});
