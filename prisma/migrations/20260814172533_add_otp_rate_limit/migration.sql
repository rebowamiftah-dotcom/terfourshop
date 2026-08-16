/*
  Warnings:

  - You are about to drop the `pending_registrations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pending_registrations`;

-- CreateTable
CREATE TABLE `pra_registrations` (
    `id` CHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `otp` VARCHAR(6) NOT NULL,
    `otp_attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `last_otp_sent_at` TIMESTAMP(0) NULL,
    `expires_at` TIMESTAMP(0) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `pra_registrations_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
