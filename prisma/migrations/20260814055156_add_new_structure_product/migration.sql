/*
  Warnings:

  - A unique constraint covering the columns `[cart_id,product_id,variant_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `cart_items` DROP FOREIGN KEY `fk_cart_items_cart`;

-- DropIndex
DROP INDEX `unique_cart_product` ON `cart_items`;

-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `variant_id` CHAR(36) NULL;

-- CreateTable
CREATE TABLE `product_option_values` (
    `id` CHAR(36) NOT NULL,
    `option_id` CHAR(36) NOT NULL,
    `value` VARCHAR(100) NOT NULL,
    `sort_order` SMALLINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `product_option_values_option_id_idx`(`option_id`),
    UNIQUE INDEX `product_option_values_option_id_value_key`(`option_id`, `value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_options` (
    `id` CHAR(36) NOT NULL,
    `product_id` CHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `sort_order` SMALLINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `product_options_product_id_idx`(`product_id`),
    UNIQUE INDEX `product_options_product_id_name_key`(`product_id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_variant_values` (
    `variant_id` CHAR(36) NOT NULL,
    `option_value_id` CHAR(36) NOT NULL,

    INDEX `product_variant_values_option_value_id_idx`(`option_value_id`),
    PRIMARY KEY (`variant_id`, `option_value_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_variants` (
    `id` CHAR(36) NOT NULL,
    `product_id` CHAR(36) NOT NULL,
    `sku` VARCHAR(100) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `stock` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `product_variants_sku_key`(`sku`),
    INDEX `product_variants_product_id_idx`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_cart_items_variants` ON `cart_items`(`variant_id`);

-- CreateIndex
CREATE UNIQUE INDEX `unique_cart_product` ON `cart_items`(`cart_id`, `product_id`, `variant_id`);

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_option_values` ADD CONSTRAINT `product_option_values_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `product_options`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_options` ADD CONSTRAINT `product_options_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant_values` ADD CONSTRAINT `product_variant_values_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant_values` ADD CONSTRAINT `product_variant_values_option_value_id_fkey` FOREIGN KEY (`option_value_id`) REFERENCES `product_option_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variants` ADD CONSTRAINT `product_variants_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
