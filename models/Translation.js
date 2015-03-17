"use strict";

var mongoose = require("mongoose"),
    Book = require("./Book");

var minimalInput = function (text) {
    return text && text.length > 1;
};

function TranslationModel () {

    var translationSchema = mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        bookId: {
            type: String
        },
        original: {
            type: String,
            required: true,
            validate: [minimalInput, "Original-Text is too short"]
        },
        translation: {
            type: String,
            required: true,
            validate: [minimalInput, "Translation-Text is too short"]
        },
        updateData: {
            type: Date,
            default: Date.now
        },
        createDate: "Date"
    });

    translationSchema.pre("save", function (next) {

        function saveBookToSelf (err, book) {
            if (err) {
                return next(err);
            }

            self.bookId = book.id;
        }

        var self = this;

        if (!self.createDate) {
            self.createDate = new Date();
        }

        if (!self.bookId) {
            Book.find(
                {userId: self.userId, name: "default"},
                saveBookToSelf
            );
        }

        next();
    });

    return mongoose.model("Translation", translationSchema);
}

module.exports = new TranslationModel();