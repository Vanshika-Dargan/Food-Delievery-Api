const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPricing=async (req, res) => {
    try {
      const {
        organization_id,
        item_id,
        zone,
        base_distance_in_km,
        km_price,
        fix_price,
      } = req.body;
      const pricing = await prisma.pricing.create({
        data: {
        organization_id:organization_id,
        item_id:item_id,
        zone:zone,
        base_distance_in_km:base_distance_in_km,
        km_price:km_price,
        fix_price:fix_price,
        },
      });
      res.json({ pricing: pricing, success: true });
    } catch (err) {
      res.status(500).json({ error: "Error Creating Pricing" });
    }
  }

  module.exports={
    createPricing
  }