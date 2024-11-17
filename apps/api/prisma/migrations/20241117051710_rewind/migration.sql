/*
  Warnings:

  - You are about to alter the column `IndustryType` on the `company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - You are about to drop the column `User_id` on the `job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_User_id_fkey`;

-- AlterTable
ALTER TABLE `application` ADD COLUMN `interview_time` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `company` MODIFY `IndustryType` ENUM('TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'RETAIL', 'HOSPITALITY', 'TRANSPORTATION', 'CONSTRUCTION', 'REAL_ESTATE', 'CONSULTING', 'GOVERNMENT', 'ENERGY', 'TELECOMMUNICATIONS', 'ENTERTAINMENT', 'AGRICULTURE', 'MANUFACTURING', 'INSURANCE', 'LEGAL', 'MARKETING', 'ADVERTISING', 'MEDIA', 'NON_PROFIT', 'RESEARCH', 'AUTOMOTIVE', 'PHARMACEUTICALS') NULL,
    MODIFY `TeamSize` VARCHAR(191) NULL,
    MODIFY `yearOfEstablish` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `User_id`,
    ADD COLUMN `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `_usercompanies` RENAME INDEX `_usercompanies_AB_unique` TO `_UserCompanies_AB_unique`;

-- RenameIndex
ALTER TABLE `_usercompanies` RENAME INDEX `_usercompanies_B_index` TO `_UserCompanies_B_index`;
