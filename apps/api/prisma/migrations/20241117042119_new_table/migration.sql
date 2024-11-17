/*
  Warnings:

  - You are about to drop the column `answer_text` on the `UserAssessmentResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `SkillAssessment` DROP FOREIGN KEY `SkillAssessment_user_id_fkey`;

-- DropIndex
DROP INDEX `SkillAssessment_user_id_status_idx` ON `SkillAssessment`;

-- AlterTable
ALTER TABLE `SkillAssessment` MODIFY `status` ENUM('passed', 'failed') NOT NULL DEFAULT 'failed';

-- AlterTable
ALTER TABLE `UserAssessmentResponse` DROP COLUMN `answer_text`,
    ADD COLUMN `score` INTEGER NULL,
    ADD COLUMN `status` ENUM('passed', 'failed') NOT NULL DEFAULT 'failed';
