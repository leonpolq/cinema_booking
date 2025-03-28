import {sharedProperties} from "../shared/shared.properties";
import {EntitySchema} from "@mikro-orm/core";
import {BaseEntity} from "../base.entity";
import {Booking} from "./booking.schema";

export interface Seat extends BaseEntity {
    rowNumber: number;
    seatNumber: number;
    bookings?: Booking[];
}

export const SeatSchema = new EntitySchema<Seat>({
    name: 'Seat',
    tableName: 'seats',
    properties: {
        ...sharedProperties,
        rowNumber: {
            type: 'number',
            nullable: false,
            fieldName: 'row_number'
        },
        seatNumber: {
            type: 'number',
            nullable: false,
            fieldName: 'seat_number'
        },
        bookings: {
            kind: 'm:1',
            entity: () => 'Booking',
            inversedBy: 'seat'
        }
    }
});
