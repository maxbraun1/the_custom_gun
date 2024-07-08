/*
  Warnings:

  - You are about to drop the column `isThumbnail` on the `listing_images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[thumbnailForID]` on the table `listing_images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `thumbnailForID` to the `listing_images` table without a default value. This is not possible if the table is not empty.
  - Made the column `listingID` on table `listing_images` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "listing_images" DROP CONSTRAINT "listing_images_listingID_fkey";

-- AlterTable
ALTER TABLE "listing_images" DROP COLUMN "isThumbnail",
ADD COLUMN     "thumbnailForID" UUID NOT NULL,
ALTER COLUMN "listingID" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "listing_images_thumbnailForID_key" ON "listing_images"("thumbnailForID");

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listingID_fkey" FOREIGN KEY ("listingID") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_thumbnailForID_fkey" FOREIGN KEY ("thumbnailForID") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
