sinon = require 'sinon'

describe 'bower', ->
  Given -> @cli = sinon.stub()
  Given -> @subject = require('proxyquire').noCallThru() '../tasks/bower',
    'simple-cli': @cli
  Then -> @cli.calledWith('bower').should.be.true()
