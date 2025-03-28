import {NextFunction, Request, Response} from 'express';
import {AppLogger} from "../../utils/logger/logger.util";
import {createBookingServiceCreator} from '../../services/booking/create-booking.service';
import {ValidateData} from "../../utils/validation/validation.util";
import {createBookingBodySchema, CreateBookingData} from "@cinema/shared";
import {mapBookingToResponseServiceCreator} from "../../services/booking/mappers/map-booking-to-response.service";

export function createBookingControllerCreator(
    {
        logger,
        validateData,
        createBookingService,
        mapBookingToResponseService
    }: {
        logger: AppLogger,
        validateData: ValidateData<CreateBookingData>
        createBookingService: ReturnType<typeof createBookingServiceCreator>
        mapBookingToResponseService: ReturnType<typeof mapBookingToResponseServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bookingData = validateData({
                schema: createBookingBodySchema,
                data: req.body,
            });

            const booking = await createBookingService(req.user!.id, bookingData);

            res.status(201).json(mapBookingToResponseService(booking));
        } catch (error) {
            logger.error('Create booking failed', error);
            next(error);
        }
    };
}