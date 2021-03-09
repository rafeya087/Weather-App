const axios = require("axios");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaGFzc2FudGFoYXdhciIsImEiOiJjazl3dmhvZzAwOHczM2ZwM3RxYzBhdm94In0.u5-Okh8DYG-XSPxZw97LCw&limit=1";
  axios({ url, method: "GET" })
    .then((response) => {
      if (response.data.features.length === 0) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          longitude: response.data.features[0].center[0],
          latitude: response.data.features[0].center[1],
          location: response.data.features[0].place_name,
        });
      }
    })
    .catch((error) => callback("Unable to connect to weather app", undefined));
};

module.exports = geocode;
