/*
  Warnings:

  - You are about to alter the column `IndustryType` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Company` MODIFY `IndustryType` ENUM('TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'RETAIL', 'HOSPITALITY', 'TRANSPORTATION', 'CONSTRUCTION', 'REAL_ESTATE', 'CONSULTING', 'GOVERNMENT', 'ENERGY', 'TELECOMMUNICATIONS', 'ENTERTAINMENT', 'AGRICULTURE', 'MANUFACTURING', 'INSURANCE', 'LEGAL', 'MARKETING', 'ADVERTISING', 'MEDIA', 'NON_PROFIT', 'RESEARCH', 'AUTOMOTIVE', 'PHARMACEUTICALS') NULL;
