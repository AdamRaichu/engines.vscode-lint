const fs = require("fs");
const CONFIG = require("../config.js");
const apis = require("../apis.json");

const config = CONFIG.get;

module.exports = function (filePath) {
  var fileData = fs.readFileSync(filePath, "utf-8");

  // fill in user and default mappings
  var maps = config.mappings;

  // add require patterns
  maps['require("vscode")'] = "_5efafd35_5abc_42ed_8595_e2bf874075aa";
  maps["require(`vscode`)"] = "_5efafd35_5abc_42ed_8595_e2bf874075aa";

  var keys = Object.keys(maps);

  if (config.useDefaultAlias) {
    // Deal with `vscode` (Must be handled after require(vscode) patterns)
    maps.vscode = "_5efafd35_5abc_42ed_8595_e2bf874075aa";
    keys.push("vscode");
  }

  // Switch aliases with require('vscode')
  maps._5efafd35_5abc_42ed_8595_e2bf874075aa = "require('vscode')";
  keys.push("_5efafd35_5abc_42ed_8595_e2bf874075aa");
  for (var i = 0; i < keys.length; i++) {
    // Need to filter out parentheses
    const searchString = keys[i].replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    fileData = fileData.replace(new RegExp(searchString, "g"), maps[keys[i]]);
  }

  const keys2 = Object.keys(apis.apiMappings);
  var requiredVersion = 63;
  for (var i = 0; i < keys2.length; i++) {
    if (fileData.includes(keys2[i])) {
      console.log(`found ${keys2[i]}  (requires 1.${apis.apiMappings[keys2[i]].toFixed(1)})`);
      if (apis.apiMappings[keys2[i]] > requiredVersion)
        requiredVersion = apis.apiMappings[keys2[i]];
    }
  }
  return requiredVersion;
};
