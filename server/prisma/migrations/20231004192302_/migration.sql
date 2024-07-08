/*
  Warnings:

  - You are about to drop the column `engraved` on the `listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "engraved",
ADD COLUMN     "isEngraved" BOOLEAN;
