-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "customized_by" VARCHAR(255);

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "is_received" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paid_date" TIMESTAMP(6),
ADD COLUMN     "received_date" TIMESTAMP(6),
ADD COLUMN     "shipped_date" TIMESTAMP(6);
