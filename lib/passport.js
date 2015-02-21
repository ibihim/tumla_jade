"use strict";

var User = require('../models/User');
var LocalStrategy = require("passport-local").Strategy;

function createStrategy (strategy) {
    return new LocalStrategy(
        {passReqToCallback: true},
        strategy
    );
}

function authenticateStrategy (req, username, password, done) {

    function onLoginUserFindOne (err, user) {
        // In case of any error, return using the done method
        if (err)
            return done(err);
        // Username does not exist, log the error and redirect back
        if (!user) {
            return done(null, false, req.flash('message', 'User Not found.'));
        }
        // User exists but wrong password, log the error 
        if (!user.authenticate(password)) {
            // redirect back to login page
            return done(null, false, req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from done method
        // which will be treated like success
        return done(null, user);
    }

    User.findOne({'username': username}, onLoginUserFindOne);
}

function serializeUser (user, done) {
    done(null, user.id);
}

function deserializeUser (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
}

function init (passport) {
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use("authenticate", createStrategy(authenticateStrategy));
}

exports.init = init;