import {Router} from 'express';
import {container} from "../dependency-injection/container";

export function sessionRoutes() {
    const router = Router();

    router.get(
        '/',
        container.resolve('isAdminOrUserMiddleware'),
        container.resolve('getAllSessionsController')
    );
    router.post(
        '/',
        container.resolve('isAdminMiddleware'),
        container.resolve('createSessionController')
    );
    router.get(
        '/:id/seats',
        container.resolve('isUserMiddleware'),
        container.resolve('getSessionSeatsController')
    );
    router.get(
        '/:id',
        container.resolve('isAdminOrUserMiddleware'),
        container.resolve('getSessionByIdController')
    );
    router.patch(
        '/:id',
        container.resolve('isAdminMiddleware'),
        container.resolve('updateSessionController')
    );
    router.delete(
        '/:id',
        container.resolve('isAdminMiddleware'),
        container.resolve('deleteSessionController')
    );
    router.delete(
        '/:id',
        container.resolve('isAdminMiddleware'),
        container.resolve('deleteSessionController')
    );
    router.delete(
        '/:id',
        container.resolve('isAdminMiddleware'),
        container.resolve('deleteSessionController')
    );
    return router;
}