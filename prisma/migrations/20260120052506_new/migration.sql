-- AlterTable
ALTER TABLE "EmailVerificatioan" ALTER COLUMN "verified_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PasswordResets" ALTER COLUMN "used_at" DROP NOT NULL;
