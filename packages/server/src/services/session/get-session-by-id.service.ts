import {MikroORM} from "@mikro-orm/core";
import {AppLogger} from "../../utils/logger/logger.util";
import {SessionSchema} from "../../persistance/schemas/session.schema";
import {NotFoundError} from "../../utils/errors/not-found.error";

export function getSessionByIdServiceCreator({orm, logger}: {
    orm: MikroORM,
    logger: AppLogger,
}) {
    return async (sessionId: string) => {
        const em = orm.em.fork();

        try {
            const session = await em.findOne(
                SessionSchema,
                sessionId,
                {
                    populate: ['movie', 'hall']
                }
            );

            if (!session) {
                throw new NotFoundError('Session not found');
            }

            return session;
        } catch (error) {
            logger.error('Get session by ID failed', error);
            throw error;
        }
    }
}
