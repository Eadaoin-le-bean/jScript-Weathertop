"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const weatherData = {
  store: new JsonStore("./models/weather-data.json", {
    weatherData: []
  }),
  collection: "weatherData",

  getAllWeather() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },
   addReading(id, reading) {
    const station = this.getStation(id);
    station.data.push(reading);
    this.store.save();
  },
  
  getLatestWeatherInfo(id)
  {
    const station = this.getStation(id);
    const length = this.station.data.length;
    const dataEntry = station.data[length -1];
    
    return dataEntry;
  },
  
getWeatherFromCode(code) {

        switch (code) {
            case 100:
                return "Clear";
            case 200:
                return "Partial Clouds";
            case 300:
                return "Cloudy";
            case 400:
                return "Light Showers";
            case 500:
                return "Heavy Showers";
            case 600:
                return "Rain";
            case 700:
                return "Snow";
            case 800:
                return "Thunder";
            default:
                return "Code Not Recognised";

        }
    },
  
}
  
  module.exports = weatherData;
