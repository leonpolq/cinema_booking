import {createAuthMiddlewareCreator} from "./user-role.middleware";
import {UserRole} from "@cinema/shared";

export function isAdminOrUserMiddlewareCreator({createAuthMiddleware}: {
    createAuthMiddleware: ReturnType<typeof createAuthMiddlewareCreator>
}) {
    return createAuthMiddleware([UserRole.ADMIN, UserRole.USER]);
}