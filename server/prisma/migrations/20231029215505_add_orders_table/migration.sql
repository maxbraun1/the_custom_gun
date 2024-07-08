-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ref" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listingID" UUID NOT NULL,
    "buyerUserID" UUID NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_ref_key" ON "orders"("ref");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_listingID_fkey" FOREIGN KEY ("listingID") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerUserID_fkey" FOREIGN KEY ("buyerUserID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
