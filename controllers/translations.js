"use strict";

var express = require('express'),
    router = express.Router(),
    Translation = require("../models/Translation"),
    Book = require("../models/Book");

router.get("/", isLoggedIn, function (req, res, next) {
    Translation.find({username: req.user.username},
        function (err, translations) {
            if (err) {
                return next(err);
            }
            res.json(translations);
        }
    );
});

router.post("/", isLoggedIn, function (req, res, next) {

    function sendOk (err) {
        if (err) {
            return next(err);
        }

        return res.send(200);
    }

    function saveTranslationWithBookId (err, book) {
        if (err) {
            next(err);
        }
        translation.bookId = book.id;

        translation.save(sendOk);
    }

    var translation = new Translation({
        userId: req.user.id,
        original: req.body.original,
        translation: req.body.translation
    });

    if (req.body && req.body.bookName) {
        console.log("setting book for translation to" + req.body.bookName);

        Book.find(
            {userId: req.user.id, name: req.body.bookName},
            saveTranslationWithBookId
        );
    } else {
        Book.find(
            {userId: req.user.id, name: "default"},
            saveTranslationWithBookId
        );
    }
});

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/");
}

module.exports = router;