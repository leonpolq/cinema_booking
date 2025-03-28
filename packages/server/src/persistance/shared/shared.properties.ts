export const sharedProperties = {
    id: {
        type: 'uuid',
        primary: true,
        defaultRaw: 'gen_random_uuid()',
    },
    createdAt: {
        type: 'datetime',
        nullable: false,
        fieldName: 'created_at',
        default: 'NOW',
    },
    updatedAt: {
        type: 'datetime',
        nullable: false,
        fieldName: 'updated_at',
        default: 'NOW',
        onUpdate: (entity: any) => {
            entity.updatedAt = new Date();
        },
    },
}