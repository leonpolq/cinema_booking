import {BaseEntity} from "./base.entity";

export type BaseCreationEntity<T extends BaseEntity> =
    Omit<T, keyof BaseEntity> & {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
};