/*
  Warnings:

  - A unique constraint covering the columns `[userId,institutionId,valueDate,description,ammount]` on the table `Movement` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Movement_userId_institutionId_date_description_ammount_bala_key";

-- CreateIndex
CREATE UNIQUE INDEX "Movement_userId_institutionId_valueDate_description_ammount_key" ON "Movement"("userId", "institutionId", "valueDate", "description", "ammount");
