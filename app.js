"use strict";

var expressSetup = require("./config/express");

var passportSetup = require("./lib/passport");
var passport = require("passport");
var db = require("./lib/db");
var controllers = require('./controllers');

db.connect();

var app = expressSetup.init();

passportSetup.init(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(controllers);

expressSetup.errorHandling();

module.exports = app;
