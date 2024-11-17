-- DropForeignKey
ALTER TABLE `AssessmentQuestion` DROP FOREIGN KEY `AssessmentQuestion_assessment_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserAssessmentResponse` DROP FOREIGN KEY `UserAssessmentResponse_answer_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserAssessmentResponse` DROP FOREIGN KEY `UserAssessmentResponse_assessment_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserAssessmentResponse` DROP FOREIGN KEY `UserAssessmentResponse_question_id_fkey`;

-- AddForeignKey
ALTER TABLE `AssessmentQuestion` ADD CONSTRAINT `AssessmentQuestion_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `SkillAssessment`(`assessment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `AssessmentQuestion`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_answer_id_fkey` FOREIGN KEY (`answer_id`) REFERENCES `AssessmentAnswer`(`answer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `SkillAssessment`(`assessment_id`) ON DELETE CASCADE ON UPDATE CASCADE;
