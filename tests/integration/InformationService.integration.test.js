import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { InformationService } from "../../src/client/information/InformationService.js";
import {
  expectedStationsResponse,
  mockCCAAResponse,
  expectedProvinciasResponse,
  mockEstacionesResponse,
  mockAccesosResponse,
  expectedCCAAResponse,
  mockProvinciasResponse,
  expectedAccessesResponse,
} from "../mocks/mock-responses.js";

// Integration-style tests using real mapping via the service (mocked fetch)

global.fetch = jest.fn();

describe("InformationService Integration", () => {
  let service;
  const mockApiKey = "test-api-key-1234567890-abcdefghijklmnopqrstuvwxyz";

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    service = new InformationService(mockApiKey);
  });

  it("calls all info endpoints sequentially and maps results", async () => {
    // Queue responses for 4 sequential calls
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockCCAAResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockProvinciasResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockEstacionesResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockAccesosResponse,
      });

    const ccaa = await service.fetchAutonomousCommunities();
    const provincias = await service.fetchProvinces();
    const estaciones = await service.fetchStations();
    const accesos = await service.fetchAccessData();

    expect(ccaa).toEqual(expectedCCAAResponse);
    expect(provincias).toEqual(expectedProvinciasResponse);
    expect(estaciones).toEqual(expectedStationsResponse);
    expect(accesos).toEqual(expectedAccessesResponse);

    // Endpoints and API key present
    const urls = global.fetch.mock.calls.map((c) => c[0]);
    expect(urls[0]).toContain("Info/CCAA");
    expect(urls[1]).toContain("Info/PROVINCIAS");
    expect(urls[2]).toContain("Info/ESTACIONES");
    expect(urls[3]).toContain("Info/ACCESOS");
    urls.forEach((u) => expect(u).toContain(`token=${mockApiKey}`));
  });

  it("returns undefined data when access info Datos missing", async () => {
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
