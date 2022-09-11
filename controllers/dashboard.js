"use strict";

const logger = require("../utils/logger");
const weatherData = require("../models/weather-data");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
        title: "Weather Data Dashboard",
      weather: weatherData.getAllWeather(),
      
    };
    response.render("dashboard", viewData);
  },
  
    addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      station: request.body.station,
      data: []
    };
    logger.debug("Creating a new Station", newStation);
    weatherData.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
