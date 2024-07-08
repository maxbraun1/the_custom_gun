-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" UUID NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'unread',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "reference" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
