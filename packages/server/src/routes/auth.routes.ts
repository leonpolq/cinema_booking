import {Router} from "express";
import {container} from "../dependency-injection/container";

export function authRoutes() {
    const router = Router();

    router.post(
        '/register',
        // container.resolve('isNotAuthenticatedMiddleware'),
        container.resolve('registerController')
    );
    router.post(
        '/login',
        // container.resolve('isNotAuthenticatedMiddleware'),
        container.resolve('loginController')
    );

    return router;
}
