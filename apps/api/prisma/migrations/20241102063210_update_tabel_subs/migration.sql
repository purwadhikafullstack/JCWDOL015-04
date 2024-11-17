/*
  Warnings:

  - You are about to alter the column `subscription_type` on the `Subscription` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Added the required column `features` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subscription` ADD COLUMN `features` JSON NOT NULL,
    MODIFY `subscription_type` VARCHAR(191) NOT NULL;
