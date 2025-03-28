import {asFunction, AwilixContainer} from "awilix";
import {getAllSessionsControllerCreator} from "./session/get-all-sessions.controller";
import {registerController} from "./auth/register.controller";
import {loginController} from "./auth/login.controller";
import {createSessionControllerCreator} from "./session/create-session.controller";
import {deleteSessionControllerCreator} from "./session/delete-session.controller";
import {updateSessionControllerCreator} from "./session/update-session.controller";
import {getSessionByIdControllerCreator} from "./session/get-session-by-id.controller";
import {getSessionSeatsControllerCreator} from "./session/get-session-seats.controller";
import {createBookingControllerCreator} from "./booking/craete-booking.controller";
import {updateBookingControllerCreator} from "./booking/update-booking.controller";
import {getBookingByIdControllerCreator} from "./booking/get-booking-by-id.controller";

export function initializeControllers(container: AwilixContainer): void {
    container.register({
        // Session
        'createSessionController': asFunction(createSessionControllerCreator),
        'getAllSessionsController': asFunction(getAllSessionsControllerCreator),
        'getSessionByIdController': asFunction(getSessionByIdControllerCreator),
        'updateSessionController': asFunction(updateSessionControllerCreator),
        'deleteSessionController': asFunction(deleteSessionControllerCreator),

        // Session related resources
        'getSessionSeatsController': asFunction(getSessionSeatsControllerCreator),

        // Booking
        'createBookingController': asFunction(createBookingControllerCreator),
        'updateBookingController': asFunction(updateBookingControllerCreator),
        'getBookingByIdController': asFunction(getBookingByIdControllerCreator),

        // Auth
        'registerController': asFunction(registerController),
        'loginController': asFunction(loginController),
    })
}
