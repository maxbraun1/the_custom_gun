/*
  Warnings:

  - Made the column `provider` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_date` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ref` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "provider" SET NOT NULL,
ALTER COLUMN "provider" SET DEFAULT 'local',
ALTER COLUMN "created_date" SET NOT NULL,
ALTER COLUMN "ref" SET NOT NULL;
