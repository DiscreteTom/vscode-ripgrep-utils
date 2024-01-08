import * as child_process from "child_process";
import { exec } from "../src";

jest.mock("child_process");
const mocked = jest.mocked(child_process, { shallow: true });

describe("exec", () => {
  test("no match", async () => {
    mocked.spawn.mockImplementation(((_command: string, _params: string[]) => {
      return {
        stdout: {
          on: (_event: "data", cb: (data: Buffer) => void) => {
            cb(Buffer.from(""));
          },
        },
        stderr: {
          on: (_event: "data", cb: (data: Buffer) => void) => {
            cb(Buffer.from(""));
          },
        },
        on: (
          event: "close" | "error",
          cb: (err: Error | number | null) => void,
        ) => {
          if (event === "error")
            setTimeout(() => cb({ name: "", message: "" }));
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    // don't throw error, return empty stdout
    expect((await exec("echo")).stdout).toBe("");
    expect((await exec("echo")).stderr).toBe("");
    expect((await exec("echo")).error).toEqual({ name: "", message: "" });
  });

  test("stderr", async () => {
    mocked.spawn.mockImplementation(((_command: string, _params: string[]) => {
      return {
        stdout: {
          on: (_event: "data", cb: (data: Buffer) => void) => {
            cb(Buffer.from(""));
          },
        },
        stderr: {
          on: (_event: "data", cb: (data: Buffer) => void) => {
            cb(Buffer.from("123"));
          },
        },
        on: (
          event: "close" | "error",
          cb: (err: Error | number | null) => void,
        ) => {
          if (event === "error")
            setTimeout(() => cb({ name: "", message: "" }));
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    expect(await exec("echo")).toEqual({
      stdout: "",
      stderr: "123",
      error: { name: "", message: "" },
    });
  });
});
