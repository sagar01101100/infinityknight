-- CreateTable
CREATE TABLE "Knight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "confirmPassword" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "mobileNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productName" TEXT NOT NULL,
    "productType" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Knight_username_key" ON "Knight"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Knight_email_key" ON "Knight"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
