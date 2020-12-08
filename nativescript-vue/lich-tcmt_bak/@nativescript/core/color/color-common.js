import * as types from '../utils/types';
import * as knownColors from './known-colors';
import { convertHSLToRGBColor } from '../css/parser';
const SHARP = '#';
const HEX_REGEX = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9A-F]{8}$)/i;
export class Color {
    constructor() {
        if (arguments.length === 1) {
            const arg = arguments[0];
            if (types.isString(arg)) {
                if (isRgbOrRgba(arg)) {
                    this._argb = argbFromRgbOrRgba(arg);
                }
                else if (isHslOrHsla(arg)) {
                    this._argb = argbFromHslOrHsla(arg);
                }
                else if (knownColors.isKnownName(arg)) {
                    // The parameter is a known color name
                    const hex = knownColors.getKnownColor(arg);
                    this._name = arg;
                    this._argb = this._argbFromString(hex);
                }
                else if (HEX_REGEX.test(arg)) {
                    // The parameter is a "#AARRGGBB" formatted string
                    const hex = this._normalizeHex(arg);
                    this._argb = this._argbFromString(hex);
                }
                else {
                    throw new Error('Invalid color: ' + arg);
                }
            }
            else if (types.isNumber(arg)) {
                // The parameter is a 32-bit unsigned integer where each 8 bits specify a color component
                // In case a 32-bit signed int (Android, Java has no unsigned types) was provided - convert to unsigned by applyint >>> 0
                this._argb = arg >>> 0;
            }
            else {
                throw new Error('Expected 1 or 4 constructor parameters.');
            }
        }
        else if (arguments.length === 4) {
            this._argb = (arguments[0] & 0xff) * 0x01000000 + (arguments[1] & 0xff) * 0x00010000 + (arguments[2] & 0xff) * 0x00000100 + (arguments[3] & 0xff) * 0x00000001;
        }
        else {
            throw new Error('Expected 1 or 4 constructor parameters.');
        }
    }
    get a() {
        return (this._argb / 0x01000000) & 0xff;
    }
    get r() {
        return (this._argb / 0x00010000) & 0xff;
    }
    get g() {
        return (this._argb / 0x00000100) & 0xff;
    }
    get b() {
        return (this._argb / 0x00000001) & 0xff;
    }
    get argb() {
        return this._argb;
    }
    get hex() {
        if (this.a === 0xff) {
            return ('#' + this._componentToHex(this.r) + this._componentToHex(this.g) + this._componentToHex(this.b)).toUpperCase();
        }
        else {
            return ('#' + this._componentToHex(this.a) + this._componentToHex(this.r) + this._componentToHex(this.g) + this._componentToHex(this.b)).toUpperCase();
        }
    }
    get name() {
        return this._name;
    }
    get ios() {
        return undefined;
    }
    get android() {
        return undefined;
    }
    _argbFromString(hex) {
        if (hex.charAt(0) === '#') {
            hex = hex.substr(1);
        }
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        else if (hex.length === 4) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        let intVal = parseInt(hex, 16);
        if (hex.length === 6) {
            // add the alpha component since the provided string is RRGGBB
            intVal = (intVal & 0x00ffffff) + 0xff000000;
        }
        return intVal;
    }
    equals(value) {
        return value && this.argb === value.argb;
    }
    static equals(value1, value2) {
        // both values are falsy
        if (!value1 && !value2) {
            return true;
        }
        // only one is falsy
        if (!value1 || !value2) {
            return false;
        }
        return value1.equals(value2);
    }
    static isValid(value) {
        if (types.isNullOrUndefined(value) || value instanceof Color) {
            return true;
        }
        if (!types.isString(value)) {
            return false;
        }
        if (knownColors.isKnownName(value)) {
            return true;
        }
        return HEX_REGEX.test(value) || isRgbOrRgba(value) || isHslOrHsla(value);
    }
    _componentToHex(component) {
        let hex = component.toString(16);
        if (hex.length === 1) {
            hex = '0' + hex;
        }
        return hex;
    }
    _normalizeHex(hexStr) {
        if (hexStr.charAt(0) === SHARP && hexStr.length === 4) {
            // Duplicate each char after the #, so "#123" becomes "#112233"
            hexStr = hexStr.charAt(0) + hexStr.charAt(1) + hexStr.charAt(1) + hexStr.charAt(2) + hexStr.charAt(2) + hexStr.charAt(3) + hexStr.charAt(3);
        }
        return hexStr;
    }
    toString() {
        return this.hex;
    }
    static fromIosColor(value) {
        return undefined;
    }
}
function isRgbOrRgba(value) {
    const toLower = value.toLowerCase();
    return (toLower.indexOf('rgb(') === 0 || toLower.indexOf('rgba(') === 0) && toLower.indexOf(')') === toLower.length - 1;
}
function isHslOrHsla(value) {
    const toLower = value.toLowerCase();
    return (toLower.indexOf('hsl(') === 0 || toLower.indexOf('hsla(') === 0) && toLower.indexOf(')') === toLower.length - 1;
}
function parseColorWithAlpha(value) {
    const toLower = value.toLowerCase();
    const parts = toLower
        .replace(/(rgb|hsl)a?\(/, '')
        .replace(')', '')
        .trim()
        .split(',');
    let f = 255;
    let s = 255;
    let t = 255;
    let a = 255;
    if (parts[0]) {
        f = parseInt(parts[0].trim());
    }
    if (parts[1]) {
        s = parseInt(parts[1].trim());
    }
    if (parts[2]) {
        t = parseInt(parts[2].trim());
    }
    if (parts[3]) {
        a = Math.round(parseFloat(parts[3].trim()) * 255);
    }
    return { f, s, t, a };
}
function argbFromRgbOrRgba(value) {
    const { f: r, s: g, t: b, a } = parseColorWithAlpha(value);
    return (a & 0xff) * 0x01000000 + (r & 0xff) * 0x00010000 + (g & 0xff) * 0x00000100 + (b & 0xff);
}
function argbFromHslOrHsla(value) {
    const { f: h, s: s, t: l, a } = parseColorWithAlpha(value);
    const { r, g, b } = convertHSLToRGBColor(h, s, l);
    return (a & 0xff) * 0x01000000 + (r & 0xff) * 0x00010000 + (g & 0xff) * 0x00000100 + (b & 0xff);
}
//# sourceMappingURL=color-common.js.map