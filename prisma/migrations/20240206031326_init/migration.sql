-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('PERISHABLE', 'NON_PERISHABLE');

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "type" "ItemType" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "zone" TEXT NOT NULL,
    "base_distance_in_km" INTEGER NOT NULL,
    "km_price" DOUBLE PRECISION NOT NULL,
    "fix_price" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_organization_id_item_id_zone_key" ON "Pricing"("organization_id", "item_id", "zone");

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
