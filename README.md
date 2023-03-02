# engines.vscode-lint

An npm package which tells you what minimum version of vscode your extension needs to run (based on parts of the API used).

## Installation

Add this as a devDependency to your project with the following command.

```bash
npm install --save-dev engines.vscode-lint
```

## Usage

> **Note**: For the sake of simplicity (and time), this linter assumes you are using at least `1.63.0` as that is the version required for pre-release versions of extenions.
> This may change in the future once I finish combing changelogs up to the present.

### File linting

> **Important**: Some configuration is likely required! See [configuration](#configuration).

To lint a file, run the following command in your terminal where `path` is the relative path to the file you want to lint.

```bash
engines.vscode-lint lint file <path>
```

The linter does not follow imports, so you will need to run it on every file you wish to lint.

#### Exports

If you want to incorporate this into your build process, you can `require` the module.
The module export is an object with two properties.

`MAX_VSCODE_VERSION` is an number representing the highest version the linter will return (as newer apis are not yet supported.)

`lintFile` is a function that accepts a string as the only parameter.
This string should be a relative path to the file you wish to lint.
The return value will be a number representing the minimum version of vscode the file supports.

### Configuration

The linter will attempt to read a configuration file when linting.
(You can change the path of the file using the argument `--config-file-path`.)
Below is a table explaining each value.

|      Setting      |   Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Default |
| :---------------: | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: |
|    `mappings`     | `Object`  | The linter does not autodetect any aliases you use for your code. (For example `const vsc = require("vscode")`.) Using these without setting `mappings` silently breaks the linter. For this example, you would set `mappings` to `"mappings": {"vsc": "require('vscode')}`. _(You must use `require('vscode')` to reference the requirable module; aliases will silently break the linter.)_ This also applies to the properties of the module. If you use `const window = vscode.window`, you **must** add it to mappings. (`"window": "require('vscode').window"`) |  `{}`   |
| `useDefaultAlias` | `Boolean` | By default, the linter assumes you are using the `const vscode = require("vscode")` pattern somewhere. (This is done because if you are the extension needs to run a specific workaround so that `require("vscode")` doesn't become `require(require("vscode"))` on the backend). If you are not, change `useDefaultAlias` to false.                                                                                                                                                                                                                                  | `true`  |

You can reset your configuration file with the following command.

```bash
engines.vscode-lint config reset
```
