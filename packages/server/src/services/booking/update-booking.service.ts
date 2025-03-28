import {MikroORM} from "@mikro-orm/core";
import {AppLogger} from "../../utils/logger/logger.util";
import {BookingSchema} from "../../persistance/schemas/booking.schema";
import {BookingStatus} from "@cinema/shared";
import {NotFoundError} from "../../utils/errors/not-found.error";
import {ForbiddenError} from "../../utils/errors/forbidden.error";
import {UpdateBookingData} from "@cinema/shared";

export function updateBookingStatusServiceCreator(
    {
        orm,
        logger
    }: {
        orm: MikroORM,
        logger: AppLogger
    }
) {
    return async (userId: string, bookingId: string, updateData: UpdateBookingData) => {
        const em = orm.em.fork();
        try {
            const booking = await em.findOne(BookingSchema, bookingId, {
                populate: ['user', 'seat']
            });

            if (!booking) {
                throw new NotFoundError('Booking not found');
            }

            if (booking.user.id !== userId) {
                throw new ForbiddenError('Not authorized to modify this booking');
            }

            booking.status = updateData.status;

            if (updateData.status === BookingStatus.CONFIRMED) {
                booking.confirmedAt = new Date();
            }

            await em.flush();

            return booking;
        } catch (error) {
            logger.error('Session deletion failed', error);

            throw error;
        }
    };
}