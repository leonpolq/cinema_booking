import {NextFunction, Request, Response} from 'express';
import {AppLogger} from "../../utils/logger/logger.util";
import {ValidateData} from "../../utils/validation/validation.util";
import {createSessionBodySchema, CreateSessionData} from "@cinema/shared";
import {createSessionServiceCreator} from "../../services/session/create-session.service";
import {mapSessionToResponseServiceCreator} from "../../services/session/mappers/map-session-to-response.service";

export function createSessionControllerCreator(
    {logger, validateData, createSessionService, mapSessionToResponseService}: {
        logger: AppLogger,
        validateData: ValidateData<CreateSessionData>
        createSessionService: ReturnType<typeof createSessionServiceCreator>,
        mapSessionToResponseService: ReturnType<typeof mapSessionToResponseServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = validateData({
                schema: createSessionBodySchema,
                data: req.body,
            });

            const session = await createSessionService(data);

            res
                .status(201)
                .json(mapSessionToResponseService(session));
        } catch (error) {
            logger.error('Session creation failed', error);

            next(error);
        }
    }
}