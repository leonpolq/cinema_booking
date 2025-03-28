import { AppError, ErrorPayload } from './app.error';

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized access', payload?: ErrorPayload) {
        super('UNAUTHORIZED', message, payload);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
