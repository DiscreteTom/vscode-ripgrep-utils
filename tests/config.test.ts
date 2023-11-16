import { config } from "../src";

describe("config", () => {
  test("default debug", () => {
    expect(config.debug).toBe(false);
  });

  test("default logger", () => {
    const _log = console.log;
    console.log = jest.fn();
    config.logger({});
    expect(console.log).not.toHaveBeenCalled();
    config.logger({ cmd: "" });
    expect(console.log).not.toHaveBeenCalled();
    config.logger({ cmd: "test" });
    expect(console.log).toHaveBeenCalledWith(
      "[vscode-ripgrep-utils] cmd: test",
    );
    console.log = _log;
  });
});
