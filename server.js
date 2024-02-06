const express = require("express");
const {request}=require('supertest')
const { ItemType,PrismaClient } = require("@prisma/client");
const { body, validationResult } = require('express-validator');
const pool = require("./db");
const { calculateTotalPrice } = require("./services/pricingService");
const organizationRoutes=require("./routes/organization.js")
const itemRoutes=require("./routes/item.js")
const pricingRoutes=require("./routes/pricing.js")
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());


app.use('/organization',organizationRoutes)
app.use('/item',itemRoutes)
app.use('/pricing',pricingRoutes);
app.post("/calculate-price", async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_type } = req.body;

    const pricing = await prisma.pricing.findFirst({
      where: {
        organization_id,
        zone,
      },
    });

    const totalPrice = calculateTotalPrice(item_type,pricing, total_distance);
    res.json({ total_price: totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const server=app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports=server;