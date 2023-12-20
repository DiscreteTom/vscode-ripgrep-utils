import * as exec from "../src/exec";
import { search } from "../src/search";

jest.mock("../src/exec");
const mocked = jest.mocked(exec, { shallow: true });

test("search params", async () => {
  const cmd = [] as string[];
  mocked.execJson.mockImplementation(
    async (bin: string, ...params: string[]) => {
      cmd.splice(0, cmd.length);
      cmd.push(bin, ...params);
      return Promise.resolve({ lines: [], stderr: "", error: null });
    },
  );

  const bin = "echo";

  // single literal
  expect((await search({ bin, folder: "./", literal: "123" })).lines).toEqual(
    [],
  );
  expect(cmd).toEqual(["echo", "-F", "123", "./"]);

  // multi literal
  expect(
    (await search({ bin, folder: "./", literal: ["123", "456"] })).lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-F", "123", "-F", "456", "./"]);

  // single regex
  expect((await search({ bin, folder: "./", regex: "123" })).lines).toEqual([]);
  expect(cmd).toEqual(["echo", "-e", "123", "./"]);

  // multi regex
  expect(
    (await search({ bin, folder: "./", regex: ["123", "456"] })).lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-e", "123", "-e", "456", "./"]);

  // single globs
  expect(
    (await search({ bin, folder: "./", globs: "123", literal: "123" })).lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-F", "123", "-g", "123", "./"]);

  // multi globs
  expect(
    (await search({ bin, folder: "./", globs: ["123", "456"], literal: "123" }))
      .lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-F", "123", "-g", "123", "-g", "456", "./"]);

  // single fileType
  expect(
    (await search({ bin, folder: "./", fileType: "123", literal: "123" }))
      .lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-F", "123", "-t", "123", "./"]);

  // multi fileType
  expect(
    (
      await search({
        bin,
        folder: "./",
        fileType: ["123", "456"],
        literal: "123",
      })
    ).lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-F", "123", "-t", "123", "-t", "456", "./"]);

  // multiline
  expect(
    (await search({ bin, folder: "./", multiline: true, literal: "123" }))
      .lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-F", "123", "--multiline", "./"]);

  // additional options
  expect(
    (await search({ bin, folder: "./", options: "--foo", literal: "123" }))
      .lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-F", "123", "--foo", "./"]);

  // multi folder
  expect(
    (await search({ bin, folder: ["./", "./foo"], literal: "123" })).lines,
  ).toEqual([]);
  expect(cmd).toEqual(["echo", "-F", "123", "./", "./foo"]);
});
