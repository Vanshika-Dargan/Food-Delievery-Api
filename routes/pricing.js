const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricing.js");
const {pricingCanBeCreatedWithCurrentData}=require("../middlewares/validation.js")
router.post("/add",pricingCanBeCreatedWithCurrentData,pricingController.createPricing);

module.exports = router;