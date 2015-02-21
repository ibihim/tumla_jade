var express = require('express');
var router = express.Router();
var User = require("../models/User");

router.post("/", function (req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err, user) {
        if (err) {
            return next(err);
        }

        res.render("account/users", {title: "User - Main Page", user: user});
    });
});

module.exports = router;
