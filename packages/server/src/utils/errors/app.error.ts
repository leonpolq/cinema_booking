export interface ErrorPayload {
    [key: string]: any;
}

export abstract class AppError extends Error {
    code: string;
    payload?: ErrorPayload;

    constructor(code: string, message: string, payload?: ErrorPayload) {
        super(message);
        this.code = code;
        this.payload = payload;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}