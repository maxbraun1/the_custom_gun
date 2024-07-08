/*
  Warnings:

  - You are about to drop the `listing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "listing_images" DROP CONSTRAINT "listing_images_listingID_fkey";

-- DropTable
DROP TABLE "listing";

-- CreateTable
CREATE TABLE "listings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" VARCHAR(255) DEFAULT 'draft',
    "title" TEXT,
    "description" TEXT,
    "condition" VARCHAR(255),
    "upc" VARCHAR(255),
    "sku" VARCHAR(255),
    "serialNo" VARCHAR(255),
    "engraved" BOOLEAN,
    "primaryFinish" TEXT,
    "listingType" VARCHAR(255),
    "price" DECIMAL(12,2),
    "quantity" INTEGER,
    "acceptOffers" BOOLEAN,
    "listingDuration" INTEGER,
    "startingBid" DECIMAL(12,2),
    "reservePrice" DECIMAL(12,2),
    "buyNowPrice" DECIMAL(12,2),
    "freeShipping" BOOLEAN,
    "shippingCharge" DECIMAL(12,2),
    "sellerState" VARCHAR(2),

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listingID_fkey" FOREIGN KEY ("listingID") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
