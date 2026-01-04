/*
  Warnings:

  - You are about to drop the `FavoriteText` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteVideo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TextTestimonial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoTestimonial` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `space_id` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."FavoriteText" DROP CONSTRAINT "FavoriteText_testimonialId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FavoriteText" DROP CONSTRAINT "FavoriteText_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FavoriteVideo" DROP CONSTRAINT "FavoriteVideo_testimonialId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FavoriteVideo" DROP CONSTRAINT "FavoriteVideo_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TextTestimonial" DROP CONSTRAINT "TextTestimonial_testimonial_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."VideoTestimonial" DROP CONSTRAINT "VideoTestimonial_testimonial_id_fkey";

-- AlterTable
ALTER TABLE "public"."Testimonial" ADD COLUMN     "space_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."FavoriteText";

-- DropTable
DROP TABLE "public"."FavoriteVideo";

-- DropTable
DROP TABLE "public"."TextTestimonial";

-- DropTable
DROP TABLE "public"."VideoTestimonial";

-- CreateTable
CREATE TABLE "public"."FavoriteTestimonial" (
    "id" TEXT NOT NULL,
    "testimonial_id" TEXT NOT NULL,
    "space_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteTestimonial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Testimonial" ADD CONSTRAINT "Testimonial_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "public"."Space"("space_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FavoriteTestimonial" ADD CONSTRAINT "FavoriteTestimonial_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "public"."Testimonial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FavoriteTestimonial" ADD CONSTRAINT "FavoriteTestimonial_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "public"."Space"("space_id") ON DELETE RESTRICT ON UPDATE CASCADE;
