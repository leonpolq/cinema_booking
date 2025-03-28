import {z} from 'zod';

export const idObjectSchema = z.object({
    id: z.string().uuid(),
});

export type IdObjectData = z.infer<typeof idObjectSchema>;
