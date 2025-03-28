import {asFunction, AwilixContainer} from "awilix";
import {createSessionServiceCreator} from "./session/create-session.service";
import {mapSessionToResponseServiceCreator} from "./session/mappers/map-session-to-response.service";
import {getAllSessionsServiceCreator} from "./session/get-all-sessions.service";
import {updateSessionServiceCreator} from "./session/update-session.service";
import {getSessionByIdServiceCreator} from "./session/get-session-by-id.service";
import {deleteSessionServiceCreator} from "./session/delete-session.service";
import {getSessionSeatsServiceCreator} from "./session/get-session-seats.service";
import {mapSessionSeatToResponseServiceCreator} from "./session/mappers/map-session-seat-to-response.service";
import {createBookingServiceCreator} from "./booking/create-booking.service";
import {mapBookingToResponseServiceCreator} from "./booking/mappers/map-booking-to-response.service";
import {updateBookingStatusServiceCreator} from "./booking/update-booking.service";
import {getBookingByIdServiceCreator} from "./booking/get-booking-by-id.service";

export function initializeServices(container: AwilixContainer): void {
    container.register({
        'createSessionService': asFunction(createSessionServiceCreator),
        'getAllSessionsService': asFunction(getAllSessionsServiceCreator),
        'getSessionByIdService': asFunction(getSessionByIdServiceCreator),
        'updateSessionService': asFunction(updateSessionServiceCreator),
        'deleteSessionService': asFunction(deleteSessionServiceCreator),

        'getSessionSeatsService': asFunction(getSessionSeatsServiceCreator),

        'createBookingService': asFunction(createBookingServiceCreator),
        'updateBookingStatusService': asFunction(updateBookingStatusServiceCreator),
        'getBookingByIdService': asFunction(getBookingByIdServiceCreator),

        'mapSessionToResponseService': asFunction(mapSessionToResponseServiceCreator),
        'mapBookingToResponseService': asFunction(mapBookingToResponseServiceCreator),
        'mapSessionSeatToResponseService': asFunction(mapSessionSeatToResponseServiceCreator),
    })
}
