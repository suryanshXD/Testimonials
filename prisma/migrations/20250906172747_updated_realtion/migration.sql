/*
  Warnings:

  - You are about to drop the column `slug` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `space_id` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Testimonial" DROP CONSTRAINT "Testimonial_slug_fkey";

-- AlterTable
ALTER TABLE "public"."Testimonial" DROP COLUMN "slug",
ADD COLUMN     "space_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Testimonial" ADD CONSTRAINT "Testimonial_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "public"."Space"("space_id") ON DELETE RESTRICT ON UPDATE CASCADE;
