/*
  Warnings:

  - You are about to alter the column `password` on the `pra_registrations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(60)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `pra_logins` MODIFY `otp` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `pra_registrations` MODIFY `password` VARCHAR(60) NOT NULL,
    MODIFY `otp` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(60) NULL;
