import {sharedProperties} from "../shared/shared.properties";
import {EntitySchema} from "@mikro-orm/core";
import {BaseEntity} from "../base.entity";
import {UserRole} from "@cinema/shared";
import {Booking} from "./booking.schema";

export interface User extends BaseEntity {
    email: string;
    passwordHash: string;
    name: string;
    role: UserRole;
    bookings?: Booking[];
}

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    tableName: 'users',
    properties: {
        ...sharedProperties,
        email: {
            type: 'string',
            nullable: false,
            unique: true
        },
        passwordHash: {
            type: 'string',
            nullable: false,
            fieldName: 'password_hash'
        },
        name: {
            type: 'string',
            nullable: false
        },
        role: {
            type: 'enum',
            items: Object.values(UserRole),
            nullable: false,
            default: UserRole.USER
        },
        bookings: {
            kind: '1:m',
            entity: () => 'Booking',
            mappedBy: 'user'
        }
    }
});