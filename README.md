mongoose-list [![Build Status](https://travis-ci.org/snailjs/mongoose-list.png?branch=master)](https://travis-ci.org/snailjs/mongoose-list)
=============

List plugin for mongoose that allows pagination, filtering, sorting.

## Installation

```
$ npm install mongoose-list
```

## Usage

**model.js**
```js
var mongoose = require('mongoose')
  , schema

mongoose.plugin(require('../lib/mongoose-list'),{searchFields: ['name']})

schema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Test',schema)
```

**app.js**
```js
var Model = require('./model')

//with sorting
Model.list({start: 0, limit: 10, sort: 'name'},function(err,count,results){
  if(err) throw err
  console.log('found ' + count + 'records')
  results.forEach(function(row){
    console.log('name: ' + row.name)
  })
})

//with searching
Model.list({start: 0, limit: 10, sort: 'name', find: 'foo'},function(err,count,results){
  if(err) throw err
  console.log('found ' + count + 'records')
  results.forEach(function(row){
    console.log('name: ' + row.name)
  })
})
```

## Instantiation Options

### Search Fields
* Variable `searchFields`
* Default all non hidden schema paths

This option will limit what fields are considered searchable.
By default it will search any field that does not start with `_`

## Call Time Options

### Start
* Variable `start`
* Default `0`

Where to start showing records from. Also known as offset.

### Limit
* Variable `limit`
* Default `10`

Limit of records to return in result set.

### Sort
* Variable `sort`
* Default `''`

Uses a Mongoose style sort string eg: `+name -author'

### Find
* Variable `find`
* Default `''`

Filter results by value applying to the `searchFields`

Alternatively, the `find` variable can also be a custom mongoose query object like the following example:

    {
      find: {
        $or: [
          { field1: /something/ },
          { field2: new RegExp('else', 'i') }
        ]
      }
    }

This allows you to perform custom and complex queries and still make use of the remaining features of this module such as pagination.

## Changelog

### 0.1.2
* Added custom `find` object support

### 0.1.1
* Fixed bug with searching on non string fields

### 0.1.0
* Initial Release