/*
  Warnings:

  - You are about to drop the `EmployeeCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('EMPLOYEE', 'VEHICLE');

-- DropForeignKey
ALTER TABLE "EmployeeCard" DROP CONSTRAINT "EmployeeCard_userId_fkey";

-- DropTable
DROP TABLE "EmployeeCard";

-- CreateTable
CREATE TABLE "NFCCard" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "type" "CardType" NOT NULL DEFAULT 'EMPLOYEE',
    "userId" TEXT,
    "vehicleId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deactivatedAt" TIMESTAMP(3),

    CONSTRAINT "NFCCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NFCCard_cardId_key" ON "NFCCard"("cardId");

-- AddForeignKey
ALTER TABLE "NFCCard" ADD CONSTRAINT "NFCCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFCCard" ADD CONSTRAINT "NFCCard_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
