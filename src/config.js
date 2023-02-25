"use strict";

const argv = require("minimist-lite")(process.argv.slice(2));
const fs = require("fs");

const configFilePath = argv["config-file-path"] || "engines.vscode-lint.json";

module.exports = {
  default: {
    mappings: { 'require("vscode")': "__lint_DEFAULT_module_UNGUESSABLE__", "require(`vscode`)": "__lint_DEFAULT_module_UNGUESSABLE__", vscode: "__lint_DEFAULT_module_UNGUESSABLE__" },
  },
  get get() {
    if (fs.existsSync(configFilePath)) {
      var userConfig = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
      return this.parse(userConfig);
    } else {
      return this.parse({});
    }
  },
  parse: function (input) {
    var output = JSON.parse(JSON.stringify(this.default));
    const keys = Object.keys(input);
    for (var i = 0; i < keys.length; i++) {
      output[keys[i]] = input[keys[i]];
    }

    return output;
  },
};

exports.get = function () {
  if (fs.existsSync(configFilePath)) {
    var userConfig = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
    return this.parse(userConfig);
  } else {
    return this.parse({});
  }
};
