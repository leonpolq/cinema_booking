import {MikroORM} from "@mikro-orm/core";
import {AppLogger} from "../../utils/logger/logger.util";
import {SessionSchema} from "../../persistance/schemas/session.schema";
import {NotFoundError} from "../../utils/errors/not-found.error";
import {BookingSchema} from "../../persistance/schemas/booking.schema";
import {ForbiddenError} from "../../utils/errors/forbidden.error";

export function deleteSessionServiceCreator({orm, logger}: {
    orm: MikroORM,
    logger: AppLogger,
}) {
    return async (sessionId: string) => {
        const em = orm.em.fork();

        try {
            const session = await em.findOne(SessionSchema, sessionId);

            if (!session) {
                throw new NotFoundError('Session not found');
            }

            const bookings = await em.find(BookingSchema, {session: sessionId});

            if (bookings.length > 0) {
                throw new ForbiddenError('Cannot delete session with existing bookings');
            }

            await em.remove(session);
            await em.flush();

            return {id: sessionId};
        } catch (error) {
            logger.error('Session deletion failed', error);

            throw error;
        }
    }
}

