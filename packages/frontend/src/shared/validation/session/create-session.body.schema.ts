import {z} from 'zod';

export const createSessionBodySchema = z.object({
    hall: z.object({
        name: z.string(),
        totalRows: z.number(),
        seatsPerRow: z.number(),
    }),
    movie: z.object({
        title: z.string(),
        description: z.string(),
    }),
    startTime: z.string().datetime().transform(str => new Date(str)),
});

export type CreateSessionData = z.infer<typeof createSessionBodySchema>;
