-- AlterTable
ALTER TABLE `Subscription` MODIFY `start_date` DATETIME(3) NULL,
    MODIFY `end_date` DATETIME(3) NULL,
    MODIFY `status` ENUM('active', 'inactive') NULL,
    MODIFY `payment_proof` BOOLEAN NULL;
