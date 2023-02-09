import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1675842637785 implements MigrationInterface {
    name = 'migration1675842637785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`picture\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('member', 'admin') NOT NULL DEFAULT 'member', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`body\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, \`postId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`body\` text NOT NULL, \`views\` double NOT NULL, \`likes\` int NOT NULL, \`thumbnail\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_categories_category\` (\`postId\` varchar(36) NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_93b566d522b73cb8bc46f7405b\` (\`postId\`), INDEX \`IDX_a5e63f80ca58e7296d5864bd2d\` (\`categoryId\`), PRIMARY KEY (\`postId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_categories_category\` ADD CONSTRAINT \`FK_93b566d522b73cb8bc46f7405bd\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post_categories_category\` ADD CONSTRAINT \`FK_a5e63f80ca58e7296d5864bd2d3\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_categories_category\` DROP FOREIGN KEY \`FK_a5e63f80ca58e7296d5864bd2d3\``);
        await queryRunner.query(`ALTER TABLE \`post_categories_category\` DROP FOREIGN KEY \`FK_93b566d522b73cb8bc46f7405bd\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`DROP INDEX \`IDX_a5e63f80ca58e7296d5864bd2d\` ON \`post_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_93b566d522b73cb8bc46f7405b\` ON \`post_categories_category\``);
        await queryRunner.query(`DROP TABLE \`post_categories_category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
