import { describe, expect, it } from "@jest/globals";
import { mapDatoDiario2ToDaily2Data } from "../../src/mappers/Mappers.js";
import type { DatoDiario2 } from "../../src/internal/data/Models.js";

describe("Mappers", () => {
  describe("mapDatoDiario2ToDaily2Data", () => {
    it("should map a representative SIAR Diarios2 payload field by field", () => {
      const source: DatoDiario2 = {
        IdProvincia: 29,
        IdEstacion: "MA102",
        Año: 2025,
        Dia: 365,
        Calmas: 3,
        NoCalmas: 21,
        Temp_40a_30: 1,
        Temp_30a_20: 6,
        Temp_20a_10: 8,
        Temp_10a_0: 2,
        Temp_0a_10: 0,
        Temp_10a_20: 4,
        Temp_20a_30: 2,
        Temp_30a_40: 1,
        Temp_40a_50: 0,
        Temp_50a_60: 0,
      };

      const mapped = mapDatoDiario2ToDaily2Data(source);

      expect(mapped).toEqual({
        provinceId: 29,
        stationId: "MA102",
        year: 2025,
        dayOfYear: 365,
        calms: 3,
        nonCalms: 21,
        temp40to30: 1,
        temp30to20: 6,
        temp20to10: 8,
        temp10to0: 2,
        temp0to10: 0,
        temp10to20: 4,
        temp20to30: 2,
        temp30to40: 1,
        temp40to50: 0,
        temp50to60: 0,
      });
    });
  });
});