const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrganization=async (req, res) => {
    try {
      const { name } = req.body;
      const organization = await prisma.organization.create({
        data: {
          name: name,
        },
      });
      console.log(organization);
      res.json({ organization: organization, success: true });
    } catch (err) {}
  }

const updateOrganization=async (req, res) => {
    try {
      const { name } = req.body;
      const organizationId = parseInt(req.params.id);
  
      const updatedOrganization = await prisma.organization.update({
        where: { id: organizationId },
        data: { name: name },
      });
  
      console.log(updatedOrganization);
      res.json({ organization: updatedOrganization, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

const deleteOrganization = async (req, res) => {
    const organizationId = parseInt(req.params.id);
    try {
      
        await prisma.pricing.deleteMany({
            where: { organization_id: organizationId },
          });
      const deletedOrganization = await prisma.organization.delete({
        where: { id: organizationId },
        
      });
  
      console.log(deletedOrganization);
      res.json({ success: true, message: "Organization deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error:"Organization doesn't exiist"});
    }
  }

  module.exports = {
    createOrganization,
    updateOrganization,
    deleteOrganization
  };