/*
  Warnings:

  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `IndustryType` VARCHAR(191) NULL,
    ADD COLUMN `TeamSize` INTEGER NULL,
    ADD COLUMN `aboutUs` VARCHAR(191) NULL,
    ADD COLUMN `banner` VARCHAR(191) NULL,
    ADD COLUMN `yearOfEstablish` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `DateOfBirth` DATETIME(3) NULL,
    ADD COLUMN `biography` VARCHAR(191) NULL,
    ADD COLUMN `education` ENUM('HIGH_SCHOOL', 'ASSOCIATES', 'BACHELORS', 'MASTERS', 'DOCTORATE', 'DIPLOMA', 'VOCATIONAL', 'CERTIFICATION', 'SOME_COLLEGE', 'POSTGRADUATE') NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    ADD COLUMN `languages` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `nationality` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `resume` VARCHAR(191) NULL,
    ADD COLUMN `skills` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL,
    ADD COLUMN `website` VARCHAR(191) NULL,
    ADD COLUMN `years_of_experience` INTEGER NULL,
    MODIFY `first_name` VARCHAR(191) NOT NULL,
    MODIFY `last_name` VARCHAR(191) NOT NULL;
