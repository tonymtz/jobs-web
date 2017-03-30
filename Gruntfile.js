'use strict';

module.exports = function(grunt) {

  // Load all grunt task
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Compile SASS
    sass: {
      dist: {
        options: {
          style: 'compact',
          quiet: false
        },
        files: {
          "public/dist/styles.css": "public/stylesheets/style.sass"
        }
      }
    },
    // JavaScript 2015
    babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        dist: {
            files: [{
              src: ["public/javascripts/*.js"],
              dest: "public/dist/built.js"
            }]
        }
    },
    watch: {
      scripts: {
        files: ['**/*.js', '**/*.sass'],
        tasks: ['build', 'concat'],
        options: {
          spawn: true
        },
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/javascripts/*.js'],
        dest: 'public/dist/built.js',
      },
    }
  });

  // Sass task
  grunt.loadNpmTasks('grunt-sass');

  // Default task(s).
  grunt.registerTask('default', ['build', 'watch']);

  // Watch task
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('build', ['babel', 'sass','concat']);

};
