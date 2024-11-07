/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_userUser_id_fkey`;

-- AlterTable
ALTER TABLE `Job` DROP COLUMN `userUser_id`,
    ADD COLUMN `User_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
