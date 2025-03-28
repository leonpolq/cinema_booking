import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {JWTPayload} from "../controllers/auth/register.controller";
import {UnauthorizedError} from "../utils/errors/unauthorized.error";
import {UserRole} from "@cinema/shared";

export function createAuthMiddlewareCreator() {
    return (userRoles: UserRole[]) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const jwtPart = (req.headers.authorization || '').replace('Bearer ', '');

                if (!jwtPart) {
                    return next(new UnauthorizedError('No token provided'));
                }

                const payload = jwt.verify(
                    jwtPart,
                    process.env.JWT_SECRET as string,
                ) as JWTPayload;

                    console.log('payload.role',payload, payload.role, userRoles);
                if (!userRoles.includes(payload.role)) {
                    return next(new UnauthorizedError('Insufficient permissions'));
                }

                req.user = payload as JWTPayload;

                next();
            } catch (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    return next(new UnauthorizedError('Token expired'));
                }

                if (error instanceof jwt.JsonWebTokenError) {
                    return next(new UnauthorizedError('Invalid token'));
                }

                next(new UnauthorizedError());
            }
        };
    }
}