/*
  Warnings:

  - You are about to drop the column `registrasi_expires_at` on the `pra_registrations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pra_registrations` DROP COLUMN `registrasi_expires_at`,
    ADD COLUMN `registrasi_token_expires_at` DATETIME(3) NULL;
