var mongoose = require('mongoose')
mongoose.plugin(require('../lib/mongoose-list'))

exports.name = 'model'
exports.description = 'Testing model'
exports.model = mongoose.model('Test',new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
}))