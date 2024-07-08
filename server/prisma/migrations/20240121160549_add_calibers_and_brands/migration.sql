-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "brand_id" UUID,
ADD COLUMN     "caliber_id" UUID;

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" VARCHAR(255) NOT NULL,
    "display" VARCHAR(255) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calibers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" VARCHAR(255) NOT NULL,
    "display" VARCHAR(255) NOT NULL,

    CONSTRAINT "calibers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_value_key" ON "brands"("value");

-- CreateIndex
CREATE UNIQUE INDEX "brands_display_key" ON "brands"("display");

-- CreateIndex
CREATE UNIQUE INDEX "calibers_value_key" ON "calibers"("value");

-- CreateIndex
CREATE UNIQUE INDEX "calibers_display_key" ON "calibers"("display");

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_caliber_id_fkey" FOREIGN KEY ("caliber_id") REFERENCES "calibers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
