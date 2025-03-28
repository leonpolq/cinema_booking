import {createAuthMiddlewareCreator} from "./user-role.middleware";
import {UserRole} from "@cinema/shared";

export function isAdminMiddlewareCreator({createAuthMiddleware}: {
    createAuthMiddleware: ReturnType<typeof createAuthMiddlewareCreator>
}) {
    return createAuthMiddleware([UserRole.ADMIN]);
}