-- AlterTable
ALTER TABLE `SkillAssessment` ALTER COLUMN `status` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `SkillAssessment_user_id_status_idx` ON `SkillAssessment`(`user_id`, `status`);

-- AddForeignKey
ALTER TABLE `SkillAssessment` ADD CONSTRAINT `SkillAssessment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
