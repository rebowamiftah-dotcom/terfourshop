/*
  Warnings:

  - You are about to alter the column `phone` on the `members` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Char(14)`.
  - A unique constraint covering the columns `[phone]` on the table `members` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `phone` VARCHAR(14) NULL;

-- AlterTable
ALTER TABLE `members` MODIFY `phone` CHAR(14) NOT NULL;

-- AlterTable
ALTER TABLE `stores` MODIFY `phone` VARCHAR(14) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `phone` VARCHAR(14) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `members_phone_key` ON `members`(`phone`);
