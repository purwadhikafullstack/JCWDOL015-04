/*
  Warnings:

  - Added the required column `country` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `country` ENUM('ID', 'SG', 'MY', 'US', 'GB', 'DE', 'JP', 'CN') NOT NULL;

-- AlterTable
ALTER TABLE `Job` ADD COLUMN `country` ENUM('ID', 'SG', 'MY', 'US', 'GB', 'DE', 'JP', 'CN') NOT NULL;
