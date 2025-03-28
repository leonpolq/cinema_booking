import {Router} from 'express';
import {container} from "../dependency-injection/container";

export function apiRoutes() {
    const router = Router();

    router.use('/auth', container.resolve('authRoutes'));
    router.use('/sessions', container.resolve('sessionRoutes'));
    router.use('/bookings', container.resolve('bookingRoutes'));

    return router;
}
