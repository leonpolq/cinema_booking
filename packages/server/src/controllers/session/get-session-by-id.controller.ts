import {NextFunction, Request, Response} from 'express';
import {AppLogger} from "../../utils/logger/logger.util";
import {mapSessionToResponseServiceCreator} from "../../services/session/mappers/map-session-to-response.service";
import {getSessionByIdServiceCreator} from "../../services/session/get-session-by-id.service";
import {ValidateData} from "../../utils/validation/validation.util";
import {IdObjectData, idObjectSchema} from "@cinema/shared";

export function getSessionByIdControllerCreator(
    {
        logger,
        validateData,
        getSessionByIdService,
        mapSessionToResponseService
    }: {
        logger: AppLogger,
        validateData: ValidateData<IdObjectData>,
        getSessionByIdService: ReturnType<typeof getSessionByIdServiceCreator>,
        mapSessionToResponseService: ReturnType<typeof mapSessionToResponseServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = validateData({
                schema: idObjectSchema,
                data: req.params,
            });
            const session = await getSessionByIdService(params.id);

            res.json(mapSessionToResponseService(session));
        } catch (error) {
            logger.error('Get session by ID failed', error);
            next(error);
        }
    }
}
