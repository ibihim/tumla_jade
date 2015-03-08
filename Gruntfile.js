"use strict";

module.exports = function (grunt) {
    require("grunt-config-dir")(grunt, {
        configDir: require("path").resolve("tasks")
    }, function(err){ grunt.log.error(err); });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-nightwatch");
    grunt.loadNpmTasks("grunt-check-modules");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");

    grunt.registerTask("build", ["jshint", "check-modules", "uglify", "less"]);
    grunt.registerTask("test", ["nightwatch"]);
};