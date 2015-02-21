"use strict";

var auth = require("./auth");

exports.db = {
    mongolabUrl: "mongodb://" +
        auth.mongolab.username + ":" +
        auth.mongolab.password + "@ds041831.mongolab.com:41831/" +
        auth.mongolab.db
};