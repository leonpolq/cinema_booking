import {NextFunction, Request, Response} from 'express';
import {AppLogger} from "../../utils/logger/logger.util";
import {mapBookingToResponseServiceCreator} from "../../services/booking/mappers/map-booking-to-response.service";
import {getBookingByIdServiceCreator} from "../../services/booking/get-booking-by-id.service";
import {ValidateData} from "../../utils/validation/validation.util";
import {IdObjectData, idObjectSchema} from "@cinema/shared";

export function getBookingByIdControllerCreator(
    {
        logger,
        validateData,
        getBookingByIdService,
        mapBookingToResponseService
    }: {
        logger: AppLogger,
        validateData: ValidateData<IdObjectData>,
        getBookingByIdService: ReturnType<typeof getBookingByIdServiceCreator>,
        mapBookingToResponseService: ReturnType<typeof mapBookingToResponseServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = validateData({
                schema: idObjectSchema,
                data: req.params,
            });
            const booking = await getBookingByIdService(params.id, req.user!.id);

            res.json(mapBookingToResponseService(booking));
        } catch (error) {
            logger.error('Get booking by ID failed', error);
            next(error);
        }
    };
}