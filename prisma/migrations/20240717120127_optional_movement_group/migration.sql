-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_groupMovementId_fkey";

-- AlterTable
ALTER TABLE "Movement" ALTER COLUMN "groupMovementId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_groupMovementId_fkey" FOREIGN KEY ("groupMovementId") REFERENCES "GroupMovement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
