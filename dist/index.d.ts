declare const tslib_1: any;
declare const QRCode: any;
declare const notp_1: any;
declare const crypto_1: any;
declare const thirty_two_1: any;
declare function generateSecret(options: any): Promise<{
    secret: any;
    uri: string;
    qr: any;
}>;
declare function generateQRCode(uri: string, encodedQuery: string): Promise<any>;
declare function generateToken(secret: string): {
    token: any;
} | null;
declare function verifyToken(secret: string, token: string, window?: number): any;
