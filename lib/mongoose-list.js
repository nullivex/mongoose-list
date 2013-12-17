module.exports = exports = function list(schema,options){
  options = options || {}
  schema.static('list',function(search,fn){
    //allow no params
    if('function' === typeof search){
      fn = search
      search = {}
    }
    var Model = this
    search.start = search.start || 0
    search.limit = search.limit || 10
    search.sort = search.sort || options.sort || ''
    if(search.find){
      var searchText = new RegExp(search.find,'i')
      search.find = {$or: []}
      if(options.searchFields){
        options.searchFields.forEach(function(field){
          var obj = {}
          obj[field] = searchText
          search.find.$or.push(obj)
        })
      } else {
        Model.schema.eachPath(function(path){
          if(0 !== path.indexOf('_')){
            var obj = {}
            obj[path] = searchText
            search.find.$or.push(obj)
          }
        })
      }
    } else search.find = {}
    Model
      .find(search.find)
      .sort(search.sort)
      .skip(search.start)
      .limit(search.limit)
      .exec(function(err,res){
        if(err) fn(err)
        else {
          Model.count(search.find,function(err,resCount){
            if(err) fn(err)
            else {
              fn(null,resCount,res)
            }
          })
        }
      })
  })
}