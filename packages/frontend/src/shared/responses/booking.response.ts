export interface BookingSeatResponse {
    rowNumber: number;
    seatNumber: number;
}

export interface BookingResponse {
    id: string;
    sessionId: string;
    seats: BookingSeatResponse[];
    status: string;
    expiresAt: Date;
    reservationStartTime: Date;
}