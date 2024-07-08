-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255),
    "price" INTEGER,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
