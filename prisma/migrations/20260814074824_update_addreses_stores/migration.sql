/*
  Warnings:

  - You are about to drop the column `is_default` on the `addresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seller_id,store_code]` on the table `stores` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `store_code` ON `stores`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `is_default`,
    MODIFY `recipient_name` VARCHAR(50) NULL,
    MODIFY `phone` VARCHAR(13) NULL,
    MODIFY `address` TEXT NULL,
    MODIFY `city` VARCHAR(100) NULL,
    MODIFY `province` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `stores` MODIFY `store_code` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `addresses_user_id_key` ON `addresses`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `unique_store_seller_code` ON `stores`(`seller_id`, `store_code`);
