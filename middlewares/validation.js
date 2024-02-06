const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const organizationExists = async (req, res, next) => {
    const { name } = req.body;
  
    try {
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'Organization name cannot be empty' });
          }
      const organization = await prisma.organization.findFirst({ where: { name: name } });
  
      if (organization) {
        return res.status(400).json({ error: 'Organization is already registered' });
      }

      next();
    } catch (error) {
      console.error('Error validating organization:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const itemTypeIsCorrect = async (req, res, next) => {
    const { type } = req.body;
  
    try {
        const validItemTypes = ['perishable', 'non-perishable'];
        if (!validItemTypes.includes(type)) {
          return res.status(400).json({ error: 'Invalid item type specified' });
        }
      next();
    } catch (error) {
      console.error('Error validating organization:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  const pricingCanBeCreatedWithCurrentData = async (req, res, next) => {
    const {
        organization_id,
        item_id
      } = req.body;
  
    try {
        const organization=await prisma.organization.findFirst({where: { id: organization_id}});
        const item=await prisma.item.findFirst({where: { id: item_id}});
        if(!organization || !item){
            res.status(404).json({ error: 'Organization or item does not exist' });
        }

      next();
    } catch (error) {
      console.error('Error validating organization:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports={
    organizationExists,
    itemTypeIsCorrect,
    pricingCanBeCreatedWithCurrentData
  }