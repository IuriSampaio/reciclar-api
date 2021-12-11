import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class userMigration1638238125593 implements MigrationInterface {

    private table = new Table({
        name: "user",
        columns: [
            {
                name: "sys_id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                isUnique: true
            },
            {
                name: "name",
                type: "varchar"
            },
            {
                name: "email",
                type: "varchar",
                isUnique: true
            },
            {
                name: "password",
                type: "varchar"
            },
            {
                name: "is_point_of_collect",
                type: "boolean"
            },
            {
                name: "is_recicler",
                type: "boolean"
            },
            {
                name: "sys_created_on",
                type: "datetime",
                isGenerated: true
            },
            {
                name: "sys_updated_on",
                type: "datetime",
                isGenerated: true
            },
            {
                name: "sys_mod_count",
                type: "integer",
                isGenerated: true
            }
        ]
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
