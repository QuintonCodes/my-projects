/*
  Warnings:

  - The values [used_like_new] on the enum `productCondition` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "productCondition_new" AS ENUM ('new', 'used_new', 'used_good', 'used_fair', 'for_parts');
ALTER TABLE "Product" ALTER COLUMN "condition" TYPE "productCondition_new" USING ("condition"::text::"productCondition_new");
ALTER TYPE "productCondition" RENAME TO "productCondition_old";
ALTER TYPE "productCondition_new" RENAME TO "productCondition";
DROP TYPE "productCondition_old";
COMMIT;

-- DropIndex
DROP INDEX "User_username_email_phoneNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
