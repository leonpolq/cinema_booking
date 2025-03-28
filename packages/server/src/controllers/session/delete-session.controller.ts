import {NextFunction, Request, Response} from 'express';
import {AppLogger} from "../../utils/logger/logger.util";
import {deleteSessionServiceCreator} from "../../services/session/delete-session.service";
import {IdObjectData, idObjectSchema} from "@cinema/shared";
import {ValidateData} from "../../utils/validation/validation.util";

export function deleteSessionControllerCreator(
    {
        logger,
        validateData,
        deleteSessionService
    }: {
        logger: AppLogger,
        validateData: ValidateData<IdObjectData>,
        deleteSessionService: ReturnType<typeof deleteSessionServiceCreator>
    }
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = validateData({
                schema: idObjectSchema,
                data: req.params,
            });

            await deleteSessionService(params.id);

            res.status(204).send();
        } catch (error) {
            logger.error('Session deletion failed', error);

            next(error);
        }
    }
}
