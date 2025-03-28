import {z} from 'zod';

export const createBookingBodySchema = z.object({
    sessionId: z.string(),
    seats: z.array(z.object({
        rowNumber: z.number().int().positive(),
        seatNumber: z.number().int().positive()
    })).min(1)
});

export type CreateBookingData = z.infer<typeof createBookingBodySchema>;
