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

export function ensureArray(value: undefined | string | string[]) {
  return value === undefined ? [] : value instanceof Array ? value : [value];
}

export type AtLeastOneOf<T, Keys extends keyof T = keyof T> = {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];
