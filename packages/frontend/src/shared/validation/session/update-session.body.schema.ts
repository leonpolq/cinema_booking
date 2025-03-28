import {z} from 'zod';

export const updateSessionBodySchema = z.object({
    movie: z.object({
        title: z.string(),
        description: z.string(),
    }).optional(),
    startTime: z.string().datetime().transform(str => new Date(str)).optional(),
});

export type UpdateSessionData = z.infer<typeof updateSessionBodySchema>;
