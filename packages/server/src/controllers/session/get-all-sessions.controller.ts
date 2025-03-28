import {NextFunction, Request, Response} from 'express';
import {AppLogger} from "../../utils/logger/logger.util";
import {mapSessionToResponseServiceCreator} from "../../services/session/mappers/map-session-to-response.service";
import {getAllSessionsServiceCreator} from "../../services/session/get-all-sessions.service";

export function getAllSessionsControllerCreator(
    {
        logger,
        getAllSessionsService,
        mapSessionToResponseService
    }: {
        logger: AppLogger,
        getAllSessionsService: ReturnType<typeof getAllSessionsServiceCreator>,
        mapSessionToResponseService: ReturnType<typeof mapSessionToResponseServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sessions = await getAllSessionsService();

            res
                .status(201)
                .json(sessions.map(session => mapSessionToResponseService(session)));
        } catch (error) {
            logger.error('Get all failed', error);

            next(error);
        }
    }
}