-- AlterTable
ALTER TABLE "Rubric" ADD COLUMN     "eventId" TEXT;

-- CreateIndex
CREATE INDEX "Rubric_eventId_idx" ON "Rubric"("eventId");

-- AddForeignKey
ALTER TABLE "Rubric" ADD CONSTRAINT "Rubric_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
