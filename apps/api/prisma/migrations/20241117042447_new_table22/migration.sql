/*
  Warnings:

  - You are about to drop the column `score` on the `UserAssessmentResponse` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserAssessmentResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserAssessmentResponse` DROP FOREIGN KEY `UserAssessmentResponse_answer_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserAssessmentResponse` DROP FOREIGN KEY `UserAssessmentResponse_assessment_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserAssessmentResponse` DROP FOREIGN KEY `UserAssessmentResponse_question_id_fkey`;

-- AlterTable
ALTER TABLE `SkillAssessment` ALTER COLUMN `status` DROP DEFAULT;

-- AlterTable
ALTER TABLE `UserAssessmentResponse` DROP COLUMN `score`,
    DROP COLUMN `status`,
    ADD COLUMN `answer_text` TEXT NULL;

-- CreateIndex
CREATE INDEX `SkillAssessment_user_id_status_idx` ON `SkillAssessment`(`user_id`, `status`);

-- AddForeignKey
ALTER TABLE `SkillAssessment` ADD CONSTRAINT `SkillAssessment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `AssessmentQuestion`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_answer_id_fkey` FOREIGN KEY (`answer_id`) REFERENCES `AssessmentAnswer`(`answer_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `SkillAssessment`(`assessment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
