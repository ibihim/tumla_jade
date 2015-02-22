"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bCrypt = require('bcrypt-nodejs'),
    Book = require("./Book");

var validatePassword = function (password) {
    return password.length > 7;
};

var UserModel = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Enter a proper email."]
    },
    password: {
        type: String,
        required: true,
        validate: [validatePassword, "Password is too short"]
    },
    bookIds: { // TODO there should be a validation that the book names are unique in the list?
        type: []
    },
    updateData: {
        type: Date,
        default: Date.now
    },
    createDate: "Date"
});

UserModel.methods.hashPassword = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

UserModel.methods.authenticate = function (password) {
    return bCrypt.compareSync(password, this.password);
};

UserModel.pre("save", function (next) {
    console.log("pre save");
    function addBookToSelf (err, book) {
        if (err) {
            return next(err);
        }

        self.bookIds = [book.id];
    }

    var self = this;

    if (!this.createDate) {
        this.createDate = new Date();
    }

    if (this.bookIds.length === 0) {
        new Book({
            userId: this.id,
            name: "default"

        }).save(addBookToSelf);
    }

    this.password = this.hashPassword(this.password);

    next();
});

module.exports = mongoose.model("User", UserModel);