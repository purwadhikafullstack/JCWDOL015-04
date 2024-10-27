-- AlterTable
ALTER TABLE `Company` ADD COLUMN `facebook` VARCHAR(191) NULL,
    ADD COLUMN `instagram` VARCHAR(191) NULL,
    ADD COLUMN `linkedin` VARCHAR(191) NULL,
    ADD COLUMN `twitter` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Job` ADD COLUMN `resposibility` TEXT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `facebook` VARCHAR(191) NULL,
    ADD COLUMN `github` VARCHAR(191) NULL,
    ADD COLUMN `instagram` VARCHAR(191) NULL,
    ADD COLUMN `linkedin` VARCHAR(191) NULL,
    ADD COLUMN `twitter` VARCHAR(191) NULL;
