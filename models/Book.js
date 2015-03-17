"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var minimalInput = function (text) {
    return text && text.length > 1;
};

function BookModel () {

    var bookSchema = Schema({
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

    bookSchema.pre("save", function (next) {
        var self = this;

        if (!self.createDate) {
            self.createDate = new Date();
        }

        next();
    });

    return mongoose.model("Book", bookSchema);
}

module.exports = new BookModel();