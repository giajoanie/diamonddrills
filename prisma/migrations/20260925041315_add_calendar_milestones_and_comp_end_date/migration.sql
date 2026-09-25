-- CreateEnum
CREATE TYPE "MilestoneKind" AS ENUM ('MILESTONE', 'DEADLINE', 'PRACTICE');

-- CreateEnum
CREATE TYPE "MilestoneScope" AS ENUM ('PERSONAL', 'SHARED');

-- AlterTable
ALTER TABLE "CalendarEvent" ADD COLUMN     "endDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "CalendarMilestone" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "kind" "MilestoneKind" NOT NULL,
    "scope" "MilestoneScope" NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalendarMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CalendarMilestone_createdById_scope_idx" ON "CalendarMilestone"("createdById", "scope");

-- CreateIndex
CREATE INDEX "CalendarMilestone_date_idx" ON "CalendarMilestone"("date");

-- AddForeignKey
ALTER TABLE "CalendarMilestone" ADD CONSTRAINT "CalendarMilestone_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
