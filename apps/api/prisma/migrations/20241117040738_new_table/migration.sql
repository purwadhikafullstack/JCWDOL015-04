-- DropForeignKey
ALTER TABLE `SkillAssessment` DROP FOREIGN KEY `SkillAssessment_user_id_fkey`;

-- DropIndex
DROP INDEX `SkillAssessment_user_id_status_idx` ON `SkillAssessment`;
