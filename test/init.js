/* global expect: true */
var chai = require('chai')
expect = chai.expect

before(function(){
  //connect to mongodb
  var mongoose = require('mongoose')
    , dsn = 'mongodb://127.0.0.1/mongoose-list-test'
  mongoose.connect(dsn,{
    db: {native_parser: true} //jshint ignore:line
  })
})