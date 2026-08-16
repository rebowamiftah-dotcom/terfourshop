/*
  Warnings:

  - Added the required column `updated_at` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL;

-- AlterTable terms of space
ALTER TABLE `business_types` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `cart_items` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `carts` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `categories` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `couriers` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `members` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `payment_methods` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `payments` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `pending_registrations` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product_variants` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `products` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `profiles` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `reviews` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `seller_businesses` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `seller_documents` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `seller_orders` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `sellers` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `shipments` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `stores` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` ALTER COLUMN `updated_at` DROP DEFAULT;
