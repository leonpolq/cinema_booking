export enum SessionSeatStatus {
    available = 'available',
    unavailable = 'unavailable',
    pending = 'pending',
    ownBooking = 'ownBooking',
}

export interface SessionSeat {
    rowNumber: number;
    seatNumber: number;
    status: SessionSeatStatus;
}
