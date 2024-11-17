-- AlterTable
ALTER TABLE `PaymentTransaction` MODIFY `payment_method` ENUM('bank_transfer', 'credit_card', 'paypal') NULL DEFAULT 'bank_transfer';
