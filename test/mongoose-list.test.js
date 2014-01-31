describe('MongooseList',function(){
  var Model = require('./model').model
    , async = require('async')
  describe('[Single Record]',function(){
    var doc
    before(function(done){
      doc = new Model({name: 'test doc'})
      doc.save(done)
    })
    after(function(done){
      doc.remove(done)
    })
    it('should return records without a search object',function(done){
      Model.list(function(err,count,results){
        if(err) throw err
        expect(count).to.equal(1)
        expect(results.length).to.equal(1)
        expect(results[0].name).to.equal('test doc')
        done()
      })
    })
    it('should return records with a search object',function(done){
      Model.list({start: 0, limit: 10, sort: 'name'},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(1)
        expect(results.length).to.equal(1)
        expect(results[0].name).to.equal('test doc')
        done()
      })
    })
    it('should return no records if out of range',function(done){
      Model.list({start: 10, limit: 10, sort: 'name'},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(1)
        expect(results.length).to.equal(0)
        done()
      })
    })
    it('should return records when searching',function(done){
      Model.list({find: 'test'},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(1)
        expect(results.length).to.equal(1)
        expect(results[0].name).to.equal('test doc')
        done()
      })
    })
    it('should return records when searching using a custom query',function(done){
      Model.list(
        {
          find: {
            $or: [{name: new RegExp('notexisting', 'i')}, {name: new RegExp('test', 'i')}]
          }
        },
        function(err,count,results){
          if(err) throw err
          expect(count).to.equal(1)
          expect(results.length).to.equal(1)
          expect(results[0].name).to.equal('test doc')
          done()
        }
      )
    })
  })
  describe('[Multiple Records]',function(){
    before(function(done){
      var items = []
      for(var i=0; i<100; i++){
        items.push({name: 'test doc'})
      }
      async.each(
        items,
        function(item,next){
          var doc = new Model(item)
          doc.save(next)
        },
        done
      )
    })
    after(function(done){
      Model.remove({name: 'test doc'},done)
    })
    it('should return records without a search object',function(done){
      Model.list(function(err,count,results){
        if(err) throw err
        expect(count).to.be.greaterThan(0)
        expect(results.length).to.be.greaterThan(0)
        expect(results[0].name).to.equal('test doc')
        done()
      })
    })
    it('should return records with a search object',function(done){
      Model.list({start: 0, limit: 10, sort: 'name'},function(err,count,results){
        if(err) throw err
        expect(count).to.be.greaterThan(0)
        expect(results.length).to.be.greaterThan(0)
        expect(results[0].name).to.equal('test doc')
        done()
      })
    })
    it('should return records within a range',function(done){
      Model.list({start: 10, limit: 10, sort: 'name'},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(100)
        expect(results.length).to.equal(10)
        done()
      })
    })
    it('should return records when searching',function(done){
      Model.list({find: 'test'},function(err,count,results){
        if(err) throw err
        expect(count).to.be.greaterThan(0)
        expect(results.length).to.be.greaterThan(0)
        expect(results[0].name).to.equal('test doc')
        done()
      })
    })
    it('should return records when searching using a custom query',function(done){
      Model.list(
        {
          find: {
            $or: [{name: new RegExp('notexisting', 'i')}, {name: new RegExp('test', 'i')}]
          }
        },
        function(err,count,results){
          if(err) throw err
          expect(count).to.be.greaterThan(0)
          expect(results.length).to.be.greaterThan(0)
          expect(results[0].name).to.equal('test doc')
          done()
        }
      )
    })
    it('should return only a few records when close to the end',function(done){
      Model.list({start: 95, limit: 10, sort: 'name'},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(100)
        expect(results.length).to.equal(5)
        done()
      })
    })
    it('should not fail with a negative start value',function(done){
      Model.list({start: -100, limit: 10},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(100)
        expect(results.length).to.equal(10)
        done()
      })
    })
    it('should not fail with a negative limit value',function(done){
      Model.list({start: 50, limit: -10},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(100)
        expect(results.length).to.equal(10)
        done()
      })
    })
    it('should not fail with a negative limit and start value',function(done){
      Model.list({start: -50, limit: -10},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(100)
        expect(results.length).to.equal(10)
        done()
      })
    })
  })
})