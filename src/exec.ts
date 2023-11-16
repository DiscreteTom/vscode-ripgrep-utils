import * as child_process from "child_process";
import type { RgJsonResultLine } from "./model";
import { isWindows } from "./const";
import { Manager } from "esc4sh";
import { config } from "./config";

const escaper = new Manager();

/**
 * Execute a command. Return the stdout if success, otherwise throw an error.
 * The params will be escaped and quoted automatically.
 * @example
 * import * as vscode from "vscode";
 * const bin = await getBinPath(vscode.env.appRoot);
 * exec(bin, "--version");
 */
export async function exec(
  /**
   * The absolute path to the ripgrep binary.
   */
  bin: string,
  ...params: string[]
) {
  return new Promise<string>(function (resolve, reject) {
    const cmd = [
      `${isWindows ? `"${bin}"` : bin}`,
      ...params.map((p) => escaper.escape(p)),
    ].join(" ");
    if (config.debug) console.log(`cmd: ${cmd}`);

    child_process.exec(cmd, (error, stdout, stderr) => {
      if (error !== null || stderr.length !== 0) {
        reject({ error, stderr });
      }
      resolve(stdout);
    });
  });
}

/**
 * Execute a command. Auto append `--json` to the command and parse the stdout as JSON result.
 * The params will be escaped and quoted automatically.
 * @example
 * import * as vscode from "vscode";
 * const bin = await getBinPath(vscode.env.appRoot);
 * execJson(bin, "-e 123");
 */
export async function execJson(
  /**
   * The absolute path to the ripgrep binary.
   */
  bin: string,
  ...params: string[]
) {
  return await exec(bin, "--json", ...params).then((stdout) =>
    stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as RgJsonResultLine),
  );
}
