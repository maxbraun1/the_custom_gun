-- CreateTable
CREATE TABLE "finishes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" VARCHAR(255) NOT NULL,
    "display" VARCHAR(255) NOT NULL,

    CONSTRAINT "finishes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "finishes_value_key" ON "finishes"("value");

-- CreateIndex
CREATE UNIQUE INDEX "finishes_display_key" ON "finishes"("display");
