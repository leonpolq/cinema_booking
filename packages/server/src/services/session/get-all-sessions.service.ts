import {MikroORM} from "@mikro-orm/core";
import {AppLogger} from "../../utils/logger/logger.util";
import {SessionSchema} from "../../persistance/schemas/session.schema";

export function getAllSessionsServiceCreator({orm, logger}: {
    orm: MikroORM,
    logger: AppLogger,
}) {
    return async () => {
        const em = orm.em.fork();

        try {
            const sessions = await em.findAll(
                SessionSchema,
                {
                    populate: [
                        'movie',
                        'hall'
                    ]
                }
            );

            return sessions;
        } catch (error) {
            logger.error('Session creation failed', error);

            throw error;
        }
    }
}