import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { InformationService } from "../../src/client/information/InformationService.js";
import {
  mapCCAA,
  mapProvincia,
  mapEstacion,
  mapInformacionAccesos,
  mapCodigoValidacion,
} from "../../src/mappers/Mappers.js";
import {
  mockCCAAResponse,
  expectedCCAAResponse,
  mockProvinciasResponse,
  mockEstacionesResponse,
  mockAccesosResponse,
  mockResponseWithMessage,
  expectedProvinciasResponse,
  expectedStationsResponse,
  mockCodigosValidacionResponse,
  expectedValidationCodesResponse,
} from "../mocks/mock-responses.js";
import { BASE_URL } from "../../src/internal/Consts.js";

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
        }),
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
        "No hay datos disponibles para el período solicitado",
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
        expect.stringContaining("Info/PROVINCIAS"),
        expect.any(Object),
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

      expect(result).toEqual(expectedStationsResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Info/ESTACIONES"),
        expect.any(Object),
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
        data: mapInformacionAccesos(mockAccesosResponse.datos),
        message: mockAccesosResponse.MensajeRespuesta,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Info/ACCESOS"),
        expect.any(Object),
      );
    });

    it("should return undefined data when datos is missing", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          MensajeRespuesta: "Error: datos no disponibles",
        }),
      });

      const result = await service.fetchAccessData();

      expect(result.data).toBeUndefined();
      expect(result.message).toBe("Error: datos no disponibles");
    });
  });

  describe("fetchValidationCodes", () => {
    it("should fetch validation codes successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockCodigosValidacionResponse,
      });

      const result = await service.fetchValidationCodes();

      expect(result).toEqual(expectedValidationCodesResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("Info/CODIGOSVALIDACION"),
        expect.any(Object),
      );
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
      expect(callUrl).toContain(BASE_URL + "/API/V1/Info");
    });

    it("should include token in the URL", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProvinciasResponse,
      });

      await service.fetchProvinces();

      const callUrl = global.fetch.mock.calls[0][0];
      expect(callUrl).toContain(`token=${mockApiKey}`);
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
      expect(global.fetch.mock.calls[1][0]).toContain("Info/PROVINCIAS");

      // Estaciones
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEstacionesResponse,
      });
      await service.fetchStations();
      expect(global.fetch.mock.calls[2][0]).toContain("Info/ESTACIONES");

      // Accesos
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockAccesosResponse,
      });
      await service.fetchAccessData();
      expect(global.fetch.mock.calls[3][0]).toContain("Info/ACCESOS");

      // Códigos de Validación
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockCodigosValidacionResponse,
      });
      await service.fetchValidationCodes();
      expect(global.fetch.mock.calls[4][0]).toContain("Info/CODIGOSVALIDACION");
    });
  });
});
