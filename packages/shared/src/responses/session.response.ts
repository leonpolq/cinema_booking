export enum SessionSeatStatus {
    available = 'available',
    unavailable = 'unavailable',
    pending = 'pending',
    ownBooking = 'ownBooking',
}

export interface SessionSeatResponse {
    rowNumber: number;
    seatNumber: number;
    status: SessionSeatStatus;
}

export interface SessionResponse {
    id: string;
    movie: {
        id: string;
        title: string;
        description?: string;
    };
    hall: {
        id: string;
        totalRows: number;
        seatsPerRow: number;
    };
    startTime: Date;
}
