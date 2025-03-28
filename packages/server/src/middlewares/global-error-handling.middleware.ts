import {NextFunction, Request, Response} from "express";
import {AppLogger} from "../utils/logger/logger.util";
import {AppError} from "../utils/errors/app.error";
import {NotFoundError} from "../utils/errors/not-found.error";
import {UnauthorizedError} from "../utils/errors/unauthorized.error";
import {ForbiddenError} from "../utils/errors/forbidden.error";
import {ValidationError} from "../utils/errors/validation.error";
import {BadRequestError} from "../utils/errors/bad-request.error";
import {ConflictError} from "../utils/errors/conflict.error";

export function globalErrorHandlingMiddleware({logger}: { logger: AppLogger }) {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.warn('Error handling middleware', err);
        console.warn(JSON.stringify(err.message));

        if (err instanceof AppError) {
            const statusCode = getStatusCodeFromError(err);

            let message: string | any = err.message;

            try {
                message = JSON.parse(err.message)
            } catch (e) {
            }

            return res.status(statusCode)
                .json({
                    code: err.code,
                    message: message,
                    ...(err.payload && {payload: err.payload})
                });
        }

        logger.error('Unexpected error', err);
        res.status(500).json({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred'
        });

    }
}

function getStatusCodeFromError(err: AppError): number {
    if (err instanceof NotFoundError) {
        return 404;
    }

    if (err instanceof UnauthorizedError) {
        return 401;
    }

    if (err instanceof ForbiddenError) {
        return 403;
    }

    if (err instanceof ValidationError || err instanceof BadRequestError) {
        return 400;
    }

    if (err instanceof ConflictError) {
        return 409;
    }

    return 500;
}