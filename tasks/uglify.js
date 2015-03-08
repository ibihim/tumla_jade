"use strict";

module.exports = function () {
    return {
        dist: {
            files: {
                "public/js/custom.min.js": ["public/js/custom.js"],
                "public/js/agency.min.js": [
                    "public/js/agency.js",
                    "public/js/cbpAnimatedHeader.js",
                    "public/js/classie.js"
                ]
            }
        }
    };
};