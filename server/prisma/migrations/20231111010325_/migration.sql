/*
  Warnings:

  - You are about to drop the column `ref` on the `orders` table. All the data in the column will be lost.
  - Changed the type of `code` on the `email_verifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "email_verifications_code_key";

-- DropIndex
DROP INDEX "orders_ref_key";

-- AlterTable
ALTER TABLE "email_verifications" DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "ref",
ADD COLUMN     "amount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "status" VARCHAR(100) NOT NULL DEFAULT 'pending';
