import {sharedProperties} from "../shared/shared.properties";
import {EntitySchema} from "@mikro-orm/core";
import {BaseEntity} from "../base.entity";
import {Session} from "./session.schema";

export interface Movie extends BaseEntity {
    title: string;
    description?: string;
    sessions?: Session[];
}

export const MovieSchema = new EntitySchema<Movie>({
    name: 'Movie',
    tableName: 'movies',
    properties: {
        ...sharedProperties,
        title: {
            type: 'string',
            nullable: false
        },
        description: {
            type: 'text',
            nullable: true
        },
        sessions: {
            kind: '1:m',
            entity: () => 'Session',
            mappedBy: 'movie',
        }
    }
});
