import pino, {Logger} from 'pino';

export type AppLogger = Logger

export const logger = pino({})
