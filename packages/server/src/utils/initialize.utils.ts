import {asFunction, asValue, AwilixContainer} from "awilix";
import {logger} from "./logger/logger.util";
import {validateData} from "./validation/validation.util";

export function initializeUtils(container: AwilixContainer): void {
    container.register({
        'logger': asValue(logger),
        'validateData': asFunction(validateData),
    })
}
