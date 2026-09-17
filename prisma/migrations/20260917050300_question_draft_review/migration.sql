-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "correctOption" DROP NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT false;
