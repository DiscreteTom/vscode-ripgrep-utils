import * as path from "path";
import { binName } from "./const";
import { pathExists } from "./utils";

/**
 * Get the path to the ripgrep binary.
 * If it exists, return the path.
 * If it doesn't exist, return `undefined`.
 * @example
 * import * as vscode from "vscode";
 * await getRgFilePath(vscode.env.appRoot);
 * // => "c:\\Users\\xxx\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\node_modules.asar.unpacked\\@vscode\\ripgrep\\bin\\rg.exe"
 */
export async function getRgFilePath(vscodeAppRoot: string) {
  const checkPath = (pkgFolder: string) =>
    pathExists(path.join(vscodeAppRoot, pkgFolder, binName));

  // ripgrep is installed as a dependency of vscode
  // and might be in different locations depending on the platform and the version of vscode
  return (
    (await checkPath("node_modules/@vscode/ripgrep/bin/")) ??
    (await checkPath("node_modules/vscode-ripgrep/bin")) ??
    (await checkPath("node_modules.asar.unpacked/vscode-ripgrep/bin/")) ??
    (await checkPath("node_modules.asar.unpacked/@vscode/ripgrep/bin/"))
  );
}

/**
 * Get the path to the ripgrep binary folder.
 * If it exists, return the path.
 * If it doesn't exist, return `undefined`.
 * @example
 * import * as vscode from "vscode";
 * await getRgFolderPath(vscode.env.appRoot);
 * // => "c:\\Users\\xxx\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\node_modules.asar.unpacked\\@vscode\\ripgrep\\bin"
 */
export async function getRgFolderPath(vscodeAppRoot: string) {
  return (await getRgFilePath(vscodeAppRoot))?.slice(0, -binName.length - 1);
}
