import {NextFunction, Request, Response} from 'express';
import {AppLogger} from "../../utils/logger/logger.util";
import {ValidateData} from "../../utils/validation/validation.util";
import {mapBookingToResponseServiceCreator} from "../../services/booking/mappers/map-booking-to-response.service";
import {IdObjectData, idObjectSchema, updateBookingBodySchema, UpdateBookingData} from "@cinema/shared";
import {updateBookingStatusServiceCreator} from "../../services/booking/update-booking.service";

export function updateBookingControllerCreator(
    {
        logger,
        validateData,
        updateBookingStatusService,
        mapBookingToResponseService
    }: {
        logger: AppLogger,
        validateData: ValidateData<UpdateBookingData>,
        updateBookingStatusService: ReturnType<typeof updateBookingStatusServiceCreator>,
        mapBookingToResponseService: ReturnType<typeof mapBookingToResponseServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = validateData({
                schema: idObjectSchema,
                data: req.params,
            }) as unknown as IdObjectData;
            const updateData = validateData({
                schema: updateBookingBodySchema,
                data: req.body,
            });
            const updatedBooking = await updateBookingStatusService(
                req.user!.id,
                params.id,
                updateData
            );

            res.json(mapBookingToResponseService(updatedBooking));
        } catch (error) {
            logger.error('Booking status update failed', error);
            next(error);
        }
    };
}