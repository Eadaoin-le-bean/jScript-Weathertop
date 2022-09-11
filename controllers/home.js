"use strict";

const logger = require("../utils/logger");

const home = {
  index(request, response) {
    logger.info("home rendering");
    const viewData = {
      title: "Welcome to Weathertop Station",
    };
    response.render("home", viewData);
  },
};

module.exports = home;
