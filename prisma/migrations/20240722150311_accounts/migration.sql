/*
  Warnings:

  - You are about to drop the column `institutionId` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Movement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId,valueDate,description,amount]` on the table `Movement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_institutionId_fkey";

-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_userId_fkey";

-- DropIndex
DROP INDEX "Movement_userId_institutionId_valueDate_description_amount_key";

-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "institutionId",
DROP COLUMN "userId",
ADD COLUMN     "accountId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "currency" "Currencys" NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movement_accountId_valueDate_description_amount_key" ON "Movement"("accountId", "valueDate", "description", "amount");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
