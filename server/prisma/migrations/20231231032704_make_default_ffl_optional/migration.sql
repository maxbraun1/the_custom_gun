-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_default_ffl_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "default_ffl_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_default_ffl_id_fkey" FOREIGN KEY ("default_ffl_id") REFERENCES "ffls"("id") ON DELETE SET NULL ON UPDATE CASCADE;
