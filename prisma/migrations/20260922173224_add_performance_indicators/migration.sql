-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "roleplayPathway" TEXT;

-- CreateTable
CREATE TABLE "PerformanceIndicator" (
    "id" TEXT NOT NULL,
    "examBankId" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "pathway" TEXT,
    "instructionalArea" TEXT NOT NULL,
    "code" TEXT,
    "level" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PerformanceIndicator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PerformanceIndicator_examBankId_tier_idx" ON "PerformanceIndicator"("examBankId", "tier");

-- CreateIndex
CREATE UNIQUE INDEX "PerformanceIndicator_examBankId_tier_pathway_code_descripti_key" ON "PerformanceIndicator"("examBankId", "tier", "pathway", "code", "description");

-- AddForeignKey
ALTER TABLE "PerformanceIndicator" ADD CONSTRAINT "PerformanceIndicator_examBankId_fkey" FOREIGN KEY ("examBankId") REFERENCES "ExamBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
