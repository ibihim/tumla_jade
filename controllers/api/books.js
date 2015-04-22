"use strict";

var express = require('express'),
    router = express.Router(),
    jade = require("jade"),
    Book = require("../../models/Book"),
    bookPartialPath = "views/account/panels/leftPartial.jade",

    getBooks = function (req, res, next) {
        // get the users book
        var bookToFind = {
            userId: req.user.id
        };

        // if there is a need for a concrete book
        if (req.params.bookName) {
            bookToFind.name = req.params.bookName;
        }

        // create some html with jade for the book / books retrieved
        var sendTemplate = function (err, books) {
            if (err) {
                return next(err);
            }

            // send it to the client
            res.send(partialWithBooksAsHtml({ books: books }));
        };

        // find the requested books, get just the name and send the enriched partial
        Book.find(bookToFind, "name", sendTemplate);
    },

    postBook = function (req, res, next) {

        // new Book Object, for storage, contains userId / name
        var newBook = new Book({
            userId: req.user.id,
            name: req.body.bookName
        });

        // after saving the object, it is necessary to send
        // the html to the client
        var sendTemplate = function (err, book) {
            if (err) {
                return next(err);
            }

            // send it to the client
            res.send(partialWithBooksAsHtml({ books: [book] }));
        };

        // save the new book and send an enriched partial
        newBook.save(sendTemplate);
    },

    deleteBook = function (req, res, next) {

        // this book should be deleted
        var bookToDelete = {
            userId: req.user.id,
            name: req.params.bookName
        };

        // send a super simple 200 response, if successful
        var sendStatusResponse = function (err) {
            if (err) {
                return next(err);
            }

            res.sendStatus(200);
        };

        // perform the deletion with status response
        Book.remove(bookToDelete, sendStatusResponse);
    },

    isLoggedIn = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/");
    },

    partialWithBooksAsHtml = function (books) {
        var bookPartial = jade.compileFile(bookPartialPath);

        return bookPartial(books);
    };

router.get("/", isLoggedIn, getBooks);
router.get("/:bookName", isLoggedIn, getBooks);
router.post("/", isLoggedIn, postBook);
// TODO validate unique names for user > or multiple books will be deleted
router.delete("/:bookName", isLoggedIn, deleteBook);

module.exports = router;