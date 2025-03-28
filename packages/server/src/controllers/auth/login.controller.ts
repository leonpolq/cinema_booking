import {MikroORM} from "@mikro-orm/core";
import {NextFunction, Request, Response} from "express";
import {UserSchema} from "../../persistance/schemas/user.schema";

import bcrypt from 'bcrypt';
import jwt, {SignOptions} from 'jsonwebtoken';
import {AppLogger} from "../../utils/logger/logger.util";
import {ValidateData} from "../../utils/validation/validation.util";
import {LoginData, loginBodySchema} from "@cinema/shared";

export function loginController({orm, logger, validateData}: {
    orm: MikroORM,
    logger: AppLogger,
    validateData: ValidateData<LoginData>
}) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const em = orm.em.fork();

        try {
            const {email, password,} = validateData({
                schema: loginBodySchema,
                data: req.body,
            });


            if (!email || !password) {
                return res.status(400).json({message: 'Email and password are required'});
            }

            const user = await em.findOne(UserSchema, {email});

            if (!user) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

            if (!isPasswordValid) {
                return res.status(401).json({message: 'Invalid credentials'});
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET as string,
                {expiresIn: process.env.JWT_EXPIRES_IN} as SignOptions
            );

            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                token,
            });
        } catch (error) {
            logger.error('Login error:', error);
            res.status(500).json({message: 'Server error during login'});
        }
    }
}

