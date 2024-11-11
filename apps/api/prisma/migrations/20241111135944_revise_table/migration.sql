/*
  Warnings:

  - You are about to drop the column `User_id` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_User_id_fkey`;

-- AlterTable
ALTER TABLE `Job` DROP COLUMN `User_id`,
    ADD COLUMN `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
