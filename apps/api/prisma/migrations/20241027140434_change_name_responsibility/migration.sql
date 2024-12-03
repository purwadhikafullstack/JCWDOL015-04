/*
  Warnings:

  - You are about to drop the column `resposibility` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Job` DROP COLUMN `resposibility`,
    ADD COLUMN `responsibility` TEXT NULL;
