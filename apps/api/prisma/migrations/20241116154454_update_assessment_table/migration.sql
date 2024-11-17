-- AlterTable
ALTER TABLE `AssessmentQuestion` MODIFY `question_type` ENUM('multiple_choice', 'true_false', 'open_ended') NOT NULL DEFAULT 'multiple_choice';

-- AlterTable
ALTER TABLE `SkillAssessment` MODIFY `status` ENUM('passed', 'failed') NOT NULL DEFAULT 'failed';
