describe('MongooseList',function(){
  var Model = require('./model').model
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
  })
  describe('[Multiple Records]',function(){
    before(function(){
      for(var i=0; i<100; i++){
        var doc = new Model({name: 'test doc'})
        doc.save()
      }
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
    it('should return only a few records when close to the end',function(done){
      Model.list({start: 95, limit: 10, sort: 'name'},function(err,count,results){
        if(err) throw err
        expect(count).to.equal(100)
        expect(results.length).to.equal(5)
        done()
      })
    })
  })
})