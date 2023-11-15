# vscode-ripgrep-utils

[![npm](https://img.shields.io/npm/v/vscode-ripgrep-utils?style=flat-square)](https://www.npmjs.com/package/vscode-ripgrep-utils)
![coverage](https://img.shields.io/codecov/c/github/DiscreteTom/vscode-ripgrep-utils?style=flat-square)
![build](https://img.shields.io/github/actions/workflow/status/DiscreteTom/vscode-ripgrep-utils/publish.yml?style=flat-square)
![license](https://img.shields.io/github/license/DiscreteTom/vscode-ripgrep-utils?style=flat-square)

Utils to make it easy to call [`ripgrep`](https://github.com/BurntSushi/ripgrep) in VSCode's extensions.

## Install

```bash
yarn add vscode-ripgrep-utils
```

## Usage

VSCode use `ripgrep` to search files. There is a `rg` binary in VSCode's installation directory, but the location differs on different platforms and different versions. This package provides a `getBinPath` function to get the absolute path of the `rg` binary.

```ts
import * as vscode from "vscode";
await getBinPath(vscode.env.appRoot);
```

Then you can use the high level `search` function to search files, or the low level `exec`/`execJson` functions to execute `ripgrep` with custom arguments.

```ts
import * as vscode from "vscode";
const bin = await getBinPath(vscode.env.appRoot);
await search({ bin, folder: "./", regex: "123" });
await exec(bin, "--version");
await execJson(bin, "-e 123");
```

## Credit

This project is inspired by [Gruntfuggly/todo-tree](https://github.com/Gruntfuggly/todo-tree/tree/a6f60e0ce830c4649ac34fc05e5a1799ec91d151) and [alexlafroscia/ripgrep-js](https://github.com/alexlafroscia/ripgrep-js)

## [CHANGELOG](./CHANGELOG.md)
