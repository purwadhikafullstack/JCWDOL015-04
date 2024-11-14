/*
  Warnings:

  - You are about to drop the column `is_anonymous` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Review` DROP COLUMN `is_anonymous`,
    ADD COLUMN `careerOpportunitiesRating` INTEGER NULL,
    ADD COLUMN `facilitiesRating` INTEGER NULL,
    ADD COLUMN `workCultureRating` INTEGER NULL,
    ADD COLUMN `workLifeBalanceRating` INTEGER NULL;
