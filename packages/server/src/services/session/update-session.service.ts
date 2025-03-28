import {MikroORM} from "@mikro-orm/core";
import {AppLogger} from "../../utils/logger/logger.util";
import {SessionSchema} from "../../persistance/schemas/session.schema";
import {NotFoundError} from "../../utils/errors/not-found.error";
import {UpdateSessionData} from "../../utils/validation/session/update-session.body.schema";

export function updateSessionServiceCreator({orm, logger}: {
    orm: MikroORM,
    logger: AppLogger,
}) {
    return async (
        sessionId: string,
        updateData: UpdateSessionData
    ) => {
        const em = orm.em.fork();

        try {
            const session = await em.findOne(
                SessionSchema,
                sessionId,
                {
                    populate: [
                        'movie',
                        'hall'
                    ]
                }
            );

            if (!session) {
                throw new NotFoundError('Session not found');
            }

            if (updateData.movie) {
                session.movie.title = updateData.movie.title;
                session.movie.description = updateData.movie.description;
            }

            if (updateData.startTime) {
                session.startTime = updateData.startTime;
            }

            await em.flush();

            return session;
        } catch (error) {
            logger.error('Session update failed', error);
            throw error;
        }
    }
}
