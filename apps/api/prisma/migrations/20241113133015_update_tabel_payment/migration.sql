/*
  Warnings:

  - Added the required column `subscription_type_id` to the `PaymentTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PaymentTransaction` ADD COLUMN `subscription_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PaymentTransaction` ADD CONSTRAINT `PaymentTransaction_subscription_type_id_fkey` FOREIGN KEY (`subscription_type_id`) REFERENCES `SubscriptionType`(`subs_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
