-- DropForeignKey
ALTER TABLE "listing_images" DROP CONSTRAINT "listing_images_listingID_fkey";

-- DropForeignKey
ALTER TABLE "listing_images" DROP CONSTRAINT "listing_images_thumbnailForID_fkey";

-- AlterTable
ALTER TABLE "listing_images" ALTER COLUMN "listingID" DROP NOT NULL,
ALTER COLUMN "thumbnailForID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listingID_fkey" FOREIGN KEY ("listingID") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_thumbnailForID_fkey" FOREIGN KEY ("thumbnailForID") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
