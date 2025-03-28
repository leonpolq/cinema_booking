import {z} from 'zod';
import {BookingStatus} from "../../interfaces/booking-status";

export const updateBookingBodySchema = z.object({
    status: z.enum([BookingStatus.CONFIRMED, BookingStatus.EXPIRED])
});

export type UpdateBookingData = z.infer<typeof updateBookingBodySchema>;