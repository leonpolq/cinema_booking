import {sharedProperties} from "../shared/shared.properties";
import {EntitySchema} from "@mikro-orm/core";
import {BaseEntity} from "../base.entity";
import {Session} from "./session.schema";

export interface Hall extends BaseEntity {
    name: string;
    totalRows: number;
    seatsPerRow: number;
    sessions?: Session[];
}

export const HallSchema = new EntitySchema<Hall>({
    name: 'Hall',
    tableName: 'halls',
    properties: {
        ...sharedProperties,
        name: {
            type: 'string',
            nullable: false
        },
        totalRows: {
            type: 'number',
            nullable: false,
            fieldName: 'total_rows'
        },
        seatsPerRow: {
            type: 'number',
            nullable: false,
            fieldName: 'seats_per_row'
        },
        sessions: {
            kind: '1:m',
            entity: () => 'Session',
            mappedBy: 'hall'
        }
    }
});
