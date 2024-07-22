-- CreateEnum
CREATE TYPE "Currencys" AS ENUM ('CLP', 'AUD');

-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "currency" "Currencys" NOT NULL DEFAULT 'AUD';
