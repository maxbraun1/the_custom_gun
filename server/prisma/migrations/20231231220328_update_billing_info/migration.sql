/*
  Warnings:

  - You are about to drop the column `billing_first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `billing_last_name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "billing_first_name",
DROP COLUMN "billing_last_name",
ADD COLUMN     "billing_address_1" VARCHAR(255),
ADD COLUMN     "billing_address_2" VARCHAR(255),
ADD COLUMN     "billing_name" VARCHAR(255);
