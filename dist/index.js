"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.generateQRCode = exports.generateSecret = void 0;
const tslib_2 = require("tslib");
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const QRCode = require("qrcode");
const notp_1 = tslib_1.__importDefault(require("notp"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const thirty_two_1 = tslib_1.__importDefault(require("thirty-two"));
function generateSecret(options) {
    var _a;
    const config = {
        name: encodeURIComponent((_a = options === null || options === void 0 ? void 0 : options.name) !== null && _a !== void 0 ? _a : "App"),
        account: encodeURIComponent((options === null || options === void 0 ? void 0 : options.account) ? `:${options.account}` : ""),
    };
    const bin = crypto_1.default.randomBytes(20);
    const base32 = thirty_two_1.default.encode(bin).toString("utf8").replace(/=/g, "");
    const secret = base32
        .toLowerCase()
        .replace(/(\w{4})/g, "$1 ")
        .trim()
        .split(" ")
        .join("")
        .toUpperCase();
    const query = `?secret=${secret}&issuer=${config.name}`;
    const uri = `otpauth://totp/${config.name}${config.account}`;
    return generateQRCode(uri, query).then(t => {
        return {
            secret,
            uri: `${uri}${query}`,
            qr: t
        };
    });
}
exports.generateSecret = generateSecret;
function generateQRCode(uri, encodedQuery) {
    return tslib_2.__awaiter(this, void 0, void 0, function* () {
        try {
            const qrDataURL = yield QRCode.toDataURL(uri + encodedQuery);
            // Return the full data URL
            return qrDataURL;
        }
        catch (err) {
            console.error('Error generating QR code:', err);
            throw err;
        }
    });
}
exports.generateQRCode = generateQRCode;
function generateToken(secret) {
    if (!secret || !secret.length)
        return null;
    const unformatted = secret.replace(/\W+/g, "").toUpperCase();
    const bin = thirty_two_1.default.decode(unformatted);
    return { token: notp_1.default.totp.gen(bin) };
}
exports.generateToken = generateToken;
function verifyToken(secret, token, window = 4) {
    if (!token || !token.length)
        return null;
    const unformatted = secret.replace(/\W+/g, "").toUpperCase();
    const bin = thirty_two_1.default.decode(unformatted);
    return notp_1.default.totp.verify(token.replace(/\W+/g, ""), bin, {
        window,
        time: 30,
    });
}
exports.verifyToken = verifyToken;
