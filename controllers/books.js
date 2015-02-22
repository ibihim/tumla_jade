"use strict";

var express = require('express'),
    router = express.Router(),
    Book = require("../models/Book");

router.get("/", isLoggedIn, function (req, res, next) {
    Book.find({userId: req.user.id},
        function (err, books) {
            if (err) {
                return next(err);
            }
            res.json(books);
        }
    );
});

router.post("/", isLoggedIn, function (req, res, next) {
    var book = new Book({
        userId: req.user.id,
        name: req.body.bookName
    });

    book.save(function (err) {
        if (err) {
            return next(err);
        }

        return res.send(200);
    });
});

// TODO validate unique names for user
router.delete("/:bookName", isLoggedIn, function (req, res, next) {
    Book.remove({
        userId: req.user.id,
        name: req.body.bookName
    }, function (err, book) {
        if (err) {
            return next(err);
        }

        res.send(200);
    });
});

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/");
}

module.exports = router;