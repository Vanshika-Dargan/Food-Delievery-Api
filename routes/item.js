const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.js");
const {itemTypeIsCorrect}=require('../middlewares/validation.js')

router.post("/add",itemTypeIsCorrect,itemController.addItem);
router.put("/update/:id",itemTypeIsCorrect,itemController.updateItem);
router.delete("/delete/:id", itemController.deleteItem);

module.exports = router;