import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPkrCurrency1234567890123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "currency" (code, symbol, symbol_native, name, decimal_digits, rounding)
            VALUES ('pkr', '₨', 'Rs', 'Pakistani Rupee', 2, 0)
            ON CONFLICT (code) DO NOTHING;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "currency" WHERE code = 'pkr';`)
    }
}