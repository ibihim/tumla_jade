"use strict";

var assert = require("assert"),
    User = require("../../models/User"),
    db = require("../../lib/db");

describe("testing the user, mongoose and mongodb", function () {
    before(function () {
        db.connect();
    });

    after(function () {
        db.disconnect();
    });

    var testUser = new User({
        username: "Peter",
        password: "Parker"
    });

    function findUserAndVerify (user, verifyCallback) {

        function verifyResult (err, results) {
            if (err) {
                console.log(err);
            }
            verifyCallback(results, user);
        }

        User.find({username: user.username}, verifyResult);
    }

    it("creating a user, results are verified by search", function (done) {

        function saveCallback (err) {
            if (err) {
                done(err);
            } else {
                findUserAndVerify(testUser, saveVerifier);
            }
        }

        function saveVerifier (results, user) {
            assert.equal(
                results[0].username,
                user.username,
                results.username + " !== " + user.username
            );
            done();
        }

        testUser.save(saveCallback);
    });

    it("removing a user, results are verified by search", function (done) {

        function removeCallback (err) {
            if (err) {
                done(err);
            } else {
                findUserAndVerify(testUser, removeVerifier);
            }
        }

        function removeVerifier (results) {
            assert.ok(
                (results === undefined) ||
                (results && results.length === 0),
                "results are not empty, as they should: " +
                JSON.stringify(results)
            );
            done();
        }

        User.remove({username: testUser.username}, removeCallback);
    });
});