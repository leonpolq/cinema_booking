import {z} from 'zod';
import {UserRole} from "../../interfaces/user-role";

export const registrationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum(Object.values(UserRole) as [UserRole]),
});

export type RegistrationData = z.infer<typeof registrationBodySchema>;
