"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Book = require("./Book");

var minimalInput = function (text) {
    return text && text.length > 1;
};

var TranslationModel = new Schema({
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

TranslationModel.pre("save", function (next) {

    function saveBookToSelf (err, book) {
        if (err) {
            return next(err);
        }

        self.bookId = book.id;
    }

    var self = this;

    if (!this.createDate) {
        this.createDate = new Date();
    }

    if (!this.bookId) {
        Book.find(
            {userId: this.userId, name: "default"},
            saveBookToSelf
        );
    }

    next();
});

module.exports = mongoose.model("Translation", TranslationModel);