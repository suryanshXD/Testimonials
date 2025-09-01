-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "imageUrl" TEXT,
    "clerkUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Space" (
    "space_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("space_id")
);

-- CreateTable
CREATE TABLE "public"."TextTestimonial" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testimonial_id" TEXT,

    CONSTRAINT "TextTestimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VideoTestimonial" (
    "id" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testimonial_id" TEXT,

    CONSTRAINT "VideoTestimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "public"."User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Space_name_key" ON "public"."Space"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Space_slug_key" ON "public"."Space"("slug");

-- AddForeignKey
ALTER TABLE "public"."Space" ADD CONSTRAINT "Space_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TextTestimonial" ADD CONSTRAINT "TextTestimonial_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "public"."Space"("space_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VideoTestimonial" ADD CONSTRAINT "VideoTestimonial_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "public"."Space"("space_id") ON DELETE SET NULL ON UPDATE CASCADE;
