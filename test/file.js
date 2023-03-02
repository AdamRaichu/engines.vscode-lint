const vscode = require("vscode");

vscode.TerminalLocation.Panel;

require(`vscode`).languages.registerInlayHintsProvider();

require("vscode").languages.createLanguageStatusItem();
