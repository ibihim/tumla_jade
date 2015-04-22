"use strict";

var mongoose = require("mongoose");

var minimalInput = function (text) {
    return text && text.length > 0;
};

function BookModel () {

    // here is the specification of the book model
    var bookSchema = mongoose.Schema({

        // references the user owning it
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            validate: [minimalInput, "Name is too short"]
        },

        // expecting this to change, every time the user is touched
        // TODO verify that functionality or add it to "pre save"
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