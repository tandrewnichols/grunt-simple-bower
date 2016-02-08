[![Build Status](https://travis-ci.org/tandrewnichols/grunt-simple-bower.png)](https://travis-ci.org/tandrewnichols/grunt-simple-bower) [![downloads](http://img.shields.io/npm/dm/grunt-simple-bower.svg)](https://npmjs.org/package/grunt-simple-bower) [![npm](http://img.shields.io/npm/v/grunt-simple-bower.svg)](https://npmjs.org/package/grunt-simple-bower) [![Code Climate](https://codeclimate.com/github/tandrewnichols/grunt-simple-bower/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/grunt-simple-bower) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/grunt-simple-bower/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/grunt-simple-bower) [![dependencies](https://david-dm.org/tandrewnichols/grunt-simple-bower.png)](https://david-dm.org/tandrewnichols/grunt-simple-bower)

# grunt-simple-bower

A simple API for using bower via grunt

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-simple-bower --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-simple-bower');
```

Alternatively, install [task-master](http://github.com/tandrewnichols/task-master) and let it manage this for you.

## The "bower" task

This plugin uses the [simple-cli](https://github.com/tandrewnichols/simple-cli) interface, so any of the options avaiable there will work with this plugin. A summary of the more salient points are included below.

### Overview

The `bower` task is a multi-task, where the target is (usually) the bower command to run. Options to bower can be supplied in the options object, and there are various options supported by the library itself which must be under `options.simple`. In general, the target is the bower command to run and anything inside `options.simple.args` will be added as arguments. If you need more than one target that runs the same bower command, you can set `options.simple.cmd` to the bower command and name that task target whatever you want. Simple-cli actually does a wide variety of things, so rather than duplicating the documentation for that here, please refer to that (very thorough and example-filled) documentation.

### Examples

```js
grunt.initConfig({
  bower: {
    link: {}, // Runs "bower link"
    list: {}, // Runs "bower list"
    listJson: { // Runs "bower list --json"
      options: {
        json: true,
        simple: {
          cmd: 'list'
        }
      }
    },
    info: { // Runs "bower info angular -V --no-color"
      options: {
        V: true,
        noColor: true,
        simple: {
          args: ['angular']
        }
      }
    },
    /**
     * Perhaps a more useful command...
     * 
     * With this you can install a module by running "grunt bower:install --component lodash"
     * or by running "grunt.config.set('component', 'lodash')" in a previous task. Or simply
     * run "grunt bower:install" and you will be prompted for a component
     *
     **/
    install: {
      options: {
        simple: {
          args: ['{{ component }}']
        }
      }
    }
  }
});
```

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
