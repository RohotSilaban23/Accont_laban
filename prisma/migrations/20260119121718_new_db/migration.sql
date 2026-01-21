/*
  Warnings:

  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "EmailVerificatioan" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "verified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerificatioan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificatioan_token_key" ON "EmailVerificatioan"("token");

-- CreateIndex
CREATE INDEX "EmailVerificatioan_user_id_idx" ON "EmailVerificatioan"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResets_token_key" ON "PasswordResets"("token");

-- CreateIndex
CREATE INDEX "PasswordResets_user_id_idx" ON "PasswordResets"("user_id");

-- AddForeignKey
ALTER TABLE "EmailVerificatioan" ADD CONSTRAINT "EmailVerificatioan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResets" ADD CONSTRAINT "PasswordResets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
