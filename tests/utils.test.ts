import { ensureArray, pathExists } from "../src";

describe("utils", () => {
  test("ensure array", () => {
    expect(ensureArray(undefined)).toEqual([]);
    expect(ensureArray("test")).toEqual(["test"]);
    expect(ensureArray(["test"])).toEqual(["test"]);
  });

  test("path exists", async () => {
    expect(await pathExists("./package.json")).toBe("./package.json");
    expect(await pathExists("./package.json123")).toBe(undefined);
  });
});
