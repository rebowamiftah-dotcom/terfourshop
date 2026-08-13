-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `accounts` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `provider` VARCHAR(50) NOT NULL,
    `providerAccountId` VARCHAR(255) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(50) NULL,
    `scope` VARCHAR(255) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(255) NULL,

    INDEX `accounts_userId_idx`(`userId`),
    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
