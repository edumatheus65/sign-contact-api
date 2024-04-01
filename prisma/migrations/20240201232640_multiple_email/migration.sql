/*
  Warnings:

  - The `email` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `phone` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "email",
ADD COLUMN     "email" VARCHAR(45)[],
DROP COLUMN "phone",
ADD COLUMN     "phone" VARCHAR(18)[];

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phone_key" ON "contacts"("phone");
