export declare function generateSecret(options: any): Promise<{
    secret: any;
    uri: string;
    qr: any;
}>;
export declare function generateQRCode(uri: string, encodedQuery: string): Promise<any>;
export declare function generateToken(secret: string): {
    token: any;
} | null;
export declare function verifyToken(secret: string, token: string, window?: number): any;
