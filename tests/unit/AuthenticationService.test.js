import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { AuthenticationService } from "../../src/client/authentication/AuthenticationService.js";
import {
  mockCadenaCifradaResponse,
  mockTokenAutenticacionResponse,
} from "../mocks/mock-responses.js";

// Mock global fetch
global.fetch = jest.fn();

describe("AuthenticationService", () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    service = new AuthenticationService();
  });

  describe("Constructor", () => {
    it("should create an instance", () => {
      expect(service).toBeInstanceOf(AuthenticationService);
    });
  });

  describe("encryptString", () => {
    it("should encrypt a string successfully", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      });

      const result = await service.encryptString("12345678A");

      expect(result).toEqual(mockCadenaCifradaResponse);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("API/V1/Autenticacion/cifrarCadena"),
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("cadena="),
      );
    });

    it("should throw HTTP error", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(service.encryptString("12345678A")).rejects.toThrow(
        "Error HTTP: 404 - Not Found",
      );
    });

    it("should throw network errors", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network failure"));

      await expect(service.encryptString("12345678A")).rejects.toThrow(
        "Network failure",
      );
    });

    it("should encode special characters in the string", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      });

      await service.encryptString("test@example.com");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("test%40example.com"),
      );
    });
  });

  describe("obtainToken", () => {
    it("should obtain authentication token successfully", async () => {
      // Mock first call for encrypting userId
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      });

      // Mock second call for encrypting password
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      });

      // Mock third call for obtaining token
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockTokenAutenticacionResponse,
      });

      const result = await service.obtainToken({
        userId: "12345678A",
        password: "myPassword123",
      });

      expect(result).toEqual("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.token");
      expect(global.fetch).toHaveBeenCalledTimes(3);

      // Verify first call (encrypt user)
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining("cifrarCadena?cadena=12345678A"),
      );

      // Verify second call (encrypt password)
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining("cifrarCadena?cadena=myPassword123"),
      );

      // Verify third call (obtain token)
      expect(global.fetch).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining("obtenerToken"),
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining(
          "Usuario=" + encodeURIComponent(mockCadenaCifradaResponse),
        ),
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining(
          "Password=" + encodeURIComponent(mockCadenaCifradaResponse),
        ),
      );
    });

    it("should throw error when encrypting userId fails", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Encryption failed"));

      await expect(
        service.obtainToken({
          userId: "12345678A",
          password: "myPassword123",
        }),
      ).rejects.toThrow("Encryption failed");
    });

    it("should throw error when encrypting password fails", async () => {
      // Mock successful userId encryption
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
        MensajeRespuesta: null,
      });

      // Mock failed password encryption
      global.fetch.mockRejectedValueOnce(new Error("Encryption failed"));

      await expect(
        service.obtainToken({
          userId: "12345678A",
          password: "myPassword123",
        }),
      ).rejects.toThrow("Encryption failed");
    });

    it("should throw HTTP error when obtaining token", async () => {
      // Mock successful userId encryption
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      });

      // Mock successful password encryption
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      });

      // Mock failed token request
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
    });

    it("should throw network error when obtaining token", async () => {
      // Mock successful userId encryption
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      });

      // Mock successful password encryption
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockCadenaCifradaResponse,
      });

      // Mock network error on token request
      global.fetch.mockRejectedValueOnce(new Error("Network failure"));

      await expect(
        service.obtainToken({
          userId: "12345678A",
          password: "myPassword123",
        }),
      ).rejects.toThrow("Network failure");
    });
  });
});
