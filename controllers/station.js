"use strict";

const logger = require("../utils/logger");
const weatherData = require("../models/weather-data");
const stationProcessor = require("../utils/stationProcessor");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
        logger.info("Station Rendering: " + stationId);
    const getStation = weatherData.getStation(stationId);
    const beaufort = stationProcessor.getBeaufort(getStation);
    const fahrenite = stationProcessor.getTempInF(getStation);
    const celcius = stationProcessor.getTemp(getStation);
    const direction = stationProcessor.getWDir(getStation);
    const weatherPressure = stationProcessor.getPressure(getStation);
    const windChill = stationProcessor.getWChill(getStation);
    const weatherString = stationProcessor.getWeatherFromCode(getStation);
    const weatherIcon = stationProcessor.getIcon(getStation);
    const viewData = {
      station: weatherData.getStation(stationId),
      beaufort: beaufort,
      weatherString: weatherString,
      fahrenite: fahrenite,
      celcius: celcius,
      direction: direction,
      windChill: windChill,
      weatherPressure: weatherPressure,
      weatherIcon: weatherIcon 
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
  },
  
    deleteReading(request, response) {
    const stationId = request.params.id;
    const dataId = request.params.dataId;
    logger.debug(`Deleting Weater Data ${dataId} from Playlist ${stationId}`);
    weatherData.removeReading(stationId, dataId);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;

