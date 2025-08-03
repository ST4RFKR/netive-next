/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `Checkpoint` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'EMPLOYEE';

-- AlterTable
ALTER TABLE "Checkpoint" DROP COLUMN "photoUrl";

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "nfcTagId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CheckpointPhoto" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "checkpointId" TEXT NOT NULL,

    CONSTRAINT "CheckpointPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckpointPhoto" ADD CONSTRAINT "CheckpointPhoto_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "Checkpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
