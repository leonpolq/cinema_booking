import {asFunction, AwilixContainer} from "awilix";
import {apiRoutes} from "./api.routes";
import {sessionRoutes} from "./session.routes";
import {authRoutes} from "./auth.routes";
import {bookingRoutes} from "./booking.routes";

export function initializeRoutes(container: AwilixContainer): void {
    container.register({
        'apiRoutes': asFunction(apiRoutes),
        'sessionRoutes': asFunction(sessionRoutes),
        'bookingRoutes': asFunction(bookingRoutes),
        'authRoutes': asFunction(authRoutes),
    })
}
