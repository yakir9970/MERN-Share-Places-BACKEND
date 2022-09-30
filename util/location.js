const axios = require("axios");

const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  let data;
  const params = {
    access_key: "d16e202d8ef68877a9c3193282e38bd2",
    query: address,
  };
  await axios
    .get("http://api.positionstack.com/v1/forward", { params })
    .then((response) => {
      data = response.data;

      if (!data) {
        const error = new HttpError("Location Not Found!", 404);
        throw error;
      }
    });
  const coordinates = {
    lat: data.data[0].latitude,
    lng: data.data[0].longitude,
  };
  return coordinates;
}

module.exports = getCoordsForAddress;
