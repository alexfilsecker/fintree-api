/*
  Warnings:

  - You are about to drop the column `institutionId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `UserInstitutionCredentials` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `credentialsId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_institutionId_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserInstitutionCredentials" DROP CONSTRAINT "UserInstitutionCredentials_institutionId_fkey";

-- DropForeignKey
ALTER TABLE "UserInstitutionCredentials" DROP CONSTRAINT "UserInstitutionCredentials_userId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "institutionId",
DROP COLUMN "userId",
ADD COLUMN     "credentialsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserInstitutionCredentials";

-- CreateTable
CREATE TABLE "Credentials" (
    "id" SERIAL NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_userId_institutionId_key" ON "Credentials"("userId", "institutionId");

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "Credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
