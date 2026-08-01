/*
  Warnings:

  - A unique constraint covering the columns `[tenantId,propertyId]` on the table `rentalRequests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rentalRequests_tenantId_propertyId_key" ON "rentalRequests"("tenantId", "propertyId");
