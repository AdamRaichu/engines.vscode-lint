#! /usr/bin/env node

const argv = require("minimist-lite")(process.argv.slice(2));
const sanitize = require("path-sanitizer");
const CONFIG = require("./config.js");
const lintFile = require("./lint/file.js");
const fs = require("fs");

// Get config file

if (argv._[0] === "config") {
  const configFilePath = sanitize(argv["config-file-path"] || "engines.vscode-lint.json");
  if (argv._[1] === "reset") {
    if (argv.help) {
      console.log("This command will reset your configuration file to the default settings.");
    }
    if (argv.confirm) {
      console.log("Reset confirmed.");
      fs.writeFileSync(configFilePath, JSON.stringify(CONFIG.default, null, 2));
      console.log(`File written at ${configFilePath}`);
    } else {
      console.warn(
        "\x1b[33mwarn: \x1b[0mResetting config file will overwrite all previously set settings."
      );
      console.warn("\x1b[33mwarn: \x1b[0mRun with the --confirm flag to perform action");
    }
  } else {
    console.log("Use these subcommands to configure the linter.");
    console.log(`Available commands:
  Reset the configuration file:
    engines.vscode-lint config reset [--confirm]`);
  }
} else if (argv._[0] === "lint") {
  if (argv._[1] === "file") {
    if (fs.existsSync(argv._[2])) {
      console.log(`\x1b[36mMinimum required version: \x1b[0m 1.${lintFile(argv._[2]).toFixed(1)}`);
    } else {
      if (typeof argv._[2] !== "undefined") {
        console.error(`\x1b[31mERR: File "${argv._[2]}" does not exist.`);
      }
    }
  }
} else {
  if (argv.help) {
    console.log(
      `Availabile commands:

  engines.vscode-lint config reset [--confirm]
  engines.vscode-lint lint file <path>`
    );
  }
}
