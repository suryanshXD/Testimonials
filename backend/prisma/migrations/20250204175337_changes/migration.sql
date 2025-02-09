/*
  Warnings:

  - The primary key for the `Space` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Space` table. All the data in the column will be lost.
  - The required column `space_id` was added to the `Space` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Space" DROP CONSTRAINT "Space_pkey",
DROP COLUMN "id",
ADD COLUMN     "space_id" TEXT NOT NULL,
ADD CONSTRAINT "Space_pkey" PRIMARY KEY ("space_id");
