import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import {initializeEnvironmentVariables} from "./config/environment-varables.config";
import {initializeDIContainer} from "./dependency-injection/di-container.config";
import {initializeMikroOrm} from "./persistance/initialize.mikro-orm";
import {asValue} from "awilix";

async function bootstrap() {
    initializeEnvironmentVariables()
    const orm = await initializeMikroOrm()

    const container = initializeDIContainer()

    container.register({
        'orm': asValue(orm),
    });

    function createServer() {
        const app = express();
        const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

        app.use(cors({
            origin: 'http://localhost:3001',
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        app.use(helmet());
        app.use(express.json());

        app.use('/api/v1', container.resolve('apiRoutes'));

        app.get('/health', (req, res) => {
            res.json({
                status: 'OK',
                timestamp: new Date().toISOString()
            });
        });

        app.use(container.resolve('globalErrorHandlingMiddleware'));

        return {app, port};
    }

    const {app, port} = createServer();
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    process.on('SIGTERM', () => {
        console.log('SIGTERM received. Shutting down gracefully');
        server.close(() => {
            console.log('Process terminated');
        });
    });

    return {app, server, orm, container};
}

if (require.main === module) {
    bootstrap().catch(console.error);
}

export default bootstrap;