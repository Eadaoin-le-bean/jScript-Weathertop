"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const home = require("./controllers/home.js");
const station = require("./controllers/station.js");

router.get("/", home.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/station/:id", station.index);
router.post("/dashboard/addStation", dashboard.addStation);
router.post("/station/:id/addReading", station.addReading);
router.get("/dashboard/deleteStation/:id", dashboard.deleteStation);
router.get("/station/:id/deleteReading/:dataId", station.deleteReading);

module.exports = router;
