import * as child_process from "child_process";
import { exec, isWindows } from "../src";
import { Manager } from "esc4sh";

jest.mock("child_process");
const mocked = jest.mocked(child_process, { shallow: true });

describe("exec", () => {
  test("command", async () => {
    let cmd = "";
    const escaper = new Manager();

    mocked.exec.mockImplementation(((
      command: string,
      cb: (
        error: child_process.ExecException | null,
        stdout: string,
        stderr: string,
      ) => void,
    ) => {
      cmd = command;
      cb(null, "", "");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    // bin only
    expect(await exec("echo")).toBe("");
    expect(cmd).toBe(isWindows ? `"echo"` : "echo");

    // with params
    expect(await exec("echo", "^\\", `'"`)).toBe("");
    expect(cmd).toBe(
      [
        isWindows ? `"echo"` : "echo",
        escaper.escape("^\\"),
        escaper.escape(`'"`),
      ].join(" "),
    );
  });

  test("no match", async () => {
    mocked.exec.mockImplementation(((
      _command: string,
      cb: (
        error: child_process.ExecException | null,
        stdout: string,
        stderr: string,
      ) => void,
    ) => {
      cb({ code: 1, name: "", message: "" }, "", "");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    // don't throw error, return empty stdout
    expect(await exec("echo")).toBe("");
  });

  test("other error", async () => {
    mocked.exec.mockImplementation(((
      _command: string,
      cb: (
        error: child_process.ExecException | null,
        stdout: string,
        stderr: string,
      ) => void,
    ) => {
      cb({ code: 2, name: "", message: "" }, "", "");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    await expect(exec("echo")).rejects.toEqual({
      stderr: "",
      error: { code: 2, name: "", message: "" },
    });
  });

  test("stderr", async () => {
    mocked.exec.mockImplementation(((
      _command: string,
      cb: (
        error: child_process.ExecException | null,
        stdout: string,
        stderr: string,
      ) => void,
    ) => {
      cb({ code: 0, name: "", message: "" }, "", "123");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    await expect(exec("echo")).rejects.toEqual({
      stderr: "123",
      error: { code: 0, name: "", message: "" },
    });
  });
});
