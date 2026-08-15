/*
  Warnings:

  - Made the column `gender` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profiles` MODIFY `full_name` VARCHAR(60) NULL,
  MODIFY `gender` ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN';

/*
  Warnings:

  - A unique constraint covering the columns `[nik]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `nik` CHAR(16) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `profiles_nik_key` ON `profiles`(`nik`);

-- AlterTable
ALTER TABLE `reviews` MODIFY COLUMN `rating` DECIMAL(2,1) NOT NULL;

-- AlterTable
ALTER TABLE addresses MODIFY COLUMN postal_code VARCHAR(10) NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY COLUMN `order_number` CHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `seller_orders` MODIFY COLUMN `order_number` CHAR(25) NOT NULL;