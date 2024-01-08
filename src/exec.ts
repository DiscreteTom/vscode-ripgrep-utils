import * as child_process from "child_process";
import type { RgJsonResultLine } from "./model";
import { isWindows } from "./const";
import { Manager } from "esc4sh";
import { config } from "./config";

const escaper = new Manager();

export type ExecResult = {
  stdout: string;
  stderr: string;
  error: Error | null;
};

/**
 * Execute a command. Return the stdout, stderr and error.
 * The params will be escaped and quoted automatically.
 *
 * This function will not throw an exception based on the values of stderr or error.
 * @example
 * import * as vscode from "vscode";
 * const bin = await getBinPath(vscode.env.appRoot);
 * const { stdout } = await exec(bin, "--version");
 */
export async function exec(
  /**
   * The absolute path to the ripgrep binary.
   */
  bin: string,
  ...params: string[]
): Promise<ExecResult> {
  return new Promise<ExecResult>(function (resolve) {
    if (config.debug) {
      const cmd = [
        `${isWindows ? `"${bin}"` : bin}`, // for windows, quote the path in case of space in path
        ...params.map((p) => escaper.escape(p)),
      ].join(" ");
      config.logger({ cmd });
    }

    const child = child_process.spawn(bin, params);

    const stdoutBuffer = [] as Buffer[];
    const stderrBuffer = [] as Buffer[];

    child.stdout.on("data", (data) => stdoutBuffer.push(data));
    child.stderr.on("data", (data) => stderrBuffer.push(data));

    child.on("close", (_code) => {
      const stdout = Buffer.concat(stdoutBuffer).toString();
      const stderr = Buffer.concat(stderrBuffer).toString();
      resolve({ stdout, stderr, error: null });
    });
    child.on("error", (error) => {
      const stdout = Buffer.concat(stdoutBuffer).toString();
      const stderr = Buffer.concat(stderrBuffer).toString();
      resolve({ stdout, stderr, error });
    });
  });
}

export type ExecJsonResult = {
  lines: RgJsonResultLine[];
} & Pick<ExecResult, "stderr" | "error">;

/**
 * Execute a command. Auto append `--json` to the command and parse the stdout as JSON result.
 * The params will be escaped and quoted automatically.
 * @example
 * import * as vscode from "vscode";
 * const bin = await getBinPath(vscode.env.appRoot);
 * const { lines } = await execJson(bin, "-e", "123");
 */
export async function execJson(
  /**
   * The absolute path to the ripgrep binary.
   */
  bin: string,
  ...params: string[]
): Promise<ExecJsonResult> {
  return await exec(bin, "--json", ...params).then((res) => ({
    lines: res.stdout
      .trim()
      .split("\n")
      .filter((l) => l.length !== 0)
      .map((line) => JSON.parse(line) as RgJsonResultLine),
    stderr: res.stderr,
    error: res.error,
  }));
}
