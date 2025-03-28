import React from 'react';
import { SeatSelection } from './SessionSeats';

interface BookingFormProps {
    selectedSeats: SeatSelection[];
    handleBooking: () => void;
    bookingInProgress: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedSeats, handleBooking, bookingInProgress }) => {
    return (
        <div className="mb-3">
            <button
                className="btn btn-primary"
                disabled={selectedSeats.length === 0 || bookingInProgress}
                onClick={handleBooking}
            >
                {bookingInProgress ? 'Booking...' : 'Book Selected Seats'}
            </button>
        </div>
    );
};