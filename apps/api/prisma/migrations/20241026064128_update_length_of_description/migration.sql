-- AlterTable
ALTER TABLE `AssessmentQuestion` MODIFY `question_text` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Company` MODIFY `description` TEXT NULL,
    MODIFY `aboutUs` TEXT NULL;

-- AlterTable
ALTER TABLE `Interview` MODIFY `feedback` TEXT NULL;

-- AlterTable
ALTER TABLE `Job` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Review` MODIFY `comment` TEXT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `biography` TEXT NULL;

-- AlterTable
ALTER TABLE `UserAssessmentResponse` MODIFY `answer_text` TEXT NULL;
