/*
  Warnings:

  - Made the column `careerOpportunitiesRating` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `facilitiesRating` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workCultureRating` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workLifeBalanceRating` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Review` MODIFY `rating` INTEGER NULL,
    MODIFY `careerOpportunitiesRating` INTEGER NOT NULL,
    MODIFY `facilitiesRating` INTEGER NOT NULL,
    MODIFY `workCultureRating` INTEGER NOT NULL,
    MODIFY `workLifeBalanceRating` INTEGER NOT NULL;
