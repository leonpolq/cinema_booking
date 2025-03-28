import {MikroORM} from "@mikro-orm/core";
import {NextFunction, Request, Response} from "express";
import {User, UserSchema} from "../../persistance/schemas/user.schema";
import {UserRole} from "@cinema/shared";

import bcrypt from 'bcrypt';
import jwt, {SignOptions} from 'jsonwebtoken';
import {AppLogger} from "../../utils/logger/logger.util";
import {ValidateData} from "../../utils/validation/validation.util";
import {registrationBodySchema, RegistrationData} from "@cinema/shared";

export interface JWTCreatePayload {
    id: string;
    email: string;
    role: UserRole;
}

export interface JWTPayload extends JWTCreatePayload {
    iat: number;
    exp: number;
}

export function registerController({orm, logger, validateData}: {
    orm: MikroORM,
    logger: AppLogger,
    validateData: ValidateData<RegistrationData>
}) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();

        try {
            const {email, password, name, role} = validateData({
                schema: registrationBodySchema,
                data: req.body,
            });

            if (!email || !password || !name) {
                return res.status(400).json({message: 'Missing required fields'});
            }

            const existingUser = await em.findOne(UserSchema, {email});

            if (existingUser) {
                return res.status(409).json({message: 'User already exists'});
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const user = em.create(UserSchema, {
                email,
                passwordHash,
                name,
                role,
            } as User);

            await em.persistAndFlush(user);

            let payload: JWTCreatePayload = {
                id: user.id,
                email: user.email,
                role: user.role
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET as string,
                {expiresIn: process.env.JWT_EXPIRES_IN} as SignOptions
            );
            console.log("REgistered");

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                token
            });
        } catch (error) {
            logger.error(error);

            next(error);
        }
    }
}

