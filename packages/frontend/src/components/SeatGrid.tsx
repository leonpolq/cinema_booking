import React from 'react';
import { SessionResponse, SessionSeatResponse, SessionSeatStatus } from '../shared';
import { SeatSelection } from './SessionSeats';

interface SeatGridProps {
    session: SessionResponse;
    seats: SessionSeatResponse[];
    selectedSeats: SeatSelection[];
    toggleSeatSelection: (rowNumber: number, seatNumber: number) => void;
}

export const SeatGrid: React.FC<SeatGridProps> = ({ session, seats, selectedSeats, toggleSeatSelection }) => {
    // Function to get seat data by row and seat number
    const getSeat = (rowNumber: number, seatNumber: number) => {
        return seats.find(seat => seat.rowNumber === rowNumber && seat.seatNumber === seatNumber);
    };

    const getSeatColorClass = (status: SessionSeatStatus, isSelected: boolean) => {
        if (isSelected) {
            return 'bg-info';
        }

        switch (status) {
            case SessionSeatStatus.available:
                return 'bg-success';
            case SessionSeatStatus.unavailable:
                return 'bg-danger';
            case SessionSeatStatus.pending:
                return 'bg-warning';
            case SessionSeatStatus.ownBooking:
                return 'bg-primary';
            default:
                return 'bg-secondary';
        }
    };

    const isSeatSelected = (rowNumber: number, seatNumber: number) => {
        return selectedSeats.some(s => s.rowNumber === rowNumber && s.seatNumber === seatNumber);
    };

    return (
        <table className="w-100 border-collapse mb-4">
            <tbody>
            {Array.from({ length: session.hall.totalRows }, (_, i) => i + 1).map(rowNumber => (
                <tr key={`row-${rowNumber}`}>
                    <td className="p-1 text-center fw-bold" style={{ width: '32px' }}>{rowNumber}</td>
                    {Array.from({ length: session.hall.seatsPerRow }, (_, i) => i + 1).map(seatNumber => {
                        const seat = getSeat(rowNumber, seatNumber);
                        const isSelected = isSeatSelected(rowNumber, seatNumber);
                        const colorClass = seat ? getSeatColorClass(seat.status, isSelected) : 'bg-secondary';
                        const isAvailable = seat && seat.status === SessionSeatStatus.available;

                        return (
                            <td key={`seat-${rowNumber}-${seatNumber}`} className="p-1">
                                <div
                                    className={`d-flex align-items-center justify-content-center ${colorClass} rounded seat-btn transition cursor-pointer text-white mx-auto ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                    style={{ width: '40px', height: '40px', opacity: isAvailable ? 1 : 0.7 }}
                                    onClick={() => toggleSeatSelection(rowNumber, seatNumber)}
                                >
                                    {seatNumber}
                                </div>
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};
