import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1752794947085 implements MigrationInterface {
    name = 'InitialSchema1752794947085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "psychologists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "specializations" text array NOT NULL, "rating" numeric(3,1) NOT NULL DEFAULT '0', "experience" integer NOT NULL DEFAULT '0', "avatar" character varying(500), "bio" text NOT NULL, "price_per_session" integer NOT NULL, "languages" text array NOT NULL DEFAULT '{}', "education" text array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_15437f01f4bee8ec777f1d72d64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20), "birth_date" date, "notes" text, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_slots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "psychologist_id" uuid NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "available" boolean NOT NULL DEFAULT true, "user_id" uuid, "booking_notes" text, "virtual_session" boolean NOT NULL DEFAULT true, "clinic_session" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f87c73d8648c3f3f297adba3cb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "time_slots" ADD CONSTRAINT "FK_a41484f0f53c3b24ee2685b71ba" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_slots" ADD CONSTRAINT "FK_85935ce4902a360b47203918ece" FOREIGN KEY ("psychologist_id") REFERENCES "psychologists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_slots" DROP CONSTRAINT "FK_85935ce4902a360b47203918ece"`);
        await queryRunner.query(`ALTER TABLE "time_slots" DROP CONSTRAINT "FK_a41484f0f53c3b24ee2685b71ba"`);
        await queryRunner.query(`DROP TABLE "time_slots"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "psychologists"`);
    }

}
