/*
  Warnings:

  - A unique constraint covering the columns `[forgot_token]` on the table `pra_forgot_passwords` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pra_forgot_passwords` ADD COLUMN `forgot_token` VARCHAR(255) NULL,
    ADD COLUMN `forgot_token_expires_at` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pra_forgot_passwords_forgot_token_key` ON `pra_forgot_passwords`(`forgot_token`);
