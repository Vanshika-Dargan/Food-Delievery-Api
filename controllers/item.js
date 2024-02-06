const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const itemUtility=require('../utilities/uitilities.js')
 const addItem=async (req, res) => {
    try {
      const { type, description } = req.body;
      const item = await prisma.item.create({
        data: {
          type: itemUtility.mapToBackendItemType(type),
          description: description,
        },
      });
      console.log(item);
      res.json({ item: item, success: true });
    } catch (err) {
      res.status(500).json({ error: "Invalid item type" });
    }
  }
  const updateItem=async (req, res) => {
      try {
        const itemId = parseInt(req.params.id);
        const { type, description } = req.body;
    
        const updatedItem = await prisma.item.update({
          where: { id: itemId },
          data: {
            type: mapToBackendItemType(type),
            description: description,
          },
        });
    
        res.json({ item: updatedItem, success: true });
      } catch (err) {
        res.status(500).json({ error: "Invalid item type or item not found" });
      }
    }
  
   const deleteItem=async (req, res) => {
      try {
        const itemId = parseInt(req.params.id);
        await prisma.pricing.deleteMany({
          where: { item_id: itemId },
        });
        const deletedItem = await prisma.item.delete({
          where: { id: itemId },
        });
    
        res.json({ item: deletedItem, success: true });
      } catch (err) {
        res.status(500).json({ error: "Item not found or could not be deleted" });
      }
    }

    module.exports={
        addItem,
        updateItem,
        deleteItem
    }