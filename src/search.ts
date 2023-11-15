import { execJson } from "./exec";
import { ensureArray } from "./utils";

/**
 * @example
 * import * as vscode from "vscode";
 * const bin = await getBinPath(vscode.env.appRoot);
 * await search({ bin, folder: "./", regex: "123" });
 */
export async function search(props: {
  /**
   * The absolute path to the ripgrep binary.
   */
  bin: string;
  /**
   * The literal string to search for.
   */
  literal?: string | string[];
  /**
   * The regex to search for.
   * This is a rust regex, not a JS regex.
   */
  regex?: string | string[];
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
}) {
  return await execJson(
    props.bin,
    ...ensureArray(props.literal).map((l) => `-F ${l}`),
    ...ensureArray(props.regex).map((r) => `-e ${r}`),
    ...ensureArray(props.globs).map((glob) => `-g ${glob}`),
    ...ensureArray(props.fileType).map((t) => `-t ${t}`),
    props.multiline ? "--multiline" : "",
    ...ensureArray(props.options),
    ...ensureArray(props.folder),
  );
}
