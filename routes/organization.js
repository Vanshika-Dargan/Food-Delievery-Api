const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organization.js");
const {organizationExists}=require('../middlewares/validation.js')
router.post("/register",organizationExists,organizationController.createOrganization);
router.put("/update/:id", organizationController.updateOrganization);
router.delete("/delete/:id", organizationController.deleteOrganization);

module.exports = router;