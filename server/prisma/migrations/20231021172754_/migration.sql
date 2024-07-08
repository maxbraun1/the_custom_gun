/*
  Warnings:

  - A unique constraint covering the columns `[ref]` on the table `listings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "listings_ref_key" ON "listings"("ref");
