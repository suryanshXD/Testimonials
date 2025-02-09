-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "space_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "space_name_key" ON "space"("name");

-- AddForeignKey
ALTER TABLE "space" ADD CONSTRAINT "space_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
