/*
  Warnings:

  - You are about to drop the column `badge` on the `SkillAssessment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unique_code]` on the table `UserAssessmentScore` will be added. If there are existing duplicate values, this will fail.
  - The required column `unique_code` was added to the `UserAssessmentScore` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `SkillAssessment` DROP COLUMN `badge`;

-- AlterTable
ALTER TABLE `UserAssessmentScore` ADD COLUMN `unique_code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserAssessmentScore_unique_code_key` ON `UserAssessmentScore`(`unique_code`);
