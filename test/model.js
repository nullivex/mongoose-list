var mongoose = require('mongoose')
mongoose.plugin(require('../lib/mongoose-list'))

exports.name = 'model'
exports.description = 'Testing model'
exports.model = mongoose.model('Test',new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  hits: {
    type: Number,
    require: false,
    default: 10
  },
  foo: {
    type: mongoose.Schema.Types.Mixed,
    require: false,
    default: 'fox'
  },
  dateCreated: {
    type: Date,
    require: false,
    default: Date.now
  }
}))