import * as child_process from "child_process";
import type { RgJsonResultLine } from "./model";

/**
 * Execute a command. Return the stdout if success, otherwise throw an error.
 */
export async function exec(bin: string, ...params: string[]) {
  return new Promise<string>(function (resolve, reject) {
    child_process.exec([bin, ...params].join(" "), (error, stdout, stderr) => {
      if (error !== null || stderr.length !== 0) {
        reject({ error, stderr });
      }
      resolve(stdout);
    });
  });
}

/**
 * Execute a command. Auto append `--json` to the command and parse the stdout as JSON result.
 */
export async function execJson(bin: string, ...params: string[]) {
  return await exec(bin, "--json", ...params).then((stdout) =>
    stdout
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as RgJsonResultLine),
  );
}
