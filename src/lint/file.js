const fs = require("fs");
const CONFIG = require("../config.js");
const apis = require("../apis.json");

const config = CONFIG.get;

module.exports = function (filePath) {
  var fileData = fs.readFileSync(filePath, "utf-8");

  // fill in user and default mappings
  var maps = config.mappings;
  maps.__lint_DEFAULT_module_UNGUESSABLE__ = "require('vscode')";
  const keys = Object.keys(maps);
  for (var i = 0; i < keys.length; i++) {
    fileData = fileData.replace(new RegExp(keys[i], "g"), maps[keys[i]]);
  }

  // After replacement
  console.debug(fileData);

  const keys2 = Object.keys(apis.apiMappings);
  var requiredVersion = 63;
  for (var i = 0; i < keys2.length; i++) {
    if (fileData.includes(keys2[i]) && apis.apiMappings[keys2[i]] > requiredVersion) {
      requiredVersion = apis.apiMappings[keys2[i]];
      console.log(`found ${keys2[i]}  (requires 1.${apis.apiMappings[keys2[i]].toFixed(1)})`);
    }
  }
  console.log({ requiredVersion });
};
