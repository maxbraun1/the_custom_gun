/*
  Warnings:

  - You are about to drop the column `primaryFinish` on the `listings` table. All the data in the column will be lost.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `orders` table. All the data in the column will be lost.
  - The `id` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[number]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `primaryFinishID` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `condition` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `upc` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `listingType` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shippingCharge` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sellerState` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isEngraved` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isFreeShipping` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `listings` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `fees` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerItem` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `isPaid` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isShipped` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "primaryFinish",
ADD COLUMN     "hasReserve" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "primaryFinishID" UUID NOT NULL,
ADD COLUMN     "reserveMet" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "condition" SET NOT NULL,
ALTER COLUMN "upc" SET NOT NULL,
ALTER COLUMN "listingType" SET NOT NULL,
ALTER COLUMN "shippingCharge" SET NOT NULL,
ALTER COLUMN "sellerState" SET NOT NULL,
ALTER COLUMN "isEngraved" SET NOT NULL,
ALTER COLUMN "isFreeShipping" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "amount",
ADD COLUMN     "billingAddress1" TEXT,
ADD COLUMN     "billingAddress2" TEXT,
ADD COLUMN     "billingCity" TEXT,
ADD COLUMN     "billingName" TEXT,
ADD COLUMN     "billingState" VARCHAR(2),
ADD COLUMN     "billingZip" VARCHAR(5),
ADD COLUMN     "feedbackSubmitted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fees" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "number" SERIAL NOT NULL,
ADD COLUMN     "pricePerItem" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "shipToFFLID" UUID,
ADD COLUMN     "shippingPrice" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "total" DECIMAL(12,2) NOT NULL,
ALTER COLUMN "isPaid" SET NOT NULL,
ALTER COLUMN "isShipped" SET NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "rating" DECIMAL(2,1) NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE "ffls" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "LIC_FULL" VARCHAR(255) NOT NULL,
    "LIC_REGN" VARCHAR(255) NOT NULL,
    "LIC_DIST" VARCHAR(255) NOT NULL,
    "LIC_CNTY" VARCHAR(255) NOT NULL,
    "LIC_TYPE" VARCHAR(255) NOT NULL,
    "LIC_XPRDTE" VARCHAR(255) NOT NULL,
    "LIC_SEQN" VARCHAR(255) NOT NULL,
    "LICENSE_NAME" VARCHAR(255),
    "BUSINESS_NAME" VARCHAR(255),
    "PREMISE_STREET" VARCHAR(255),
    "PREMISE_CITY" VARCHAR(255),
    "PREMISE_STATE" VARCHAR(255),
    "PREMISE_ZIP_CODE" VARCHAR(255),
    "MAIL_STREET" VARCHAR(255),
    "MAIL_CITY" VARCHAR(255),
    "MAIL_STATE" VARCHAR(255),
    "MAIL_ZIP_CODE" VARCHAR(255),
    "VOICE_PHONE" VARCHAR(255),

    CONSTRAINT "ffls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderID" UUID NOT NULL,
    "sellerID" UUID NOT NULL,
    "buyerID" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "support_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ffls_LIC_FULL_key" ON "ffls"("LIC_FULL");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_orderID_key" ON "feedback"("orderID");

-- CreateIndex
CREATE UNIQUE INDEX "orders_number_key" ON "orders"("number");

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_primaryFinishID_fkey" FOREIGN KEY ("primaryFinishID") REFERENCES "finishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipToFFLID_fkey" FOREIGN KEY ("shipToFFLID") REFERENCES "ffls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_buyerID_fkey" FOREIGN KEY ("buyerID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
