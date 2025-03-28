import {z} from 'zod';

export const getSessionSchema = z.object({
    id: z.string().uuid()
});

export type GetSessionData = z.infer<typeof getSessionSchema>;
