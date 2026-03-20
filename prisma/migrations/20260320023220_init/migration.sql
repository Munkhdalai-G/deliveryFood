/*
  Warnings:

  - The `status` column on the `FoodOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CANCELED', 'DELIVERED');

-- AlterTable
ALTER TABLE "FoodOrder" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
