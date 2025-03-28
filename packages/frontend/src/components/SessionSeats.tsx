import React, {useEffect, useState} from 'react';
import {useServerRequest} from "../services/useServerRequest";
import {BookingResponse, SessionResponse, SessionSeatResponse, SessionSeatStatus} from '../shared';
import {SeatGrid} from './SeatGrid';
import {SeatLegend} from './SeatLegend';
import {BookingForm} from './BookingForm';

interface SessionSeatsProps {
    session: SessionResponse;
}

export interface SeatSelection {
    rowNumber: number;
    seatNumber: number;
}

export const SessionSeats: React.FC<SessionSeatsProps> = ({session}) => {
    const [seats, setSeats] = useState<SessionSeatResponse[]>([]);
    const {request} = useServerRequest();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedSeats, setSelectedSeats] = useState<SeatSelection[]>([]);
    const [bookingInProgress, setBookingInProgress] = useState<boolean>(false);
    const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
    const [expirationTime, setExpirationTime] = useState<Date | null>(null);
    const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
    const [bookingStatus, setBookingStatus] = useState<string>('');
    const [remainingTime, setRemainingTime] = useState<string>('');

    const fetchSeats = async () => {
        setLoading(true);
        try {
            const responseSeats = await request<SessionSeatResponse[]>(`api/v1/sessions/${session.id}/seats`);
            setSeats(responseSeats);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeats();

        const intervalId = setInterval(fetchSeats, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [session.id, request]);

    useEffect(() => {
        setSelectedSeats([]);
        setBookingSuccess(false);
        setCurrentBookingId(null);
        setExpirationTime(null);
        setBookingStatus('');
        fetchSeats();
    }, [session.id]);

    useEffect(() => {
        if (!currentBookingId) return;

        const checkBookingStatus = async () => {
            try {
                const booking = await request<BookingResponse>(`api/v1/bookings/${currentBookingId}`);
                setExpirationTime(new Date(booking.expiresAt));
                setBookingStatus(booking.status);

                const now = new Date();
                const expiration = new Date(booking.expiresAt);
                const remainingMs = expiration.getTime() - now.getTime();

                if (remainingMs <= 0) {
                    setRemainingTime('Expired');
                    setBookingSuccess(false);
                    fetchSeats();
                } else {
                    const minutes = Math.floor(remainingMs / 60000);
                    const seconds = Math.floor((remainingMs % 60000) / 1000);
                    setRemainingTime(`${minutes}m ${seconds}s`);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Error checking booking status: ${err.message}`);
                } else {
                    setError('Error checking booking status');
                }
            }
        };

        checkBookingStatus();
        const intervalId = setInterval(checkBookingStatus, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentBookingId, request]);

    const toggleSeatSelection = (rowNumber: number, seatNumber: number) => {
        const seat = seats.find(s => s.rowNumber === rowNumber && s.seatNumber === seatNumber);
        if (!seat || seat.status !== SessionSeatStatus.available) return;

        setSelectedSeats(prev => {
            const exists = prev.some(s => s.rowNumber === rowNumber && s.seatNumber === seatNumber);
            if (exists) {
                return prev.filter(s => !(s.rowNumber === rowNumber && s.seatNumber === seatNumber));
            } else {
                return [...prev, {rowNumber, seatNumber}];
            }
        });
    };

    const handleBooking = async () => {
        if (selectedSeats.length === 0) return;

        setBookingInProgress(true);
        setError('');

        try {
            const payload = {
                sessionId: session.id,
                seats: selectedSeats
            };

            const response = await request<BookingResponse>('api/v1/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            setBookingSuccess(true);
            setExpirationTime(new Date(response.expiresAt));
            setCurrentBookingId(response.id);
            setBookingStatus(response.status);

            fetchSeats();
            setSelectedSeats([]);

        } catch (err) {
            if (err instanceof Error) {
                setError(`Booking failed: ${err.message}`);
            } else {
                setError('Booking failed: An unknown error occurred');
            }
        } finally {
            setBookingInProgress(false);
        }
    };

    if (loading && seats.length === 0) {
        return <div className="text-center p-3">Loading session seats...</div>;
    }

    if (error) {
        return <div className="alert alert-danger m-3">Error loading seats: {error}</div>;
    }

    return (
        <div className="p-3">
            <h3 className="h4 fw-bold mb-3">{session.movie.title}</h3>

            {bookingSuccess && (
                <div className="alert alert-success mb-3">
                    <p>Booking successful! Your seats have been reserved.</p>
                    {expirationTime && (
                        <>
                            <p className="mb-0">
                                <small>Status: <strong>{bookingStatus}</strong></small>
                            </p>
                            <p className="mb-0">
                                <small>Expires at: {expirationTime.toLocaleTimeString()}</small>
                            </p>
                            <p className="mb-0">
                                <small>Time remaining: {remainingTime}</small>
                            </p>
                        </>
                    )}
                </div>
            )}

            {error && (
                <div className="alert alert-danger mb-3">
                    {error}
                </div>
            )}

            <SeatGrid
                session={session}
                seats={seats}
                selectedSeats={selectedSeats}
                toggleSeatSelection={toggleSeatSelection}
            />

            <BookingForm
                selectedSeats={selectedSeats}
                handleBooking={handleBooking}
                bookingInProgress={bookingInProgress}
            />

            <SeatLegend/>
        </div>
    );
};