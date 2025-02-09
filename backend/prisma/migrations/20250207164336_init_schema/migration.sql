/*
  Warnings:

  - You are about to drop the column `date` on the `Space` table. All the data in the column will be lost.
  - Added the required column `url` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "date",
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "testimonial_id" TEXT NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "Space"("space_id") ON DELETE RESTRICT ON UPDATE CASCADE;
