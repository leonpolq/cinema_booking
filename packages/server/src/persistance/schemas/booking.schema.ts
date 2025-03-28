import {sharedProperties} from "../shared/shared.properties";
import {EntitySchema} from "@mikro-orm/core";
import {BaseEntity} from "../base.entity";
import {Seat} from "./seat.schema";
import {Session} from "./session.schema";
import {BookingStatus} from "@cinema/shared";
import {User} from "./user.schema";

export interface Booking extends BaseEntity {
    session: Session;
    seat: Seat[];
    user: User;
    status: BookingStatus;
    reservationStartTime: Date;
    confirmedAt?: Date;
    expiresAt: Date;
}

export const BookingSchema = new EntitySchema<Booking>({
    name: 'Booking',
    tableName: 'bookings',
    properties: {
        ...sharedProperties,
        session: {
            kind: 'm:1',
            entity: () => 'Session',
            nullable: false
        },
        seat: {
            kind: '1:m',
            entity: () => 'Seat',
            nullable: false,
            mappedBy: 'bookings'
        },
        user: {
            kind: 'm:1',
            entity: () => 'User',
            nullable: false
        },
        status: {
            type: 'enum',
            items: Object.values(BookingStatus),
            nullable: false
        },
        reservationStartTime: {
            type: 'datetime',
            nullable: false,
            fieldName: 'reservation_start_time'
        },
        confirmedAt: {
            type: 'datetime',
            nullable: true,
            fieldName: 'confirmed_at'
        },
        expiresAt: {
            type: 'datetime',
            nullable: false,
            fieldName: 'expires_at'
        }
    }
});