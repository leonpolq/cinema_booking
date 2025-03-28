import {AppError, ErrorPayload} from './app.error';

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found', payload?: ErrorPayload) {
        super('NOT_FOUND', message, payload);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
