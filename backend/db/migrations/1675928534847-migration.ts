import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1675928534847 implements MigrationInterface {
    name = 'migration1675928534847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('member', 'admin') NOT NULL DEFAULT 'member'`);
    }

}
