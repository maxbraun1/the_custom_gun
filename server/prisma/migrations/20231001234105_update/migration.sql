-- CreateTable
CREATE TABLE "listing_images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "isThumbnail" BOOLEAN DEFAULT false,
    "uploaded_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "listingID" UUID NOT NULL,

    CONSTRAINT "listing_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing" (
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

    CONSTRAINT "listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listingID_fkey" FOREIGN KEY ("listingID") REFERENCES "listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
