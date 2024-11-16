-- AlterTable
ALTER TABLE `application` ADD COLUMN `interview_time` DATETIME(3) NULL;

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

-- AddForeignKey
ALTER TABLE `TestAnswer` ADD CONSTRAINT `TestAnswer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestAnswer` ADD CONSTRAINT `TestAnswer_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `TestQuestion`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestAnswer` ADD CONSTRAINT `TestAnswer_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `PreSelectionTest`(`test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
