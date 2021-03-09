const axios = require("axios");

const openWeatherMap = (address, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(address) +
    "&appid=cfe6fe67e42a89a66d17287c22c239ad&units=metric";
  axios({ url, method: "GET" })
    .then((response) => {
      if (response.data.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, `Its currently ${response.data.main.temp} degrees out there.`);
      }
    })
    .catch((error) => {
      callback("Unable to connect to weather app", undefined);
    });
};

module.exports = openWeatherMap;
