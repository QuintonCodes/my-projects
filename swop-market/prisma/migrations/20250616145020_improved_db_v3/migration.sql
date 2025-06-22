/*
  Warnings:

  - A unique constraint covering the columns `[deliveryOptions]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_deliveryOptions_key" ON "Product"("deliveryOptions");
