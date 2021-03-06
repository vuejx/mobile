"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../lib/utils");
const path_1 = require("path");
const loader_utils_1 = require("loader-utils");
const extMap = {
    '.css': 'style',
    '.scss': 'style',
    '.less': 'style',
    '.js': 'script',
    '.ts': 'script',
    '.xml': 'markup',
    '.html': 'markup',
};
const loader = function (source, map) {
    const moduleRelativePath = this.resourcePath.replace(this.rootContext, '.');
    const modulePath = utils_1.convertToUnixPath(moduleRelativePath);
    const ext = path_1.extname(modulePath).toLowerCase();
    const moduleType = extMap[ext] || 'unknown';
    const options = loader_utils_1.getOptions(this) || {};
    const alwaysSelfAccept = options.alwaysSelfAccept;
    const trace = options.trace;
    const shouldAutoAcceptCheck = `&& global._isModuleLoadedForUI && global._isModuleLoadedForUI("${modulePath}")`;
    const traceCode = `console.log("[hot-loader]: Self-accept module: ${modulePath}");`;
    const hotCode = `
if (module.hot ${alwaysSelfAccept ? '' : shouldAutoAcceptCheck} ) {
    ${trace ? traceCode : ''}
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "${moduleType}", path: "${modulePath}" });
    });
}`;
    this.callback(null, `${source}; ${hotCode} `, map);
};
exports.default = loader;
//# sourceMappingURL=hot-loader.js.map