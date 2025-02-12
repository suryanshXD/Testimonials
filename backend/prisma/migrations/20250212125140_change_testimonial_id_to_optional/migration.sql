-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_testimonial_id_fkey";

-- AlterTable
ALTER TABLE "Testimonial" ALTER COLUMN "testimonial_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "Space"("space_id") ON DELETE SET NULL ON UPDATE CASCADE;
