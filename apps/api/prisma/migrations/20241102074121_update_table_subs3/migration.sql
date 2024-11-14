/*
  Warnings:

  - You are about to alter the column `status` on the `Subscription` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(8))` to `Enum(EnumId(11))`.
  - Made the column `payment_proof` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Subscription` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'inactive',
    MODIFY `payment_proof` BOOLEAN NOT NULL;
