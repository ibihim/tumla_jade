"use strict";

var _ = require("lodash");
var express = require('express');
var router = express.Router();
var Translation = require("../models/Translation");
var Book = require("../models/Book");

router.get("/", isLoggedIn, function (req, res, next) {

    Book.find({userId: req.user.id}, function (err, books) {
        if(err){
            console.log(err);
        }

        var defaultBook = _.find(books, function (book) {
            return book.name === "default";
        });

        var bookNames = _.map(books, function (book) {
            return book.name;
        });

        Translation.find({bookId: defaultBook.id}, function (err, translations) {
            if (err) {
                return next(err);
            }

            res.render("account/index", {
                title: "Account - Main Page",
                user: req.user,
                translations: translations,
                books: bookNames
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