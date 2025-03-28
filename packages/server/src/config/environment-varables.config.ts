import * as dotenv from 'dotenv';

export function initializeEnvironmentVariables() {
    dotenv.config({
        path: `.env.${process.env.NODE_ENV}`,
        override: true,
    });
}