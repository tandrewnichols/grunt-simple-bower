module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadTasks('./tasks');

  grunt.initConfig({
    clean: {
      coverage: ['coverage'],
      bower: ['bower.json', 'bower_components']
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        eqeqeq: true,
        es3: true,
        indent: 2,
        newcap: true,
        quotmark: 'single',
        boss: true
      },
      all: ['tasks/**/*.js']
    },
    exec: {
      codeclimate: 'codeclimate-test-reporter < coverage/coverage.lcov'
    },
    travisMatrix: {
      v4: {
        test: function() {
          return /^v4/.test(process.version);
        },
        tasks: ['mochacov:lcov', 'exec:codeclimate']
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        ui: 'mocha-given',
        require: ['coffee-script/register', 'should', 'should-sinon']
      },
      unit: {
        src: ['test/bower.coffee']
      },
      int: {
        options: {
          timeout: 8000
        },
        src: ['test/integration.coffee']
      }
    },
    mochacov: {
      lcov: {
        options: {
          reporter: 'mocha-lcov-reporter',
          ui: 'mocha-given',
          instrument: true,
          require: ['coffee-script/register', 'should', 'should-sinon'],
          output: 'coverage/coverage.lcov'
        },
        src: ['test/**/*.coffee'],
      },
      html: {
        options: {
          reporter: 'html-cov',
          ui: 'mocha-given',
          require: ['coffee-script/register', 'should', 'should-sinon'],
          output: 'coverage/coverage.html'
        },
        src: ['test/**/*.coffee']
      }
    },
    open: {
      coverage: {
        path: 'coverage/coverage.html'
      }
    },
    watch: {
      tests: {
        files: ['tasks/**/*.js', 'test/**/*.coffee'],
        tasks: ['mocha'],
        options: {
          atBegin: true
        }
      }
    },
    bower: {
      install: {
        options: {
          simple: {
            args: 'lodash'
          }
        }
      },
      uninstall: {
        options: {
          simple: {
            args: 'lodash'
          }
        }
      }
    }
  });

  grunt.registerTask('mocha', ['unit', 'int']);
  grunt.registerTask('unit', ['mochaTest:unit']);
  grunt.registerTask('int', ['mochaTest:int', 'clean:bower']);
  grunt.registerTask('default', ['jshint:all', 'mocha']);
  grunt.registerTask('coverage', ['mochacov:html']);
  grunt.registerTask('ci', ['jshint:all', 'mocha', 'travisMatrix']);
};
