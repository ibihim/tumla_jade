"use strict";

var mongoose = require("mongoose");
var config = require("../config/config");

var db = mongoose.connection;

db.on("open", function () {
    console.log("connection established");
});
db.on("close", function () {
    console.log("connection closed");
});

exports.connect = function () {
    mongoose.connect(config.db.mongoUrl);
};

exports.disconnect = function () {
    mongoose.disconnect();
};