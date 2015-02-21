var express = require('express');
var router = express.Router();
var passport = require("passport");

router.get('/', function (req, res) {
    res.render('visitor/index', {title: 'Tumla'});
});

router.post("/login", passport.authenticate("authenticate", {
    successRedirect: '/account',
    failureRedirect: '/login'
}));

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
