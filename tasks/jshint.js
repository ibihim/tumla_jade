"use strict";

module.exports = function () {

    return {
        files: [
            "Gruntfile.js",
            "config/**/*.js",
            "controllers/**/*.js",
            "lib/**/*.js",
            "models/**/*.js",
            "tasks/**/*.js",
            "tests/**/*.js"
        ],
        options: {
            globals: {
                jQuery: true
            },
            node: true,

            strict: true,
            globalstrict: true,

            asi: false,
            curly: true,
            eqeqeq: true,
            evil: false,

            shadow: false,
            newcap: true,
            noempty: true,
            nonew: true,
            indent: 4,
            maxlen: 100,

            maxparams: 4,
            maxdepth: 3
        }
    };
};