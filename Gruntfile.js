module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadNpmTasks('grunt-simple-istanbul');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('./tasks');

  grunt.initConfig({
    clean: {
      coverage: ['coverage'],
      bower: ['bower.json', 'bower_components']
    },
    eslint: {
      tasks: {
        options: {
          configFile: '.eslint.json',
          format: 'node_modules/eslint-codeframe-formatter'
        },
        src: ['tasks/**/*.js']
      }
    },
    shell: {
      codeclimate: 'npm run codeclimate'
    },
    travisMatrix: {
      v4: {
        test: function() {
          return /^v4/.test(process.version);
        },
        tasks: ['istanbul:unit', 'shell:codeclimate']
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
      watch: {
        options: {
          reporter: 'dot'
        },
        src: ['test/**/*.coffee']
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
          dir: 'coverage',
          simple: {
            cmd: 'cover',
            args: ['grunt', 'unit'],
            rawArgs: ['--', '--color']
          }
        }
      }
    },
    open: {
      coverage: {
        path: 'coverage/lcov-report/index.html'
      }
    },
    watch: {
      tests: {
        files: ['tasks/**/*.js', 'test/**/*.coffee'],
        tasks: ['mochaTest:watch'],
        options: {
          atBegin: true
        }
      }
    },
    bower: {
      install: {
        args: 'lodash'
      },
      uninstall: {
        args: 'lodash'
      }
    }
  });

  grunt.registerTask('mocha', ['unit', 'int']);
  grunt.registerTask('unit', ['mochaTest:unit']);
  grunt.registerTask('int', ['mochaTest:int', 'clean:bower']);
  grunt.registerTask('default', ['eslint:tasks', 'mocha']);
  grunt.registerTask('coverage', ['istanbul:unit', 'open:coverage']);
  grunt.registerTask('ci', ['eslint:tasks', 'mocha', 'travisMatrix']);
};
