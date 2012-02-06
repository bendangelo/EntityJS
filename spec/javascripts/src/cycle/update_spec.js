describe('update', function(){
  
  var k;
  var first;
  var last;
  
  beforeEach(function(){
    //fake
    first = re.e('update')
    
    k = re.e('update')
    
    last = re.e('update')
  })
  
  it('update first', function(){
    
    is(k.updateFirst())
    var l = re._c.update.l.length-1;
    eq(re._c.update.l[l], k)
  })
  
  it('update last', function(){
    is(k.updateLast())
    var l = 0;
    eq(re._c.update.l[l], k)
  })
  
  it('update after', function(){
    is(k.updateAfter(last))
    
    var l = 0 + 1;
    eq(re._c.update.l[l], k)
  })
  
  it('update before', function(){
    is(k.updateBefore(last))
    
    var l = 0;
    eq(re._c.update.l[l], k)
    
  })
  
  it('updatable', function(){
    
    var n;
    
    k.on('update',function(v){
      n = v
    });
    
    k.trigger('update', 10)
    
    eq(n, 10)
    
    k.updatable = false
    
    k.trigger('update', 0)
    
    eq(n, 0)
  })
})