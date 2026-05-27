import { describe, expect, it } from "@jest/globals";
import type { DatoDiario2 } from "../../src/internal/data/Models.js";
import type { Daily2Data } from "../../src/public/data/Models.js";

describe("Daily2 models", () => {
  it("should enforce and preserve internal DatoDiario2 shape", () => {
    const internalSample: DatoDiario2 = {
      IdProvincia: 41,
      IdEstacion: "SE001",
      Año: 2024,
      Dia: 120,
      Calmas: 4,
      NoCalmas: 20,
      Temp_40a_30: 0,
      Temp_30a_20: 2,
      Temp_20a_10: 5,
      Temp_10a_0: 1,
      Temp_0a_10: 6,
      Temp_10a_20: 7,
      Temp_20a_30: 3,
      Temp_30a_40: 0,
      Temp_40a_50: 0,
      Temp_50a_60: 0,
    };

    expect(typeof internalSample.IdProvincia).toBe("number");
    expect(typeof internalSample.IdEstacion).toBe("string");
    expect(internalSample).toHaveProperty("Temp_50a_60");
  });

  it("should enforce and preserve public Daily2Data shape", () => {
    const publicSample: Daily2Data = {
      provinceId: 41,
      stationId: "SE001",
      year: 2024,
      dayOfYear: 120,
      calms: 4,
      nonCalms: 20,
      temp40to30: 0,
      temp30to20: 2,
      temp20to10: 5,
      temp10to0: 1,
      temp0to10: 6,
      temp10to20: 7,
      temp20to30: 3,
      temp30to40: 0,
      temp40to50: 0,
      temp50to60: 0,
    };

    expect(typeof publicSample.provinceId).toBe("number");
    expect(typeof publicSample.stationId).toBe("string");
    expect(publicSample).toHaveProperty("temp50to60");
  });
});
