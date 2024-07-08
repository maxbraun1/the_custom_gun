-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "userID" UUID;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
