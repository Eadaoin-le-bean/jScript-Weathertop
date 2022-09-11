"use strict";

const logger = require("../utils/logger");
const weatherData = require("../models/weather-data");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
        logger.info("Station Rendering: " + stationId);

    const viewData = {
      station: weatherData.getStation(stationId)
    };
    response.render("station", viewData);
    
    
  },
    addReading(request, response) {
    const stationId = request.params.id;
    const station = weatherData.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      
      
      code: request.body.code,
      temp: request.body.temp,
      wSpeed: request.body.wSpeed,
      wDir: request.body.wDir,
      pressure: request.body.pressure
    };
    logger.debug("New Reading = ", newReading);
    weatherData.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;

