/*
  Warnings:

  - Made the column `category` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Job` MODIFY `category` ENUM('fullTime', 'partTime', 'freelance', 'contractor') NOT NULL;
