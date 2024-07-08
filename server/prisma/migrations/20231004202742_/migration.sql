-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "duration" VARCHAR(255),
ALTER COLUMN "acceptOffers" SET DEFAULT false,
ALTER COLUMN "isEngraved" SET DEFAULT false,
ALTER COLUMN "isFreeShipping" SET DEFAULT false;
