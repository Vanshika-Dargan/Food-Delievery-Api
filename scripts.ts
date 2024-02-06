import { ItemType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create an organization
    console.log("hi")
    const organization = await prisma.organization.create({
      data: {
        name: 'Food Safari',
      },
    });
   
    // Create an item
    const item = await prisma.item.create({
      data: {
        type: ItemType.PERISHABLE,
        description: 'This is a perishable item',
      },
    });

    // Create pricing with the established relationships
    const pricing = await prisma.pricing.create({
      data: {
        organization: {
          connect: { id: organization.id },
        },
        item: {
          connect: { id: item.id },
        },
        zone: 'central',
        base_distance_in_km: 5,
        fix_price: 10,
        km_price: 1.5,
      },
    });

    console.log(organization);
    console.log(item);
    console.log(pricing);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client to avoid resource leaks
  }
}

main()