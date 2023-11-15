import { execJson } from "./exec";

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
  return await execJson(
    options.bin,
    "string" in options ? `-F ${options.string}` : "",
    "regex" in options ? `-e ${options.regex}` : "",
    options.globs?.map((glob) => `-g ${glob}`).join(" ") ?? "",
    options.fileType?.map((t) => `-t ${t}`).join(" ") ?? "",
    options.multiline ? "--multiline" : "",
    options.folder,
  );
}
