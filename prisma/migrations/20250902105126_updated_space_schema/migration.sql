-- DropForeignKey
ALTER TABLE "public"."Space" DROP CONSTRAINT "Space_adminId_fkey";

-- AlterTable
ALTER TABLE "public"."Space" ALTER COLUMN "adminId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."Space" ADD CONSTRAINT "Space_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."User"("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
