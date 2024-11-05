-- AlterTable
ALTER TABLE `Application` MODIFY `status` ENUM('active', 'under_review', 'interview', 'pending', 'accepted', 'hired', 'rejected') NOT NULL;
