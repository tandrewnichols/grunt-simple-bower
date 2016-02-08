module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadNpmTasks('grunt-simple-istanbul');
  grunt.loadNpmTasks('grunt-exec');
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
      codeclimate: 'codeclimate-test-reporter < coverage/lcov.info'
    },
    travisMatrix: {
      v4: {
        test: function() {
          return /^v4/.test(process.version);
        },
        tasks: ['istanbul:unit', 'exec:codeclimate']
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
          timeout: 20000
        },
        src: ['test/integration.coffee']
      }
    },
    istanbul: {
      unit: {
        options: {
          root: 'tasks',
          dir: 'coverage'
        },
        cmd: 'cover grunt unit'
      },
    },
    open: {
      coverage: {
        path: 'coverage/lcov-report/index.html'
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
  grunt.registerTask('coverage', ['istanbul:unit']);
  grunt.registerTask('ci', ['jshint:all', 'mocha', 'travisMatrix']);
};
