import { isWindows, binName } from "../src";

describe("const", () => {
  test("is windows", () => {
    expect(isWindows).toBe(/^win/.test(process.platform));
  });

  test("bin name", () => {
    expect(binName).toBe(isWindows ? "rg.exe" : "rg");
  });
});
