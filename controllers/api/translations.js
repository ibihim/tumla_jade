"use strict";

var express = require('express'),
    router = express.Router(),
    jade = require("jade"),
    Translation = require("../../models/Translation"),
    Book = require("../../models/Book"),
    translationsPartialPath = "views/account/panels/mainPartial.jade",

    getTranslations = function (req, res, next) {
        var translationsToFind = { username: req.user.username };

        if (req.params.bookName) {
            translationsToFind.bookName = req.params.bookName;
        }

        Translation.find(translationsToFind, function (err, translations) {
            if (err) {
                return next(err);
            }

            var translationsPartial = jade.compileFile(translationsPartialPath),
                partialAsHtml = translationsPartial({ translations: translations });

            res.send(partialAsHtml);
        });
    },

    postTranslations = function (req, res, next) {

        var translation = new Translation({
                userId: req.user.id,
                original: req.body.original,
                translation: req.body.translation
            }),

            saveWithBookId = function (err, book) {
                if (err) {
                    next(err);
                }

                translation.bookId = book.id;

                translation.save(sendPartial);
            },

            sendPartial = function (err, translation) {
                if (err) {
                    return next(err);
                }

                res.send(partialWithTranslationsAsHtml(
                    { translations: [translation] }
                ));
            };

        if (!req.body.bookName) {
            req.body.bookName = "default";
        }

        Book.findOne(
            { userId: req.user.id, name: req.body.bookName },
            "id",
            saveWithBookId
        );
    },

    partialWithTranslationsAsHtml = function (translations) {
        var translationsPartial = jade.compileFile(translationsPartialPath);

        return translationsPartial({ translations: translations });
    },

    isLoggedIn = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/");
    };

router.get("/", isLoggedIn, getTranslations);
router.get("/:bookName", isLoggedIn, getTranslations);
router.post("/", isLoggedIn, postTranslations);

module.exports = router;