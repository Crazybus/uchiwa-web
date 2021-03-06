'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: [
          'watch:karma',
          'watch:scss'
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'js/{,*/}*.js',
      ]
    },
    karma: {
      unit: {
        background: true,
        singleRun: false,
        configFile: 'test/karma/conf.js'
      },
      continuous: {
        configFile: 'test/karma/conf.js',
        singleRun: true
      }
    },
    lintspaces: {
      all: {
        src: [
          'js/**/*.js'
        ],
        options: {
          newline: true,
          newlineMaximum: 2,
          indentation: 'spaces',
          spaces: 2,
          trailingspaces: true
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['**/*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    watch: {
      karma: {
        files: ['js/**/*.js', 'test/karma/**/*.js'],
        tasks: ['karma:unit:run']
      },
      scss: {
        files: ['css/**/*.scss'],
        tasks: ['sass:dist'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('dev', [
    'karma:unit:start',
    'concurrent:dev'
  ]);

  grunt.registerTask('lint', [
    'newer:jshint'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'lintspaces',
    'karma:continuous'
  ]);
};
