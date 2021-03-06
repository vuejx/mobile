"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolvedEntryModule = void 0;
const semver = require("semver");
const projectHelpers_1 = require("../helpers/projectHelpers");
function getResolvedEntryModule(ngCompiler, projectDir) {
    const ngCoreVersion = projectDir && semver.coerce(projectHelpers_1.getAngularVersion({ projectDir }));
    let workaroundResolveModule;
    // https://github.com/angular/angular-cli/commit/d2e22e97818c6582ce4a9942c59fcac4a8aaf60e#diff-0f65e27eb122d9efa58bf08adada7f82L364
    if (!ngCoreVersion || semver.gte(ngCoreVersion, '8.0.0')) {
        workaroundResolveModule = require('@ngtools/webpack/src/utils');
    }
    else {
        workaroundResolveModule = require('@ngtools/webpack/src/compiler_host');
    }
    return ngCompiler.entryModule ? { path: workaroundResolveModule.workaroundResolve(ngCompiler.entryModule.path), className: ngCompiler.entryModule.className } : ngCompiler.entryModule;
}
exports.getResolvedEntryModule = getResolvedEntryModule;
//# sourceMappingURL=transformers-utils.js.map