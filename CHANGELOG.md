# CHANGELOG

## v0.5.0

- **_Breaking Change_**: rewrite `exec`/`execJson`. The return value is changed. [#1](https://github.com/DiscreteTom/vscode-ripgrep-utils/issues/1)
  - The return value of `search` is changed accordingly.

## v0.4.3

- Add coverage tests.

## v0.4.2

- Fix: default logger function.

## v0.4.1

- Fix: exclude empty line for JSON result.
- Fix: default logger function.

## v0.4.0

- **_Breaking Change_**: set stdout to empty string when ripgrep no match, instead of throwing errors.
- Feat: customizable logger.

## v0.3.1

- Feat: add type `SubMatch`.
- Feat: add `config.debug`.
- Note: optimize comments.
- Fix: search's escaped params.

## v0.3.0

- **_Breaking Change_**: auto escape command line params.

## v0.2.0

- **_Breaking Change_**: at least one of `regex` and `literal` is needed in `search` function.
- Feat: more detailed types.
- Fix: export structure.

## v0.1.0

The initial release.
