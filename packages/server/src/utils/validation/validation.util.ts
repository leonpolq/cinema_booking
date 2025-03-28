import {ZodError, ZodSchema} from "zod";
import {ValidationError} from "../errors/validation.error";

export function formatZodError(error: ZodError) {
    return error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
        code: err.code
    }));
}

export function validateData<T>() {
    return ({schema, data}: { schema: ZodSchema, data: unknown }): T => {
        try {
            console.log("data", data);
            return schema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedError = formatZodError(error);

                throw new ValidationError(JSON.stringify(formattedError));
            }
            throw new ValidationError((error as Error).message);
        }
    };
}

export type ValidateData<T = any> = ReturnType<typeof validateData<T>>;
