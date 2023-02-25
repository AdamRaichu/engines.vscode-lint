#! /usr/bin/env node

const argv = require("minimist-lite")(process.argv.slice(2));
const CONFIG = require("./config.js");
const lintFile = require("./lint/file.js");
const fs = require("fs");

// Get config file
const config = CONFIG.get;

if (argv._[0] === "config") {
  const configFilePath = argv["config-file-path"] || "engines.vscode-lint.json";
  if (argv._[1] === "reset") {
    if (argv.help) {
      console.log("About the commands...");
    }
    if (argv.confirm) {
      console.log("Reset confirmed.");
      fs.writeFileSync(configFilePath, JSON.stringify(CONFIG.default, null, 2));
      console.log(`File written at ${configFilePath}`);
    } else {
      console.warn("warn: Resetting config file will overwrite all previously set settings.");
      console.warn("warn: Run with the --confirm flag to perform action");
    }
  } else {
    if (argv.help) {
      console.log("About the command...");
    }
  }
} else if (argv._[0] === "lint") {
  if (argv._[1] === "file") {
    if (fs.existsSync(argv._[2])) {
      lintFile(argv._[2]);
    } else {
      throw new Error("ERR: File does not exist.");
    }
  }
}
