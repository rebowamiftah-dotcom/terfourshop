/*
  Warnings:

  - A unique constraint covering the columns `[registrasi_token]` on the table `pra_registrations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pra_registrations` ADD COLUMN `registrasi_expires_at` DATETIME(3) NULL,
    ADD COLUMN `registrasi_token` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pra_registrations_registrasi_token_key` ON `pra_registrations`(`registrasi_token`);
