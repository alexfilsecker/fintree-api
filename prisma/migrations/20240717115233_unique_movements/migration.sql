/*
  Warnings:

  - A unique constraint covering the columns `[userId,institutionId,date,description,ammount,balance]` on the table `Movement` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `Institution` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `ammount` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueDate` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InstitutionNames" AS ENUM ('SANTANDER', 'COMMONWEALTH');

-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "name",
ADD COLUMN     "name" "InstitutionNames" NOT NULL;

-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "ammount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "balance" DOUBLE PRECISION,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "valueDate" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movement_userId_institutionId_date_description_ammount_bala_key" ON "Movement"("userId", "institutionId", "date", "description", "ammount", "balance");
