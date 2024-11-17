/*
  Warnings:

  - You are about to drop the column `description` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_type` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `subscription_type_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_user_id_fkey`;

-- AlterTable
ALTER TABLE `Subscription` DROP COLUMN `description`,
    DROP COLUMN `features`,
    DROP COLUMN `subscription_type`,
    ADD COLUMN `subscription_type_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `SubscriptionType` (
    `subs_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `features` JSON NOT NULL,
    `User_id` INTEGER NULL,

    PRIMARY KEY (`subs_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubscriptionType` ADD CONSTRAINT `SubscriptionType_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_subscription_type_id_fkey` FOREIGN KEY (`subscription_type_id`) REFERENCES `SubscriptionType`(`subs_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
