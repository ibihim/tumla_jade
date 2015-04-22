"use strict";

var express = require('express');
var router = express.Router();
var User = require("../../models/User");

router.post("/", function (req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err, savedUser) {
        if (err) {
            return next(err);
        }

        res.json(savedUser);
    });
});

module.exports = router;
