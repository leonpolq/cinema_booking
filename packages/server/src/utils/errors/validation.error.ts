import { AppError, ErrorPayload } from './app.error';

export class ValidationError extends AppError {
    constructor(message: string = 'Validation failed', payload?: ErrorPayload) {
        super('VALIDATION_ERROR', message, payload);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
