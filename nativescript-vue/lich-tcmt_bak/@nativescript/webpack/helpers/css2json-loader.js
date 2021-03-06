"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("css");
const loader_utils_1 = require("loader-utils");
const betweenQuotesPattern = /('|")(.*?)\1/;
const unpackUrlPattern = /url\(([^\)]+)\)/;
const inlineLoader = '!@nativescript/webpack/helpers/css2json-loader?useForImports!';
const loader = function (content, map) {
    const options = loader_utils_1.getOptions(this) || {};
    const inline = !!options.useForImports;
    const requirePrefix = inline ? inlineLoader : '';
    const ast = css_1.parse(content, undefined);
    let dependencies = [];
    getImportRules(ast)
        .map(extractUrlFromRule)
        .map(createRequireUri)
        .forEach(({ uri, requireURI }) => {
        dependencies.push(`global.registerModule("${uri}", () => require("${requirePrefix}${requireURI}"));`);
        // Call registerModule with requireURI to handle cases like @import "~@nativescript/theme/css/blue.css";
        if (uri !== requireURI) {
            dependencies.push(`global.registerModule("${requireURI}", () => require("${requirePrefix}${requireURI}"));`);
        }
    });
    const str = JSON.stringify(ast, (k, v) => (k === 'position' ? undefined : v));
    this.callback(null, `${dependencies.join('\n')}module.exports = ${str};`);
};
function getImportRules(ast) {
    if (!ast || ast.type !== 'stylesheet' || !ast.stylesheet) {
        return [];
    }
    return ast.stylesheet.rules.filter((rule) => rule.type === 'import' && rule.import);
}
/**
 * Extracts the url from import rule (ex. `url("./platform.css")`)
 */
function extractUrlFromRule(importRule) {
    const urlValue = importRule.import;
    const unpackedUrlMatch = urlValue.match(unpackUrlPattern);
    const unpackedValue = unpackedUrlMatch ? unpackedUrlMatch[1] : urlValue;
    const quotesMatch = unpackedValue.match(betweenQuotesPattern);
    return quotesMatch ? quotesMatch[2] : unpackedValue;
}
function createRequireUri(uri) {
    return {
        uri: uri,
        requireURI: loader_utils_1.urlToRequest(uri),
    };
}
exports.default = loader;
//# sourceMappingURL=css2json-loader.js.map