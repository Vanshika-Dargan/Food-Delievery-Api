const { ItemType} = require("@prisma/client");
const mapToBackendItemType=(frontendItemType)=>{
    switch (frontendItemType) {
      case "perishable":
        return ItemType.PERISHABLE;
      case "non-perishable":
        return ItemType.NON_PERISHABLE;
      default:
        throw new Error("Invalid ItemType");
    }
  }

const mapToFrontendItemType=(backendItemType)=>{
    switch (backendItemType) {
      case ItemType.PERISHABLE:
        return "perishable";
      case ItemType.NON_PERISHABLE:
        return "non-perishable";
      default:
        throw new Error("Invalid ItemType");
    }
  }
  
module.exports={
    mapToBackendItemType,
    mapToFrontendItemType
}