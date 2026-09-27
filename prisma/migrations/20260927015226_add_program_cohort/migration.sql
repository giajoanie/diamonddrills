-- CreateEnum
CREATE TYPE "Program" AS ENUM ('HIGH_SCHOOL', 'EBL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "program" "Program" NOT NULL DEFAULT 'HIGH_SCHOOL';

-- CreateIndex
CREATE INDEX "User_role_program_idx" ON "User"("role", "program");
