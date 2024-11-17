/*
  Warnings:

  - You are about to drop the column `is_anonymous` on the `Review` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to drop the column `subscription_type` on the `Subscription` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Subscription` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(9))` to `Enum(EnumId(20))`.
  - You are about to alter the column `payment_proof` on the `Subscription` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - Added the required column `subscription_type_id` to the `PaymentTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `careerOpportunitiesRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilitiesRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workCultureRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workLifeBalanceRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription_type_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AssessmentAnswer` DROP FOREIGN KEY `AssessmentAnswer_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `AssessmentQuestion` DROP FOREIGN KEY `AssessmentQuestion_assessment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Subscription` DROP FOREIGN KEY `Subscription_user_id_fkey`;

-- AlterTable
ALTER TABLE `Application` ADD COLUMN `interview_time` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `AssessmentQuestion` MODIFY `question_type` ENUM('multiple_choice', 'true_false', 'open_ended') NOT NULL DEFAULT 'multiple_choice';

-- AlterTable
ALTER TABLE `PaymentTransaction` ADD COLUMN `subscription_type_id` INTEGER NOT NULL,
    MODIFY `status` ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    MODIFY `payment_method` ENUM('bank_transfer', 'credit_card', 'paypal') NULL DEFAULT 'bank_transfer';

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `is_anonymous`,
    ADD COLUMN `careerOpportunitiesRating` INTEGER NOT NULL,
    ADD COLUMN `facilitiesRating` INTEGER NOT NULL,
    ADD COLUMN `workCultureRating` INTEGER NOT NULL,
    ADD COLUMN `workLifeBalanceRating` INTEGER NOT NULL,
    MODIFY `rating` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `Subscription` DROP COLUMN `subscription_type`,
    ADD COLUMN `subscription_type_id` INTEGER NOT NULL,
    MODIFY `start_date` DATETIME(3) NULL,
    MODIFY `end_date` DATETIME(3) NULL,
    MODIFY `status` ENUM('active', 'inactive') NULL,
    MODIFY `payment_proof` BOOLEAN NULL,
    MODIFY `user_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `PreSelectionTest` (
    `test_id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_id` INTEGER NOT NULL,

    UNIQUE INDEX `PreSelectionTest_job_id_key`(`job_id`),
    PRIMARY KEY (`test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestQuestion` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `test_id` INTEGER NOT NULL,
    `question_text` VARCHAR(191) NOT NULL,
    `correct_answer` INTEGER NOT NULL,

    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestResult` (
    `result_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `job_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `completed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestOption` (
    `option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `option_text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestAnswer` (
    `answer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `test_id` INTEGER NOT NULL,
    `selected_option` INTEGER NOT NULL,
    `is_correct` BOOLEAN NOT NULL,
    `answered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubscriptionType` (
    `subs_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `features` JSON NOT NULL,
    `User_id` INTEGER NULL,
    `is_recomend` BOOLEAN NOT NULL DEFAULT false,

    INDEX `SubscriptionType_User_id_fkey`(`User_id`),
    PRIMARY KEY (`subs_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeatureUsage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `feature_name` VARCHAR(191) NOT NULL,
    `used_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FeatureUsage_user_id_feature_name_idx`(`user_id`, `feature_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CV` (
    `cv_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `template` VARCHAR(191) NOT NULL DEFAULT 'ATS',
    `content` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `CV_user_id_idx`(`user_id`),
    PRIMARY KEY (`cv_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `PaymentTransaction_subscription_type_id_fkey` ON `PaymentTransaction`(`subscription_type_id`);

-- CreateIndex
CREATE INDEX `Subscription_subscription_type_id_fkey` ON `Subscription`(`subscription_type_id`);

-- AddForeignKey
ALTER TABLE `PreSelectionTest` ADD CONSTRAINT `PreSelectionTest_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Job`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestQuestion` ADD CONSTRAINT `TestQuestion_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `PreSelectionTest`(`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestResult` ADD CONSTRAINT `TestResult_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Job`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestResult` ADD CONSTRAINT `TestResult_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestOption` ADD CONSTRAINT `TestOption_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `TestQuestion`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestAnswer` ADD CONSTRAINT `TestAnswer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestAnswer` ADD CONSTRAINT `TestAnswer_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `PreSelectionTest`(`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestAnswer` ADD CONSTRAINT `TestAnswer_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `TestQuestion`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscriptionType` ADD CONSTRAINT `SubscriptionType_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_subscription_type_id_fkey` FOREIGN KEY (`subscription_type_id`) REFERENCES `SubscriptionType`(`subs_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentQuestion` ADD CONSTRAINT `AssessmentQuestion_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `SkillAssessment`(`assessment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentAnswer` ADD CONSTRAINT `AssessmentAnswer_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `AssessmentQuestion`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeatureUsage` ADD CONSTRAINT `FeatureUsage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CV` ADD CONSTRAINT `CV_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentTransaction` ADD CONSTRAINT `PaymentTransaction_subscription_type_id_fkey` FOREIGN KEY (`subscription_type_id`) REFERENCES `SubscriptionType`(`subs_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Job` RENAME INDEX `Job_user_id_fkey` TO `Job_userUser_id_fkey`;
