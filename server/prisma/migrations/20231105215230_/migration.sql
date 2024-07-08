/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
ADD COLUMN     "isPaid" BOOLEAN DEFAULT false,
ADD COLUMN     "isShipped" BOOLEAN DEFAULT false,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE "orders_id_seq" RESTART WITH 10000000;

-- CreateTable
CREATE TABLE "watches" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listingID" UUID NOT NULL,
    "userID" UUID NOT NULL,

    CONSTRAINT "watches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "watches" ADD CONSTRAINT "watches_listingID_fkey" FOREIGN KEY ("listingID") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watches" ADD CONSTRAINT "watches_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
