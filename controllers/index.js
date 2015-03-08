"use strict";

var router = require('express').Router();
var main = require("./api/main");
var users = require("./api/users");
var account = require("./api/account");
var translations = require("./api/translations");
var books = require("./api/books");

router.use("/", main);
router.use("/users", users);
router.use("/account", account);
router.use("/translations", translations);
router.use("/books", books);

module.exports = router;
