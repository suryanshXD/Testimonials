/*
  Warnings:

  - Added the required column `type` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TestimonialType" AS ENUM ('TEXT', 'VIDEO');

-- AlterTable
ALTER TABLE "public"."Testimonial" ADD COLUMN     "type" "public"."TestimonialType" NOT NULL;
