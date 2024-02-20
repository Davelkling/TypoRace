/*
  Warnings:

  - You are about to drop the `Race` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Race" DROP CONSTRAINT "Race_userId_fkey";

-- DropTable
DROP TABLE "Race";
