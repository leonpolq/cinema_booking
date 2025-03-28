import {BookingResponse} from "@cinema/shared";
import {Booking} from "../../../persistance/schemas/booking.schema";

export function mapBookingToResponseServiceCreator() {
    return (booking: Booking): BookingResponse => {
        return {
            id: booking.id,
            sessionId: booking.session.id,
            seats: booking.seat.map(seat => ({
                rowNumber: seat.rowNumber,
                seatNumber: seat.seatNumber
            })),
            status: booking.status,
            expiresAt: booking.expiresAt,
            reservationStartTime: booking.reservationStartTime
        }
    }
}