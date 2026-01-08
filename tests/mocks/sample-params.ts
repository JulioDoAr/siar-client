import type { DataPetitionParams } from "../../src/client/data/DataService.js";

/**
 * Parámetros de prueba básicos
 */
export const basicParams: DataPetitionParams = {
  ids: ["EST001"],
  startDate: "2026-01-01",
  endDate: "2026-01-07",
};

/**
 * Parámetros con múltiples IDs
 */
export const multipleIdsParams: DataPetitionParams = {
  ids: ["EST001", "EST002", "EST003"],
  startDate: "2026-01-01",
  endDate: "2026-01-07",
};

/**
 * Parámetros con fecha de última modificación
 */
export const paramsWithModificationDate: DataPetitionParams = {
  ids: ["EST001"],
  startDate: "2026-01-01",
  endDate: "2026-01-07",
  lastModifiedDate: "2026-01-03",
};

/**
 * Parámetros para pruebas de caracteres especiales
 */
export const specialCharsParams: DataPetitionParams = {
  ids: ["EST&001", "EST+002"],
  startDate: "2026-01-01",
  endDate: "2026-01-07",
};
