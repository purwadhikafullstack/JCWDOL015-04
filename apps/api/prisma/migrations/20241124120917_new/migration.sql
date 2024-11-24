-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('normal', 'candidate', 'admin', 'developer') NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `profile_picture` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `github` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `education` ENUM('HIGH_SCHOOL', 'ASSOCIATES', 'BACHELORS', 'MASTERS', 'DOCTORATE', 'DIPLOMA', 'VOCATIONAL', 'CERTIFICATION', 'SOME_COLLEGE', 'POSTGRADUATE') NULL,
    `biography` TEXT NULL,
    `skills` VARCHAR(191) NULL,
    `languages` VARCHAR(191) NULL,
    `nationality` VARCHAR(191) NULL,
    `country` ENUM('ID', 'SG', 'MY', 'US', 'GB', 'DE', 'JP', 'CN') NULL,
    `location` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    `tempat_lahir` VARCHAR(191) NULL,
    `DateOfBirth` DATETIME(3) NULL,
    `resume` VARCHAR(191) NULL,
    `years_of_experience` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_verified` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `company_id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `aboutUs` TEXT NULL,
    `website` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `yearOfEstablish` VARCHAR(191) NULL,
    `IndustryType` ENUM('TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'RETAIL', 'HOSPITALITY', 'TRANSPORTATION', 'CONSTRUCTION', 'REAL_ESTATE', 'CONSULTING', 'GOVERNMENT', 'ENERGY', 'TELECOMMUNICATIONS', 'ENTERTAINMENT', 'AGRICULTURE', 'MANUFACTURING', 'INSURANCE', 'LEGAL', 'MARKETING', 'ADVERTISING', 'MEDIA', 'NON_PROFIT', 'RESEARCH', 'AUTOMOTIVE', 'PHARMACEUTICALS') NULL,
    `TeamSize` VARCHAR(191) NULL,
    `country` ENUM('ID', 'SG', 'MY', 'US', 'GB', 'DE', 'JP', 'CN') NOT NULL,
    `address` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `description` TEXT NULL,
    `logo` VARCHAR(191) NULL,
    `banner` VARCHAR(191) NULL,

    UNIQUE INDEX `Company_email_key`(`email`),
    INDEX `Company_email_idx`(`email`),
    PRIMARY KEY (`company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `job_id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `responsibility` TEXT NULL,
    `country` ENUM('ID', 'SG', 'MY', 'US', 'GB', 'DE', 'JP', 'CN') NOT NULL,
    `location` VARCHAR(191) NULL,
    `salary` INTEGER NULL,
    `jobType` ENUM('fullTime', 'partTime', 'freelance', 'contractor') NULL,
    `jobCategory` ENUM('software_engineering', 'data_science', 'machine_learning', 'artificial_intelligence', 'cybersecurity', 'business_intelligence', 'cyber_security', 'product_management', 'marketing', 'design', 'finance', 'accounting', 'legal', 'management', 'human_resources', 'customer_service', 'sales', 'legal_and_compliance', 'management_and_leadership', 'public_relations') NULL,
    `jobEducationLevel` ENUM('high_school', 'intermediate', 'graduate', 'bachelor_degree', 'master_degree', 'doctor_degree') NULL,
    `jobExperience` ENUM('entry_level', 'mid_level', 'senior_level', 'expert') NULL,
    `jobExpired_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `company_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,

    INDEX `Job_company_id_idx`(`company_id`),
    INDEX `Job_is_active_jobCategory_idx`(`is_active`, `jobCategory`),
    INDEX `Job_userUser_id_fkey`(`user_id`),
    PRIMARY KEY (`job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `job_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Favorite_user_id_job_id_key`(`user_id`, `job_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `application_id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume` VARCHAR(191) NULL,
    `coverLetter` TEXT NULL,
    `expected_salary` DECIMAL(65, 30) NULL,
    `status` ENUM('active', 'under_review', 'interview', 'pending', 'accepted', 'hired', 'rejected') NOT NULL,
    `applied_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `interview_date` DATETIME(3) NULL,
    `interview_time` DATETIME(3) NULL,
    `interview_status` ENUM('scheduled', 'completed', 'canceled') NULL,
    `job_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `Application_job_id_idx`(`job_id`),
    INDEX `Application_user_id_idx`(`user_id`),
    PRIMARY KEY (`application_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `notification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `subject` VARCHAR(191) NULL,
    `message` VARCHAR(191) NOT NULL,
    `is_read` BOOLEAN NOT NULL,
    `type` ENUM('application', 'interview', 'subscription') NOT NULL,
    `related_id` INTEGER NULL,
    `link` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Notification_user_id_idx`(`user_id`),
    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSkill` (
    `user_skill_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `skill_name` VARCHAR(191) NOT NULL,
    `years_of_experience` INTEGER NULL,
    `proficiency_level` ENUM('beginner', 'intermediate', 'advanced') NULL,
    `certification` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `is_verified` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `UserSkill_user_id_idx`(`user_id`),
    PRIMARY KEY (`user_skill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminLog` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `details` VARCHAR(191) NULL,
    `ip_address` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `status` ENUM('success', 'failure') NULL,
    `affected_user_id` INTEGER NULL,
    `admin_id` INTEGER NOT NULL,
    `affected_job_id` INTEGER NULL,

    INDEX `AdminLog_admin_id_idx`(`admin_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobReport` (
    `report_id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'resolved', 'dismissed') NOT NULL,
    `admin_response` VARCHAR(191) NULL,
    `is_anonymous` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `resolution_date` DATETIME(3) NULL,

    INDEX `JobReport_job_id_idx`(`job_id`),
    INDEX `JobReport_user_id_idx`(`user_id`),
    PRIMARY KEY (`report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobView` (
    `view_id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `viewed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ip_address` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `device_type` ENUM('desktop', 'mobile', 'tablet') NULL,
    `referrer` VARCHAR(191) NULL,
    `session_id` VARCHAR(191) NULL,

    INDEX `JobView_job_id_idx`(`job_id`),
    PRIMARY KEY (`view_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobSave` (
    `save_id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `saved_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_favorite` BOOLEAN NOT NULL,
    `notes` VARCHAR(191) NULL,
    `expiration_date` DATETIME(3) NULL,
    `reminder_set` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `JobSave_job_id_idx`(`job_id`),
    INDEX `JobSave_user_id_idx`(`user_id`),
    PRIMARY KEY (`save_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interview` (
    `interview_id` INTEGER NOT NULL AUTO_INCREMENT,
    `application_id` INTEGER NOT NULL,
    `scheduled_time` DATETIME(3) NOT NULL,
    `status` ENUM('scheduled', 'completed', 'canceled') NOT NULL,
    `feedback` TEXT NULL,
    `interviewer_name` VARCHAR(191) NULL,
    `interview_link` VARCHAR(191) NULL,
    `interview_type` ENUM('in_person', 'virtual') NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Interview_application_id_idx`(`application_id`),
    PRIMARY KEY (`interview_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `Subscription` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `status` ENUM('active', 'inactive') NULL,
    `payment_proof` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `amount` DECIMAL(65, 30) NULL,
    `user_id` INTEGER NULL,
    `subscription_type_id` INTEGER NOT NULL,

    INDEX `Subscription_user_id_idx`(`user_id`),
    INDEX `Subscription_status_end_date_idx`(`status`, `end_date`),
    INDEX `Subscription_subscription_type_id_fkey`(`subscription_type_id`),
    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DECIMAL(65, 30) NULL,
    `comment` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `salary_estimate` DECIMAL(65, 30) NULL,
    `position` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `careerOpportunitiesRating` INTEGER NOT NULL,
    `facilitiesRating` INTEGER NOT NULL,
    `workCultureRating` INTEGER NOT NULL,
    `workLifeBalanceRating` INTEGER NOT NULL,

    INDEX `Review_company_id_idx`(`company_id`),
    INDEX `Review_user_id_idx`(`user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkillAssessment` (
    `assessment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `assessment_data` JSON NULL,
    `start_date` DATETIME(3) NULL,
    `feedback` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `SkillAssessment_user_id_idx`(`user_id`),
    PRIMARY KEY (`assessment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentQuestion` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_text` TEXT NOT NULL,
    `question_type` ENUM('multiple_choice', 'true_false', 'open_ended') NOT NULL DEFAULT 'multiple_choice',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `difficulty_level` ENUM('easy', 'medium', 'hard') NULL,
    `points` INTEGER NULL,
    `assessment_id` INTEGER NOT NULL,

    INDEX `AssessmentQuestion_assessment_id_idx`(`assessment_id`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentAnswer` (
    `answer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer_text` VARCHAR(191) NOT NULL,
    `is_correct` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `question_id` INTEGER NOT NULL,

    INDEX `AssessmentAnswer_question_id_idx`(`question_id`),
    PRIMARY KEY (`answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAssessmentResponse` (
    `response_id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer_text` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `answer_id` INTEGER NULL,
    `assessment_id` INTEGER NOT NULL,

    INDEX `UserAssessmentResponse_user_id_idx`(`user_id`),
    INDEX `UserAssessmentResponse_question_id_idx`(`question_id`),
    INDEX `UserAssessmentResponse_assessment_id_idx`(`assessment_id`),
    PRIMARY KEY (`response_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAssessmentScore` (
    `score_id` INTEGER NOT NULL AUTO_INCREMENT,
    `badge` VARCHAR(191) NULL,
    `score` INTEGER NULL DEFAULT 0,
    `status` ENUM('passed', 'failed') NOT NULL DEFAULT 'failed',
    `unique_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `assessment_id` INTEGER NOT NULL,
    `assessmentQuestionQuestion_id` INTEGER NULL,
    `assessmentAnswerAnswer_id` INTEGER NULL,

    UNIQUE INDEX `UserAssessmentScore_unique_code_key`(`unique_code`),
    INDEX `UserAssessmentScore_user_id_idx`(`user_id`),
    INDEX `UserAssessmentScore_assessment_id_idx`(`assessment_id`),
    PRIMARY KEY (`score_id`)
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

-- CreateTable
CREATE TABLE `PaymentTransaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    `payment_method` ENUM('bank_transfer', 'credit_card', 'paypal') NULL DEFAULT 'bank_transfer',
    `receipt` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `subscription_id` INTEGER NULL,
    `subscription_type_id` INTEGER NOT NULL,

    INDEX `PaymentTransaction_user_id_idx`(`user_id`),
    INDEX `PaymentTransaction_subscription_id_fkey`(`subscription_id`),
    INDEX `PaymentTransaction_subscription_type_id_fkey`(`subscription_type_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserCompanies` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserCompanies_AB_unique`(`A`, `B`),
    INDEX `_UserCompanies_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`company_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Job`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Job`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSkill` ADD CONSTRAINT `UserSkill_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminLog` ADD CONSTRAINT `AdminLog_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Job`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobView` ADD CONSTRAINT `JobView_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Job`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobView` ADD CONSTRAINT `JobView_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSave` ADD CONSTRAINT `JobSave_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `Job`(`job_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSave` ADD CONSTRAINT `JobSave_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_application_id_fkey` FOREIGN KEY (`application_id`) REFERENCES `Application`(`application_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Review` ADD CONSTRAINT `Review_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`company_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillAssessment` ADD CONSTRAINT `SkillAssessment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentQuestion` ADD CONSTRAINT `AssessmentQuestion_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `SkillAssessment`(`assessment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentAnswer` ADD CONSTRAINT `AssessmentAnswer_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `AssessmentQuestion`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `AssessmentQuestion`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_answer_id_fkey` FOREIGN KEY (`answer_id`) REFERENCES `AssessmentAnswer`(`answer_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentResponse` ADD CONSTRAINT `UserAssessmentResponse_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `SkillAssessment`(`assessment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentScore` ADD CONSTRAINT `UserAssessmentScore_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentScore` ADD CONSTRAINT `UserAssessmentScore_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `SkillAssessment`(`assessment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentScore` ADD CONSTRAINT `UserAssessmentScore_assessmentQuestionQuestion_id_fkey` FOREIGN KEY (`assessmentQuestionQuestion_id`) REFERENCES `AssessmentQuestion`(`question_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentScore` ADD CONSTRAINT `UserAssessmentScore_assessmentAnswerAnswer_id_fkey` FOREIGN KEY (`assessmentAnswerAnswer_id`) REFERENCES `AssessmentAnswer`(`answer_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeatureUsage` ADD CONSTRAINT `FeatureUsage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CV` ADD CONSTRAINT `CV_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentTransaction` ADD CONSTRAINT `PaymentTransaction_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`subscription_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentTransaction` ADD CONSTRAINT `PaymentTransaction_subscription_type_id_fkey` FOREIGN KEY (`subscription_type_id`) REFERENCES `SubscriptionType`(`subs_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentTransaction` ADD CONSTRAINT `PaymentTransaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserCompanies` ADD CONSTRAINT `_UserCompanies_A_fkey` FOREIGN KEY (`A`) REFERENCES `Company`(`company_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserCompanies` ADD CONSTRAINT `_UserCompanies_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
