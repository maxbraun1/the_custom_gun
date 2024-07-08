-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_secondary_finish_id_fkey";

-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "secondary_finish_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_secondary_finish_id_fkey" FOREIGN KEY ("secondary_finish_id") REFERENCES "finishes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
