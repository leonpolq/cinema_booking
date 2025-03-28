import {AppError, ErrorPayload} from './app.error';

export class InternalServerError extends AppError {
    constructor(message: string = 'Internal server error', payload?: ErrorPayload) {
        super('INTERNAL_SERVER_ERROR', message, payload);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
