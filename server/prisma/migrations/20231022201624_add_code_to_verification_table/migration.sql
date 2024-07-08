/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `email_verifications` will be added. If there are existing duplicate values, this will fail.
  - The required column `code` was added to the `email_verifications` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "email_verifications" ADD COLUMN     "code" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_code_key" ON "email_verifications"("code");
