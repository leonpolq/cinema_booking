import {MikroORM} from "@mikro-orm/core";
import {AppLogger} from "../../utils/logger/logger.util";
import {BookingSchema} from "../../persistance/schemas/booking.schema";
import {NotFoundError} from "../../utils/errors/not-found.error";
import {ForbiddenError} from "../../utils/errors/forbidden.error";
import {UserRole} from "@cinema/shared";

export function getBookingByIdServiceCreator({orm, logger}: {
    orm: MikroORM,
    logger: AppLogger,
}) {
    return async (bookingId: string, userId: string) => {
        const em = orm.em.fork();

        try {
            const booking = await em.findOne(
                BookingSchema,
                bookingId,
                {
                    populate: ['user', 'session', 'seat', 'session.movie', 'session.hall']
                }
            );

            if (!booking) {
                throw new NotFoundError('Booking not found');
            }

            if (booking.user.id !== userId) {
                throw new ForbiddenError('Access denied');
            }

            return booking;
        } catch (error) {
            logger.error('Get booking by ID failed', error);
            throw error;
        }
    };
}