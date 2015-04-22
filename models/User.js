"use strict";

var mongoose = require("mongoose"),
    bCrypt = require('bcrypt-nodejs'),
    Book = require("./Book");

var validatePassword = function (password) {
    // TODO extend the requirements!
    return password.length > 7;
};

function UserModel () {

    // here we shape the schema for our user
    var userSchema = mongoose.Schema({

        // the username is unique and should match the pattern of email
        // until we allow nicknames
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, "Enter a proper email."]
        },

        // it might be good to set a property to not send the password on queries
        password: {
            type: String,
            required: true,
            validate: [validatePassword, "Password is too short"]
        },

        // her are the ids of the books stored, owned by the user
        bookIds: {
            type: []
        },

        // expecting this to change, every time the user is touched
        // TODO verify that functionality or add it to "pre save"
        updateData: {
            type: Date,
            default: Date.now
        },
        createDate: "Date"
    });

    userSchema.methods.hashAndSavePassword = function (password) {

        // the password will be hashed and some salt is added
        this.password = bCrypt.hashSync(
            password,
            bCrypt.genSaltSync(10),
            null
        );
    };

    userSchema.methods.authenticate = function (password) {

        // compares the given password with the hashed and salted one
        return bCrypt.compareSync(password, this.password);
    };

    userSchema.methods.addBookOnSubmit = function (bookName, next) {

        // TODO verify that the bookName is unique for the user!
        // it is good to not loose track who this is
        var self = this;

        // a book references to the user and it contains a name
        var book = {
            userId: self.id,
            name: bookName
        };

        // after saving the book to the database, we want to store the id
        var pushSavedBook = function (err, savedBook) {
            if (err) {
                console.log(err);
                return;
            }

            // the id is pushed into the bookIds array
            self.bookIds.push(savedBook.id);

            next();
        };

        // execute the prepared vars
        new Book(book).save(pushSavedBook);
    };

    userSchema.pre("save", function (next) {

        // it is good to not loose track who this is
        var self = this;

        // set the creation date, if it is not set already
        if (!self.createDate) {
            self.createDate = new Date();
        }

        // it is good practice to hash the password
        self.hashAndSavePassword(self.password);

        // it is necessary to have an initial book for translations
        self.addBookOnSubmit("default", next);
    });

    return mongoose.model("User", userSchema);
}

module.exports = new UserModel();