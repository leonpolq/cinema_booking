import { AppError, ErrorPayload } from './app.error';

export class ForbiddenError extends AppError {
    constructor(message: string = 'Access forbidden', payload?: ErrorPayload) {
        super('FORBIDDEN', message, payload);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}