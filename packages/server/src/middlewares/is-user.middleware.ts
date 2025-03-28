import {createAuthMiddlewareCreator} from "./user-role.middleware";
import {UserRole} from "@cinema/shared";

export function isUserMiddlewareCreator({createAuthMiddleware}: {
    createAuthMiddleware: ReturnType<typeof createAuthMiddlewareCreator>
}) {
    return createAuthMiddleware([UserRole.USER]);
}