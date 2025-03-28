import {JWTPayload} from "./src/controllers/auth/register.controller";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}