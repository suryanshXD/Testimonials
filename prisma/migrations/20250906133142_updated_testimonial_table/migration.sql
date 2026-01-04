/*
  Warnings:

  - You are about to drop the column `space_id` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Testimonial" DROP CONSTRAINT "Testimonial_space_id_fkey";

-- AlterTable
ALTER TABLE "public"."Testimonial" DROP COLUMN "space_id",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Testimonial" ADD CONSTRAINT "Testimonial_slug_fkey" FOREIGN KEY ("slug") REFERENCES "public"."Space"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
