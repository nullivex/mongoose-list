var mongoose = require('mongoose')
  , schema

mongoose.plugin(require('../lib/mongoose-list'))

schema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Test',schema)