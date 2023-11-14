import * as child_process from "child_process";
import { isWindows } from "./const";
import type { RgJsonResultLine } from "./model";

export async function search(
  options: {
    /**
     * The absolute path to the ripgrep binary.
     */
    bin: string;
    /**
     * The folder to search in.
     */
    folder: string;
    globs?: string[];
    fileType?: string[];
    multiline?: boolean;
    env?: Record<string, string>;
  } & (
    | {
        /**
         * The string to search for.
         */
        string: string;
      }
    | {
        /**
         * The regex to search for.
         * This is a rust regex, not a JS regex.
         */
        regex: string;
      }
  ),
) {
  const execString = [
    `${isWindows ? `"${options.bin}"` : options.bin}`,
    "--json",
    "string" in options ? `-F ${options.string}` : "",
    "regex" in options ? `-e ${options.regex}` : "",
    options.globs?.map((glob) => `-g ${glob}`).join(" "),
    options.fileType?.map((t) => `-t ${t}`).join(" "),
    options.multiline ? "--multiline" : "",
    options.folder,
  ].join(" ");

  return new Promise<RgJsonResultLine[]>(function (resolve, reject) {
    child_process.exec(execString, (error, stdout, stderr) => {
      if (error !== null || stderr.length !== 0) {
        reject({ error, stderr });
      }
      resolve(
        stdout
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line) as RgJsonResultLine),
      );
    });
  });
}
