import path from 'path';
import {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {MovieSchema} from "./schemas/movie.schema";
import {SessionSchema} from "./schemas/session.schema";
import {HallSchema} from "./schemas/hall.schema";
import {SeatSchema} from "./schemas/seat.schema";
import {UserSchema} from "./schemas/user.schema";
import {BookingSchema} from "./schemas/booking.schema";

export function getMikroOrmConfig() {
    const mikroOrmConfig: Options<PostgreSqlDriver> = {
        entities: [
            MovieSchema,
            SessionSchema,
            HallSchema,
            SeatSchema,
            UserSchema,
            BookingSchema
        ],
        driver: PostgreSqlDriver,
        dbName: process.env.DB_NAME || 'cinema_booking',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',

        migrations: {
            path: path.join(__dirname, './migrations'),
            // pattern: /^[\w-]+\d+\.ts$/,
            emit: 'ts',
        },

        debug: process.env.NODE_ENV === 'development',

        schemaGenerator: {
            disableForeignKeys: false,
            createForeignKeyConstraints: true,
        }
    };

    return mikroOrmConfig;
}

