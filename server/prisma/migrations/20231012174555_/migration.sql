/*
  Warnings:

  - Made the column `account_status` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "account_status" SET NOT NULL,
ALTER COLUMN "account_status" SET DEFAULT 'pending',
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'user';
