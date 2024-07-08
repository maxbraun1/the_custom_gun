/*
  Warnings:

  - Made the column `currentBid` on table `listings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "bidCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "currentBid" SET NOT NULL;
