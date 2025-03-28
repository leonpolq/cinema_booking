import {initializeMikroOrm} from "./initialize.mikro-orm";
import {initializeEnvironmentVariables} from "../config/environment-varables.config";

export async function migrateSchemasMikroOrm() {
    initializeEnvironmentVariables()

    try {
        const orm = await initializeMikroOrm();
        const generator = orm.getSchemaGenerator();

        await generator.updateSchema();
        await orm.getMigrator().up();

        console.log('Database migrated');
    } catch (error) {
        console.error('Database migration error:', error);
    } finally {
        process.exit(1);
    }
}

migrateSchemasMikroOrm();