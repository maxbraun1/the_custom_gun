/*
  Warnings:

  - You are about to drop the column `type` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "type",
ADD COLUMN     "urgent" BOOLEAN DEFAULT false,
ALTER COLUMN "reference" DROP NOT NULL;
