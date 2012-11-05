/*describe('update', function(){
  
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
    var l = 0;
    eq(re.update.l[l], k)
  })
  
  it('update last', function(){
    is(k.updateLast())
    var l = re.update.l.length-1;
    eq(re.update.l[l], k)
  })
  
  it('update after', function(){
    is(k.updateAfter(last))
    
    var him = re.update.l.indexOf(last)
    eq(re.update.l[him+1], k)
  })
  
  it('update before', function(){
    is(k.updateBefore(last))
    
    var him = re.update.l.indexOf(last)
    eq(re.update.l[him-1], k)
    
  })
  
  it('should update all', function(){
    
    var called = false;
    var called2 = false;
    var val = 0;
    
    k.on('update', function(v){
      called = true;
      val = v;
    })
    
    k.on('update', function(){
      called2 = true
    })
    
    re.update.update(10)
    
    ok(called2)
    ok(called)
    eq(val, 10)
    
    k.dispose();
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
})*/