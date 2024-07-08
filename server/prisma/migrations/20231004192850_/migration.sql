/*
  Warnings:

  - You are about to drop the column `freeShipping` on the `listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "freeShipping",
ADD COLUMN     "isFreeShipping" BOOLEAN;
