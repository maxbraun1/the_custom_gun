/*
  Warnings:

  - Made the column `userID` on table `listings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_userID_fkey";

-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "userID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
