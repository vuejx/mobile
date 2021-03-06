"use strict";
// inspired by:
// https://github.com/angular/angular-cli/blob/d202480a1707be6575b2c8cf0383cfe6db44413c/packages/schematics/angular/utility/ast-utils.ts
// https://github.com/angular/angular-cli/blob/d202480a1707be6575b2c8cf0383cfe6db44413c/packages/schematics/angular/utility/ng-ast-utils.ts
// https://github.com/NativeScript/nativescript-schematics/blob/438b9e3ef613389980bfa9d071e28ca1f32ab04f/src/ast-utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpressionName = exports.angularImportsFromNode = exports.getDecoratorMetadata = exports.getObjectPropertyMatches = exports.findIdentifierNode = exports.getAppModulePath = exports.findNativeScriptPlatformPathInSource = exports.findBootstrappedModulePathInSource = exports.findBootstrappedModulePath = exports.findMethodCallInSource = exports.findNativeScriptPlatformCallInSource = exports.findBootstrapModuleCallInSource = exports.findBootstrapModuleCall = exports.getMainModulePath = void 0;
// important notes:
// 1) DO NOT USE `null` when building nodes or you will get `Cannot read property 'transformFlags' of null`
// https://github.com/Microsoft/TypeScript/issues/22372#issuecomment-371221056
// 2) DO NOT USE `node.getText()` or `node.getFullText()` while analyzing the AST - it is trying to  read
//  the text from the source file and if the node is affected by another transformer, it will lead to
//  an unexpected behavior. You can use `identifier.text` instead.
// 3) DO NOT USE `node.parent` while analyzing the AST. It will be null when the node is replaced by
// another transformer and will lead to an exception. Take a look at `findMethodCallInSource` for an
// example of a working workaround by searching for content in each parent.
// 4) Always test your transformer both single and in combinations with the other ones.
const path_1 = require("path");
const ts = require("typescript");
const fs_1 = require("fs");
const transformers_1 = require("@ngtools/webpack/src/transformers");
const tsconfig_utils_1 = require("./tsconfig-utils");
function getMainModulePath(entryFilePath, tsConfigName) {
    try {
        // backwards compatibility
        tsConfigName = tsConfigName || 'tsconfig.tns.json';
        const tsModuleName = findBootstrappedModulePath(entryFilePath);
        const result = tsResolve(tsModuleName, entryFilePath, tsConfigName);
        return result;
    }
    catch (e) {
        return null;
    }
}
exports.getMainModulePath = getMainModulePath;
/**
 * Returns the real path to the ts/d.ts of the specified `moduleName` relative to the specified `containingFilePath`. (e.g. `~/app/file` -> `./app/file.ts`)
 * @param moduleName The name of the module to be resolved (e.g. `~/config.js`, `lodash`, `./already-relative.js`, `@custom-path/file`).
 * @param containingFilePath An absolute path to the file where the `moduleName` is imported. The relative result will be based on this file.
 * @param tsConfigName The name of the tsconfig which will be used during the module resolution (e.g. `tsconfig.json`).
 * We need this config in order to get its compiler options into account (e.g. resolve any custom `paths` like `~` or `@src`).
 */
function tsResolve(moduleName, containingFilePath, tsConfigName) {
    let result = moduleName;
    try {
        const moduleResolutionHost = {
            fileExists: ts.sys.fileExists,
            readFile: ts.sys.readFile,
        };
        const compilerOptions = tsconfig_utils_1.getCompilerOptionsFromTSConfig(tsConfigName);
        const resolutionResult = ts.resolveModuleName(moduleName, containingFilePath, compilerOptions, moduleResolutionHost);
        if (resolutionResult && resolutionResult.resolvedModule && resolutionResult.resolvedModule.resolvedFileName) {
            result = path_1.relative(path_1.dirname(containingFilePath), resolutionResult.resolvedModule.resolvedFileName);
        }
    }
    catch (err) { }
    return result;
}
function findBootstrapModuleCall(mainPath) {
    const source = getSourceFile(mainPath);
    return findBootstrapModuleCallInSource(source);
}
exports.findBootstrapModuleCall = findBootstrapModuleCall;
function findBootstrapModuleCallInSource(source) {
    return findMethodCallInSource(source, 'bootstrapModule') || findMethodCallInSource(source, 'bootstrapModuleFactory');
}
exports.findBootstrapModuleCallInSource = findBootstrapModuleCallInSource;
function findNativeScriptPlatformCallInSource(source) {
    return findMethodCallInSource(source, 'platformNativeScriptDynamic') || findMethodCallInSource(source, 'platformNativeScript');
}
exports.findNativeScriptPlatformCallInSource = findNativeScriptPlatformCallInSource;
function findMethodCallInSource(source, methodName) {
    const allMethodCalls = transformers_1.collectDeepNodes(source, ts.SyntaxKind.CallExpression);
    let methodCallNode = null;
    for (const callNode of allMethodCalls) {
        const currentMethodName = getExpressionName(callNode.expression);
        if (methodName === currentMethodName) {
            methodCallNode = callNode;
        }
    }
    return methodCallNode;
}
exports.findMethodCallInSource = findMethodCallInSource;
function findBootstrappedModulePath(mainPath) {
    const source = getSourceFile(mainPath);
    return findBootstrappedModulePathInSource(source);
}
exports.findBootstrappedModulePath = findBootstrappedModulePath;
function findBootstrappedModulePathInSource(source) {
    const bootstrapCall = findBootstrapModuleCallInSource(source);
    if (!bootstrapCall) {
        throw new Error('Bootstrap call not found');
    }
    const appModulePath = getExpressionImportPath(source, bootstrapCall.arguments[0]);
    return appModulePath;
}
exports.findBootstrappedModulePathInSource = findBootstrappedModulePathInSource;
function findNativeScriptPlatformPathInSource(source) {
    const nsPlatformCall = findNativeScriptPlatformCallInSource(source);
    if (!nsPlatformCall) {
        throw new Error('NativeScriptPlatform call not found');
    }
    const nsPlatformImportPath = getExpressionImportPath(source, nsPlatformCall.expression);
    return nsPlatformImportPath;
}
exports.findNativeScriptPlatformPathInSource = findNativeScriptPlatformPathInSource;
function getImportPathInSource(source, importName) {
    const allImports = transformers_1.collectDeepNodes(source, ts.SyntaxKind.ImportDeclaration);
    const importPath = allImports
        .filter((imp) => {
        return findIdentifierNode(imp, importName);
    })
        .map((imp) => {
        const modulePathStringLiteral = imp.moduleSpecifier;
        return modulePathStringLiteral.text;
    })[0];
    return importPath;
}
function getAppModulePath(mainPath) {
    const moduleRelativePath = findBootstrappedModulePath(mainPath);
    const mainDir = path_1.dirname(mainPath);
    const modulePath = path_1.join(mainDir, `${moduleRelativePath}.ts`);
    return modulePath;
}
exports.getAppModulePath = getAppModulePath;
function findIdentifierNode(node, text) {
    if (node.kind === ts.SyntaxKind.Identifier && node.text === text) {
        return node;
    }
    let foundNode = null;
    ts.forEachChild(node, (childNode) => {
        foundNode = foundNode || findIdentifierNode(childNode, text);
    });
    return foundNode;
}
exports.findIdentifierNode = findIdentifierNode;
function getObjectPropertyMatches(objectNode, sourceFile, targetPropertyName) {
    return objectNode.properties
        .filter((prop) => prop.kind == ts.SyntaxKind.PropertyAssignment)
        .filter((prop) => {
        const name = prop.name;
        switch (name.kind) {
            case ts.SyntaxKind.Identifier:
                return name.text == targetPropertyName;
            case ts.SyntaxKind.StringLiteral:
                return name.text == targetPropertyName;
        }
        return false;
    });
}
exports.getObjectPropertyMatches = getObjectPropertyMatches;
function getDecoratorMetadata(source, identifier, module) {
    const angularImports = transformers_1.collectDeepNodes(source, ts.SyntaxKind.ImportDeclaration)
        .map((node) => angularImportsFromNode(node, source))
        .reduce((acc, current) => {
        for (const key of Object.keys(current)) {
            acc[key] = current[key];
        }
        return acc;
    }, {});
    return transformers_1.collectDeepNodes(source, ts.SyntaxKind.Decorator)
        .filter((node) => {
        return node.expression.kind == ts.SyntaxKind.CallExpression;
    })
        .map((node) => node.expression)
        .filter((expr) => {
        if (expr.expression.kind == ts.SyntaxKind.Identifier) {
            const id = expr.expression;
            return id.getFullText(source) == identifier && angularImports[id.getFullText(source)] === module;
        }
        else if (expr.expression.kind == ts.SyntaxKind.PropertyAccessExpression) {
            // This covers foo.NgModule when importing * as foo.
            const paExpr = expr.expression;
            // If the left expression is not an identifier, just give up at that point.
            if (paExpr.expression.kind !== ts.SyntaxKind.Identifier) {
                return false;
            }
            const id = paExpr.name.text;
            const moduleId = paExpr.expression.text;
            return id === identifier && angularImports[moduleId + '.'] === module;
        }
        return false;
    })
        .filter((expr) => expr.arguments[0] && (expr.arguments[0].kind == ts.SyntaxKind.ObjectLiteralExpression || expr.arguments[0].kind == ts.SyntaxKind.Identifier))
        .map((expr) => expr.arguments[0]);
}
exports.getDecoratorMetadata = getDecoratorMetadata;
function angularImportsFromNode(node, _sourceFile) {
    const ms = node.moduleSpecifier;
    let modulePath;
    switch (ms.kind) {
        case ts.SyntaxKind.StringLiteral:
            modulePath = ms.text;
            break;
        default:
            return {};
    }
    if (!modulePath.startsWith('@angular/')) {
        return {};
    }
    if (node.importClause) {
        if (node.importClause.name) {
            // This is of the form `import Name from 'path'`. Ignore.
            return {};
        }
        else if (node.importClause.namedBindings) {
            const nb = node.importClause.namedBindings;
            if (nb.kind == ts.SyntaxKind.NamespaceImport) {
                // This is of the form `import * as name from 'path'`. Return `name.`.
                return {
                    [nb.name.text + '.']: modulePath,
                };
            }
            else {
                // This is of the form `import {a,b,c} from 'path'`
                const namedImports = nb;
                return namedImports.elements
                    .map((is) => (is.propertyName ? is.propertyName.text : is.name.text))
                    .reduce((acc, curr) => {
                    acc[curr] = modulePath;
                    return acc;
                }, {});
            }
        }
        return {};
    }
    else {
        // This is of the form `import 'path';`. Nothing to do.
        return {};
    }
}
exports.angularImportsFromNode = angularImportsFromNode;
function getExpressionName(expression) {
    let text = '';
    if (!expression) {
        return text;
    }
    if (expression.kind == ts.SyntaxKind.Identifier) {
        text = expression.text;
    }
    else if (expression.kind == ts.SyntaxKind.PropertyAccessExpression) {
        text = expression.name.text;
    }
    return text;
}
exports.getExpressionName = getExpressionName;
function getExpressionImportPath(source, expression) {
    let importString = '';
    if (!expression) {
        return undefined;
    }
    if (expression.kind == ts.SyntaxKind.Identifier) {
        importString = expression.text;
    }
    else if (expression.kind == ts.SyntaxKind.PropertyAccessExpression) {
        const targetPAArg = expression;
        if (targetPAArg.expression.kind == ts.SyntaxKind.Identifier) {
            importString = targetPAArg.expression.text;
        }
    }
    const importPath = getImportPathInSource(source, importString);
    return importPath;
}
function getSourceFile(mainPath) {
    if (!fs_1.existsSync(mainPath)) {
        throw new Error(`Main file (${mainPath}) not found`);
    }
    const mainText = fs_1.readFileSync(mainPath, 'utf8');
    const source = ts.createSourceFile(mainPath, mainText, ts.ScriptTarget.Latest, true);
    return source;
}
//# sourceMappingURL=ast-utils.js.map