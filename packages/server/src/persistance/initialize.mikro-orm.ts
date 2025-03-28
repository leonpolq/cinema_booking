import {MikroORM} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {getMikroOrmConfig} from "./mikro-orm.configuration";

export async function initializeMikroOrm() {
    try {
        const orm = MikroORM.initSync<PostgreSqlDriver>(getMikroOrmConfig());

        console.log('Database connected successfully');

        return orm;
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}