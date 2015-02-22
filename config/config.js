"use strict";

var auth = require("./auth");
var env = process.env.NODE_ENV || "prod";
var options = {
    // required
    prod: {
        mongoUrl: "mongodb://" +
        auth.mongolab.username + ":" +
        auth.mongolab.password + "@ds041831.mongolab.com:41831/" +
        auth.mongolab.db
    },
    // optional
    dev: {
        mongoUrl: "mongodb://localhost:27017/tumla-jade"
    }
};

exports.db = options[env];