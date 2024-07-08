/*
  Warnings:

  - You are about to drop the column `listingID` on the `bids` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `bids` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `email_verifications` table. All the data in the column will be lost.
  - You are about to drop the column `buyerID` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `orderID` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `sellerID` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `listingID` on the `listing_images` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailForID` on the `listing_images` table. All the data in the column will be lost.
  - You are about to drop the column `acceptOffers` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `bidCount` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `buyNowPrice` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `currentBid` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `hasReserve` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `isEngraved` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `isFreeShipping` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `itemType` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `listingType` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `primaryFinishID` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `reserveMet` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `reservePrice` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `sellerState` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `serialNo` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `shippingCharge` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `startingBid` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `buyerID` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `listingID` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `sellerID` on the `offers` table. All the data in the column will be lost.
  - You are about to drop the column `billingAddress1` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `billingAddress2` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `billingCity` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `billingName` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `billingState` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `billingZip` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `buyerUserID` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackSubmitted` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `isShipped` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `listingID` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerItem` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipToFFLID` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shippingPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `password_reset_codes` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `listingID` on the `watches` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `watches` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `email_verifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `feedback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[thumbnail_for_id]` on the table `listing_images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `listing_id` to the `bids` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `bids` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `email_verifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyer_id` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frame_finish_id` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_type` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listing_type` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondary_finish_id` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_state` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyer_id` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listing_id` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyer_user_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listing_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_item` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `password_reset_codes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `default_ffl_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listing_id` to the `watches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `watches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_listingID_fkey";

-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_userID_fkey";

-- DropForeignKey
ALTER TABLE "email_verifications" DROP CONSTRAINT "email_verifications_userID_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_buyerID_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_orderID_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_sellerID_fkey";

-- DropForeignKey
ALTER TABLE "listing_images" DROP CONSTRAINT "listing_images_listingID_fkey";

-- DropForeignKey
ALTER TABLE "listing_images" DROP CONSTRAINT "listing_images_thumbnailForID_fkey";

-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_primaryFinishID_fkey";

-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_userID_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userID_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_buyerID_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_listingID_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_sellerID_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_buyerUserID_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_listingID_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipToFFLID_fkey";

-- DropForeignKey
ALTER TABLE "password_reset_codes" DROP CONSTRAINT "password_reset_codes_userID_fkey";

-- DropForeignKey
ALTER TABLE "watches" DROP CONSTRAINT "watches_listingID_fkey";

-- DropForeignKey
ALTER TABLE "watches" DROP CONSTRAINT "watches_userID_fkey";

-- DropIndex
DROP INDEX "email_verifications_userID_key";

-- DropIndex
DROP INDEX "feedback_orderID_key";

-- DropIndex
DROP INDEX "listing_images_thumbnailForID_key";

-- AlterTable
ALTER TABLE "bids" DROP COLUMN "listingID",
DROP COLUMN "userID",
ADD COLUMN     "listing_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "email_verifications" DROP COLUMN "userID",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "buyerID",
DROP COLUMN "orderID",
DROP COLUMN "sellerID",
ADD COLUMN     "buyer_id" UUID NOT NULL,
ADD COLUMN     "order_id" UUID NOT NULL,
ADD COLUMN     "seller_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "listing_images" DROP COLUMN "listingID",
DROP COLUMN "thumbnailForID",
ADD COLUMN     "listing_id" UUID,
ADD COLUMN     "thumbnail_for_id" UUID;

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "acceptOffers",
DROP COLUMN "bidCount",
DROP COLUMN "buyNowPrice",
DROP COLUMN "createdDate",
DROP COLUMN "currentBid",
DROP COLUMN "endDate",
DROP COLUMN "hasReserve",
DROP COLUMN "isEngraved",
DROP COLUMN "isFreeShipping",
DROP COLUMN "itemType",
DROP COLUMN "listingType",
DROP COLUMN "primaryFinishID",
DROP COLUMN "reserveMet",
DROP COLUMN "reservePrice",
DROP COLUMN "sellerState",
DROP COLUMN "serialNo",
DROP COLUMN "shippingCharge",
DROP COLUMN "startingBid",
DROP COLUMN "userID",
ADD COLUMN     "accept_offers" BOOLEAN DEFAULT false,
ADD COLUMN     "bid_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "buy_now_price" DECIMAL(12,2),
ADD COLUMN     "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_bid" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "end_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "frame_finish_id" UUID NOT NULL,
ADD COLUMN     "has_reserve" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_engraved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_free_shipping" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "item_type" VARCHAR(255) NOT NULL,
ADD COLUMN     "listing_type" VARCHAR(255) NOT NULL,
ADD COLUMN     "reserve_met" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reserve_price" DECIMAL(12,2),
ADD COLUMN     "secondary_finish_id" UUID NOT NULL,
ADD COLUMN     "seller_state" VARCHAR(2) NOT NULL,
ADD COLUMN     "serial_no" VARCHAR(255),
ADD COLUMN     "shipping_charge" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "starting_bid" DECIMAL(12,2),
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "createdDate",
DROP COLUMN "userID",
ADD COLUMN     "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "offers" DROP COLUMN "buyerID",
DROP COLUMN "listingID",
DROP COLUMN "sellerID",
ADD COLUMN     "buyer_id" UUID NOT NULL,
ADD COLUMN     "listing_id" UUID NOT NULL,
ADD COLUMN     "seller_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "billingAddress1",
DROP COLUMN "billingAddress2",
DROP COLUMN "billingCity",
DROP COLUMN "billingName",
DROP COLUMN "billingState",
DROP COLUMN "billingZip",
DROP COLUMN "buyerUserID",
DROP COLUMN "feedbackSubmitted",
DROP COLUMN "isPaid",
DROP COLUMN "isShipped",
DROP COLUMN "listingID",
DROP COLUMN "pricePerItem",
DROP COLUMN "shipToFFLID",
DROP COLUMN "shippingPrice",
ADD COLUMN     "billing_address_1" TEXT,
ADD COLUMN     "billing_address_2" TEXT,
ADD COLUMN     "billing_city" TEXT,
ADD COLUMN     "billing_name" TEXT,
ADD COLUMN     "billing_state" VARCHAR(2),
ADD COLUMN     "billing_zip" VARCHAR(5),
ADD COLUMN     "buyer_user_id" UUID NOT NULL,
ADD COLUMN     "feedback_submitted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_shipped" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "listing_id" UUID NOT NULL,
ADD COLUMN     "price_per_item" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "ship_to_ffl_id" UUID,
ADD COLUMN     "shipping_price" DECIMAL(12,2) NOT NULL;

-- AlterTable
ALTER TABLE "password_reset_codes" DROP COLUMN "userID",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "city",
DROP COLUMN "created_date",
DROP COLUMN "state",
DROP COLUMN "zip",
ADD COLUMN     "account_created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "billing_city" VARCHAR(255),
ADD COLUMN     "billing_first_name" VARCHAR(255),
ADD COLUMN     "billing_last_name" VARCHAR(255),
ADD COLUMN     "billing_state" VARCHAR(255),
ADD COLUMN     "billing_zip" VARCHAR(10),
ADD COLUMN     "default_ffl_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "watches" DROP COLUMN "listingID",
DROP COLUMN "userID",
ADD COLUMN     "listing_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_user_id_key" ON "email_verifications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_order_id_key" ON "feedback"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "listing_images_thumbnail_for_id_key" ON "listing_images"("thumbnail_for_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_default_ffl_id_fkey" FOREIGN KEY ("default_ffl_id") REFERENCES "ffls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_images" ADD CONSTRAINT "listing_images_thumbnail_for_id_fkey" FOREIGN KEY ("thumbnail_for_id") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_frame_finish_id_fkey" FOREIGN KEY ("frame_finish_id") REFERENCES "finishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_secondary_finish_id_fkey" FOREIGN KEY ("secondary_finish_id") REFERENCES "finishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_ship_to_ffl_id_fkey" FOREIGN KEY ("ship_to_ffl_id") REFERENCES "ffls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyer_user_id_fkey" FOREIGN KEY ("buyer_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watches" ADD CONSTRAINT "watches_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watches" ADD CONSTRAINT "watches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_codes" ADD CONSTRAINT "password_reset_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
