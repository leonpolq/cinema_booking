import {asFunction, AwilixContainer} from "awilix";
import { isAdminMiddlewareCreator} from "./is-admin.middleware";
import {isUserMiddlewareCreator} from "./is-user.middleware";
import {globalErrorHandlingMiddleware} from "./global-error-handling.middleware";
import {createAuthMiddlewareCreator} from "./user-role.middleware";
import {isAdminOrUserMiddlewareCreator} from "./is-admin-or-user.middleware";

export function initializeMiddlewares(container: AwilixContainer): void {
    container.register({
        'isAdminMiddleware': asFunction(isAdminMiddlewareCreator),
        'isAdminOrUserMiddleware': asFunction(isAdminOrUserMiddlewareCreator),
        'isUserMiddleware': asFunction(isUserMiddlewareCreator),
        'createAuthMiddleware': asFunction(createAuthMiddlewareCreator),
        'globalErrorHandlingMiddleware': asFunction(globalErrorHandlingMiddleware),
    })
}
