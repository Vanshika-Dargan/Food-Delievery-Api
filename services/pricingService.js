const { ItemType } = require("@prisma/client");
const { mapToBackendItemType } = require("../utilities/uitilities");
function calculateTotalPrice(item_type,pricing, totalDistance) {
    const {base_distance_in_km, km_price, fix_price } = pricing;
    const excessDistance = Math.max(0, totalDistance - base_distance_in_km);
    let prices = km_price.split("/").map(price => parseFloat(price));
    let totalPrice=0;
    if(mapToBackendItemType(item_type)===ItemType.PERISHABLE){
      totalPrice = fix_price + prices[0] * excessDistance;
    }
    else if(mapToBackendItemType(item_type)===ItemType.NON_PERISHABLE){
    totalPrice = fix_price + prices[1] * excessDistance;
    }
    return totalPrice; 
  }
  
  module.exports = { calculateTotalPrice };
  