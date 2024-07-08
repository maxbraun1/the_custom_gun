/*
  Warnings:

  - The required column `ref` was added to the `listings` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "ref" VARCHAR(255) NOT NULL;
