import {Router} from 'express';
import {container} from "../dependency-injection/container";

export function bookingRoutes() {
    const router = Router();

    router.post(
        '/',
        container.resolve('isUserMiddleware'),
        container.resolve('createBookingController')
    );
    router.get(
        '/:id',
        container.resolve('isUserMiddleware'),
        container.resolve('getBookingByIdController')
    );
    router.patch(
        '/:id',
        container.resolve('isUserMiddleware'),
        container.resolve('updateBookingController')
    );

    return router;
}