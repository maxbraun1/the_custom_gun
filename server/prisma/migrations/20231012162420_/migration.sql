/*
  Warnings:

  - Made the column `quantity` on table `listings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "quantity" SET NOT NULL;
