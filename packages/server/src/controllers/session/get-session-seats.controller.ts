import {AppLogger} from "../../utils/logger/logger.util";
import {NextFunction, Request, Response} from 'express';
import {ValidateData} from "../../utils/validation/validation.util";
import {IdObjectData, idObjectSchema} from "@cinema/shared";
import {getSessionSeatsServiceCreator} from "../../services/session/get-session-seats.service";
import {mapSessionSeatToResponseServiceCreator} from "../../services/session/mappers/map-session-seat-to-response.service";

export function getSessionSeatsControllerCreator(
    {
        logger,
        validateData,
        getSessionSeatsService,
        mapSessionSeatToResponseService
    }: {
        logger: AppLogger,
        validateData: ValidateData<IdObjectData>,
        getSessionSeatsService: ReturnType<typeof getSessionSeatsServiceCreator>,
        mapSessionSeatToResponseService: ReturnType<typeof mapSessionSeatToResponseServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = validateData({
                schema: idObjectSchema,
                data: req.params,
            });
            const availableSeats = await getSessionSeatsService(params.id, req.user?.id);

            res.json(mapSessionSeatToResponseService(availableSeats));
        } catch (error) {
            logger.error('Get available seats failed', error);
            next(error);
        }
    }
}