-- DropForeignKey
ALTER TABLE "listing_images" DROP CONSTRAINT "listing_images_listingID_fkey";

-- AlterTable
ALTER TABLE "listing_images" ALTER COLUMN "listingID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listingID_fkey" FOREIGN KEY ("listingID") REFERENCES "listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
