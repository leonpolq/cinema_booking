import {AppLogger} from "../../utils/logger/logger.util";
import {MikroORM} from "@mikro-orm/core";
import {BookingSchema} from "../../persistance/schemas/booking.schema";
import {BookingStatus, SessionSeatStatus} from "@cinema/shared";
import {getSessionByIdServiceCreator} from "./get-session-by-id.service";
import {SessionSeat} from "./interfaces/session-seat.interface";

export function getSessionSeatsServiceCreator({orm, logger, getSessionByIdService}: {
    orm: MikroORM,
    logger: AppLogger,
    getSessionByIdService: ReturnType<typeof getSessionByIdServiceCreator>,
}) {
    return async (sessionId: string, userId?: string): Promise<SessionSeat[]> => {
        const em = orm.em.fork();

        try {
            const session = await getSessionByIdService(sessionId);
            const allSeats: SessionSeat[] = [];

            for (let rowNumber = 1; rowNumber <= session.hall.totalRows; rowNumber++) {
                for (let seatNumber = 1; seatNumber <= session.hall.seatsPerRow; seatNumber++) {
                    allSeats.push({
                        rowNumber,
                        seatNumber,
                        status: SessionSeatStatus.available
                    });
                }
            }

            const activeBookings = await em.find(BookingSchema, {
                session: sessionId,
                status: {$nin: [BookingStatus.EXPIRED, BookingStatus.CANCELLED]}
            }, {
                populate: ['seat', 'user']
            });

            const bookedSeats = new Map<string, { userId: string, status: BookingStatus }>();

            activeBookings.forEach(booking => {
                const seats = Array.isArray(booking.seat) ? booking.seat : [booking.seat];

                seats.forEach(seat => {
                    if (seat) {
                        const key = `${seat.rowNumber}-${seat.seatNumber}`;
                        bookedSeats.set(key, {
                            userId: booking.user?.id || '',
                            status: booking.status
                        });
                    }
                });
            });

            return allSeats.map(seat => {
                const seatKey = `${seat.rowNumber}-${seat.seatNumber}`;
                const bookingInfo = bookedSeats.get(seatKey);

                if (!bookingInfo) return seat;

                if (userId && bookingInfo.userId === userId) {
                    return {
                        ...seat,
                        status: SessionSeatStatus.ownBooking
                    };
                }

                switch (bookingInfo.status) {
                    case BookingStatus.PENDING:
                        return {
                            ...seat,
                            status: SessionSeatStatus.pending
                        };
                    case BookingStatus.CONFIRMED:
                        return {
                            ...seat,
                            status: SessionSeatStatus.unavailable
                        };
                    default:
                        return {
                            ...seat,
                            status: SessionSeatStatus.unavailable
                        };
                }
            });
        } catch (error) {
            logger.error(`Failed to get seats for session ${sessionId}`, error);
            throw new Error(`Failed to retrieve seats: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };
}