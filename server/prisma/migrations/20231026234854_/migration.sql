/*
  Warnings:

  - Made the column `amount` on table `bids` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bids" ALTER COLUMN "amount" SET NOT NULL;
