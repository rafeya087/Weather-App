const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const openWeatherMap = require("./utils/openWeatherMap");

const app = express();
const port = process.env.PORT || 3000;

//paths of directory
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partailsPath = path.join(__dirname, "../templates/partials");

//set the app
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partailsPath);

//static paths
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Abdul Rafey",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Abdul Rafey",
    message: "How can I help you?",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error: "Unable to access weather app." });
    }
    openWeatherMap(req.query.address, (error, weatherData) => {
      if (error) {
        return res.send({ error: "Unable to access weather app." });
      }
      res.send({
        location: data.location,
        weather: weatherData,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (re, res) => {
  res.render("404", {
    title: "Help",
    name: "Abdul Rafey",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Abdul Rafey",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
