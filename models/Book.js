"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var minimalInput = function (text) {
    return text && text.length > 1;
};

var BookModel = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        validate: [minimalInput, "Name is too short"]
    },
    updateData: {
        type: Date,
        default: Date.now
    },
    createDate: "Date"
});

BookModel.pre("save", function (next) {
    if (!this.createDate) {
        this.createDate = new Date();
    }

    next();
});

module.exports = mongoose.model("Book", BookModel);