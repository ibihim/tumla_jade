"use strict";

var mongoose = require("mongoose"),
    bCrypt = require('bcrypt-nodejs'),
    Book = require("./Book");

var validatePassword = function (password) {
    return password.length > 7;
};

function UserModel() {

    var userSchema = mongoose.Schema({
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

    userSchema.methods.hashPassword = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

    userSchema.methods.authenticate = function (password) {
        return bCrypt.compareSync(password, this.password);
    };

    userSchema.pre("save", function (next) {

        function addBookToSelf (err, book) {
            if (err) {
                return next(err);
            }

            self.bookIds = [book.id];
        }

        var self = this;

        if (!self.createDate) {
            self.createDate = new Date();
        }

        if (self.bookIds.length === 0) {
            new Book({
                userId: this.id,
                name: "default"

            }).save(addBookToSelf);
        }

        self.password = this.hashPassword(self.password);
    });

    return mongoose.model("User", userSchema);
}

module.exports = new UserModel();