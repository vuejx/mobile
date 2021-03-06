"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoEmitOnErrorFromTSConfig = exports.getCompilerOptionsFromTSConfig = void 0;
const ts = require("typescript");
function getCompilerOptionsFromTSConfig(tsConfigPath) {
    const parseConfigFileHost = {
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        useCaseSensitiveFileNames: false,
        readDirectory: ts.sys.readDirectory,
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        onUnRecoverableConfigFileDiagnostic: undefined,
    };
    const tsConfig = ts.getParsedCommandLineOfConfigFile(tsConfigPath, ts.getDefaultCompilerOptions(), parseConfigFileHost);
    const compilerOptions = tsConfig.options || ts.getDefaultCompilerOptions();
    return compilerOptions;
}
exports.getCompilerOptionsFromTSConfig = getCompilerOptionsFromTSConfig;
function getNoEmitOnErrorFromTSConfig(tsConfigPath) {
    const compilerOptions = getCompilerOptionsFromTSConfig(tsConfigPath);
    const noEmitOnError = !!compilerOptions.noEmitOnError;
    return noEmitOnError;
}
exports.getNoEmitOnErrorFromTSConfig = getNoEmitOnErrorFromTSConfig;
//# sourceMappingURL=tsconfig-utils.js.map