"use strict";

var express = require('express');
var router = express.Router();

router.get("/", isLoggedIn, function (req, res) {
    res.render("account/index", {title: "Account - Main Page", user: req.user});
});

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/");
}

module.exports = router;