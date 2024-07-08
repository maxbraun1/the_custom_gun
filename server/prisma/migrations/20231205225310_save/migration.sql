/*
  Warnings:

  - Added the required column `itemType` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "itemType" VARCHAR(255) NOT NULL,
ALTER COLUMN "upc" DROP NOT NULL,
ALTER COLUMN "shippingCharge" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "offers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listingID" UUID NOT NULL,
    "sellerID" UUID NOT NULL,
    "buyerID" UUID NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "accepted" BOOLEAN,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_listingID_fkey" FOREIGN KEY ("listingID") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_buyerID_fkey" FOREIGN KEY ("buyerID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
