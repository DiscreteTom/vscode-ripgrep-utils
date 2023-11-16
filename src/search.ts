import { execJson } from "./exec";
import type { AtLeastOneOf } from "./utils";
import { ensureArray } from "./utils";

/**
 * @example
 * import * as vscode from "vscode";
 * const bin = await getBinPath(vscode.env.appRoot);
 * await search({ bin, folder: "./", regex: "123" });
 */
export async function search(
  props: AtLeastOneOf<{
    /**
     * The literal string to search for.
     */
    literal: string | string[];
    /**
     * The regex to search for.
     * This is a rust regex, not a JS regex.
     */
    regex: string | string[];
  }> & {
    /**
     * The absolute path to the ripgrep binary.
     */
    bin: string;
    globs?: string | string[];
    fileType?: string | string[];
    multiline?: boolean;
    /**
     * Additional options to pass to ripgrep.
     */
    options?: string | string[];
    /**
     * The folder to search in.
     */
    folder: string | string[];
  },
) {
  return await execJson(
    props.bin,
    ...ensureArray(props.literal)
      .map((l) => ["-F", l])
      .flat(),
    ...ensureArray(props.regex)
      .map((r) => ["-e", r])
      .flat(),
    ...ensureArray(props.globs)
      .map((glob) => ["-g", glob])
      .flat(),
    ...ensureArray(props.fileType)
      .map((t) => ["-t", t])
      .flat(),
    ...(props.multiline ? ["--multiline"] : []),
    ...ensureArray(props.options),
    ...ensureArray(props.folder),
  );
}
