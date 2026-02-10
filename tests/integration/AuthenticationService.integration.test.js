import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { AuthenticationService } from "../../src/client/authentication/AuthenticationService.js";
import {
  mockCadenaCifradaResponse,
  mockTokenAutenticacionResponse,
} from "../mocks/mock-responses.js";

// Integration-style tests using real mapping via the service (mocked fetch)

global.fetch = jest.fn();

describe("AuthenticationService Integration", () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    service = new AuthenticationService();
  });

  it("performs complete authentication flow with sequential API calls", async () => {
    // Queue responses for the 3 sequential calls in obtainToken
    // 1. Encrypt userId
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      })
      // 2. Encrypt password
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      })
      // 3. Obtain token
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockTokenAutenticacionResponse,
      });

    const result = await service.obtainToken({
      userId: "12345678A",
      password: "securePassword",
    });

    // Verify successful result
    expect(result).toBe(mockTokenAutenticacionResponse);

    // Verify all 3 API calls were made
    expect(global.fetch).toHaveBeenCalledTimes(3);

    // Verify endpoints and parameters
    const calls = global.fetch.mock.calls.map((c) => c[0]);
    expect(calls[0]).toContain("API/V1/Autenticacion/cifrarCadena");
    expect(calls[0]).toContain("cadena=12345678A");
    expect(calls[1]).toContain("API/V1/Autenticacion/cifrarCadena");
    expect(calls[1]).toContain("cadena=securePassword");
    expect(calls[2]).toContain("API/V1/Autenticacion/obtenerToken");
    expect(calls[2]).toContain("Usuario=abc123XYZ789encrypted%3D%3D");
    expect(calls[2]).toContain("Password=abc123XYZ789encrypted%3D%3D");
  });

  it("handles individual encryption calls independently", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => mockCadenaCifradaResponse,
    });

    const result = await service.encryptString("testString123");

    expect(result).toBe("abc123XYZ789encrypted==");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("cifrarCadena?cadena=testString123"),
    );
  });

  it("fails when user encryption fails during token flow", async () => {
    // First call fails
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(
      service.obtainToken({
        userId: "12345678A",
        password: "securePassword",
      }),
    ).rejects.toThrow("Error HTTP: 500 - Internal Server Error");

    // Should only call once and stop
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("fails when password encryption fails during token flow", async () => {
    // First call succeeds
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => mockCadenaCifradaResponse,
    });

    // Second call fails
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(
      service.obtainToken({
        userId: "12345678A",
        password: "securePassword",
      }),
    ).rejects.toThrow("Error HTTP: 500 - Internal Server Error");

    // Should call twice and stop
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("fails when token request fails", async () => {
    // First two calls succeed
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => ({
          Datos: "encryptedUser123ABC",
          MensajeRespuesta: null,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => ({
          Datos: "encryptedPass456DEF",
          MensajeRespuesta: null,
        }),
      });

    // Third call fails (unauthorized)
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    });

    await expect(
      service.obtainToken({
        userId: "12345678A",
        password: "wrongPassword",
      }),
    ).rejects.toThrow("Error HTTP: 401 - Unauthorized");

    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("encodes special characters correctly in encryption requests", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => mockCadenaCifradaResponse,
    });

    await service.encryptString("user@example.com");

    const call = global.fetch.mock.calls[0][0];
    expect(call).toContain("user%40example.com");
  });
});
