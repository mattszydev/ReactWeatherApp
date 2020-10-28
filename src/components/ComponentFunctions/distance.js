//Implementation of The Haversine formula 
//https://en.wikipedia.org/wiki/Haversine_formula

function getDistance(lat1, lon1, lat2, lon2){
  let globalRadius = 6371; // km
  let dLat = toRad(lat2-lat1);
  let dLon = toRad(lon2-lon1);
  let lattitude1 = toRad(lat1);
  let lattitude2 = toRad(lat2);

  let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lattitude1) * Math.cos(lattitude2); 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let distance = globalRadius * c;
  return distance;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

export default getDistance;