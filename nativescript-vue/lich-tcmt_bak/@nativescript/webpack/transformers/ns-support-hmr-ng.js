"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAcceptMainModuleCode = exports.getHmrOptionsCode = exports.GeneratedDynamicAppOptions = exports.handleHmrSupport = exports.nsSupportHmrNg = void 0;
const path_1 = require("path");
const ts = require("typescript");
const transformers_1 = require("@ngtools/webpack/src/transformers");
const ast_utils_1 = require("../utils/ast-utils");
function nsSupportHmrNg(getNgCompiler, entryPath) {
    const standardTransform = function (sourceFile) {
        let ops = [];
        if (!entryPath || path_1.normalize(sourceFile.fileName) !== path_1.normalize(entryPath)) {
            return ops;
        }
        try {
            ops = handleHmrSupport(sourceFile);
        }
        catch (e) {
            ops = [];
        }
        return ops;
    };
    return transformers_1.makeTransform(standardTransform, () => getNgCompiler().typeChecker);
}
exports.nsSupportHmrNg = nsSupportHmrNg;
function handleHmrSupport(mainFile) {
    const importNodesInFile = transformers_1.collectDeepNodes(mainFile, ts.SyntaxKind.ImportDeclaration);
    if (!importNodesInFile || !importNodesInFile.length) {
        return [];
    }
    const bootstrapModuleCallNode = ast_utils_1.findBootstrapModuleCallInSource(mainFile);
    if (!bootstrapModuleCallNode || !bootstrapModuleCallNode.arguments || !bootstrapModuleCallNode.arguments.length) {
        return [];
    }
    const appModuleName = ast_utils_1.getExpressionName(bootstrapModuleCallNode.arguments[0]);
    const nativeScriptPlatformCallNode = ast_utils_1.findNativeScriptPlatformCallInSource(mainFile);
    if (!nativeScriptPlatformCallNode || !nativeScriptPlatformCallNode.arguments) {
        return [];
    }
    return handleHmrSupportCore(mainFile, importNodesInFile, appModuleName, nativeScriptPlatformCallNode);
}
exports.handleHmrSupport = handleHmrSupport;
function handleHmrSupportCore(mainFile, importNodesInFile, appModuleName, nativeScriptPlatformCallNode) {
    const firstImportNode = importNodesInFile[0];
    const lastImportNode = importNodesInFile[importNodesInFile.length - 1];
    const appModulePath = ast_utils_1.findBootstrappedModulePathInSource(mainFile);
    if (!appModuleName || !appModulePath) {
        return [];
    }
    let currentAppOptionsInitializationNode = ts.createObjectLiteral();
    if (nativeScriptPlatformCallNode.arguments.length > 0) {
        currentAppOptionsInitializationNode = nativeScriptPlatformCallNode.arguments[0];
    }
    const optionsDeclaration = ts.createVariableDeclaration(exports.GeneratedDynamicAppOptions, undefined, ts.createObjectLiteral());
    const optionsDeclarationList = ts.createVariableDeclarationList([optionsDeclaration]);
    const optionsStatement = ts.createVariableStatement(undefined, optionsDeclarationList);
    const setHmrOptionsNode = ts.createIdentifier(getHmrOptionsCode(appModuleName, appModulePath));
    const acceptHmrNode = ts.createIdentifier(getAcceptMainModuleCode(appModulePath));
    const objectAssignNode = ts.createPropertyAccess(ts.createIdentifier('Object'), ts.createIdentifier('assign'));
    const extendAppOptionsNode = ts.createCall(objectAssignNode, undefined, [currentAppOptionsInitializationNode, ts.createIdentifier(exports.GeneratedDynamicAppOptions)]);
    const newNsDynamicCallArgs = ts.createNodeArray([extendAppOptionsNode, ...nativeScriptPlatformCallNode.arguments.slice(1)]);
    const nsPlatformPath = ast_utils_1.findNativeScriptPlatformPathInSource(mainFile);
    const nsPlatformText = ast_utils_1.getExpressionName(nativeScriptPlatformCallNode.expression);
    const newNsDynamicCallNode = ts.createCall(ts.createPropertyAccess(ts.createIdentifier(NsNgPlatformStarImport), ts.createIdentifier(nsPlatformText)), [], newNsDynamicCallArgs);
    return [...transformers_1.insertStarImport(mainFile, ts.createIdentifier(NsNgPlatformStarImport), nsPlatformPath, firstImportNode, true), new transformers_1.AddNodeOperation(mainFile, lastImportNode, undefined, optionsStatement), new transformers_1.AddNodeOperation(mainFile, lastImportNode, undefined, setHmrOptionsNode), new transformers_1.AddNodeOperation(mainFile, lastImportNode, undefined, acceptHmrNode), new transformers_1.ReplaceNodeOperation(mainFile, nativeScriptPlatformCallNode, newNsDynamicCallNode)];
}
exports.GeneratedDynamicAppOptions = 'options_Generated';
const NsNgPlatformStarImport = 'nativescript_angular_platform_Generated';
function getHmrOptionsCode(appModuleName, appModulePath) {
    return `
if (module["hot"]) {
    ${exports.GeneratedDynamicAppOptions} = {
        hmrOptions: {
            moduleTypeFactory: function () { return require("${appModulePath}").${appModuleName}; },
            livesyncCallback: function (platformReboot) { setTimeout(platformReboot, 0); }
        }
    };
}
`;
}
exports.getHmrOptionsCode = getHmrOptionsCode;
function getAcceptMainModuleCode(mainModulePath) {
    return `
if (module["hot"]) {
    module["hot"].accept(["${mainModulePath}"], function () {
        global["hmrRefresh"]({});
    });
}
`;
}
exports.getAcceptMainModuleCode = getAcceptMainModuleCode;
//# sourceMappingURL=ns-support-hmr-ng.js.map