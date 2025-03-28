import { AppError, ErrorPayload } from './app.error';

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request', payload?: ErrorPayload) {
        super('BAD_REQUEST', message, payload);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}