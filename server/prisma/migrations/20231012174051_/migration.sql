/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `status` on table `listings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "status" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_ref_key" ON "users"("ref");
