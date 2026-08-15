/*
  Warnings:

  - You are about to alter the column `otp` on the `pra_logins` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(6)`.
  - A unique constraint covering the columns `[login_token]` on the table `pra_logins` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pra_logins` ADD COLUMN `login_token` VARCHAR(255) NULL,
    ADD COLUMN `login_token_expires_at` DATETIME(3) NULL,
    MODIFY `otp` VARCHAR(6) NOT NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pra_logins_login_token_key` ON `pra_logins`(`login_token`);
