"use strict";

var express = require('express');
var session = require("express-session");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

exports.init = function () {

    app.set('views', "./views");
    app.set('view engine', 'jade');

    app.use(favicon('./public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser("cookie monster says om nom nom"));
    app.use(session({
        secret: "valar morghulis valar dohaeris",
        resave: false,
        saveUninitialized: false
    }));
    app.use(express.static("./public"));

    return app;
};

exports.errorHandling = function () {

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
