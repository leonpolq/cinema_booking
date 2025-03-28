import { AppError, ErrorPayload } from './app.error';

export class ConflictError extends AppError {
    constructor(message: string = 'Conflict', payload?: ErrorPayload) {
        super('CONFLICT_ERROR', message, payload);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
