/*
  Warnings:

  - You are about to drop the column `ammount` on the `Movement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,institutionId,valueDate,description,amount]` on the table `Movement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Movement_userId_institutionId_valueDate_description_ammount_key";

-- AlterTable
ALTER TABLE "Movement"
RENAME COLUMN "ammount" TO "amount";

-- CreateIndex
CREATE UNIQUE INDEX "Movement_userId_institutionId_valueDate_description_amount_key" ON "Movement"("userId", "institutionId", "valueDate", "description", "amount");
