"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolver = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function getResolver(platforms, explicitResolve, nsPackageFilters, platformSpecificExt) {
    explicitResolve = explicitResolve || [];
    nsPackageFilters = nsPackageFilters || ['nativescript', 'tns', 'ns', '@nativescript'];
    platformSpecificExt = platformSpecificExt || ['.ts', '.js', '.scss', '.less', '.css', '.html', '.xml', '.vue', '.json'];
    return function (path) {
        const nmIndex = path.lastIndexOf('node_modules');
        if (nmIndex !== -1) {
            const subPath = path.substr(nmIndex + 'node_modules'.length).replace(/\\/g, '/');
            const shouldResolve = explicitResolve.length && explicitResolve.some((packageName) => subPath.indexOf(packageName) !== -1);
            const pathParts = subPath.split(/[/\-_]/);
            if (!shouldResolve && pathParts.every((p) => nsPackageFilters.every((f) => f !== p))) {
                return path;
            }
        }
        const { dir, name, ext } = path_1.parse(path);
        if (platformSpecificExt.indexOf(ext) === -1) {
            return path;
        }
        for (const platform of platforms) {
            const platformFileName = `${name}.${platform}${ext}`;
            const platformPath = toSystemPath(path_1.join(dir, platformFileName));
            try {
                if (fs_1.statSync(platformPath)) {
                    return platformPath;
                }
            }
            catch (_e) {
                // continue checking the other platforms
            }
        }
        return path;
    };
}
exports.getResolver = getResolver;
// Convert paths from \c\some\path to c:\some\path
function toSystemPath(path) {
    if (!process.platform.startsWith('win32')) {
        return path;
    }
    const drive = path.match(/^\\(\w)\\(.*)$/);
    return drive ? `${drive[1]}:\\${drive[2]}` : path;
}
//# sourceMappingURL=resolver.js.map