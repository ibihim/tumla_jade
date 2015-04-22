"use strict";

var _ = require("lodash");
var express = require('express');
var router = express.Router();
var Translation = require("../../models/Translation");
var Book = require("../../models/Book");

router.get("/", isLoggedIn, function (req, res, next) {

    Book.find({userId: req.user.id, name: "default"}, function (err, books) {
        if(err){
            console.log(err);
        }

        // TODO user without books are fucked up =>
        var defaultBook = books[0];
        Translation.find({bookId: defaultBook.id}, function (err, translations) {
            if (err) {
                return next(err);
            }

            res.render("account/index", {
                title: "Account - Main Page",
                user: req.user,
                translations: translations
            });
        });
    });
});

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/");
}

module.exports = router;