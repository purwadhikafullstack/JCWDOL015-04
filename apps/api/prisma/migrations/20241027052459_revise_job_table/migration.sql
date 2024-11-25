/*
  Warnings:

  - You are about to drop the column `category` on the `Job` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Job_is_active_category_idx` ON `Job`;

-- AlterTable
ALTER TABLE `Job` DROP COLUMN `category`,
    ADD COLUMN `JobCategory` ENUM('software_engineering', 'data_science', 'machine_learning', 'artificial_intelligence', 'cybersecurity', 'business_intelligence', 'cyber_security', 'product_management', 'marketing', 'design', 'finance', 'accounting', 'legal', 'management', 'human_resources', 'customer_service', 'sales', 'legal_and_compliance', 'management_and_leadership', 'public_relations') NULL,
    ADD COLUMN `JobeducationLevel` ENUM('high_school', 'intermediate', 'graduate', 'bachelor_degree', 'master_degree', 'doctor_degree') NULL,
    ADD COLUMN `jobExperience` ENUM('entry_level', 'mid_level', 'senior_level', 'expert') NULL,
    ADD COLUMN `jobType` ENUM('fullTime', 'partTime', 'freelance', 'contractor') NULL;

-- CreateIndex
CREATE INDEX `Job_is_active_JobCategory_idx` ON `Job`(`is_active`, `JobCategory`);
