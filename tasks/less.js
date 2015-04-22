"use strict";

module.exports = function () {
    return {
        development: {
            options: {
                paths: ["public/css", "public/css/visitor"]
            },
            files: {
                "public/css/custom.min.css": "public/css/custom.less",
                "public/css/visitor/agency.min.css": "public/css/visitor/agency.less",
                "public/css/visitor/style.min.css": "public/css/visitor/agency.less"
            }
        }
    };
};