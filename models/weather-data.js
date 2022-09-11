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
  
  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },
  
   addReading(id, reading) {
    const station = this.getStation(id);
    station.data.push(reading);
    this.store.save();
  },
  

  
}
  
  module.exports = weatherData;
