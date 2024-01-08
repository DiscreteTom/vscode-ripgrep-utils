import * as child_process from "child_process";
import { execJson } from "../src";

jest.mock("child_process");
const mocked = jest.mocked(child_process, { shallow: true });

test("append '--json' to params", async () => {
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
        if (event === "close") setTimeout(() => cb(null));
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any);

  expect((await execJson("echo")).lines).toEqual([]);
  expect((await execJson("echo", "123")).lines).toEqual([]);
});

test("empty stdout", async () => {
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
        if (event === "close") setTimeout(() => cb(null));
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any);

  expect((await execJson("echo")).lines).toEqual([]);
});

test("trim stdout", async () => {
  mocked.spawn.mockImplementation(((_command: string, _params: string[]) => {
    return {
      stdout: {
        on: (_event: "data", cb: (data: Buffer) => void) => {
          cb(Buffer.from("  \n  "));
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
        if (event === "close") setTimeout(() => cb(null));
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any);

  expect((await execJson("echo")).lines).toEqual([]);
});
