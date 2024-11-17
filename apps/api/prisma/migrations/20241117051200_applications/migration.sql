/*
  Warnings:

  - You are about to drop the column `interview_time` on the `application` table. All the data in the column will be lost.
  - You are about to alter the column `IndustryType` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(18))` to `VarChar(191)`.
  - You are about to alter the column `TeamSize` on the `company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(4)`.
  - You are about to alter the column `yearOfEstablish` on the `company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(4)`.
  - You are about to drop the column `user_id` on the `job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_user_id_fkey`;

-- AlterTable
ALTER TABLE `application` DROP COLUMN `interview_time`;

-- AlterTable
ALTER TABLE `company` MODIFY `IndustryType` VARCHAR(191) NULL,
    MODIFY `TeamSize` VARCHAR(4) NULL,
    MODIFY `yearOfEstablish` VARCHAR(4) NULL;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `user_id`,
    ADD COLUMN `User_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Job_User_id_fkey` ON `job`(`User_id`);

-- AddForeignKey
ALTER TABLE `job` ADD CONSTRAINT `Job_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `_usercompanies` RENAME INDEX `_UserCompanies_AB_unique` TO `_usercompanies_AB_unique`;

-- RenameIndex
ALTER TABLE `_usercompanies` RENAME INDEX `_UserCompanies_B_index` TO `_usercompanies_B_index`;
