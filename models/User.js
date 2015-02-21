"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bCrypt = require('bcrypt-nodejs');

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
    updateData: {
        type: Date,
        default: Date.now
    },
    createDate: "Date"
});

UserModel.methods.hashPassword = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

UserModel.methods.authenticate = function(password) {
    return bCrypt.compareSync(password, this.password);
};

UserModel.pre("save", function (next) {
    if (!this.createDate) {
        this.createDate = new Date();
    }

    this.password = this.hashPassword(this.password);

    next();
});

module.exports = mongoose.model("User", UserModel);