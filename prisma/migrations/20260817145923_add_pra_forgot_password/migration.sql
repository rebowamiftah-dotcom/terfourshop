-- CreateTable
CREATE TABLE `pra_forgot_passwords` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `otp` VARCHAR(60) NOT NULL,
    `otp_attempts` INTEGER NOT NULL DEFAULT 0,
    `last_otp_sent_at` DATETIME(3) NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `reset_token` VARCHAR(255) NULL,
    `reset_token_expires_at` DATETIME(3) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `pra_forgot_passwords_user_id_key`(`user_id`),
    UNIQUE INDEX `pra_forgot_passwords_reset_token_key`(`reset_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pra_forgot_passwords` ADD CONSTRAINT `pra_forgot_passwords_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
