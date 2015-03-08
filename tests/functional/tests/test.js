"use strict";

var timeout = 5000;

var user = {
    name: "peter@parker.com",
    password: "spiderman"
};

var homepage = {
    usernameField: "input[name=username]",
    passwordField: "input[name=password]",
    submitButton: "button[name=submit]"
};

var accountpage = {
    menu: "a[id=menu]",
    logoutLink: "a[id=logout]",
    originalInput: "input[name=original]",
    translationInput: "input[name=translation]",
    translateButton: "input[id=translate]",
    translation: "div[id=translations]"
};

module.exports = {
    "check for login to work": function (browser) {
        browser
            .url("http://localhost:3000")
            .waitForElementVisible('body', timeout)
            .setValue(homepage.usernameField, user.name)
            .setValue(homepage.passwordField, user.password)
            .click(homepage.submitButton)
            .waitForElementPresent(accountpage.menu, timeout)
            .assert.containsText(accountpage.menu, user.name);
    },
    "add translation": function (browser) {
        var original = "hello world";
        var translation = "hallo welt";

        browser
            .setValue(accountpage.originalInput, original)
            .setValue(accountpage.translationInput, translation)
            .click(accountpage.translateButton)
            .waitForElementPresent(accountpage.translation, timeout)
            .assert.containsText(accountpage.translation, original)
            .assert.containsText(accountpage.translation, translation);
    },
    "check for logout to work": function (browser) {
        browser
            .click(accountpage.menu)
            .waitForElementVisible(accountpage.logoutLink, timeout)
            .click(accountpage.logoutLink)
            .waitForElementPresent(homepage.usernameField, timeout)
            .end();
    }
};