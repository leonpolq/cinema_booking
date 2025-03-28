import {MikroORM} from "@mikro-orm/core";
import {AppLogger} from "../../utils/logger/logger.util";
import {Seat, SeatSchema} from "../../persistance/schemas/seat.schema";
import {Booking, BookingSchema} from "../../persistance/schemas/booking.schema";
import {BookingStatus} from "@cinema/shared";
import {CreateBookingData} from "@cinema/shared";
import {getSessionByIdServiceCreator} from "../session/get-session-by-id.service";
import {ValidationError} from "../../utils/errors/validation.error";
import {ConflictError} from "../../utils/errors/conflict.error";
import {UserSchema} from "../../persistance/schemas/user.schema";
import {SessionSchema} from "../../persistance/schemas/session.schema";
import {mapBookingToResponseServiceCreator} from "./mappers/map-booking-to-response.service";

export function createBookingServiceCreator(
    {
        orm,
        logger,
        getSessionByIdService
    }: {
        orm: MikroORM,
        logger: AppLogger,
        getSessionByIdService: ReturnType<typeof getSessionByIdServiceCreator>
    }
) {
    return async (userId: string, createBookingDto: CreateBookingData): Promise<Booking> => {
        const em = orm.em.fork();
        try {

            const session = await getSessionByIdService(createBookingDto.sessionId);

            const seats = await Promise.all(
                createBookingDto.seats.map(async (seatData) => {
                    if (
                        seatData.rowNumber > session.hall.totalRows ||
                        seatData.seatNumber > session.hall.seatsPerRow
                    ) {
                        throw new ValidationError('Invalid seat selection');
                    }

                    const existingBookings = await em.find(
                        BookingSchema, {
                            session: session.id,
                            seat: {
                                rowNumber: seatData.rowNumber,
                                seatNumber: seatData.seatNumber
                            },
                            status: {$nin: [BookingStatus.EXPIRED]}
                        }
                    );

                    if (existingBookings.length > 0) {
                        throw new ConflictError('One or more seats are already booked');
                    }

                    let seat = await em.findOne(SeatSchema, {
                        rowNumber: seatData.rowNumber,
                        seatNumber: seatData.seatNumber
                    });

                    if (!seat) {
                        seat = em.create(SeatSchema, {
                            rowNumber: seatData.rowNumber,
                            seatNumber: seatData.seatNumber
                        } as Seat);
                    }

                    return seat;
                })
            );

            const booking = em.create(BookingSchema, {
                user: em.getReference(UserSchema, userId),
                session: em.getReference(SessionSchema, session.id),
                seat: seats,
                status: BookingStatus.PENDING,
                reservationStartTime: new Date(),
                expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            } as Booking);

            await em.flush();

            return booking;
        } catch (error) {
            logger.error('Session creation failed', error);

            throw error;
        }
    };
}