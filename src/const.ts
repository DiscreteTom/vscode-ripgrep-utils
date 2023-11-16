import { config } from "./config";

/**
 * Whether the current platform is Windows.
 */
export const isWindows = /^win/.test(process.platform);

/**
 * The name of the ripgrep binary.
 * This is `rg.exe` on Windows and `rg` on other platforms.
 */
export const binName = isWindows ? "rg.exe" : "rg";

if (config.debug) {
  config.logger({ isWindows });
  config.logger({ binName });
}
