import * as child_process from "child_process";
import { execJson, isWindows } from "../src";
import { Manager } from "esc4sh";

jest.mock("child_process");
const mocked = jest.mocked(child_process, { shallow: true });

test("append '--json' to params", async () => {
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

  expect((await execJson("echo")).lines).toEqual([]);
  expect(cmd).toEqual(
    [isWindows ? `"echo"` : `echo`, escaper.escape("--json")].join(" "),
  );

  expect((await execJson("echo", "123")).lines).toEqual([]);
  expect(cmd).toEqual(
    [
      isWindows ? `"echo"` : `echo`,
      escaper.escape("--json"),
      escaper.escape("123"),
    ].join(" "),
  );
});

test("empty stdout", async () => {
  mocked.exec.mockImplementation(((
    command: string,
    cb: (
      error: child_process.ExecException | null,
      stdout: string,
      stderr: string,
    ) => void,
  ) => {
    cb(null, "", "");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any);

  expect((await execJson("echo")).lines).toEqual([]);
});

test("trim stdout", async () => {
  mocked.exec.mockImplementation(((
    command: string,
    cb: (
      error: child_process.ExecException | null,
      stdout: string,
      stderr: string,
    ) => void,
  ) => {
    cb(null, "  \n  ", "");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any);

  expect((await execJson("echo")).lines).toEqual([]);
});
