-- AlterTable
ALTER TABLE `PaymentTransaction` MODIFY `status` ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending';
