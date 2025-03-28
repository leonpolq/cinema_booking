import {MikroORM} from "@mikro-orm/core";
import {AppLogger} from "../../utils/logger/logger.util";
import {Movie, MovieSchema} from "../../persistance/schemas/movie.schema";
import {Hall, HallSchema} from "../../persistance/schemas/hall.schema";
import {Session, SessionSchema} from "../../persistance/schemas/session.schema";
import {CreateSessionData} from "@cinema/shared";

export function createSessionServiceCreator({orm, logger}: {
    orm: MikroORM,
    logger: AppLogger,
}) {
    return async (data: CreateSessionData): Promise<Session> => {
        const em = orm.em.fork();

        try {
            let movie = await em.findOne(
                MovieSchema,
                {title: data.movie.title}
            );

            if (!movie) {
                movie = em.create(MovieSchema, {
                    title: data.movie.title,
                    description: data.movie.description,
                } as Movie);
            }

            let hall = await em.findOne(
                HallSchema,
                {
                    name: data.hall.name,
                    totalRows: data.hall.totalRows,
                    seatsPerRow: data.hall.seatsPerRow
                }
            );

            if (!hall) {
                hall = em.create(
                    HallSchema,
                    {
                        name: data.hall.name,
                        totalRows: data.hall.totalRows,
                        seatsPerRow: data.hall.seatsPerRow
                    } as Hall
                );
            }

            const session = em.create(
                SessionSchema, {
                    movie,
                    hall,
                    startTime: data.startTime,
                } as Session
            );

            logger.info(`Creating session for movie: ${movie.title} in hall: ${hall.name}`);

            await em.flush();

            return session;
        } catch (error) {
            logger.error('Session creation failed', error);

            throw error;
        }
    }
}