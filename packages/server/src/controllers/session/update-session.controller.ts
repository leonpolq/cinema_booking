import {NextFunction, Request, Response} from 'express';
import {AppLogger} from "../../utils/logger/logger.util";
import {mapSessionToResponseServiceCreator} from "../../services/session/mappers/map-session-to-response.service";
import {ValidateData} from "../../utils/validation/validation.util";
import {updateSessionServiceCreator} from "../../services/session/update-session.service";
import {idObjectSchema, updateSessionBodySchema} from "@cinema/shared";

export function updateSessionControllerCreator(
    {
        logger,
        validateData,
        updateSessionService,
        mapSessionToResponseService
    }: {
        logger: AppLogger,
        validateData: ValidateData,
        updateSessionService: ReturnType<typeof updateSessionServiceCreator>,
        mapSessionToResponseService: ReturnType<typeof mapSessionToResponseServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = validateData({
                schema: idObjectSchema,
                data: req.params,
            });
            const data = validateData({
                schema: updateSessionBodySchema,
                data: req.body,
            });

            const updatedSession = await updateSessionService(params.id, data);

            res.json(mapSessionToResponseService(updatedSession));
        } catch (error) {
            logger.error('Session update failed', error);
            next(error);
        }
    }
}