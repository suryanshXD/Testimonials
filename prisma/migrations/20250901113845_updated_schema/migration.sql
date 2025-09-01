-- CreateTable
CREATE TABLE "public"."FavoriteText" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "testimonialId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FavoriteVideo" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "testimonialId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteText_userId_testimonialId_key" ON "public"."FavoriteText"("userId", "testimonialId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteVideo_userId_testimonialId_key" ON "public"."FavoriteVideo"("userId", "testimonialId");

-- AddForeignKey
ALTER TABLE "public"."FavoriteText" ADD CONSTRAINT "FavoriteText_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FavoriteText" ADD CONSTRAINT "FavoriteText_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "public"."TextTestimonial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FavoriteVideo" ADD CONSTRAINT "FavoriteVideo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FavoriteVideo" ADD CONSTRAINT "FavoriteVideo_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "public"."VideoTestimonial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
