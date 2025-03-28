import {SessionSeatResponse} from "@cinema/shared";
import {SessionSeat} from "../interfaces/session-seat.interface";

export function mapSessionSeatToResponseServiceCreator() {
    return (availableSeats: SessionSeat[]): SessionSeatResponse[] => {
        return availableSeats.map(seat => ({
            rowNumber: seat.rowNumber,
            seatNumber: seat.seatNumber,
            status: seat.status,
        }));
    };
}