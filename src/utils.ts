import * as fs from "fs";

/**
 * Check if a path exists.
 * If it exists, return the path.
 * If it doesn't exist, return `undefined`.
 */
export async function pathExists(path: string): Promise<string | undefined> {
  return new Promise((resolve) => {
    fs.access(path, (err) => {
      resolve(err === null ? path : undefined);
    });
  });
}
