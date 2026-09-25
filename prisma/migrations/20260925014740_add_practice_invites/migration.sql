-- CreateTable
CREATE TABLE "PracticeInvite" (
    "id" TEXT NOT NULL,
    "roleplaySessionId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PracticeInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PracticeInvite_toUserId_idx" ON "PracticeInvite"("toUserId");

-- CreateIndex
CREATE INDEX "PracticeInvite_roleplaySessionId_idx" ON "PracticeInvite"("roleplaySessionId");

-- AddForeignKey
ALTER TABLE "PracticeInvite" ADD CONSTRAINT "PracticeInvite_roleplaySessionId_fkey" FOREIGN KEY ("roleplaySessionId") REFERENCES "RoleplayPracticeSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeInvite" ADD CONSTRAINT "PracticeInvite_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeInvite" ADD CONSTRAINT "PracticeInvite_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
