spawn = require('child_process').spawn
fs = require 'fs'

describe 'integration test', ->
  context 'install', ->
    When (done) -> spawn('grunt', ['bower:install']).on 'close', -> done()
    And (done) -> fs.stat './bower_components/lodash', (@err) => done()
    Then -> (@err == null).should.be.true()

  context 'uninstall', ->
    When (done) -> spawn('grunt', ['bower:uninstall']).on 'close', -> done()
    And (done) -> fs.stat './bower_components/lodash', (@err) => done()
    Then -> @err.should.be.an.instanceof Error
