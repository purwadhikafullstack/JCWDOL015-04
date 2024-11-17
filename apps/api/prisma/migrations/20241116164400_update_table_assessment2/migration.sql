-- DropForeignKey
ALTER TABLE `AssessmentAnswer` DROP FOREIGN KEY `AssessmentAnswer_question_id_fkey`;

-- AddForeignKey
ALTER TABLE `AssessmentAnswer` ADD CONSTRAINT `AssessmentAnswer_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `AssessmentQuestion`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;
