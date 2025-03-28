import {sharedProperties} from "../shared/shared.properties";
import {EntitySchema} from "@mikro-orm/core";
import {BaseEntity} from "../base.entity";
import {Movie} from "./movie.schema";
import {Hall} from "./hall.schema";
import {Booking} from "./booking.schema";

export interface Session extends BaseEntity {
    movie: Movie;
    hall: Hall;
    bookings?: Booking[];
    startTime: Date,
}

export const SessionSchema = new EntitySchema<Session>({
    name: 'Session',
    tableName: 'sessions',
    properties: {
        ...sharedProperties,
        movie: {
            kind: 'm:1',
            entity: () => 'Movie',
            inversedBy: 'sessions',
            nullable: false
        },
        hall: {
            kind: 'm:1',
            entity: () => 'Hall',
            nullable: false
        },
        startTime: {
            type: 'datetime',
            nullable: false
        },
        bookings: {
            kind: '1:m',
            entity: () => 'Booking',
            mappedBy: 'session'
        }
    }
});