import {container} from "./container";
import {initializeControllers} from "../controllers/initialize.controllers";
import {initializeMiddlewares} from "../middlewares/initialize.middlewares";
import {initializeServices} from "../services/initialize.services";
import {initializeRoutes} from "../routes/initialize.routes";
import {AwilixContainer} from "awilix";
import {initializeUtils} from "../utils/initialize.utils";

export function initializeDIContainer(): AwilixContainer<any> {
    initializeServices(container);
    initializeMiddlewares(container);
    initializeControllers(container);
    initializeRoutes(container);
    initializeUtils(container);

    return container;
}
