/*describe('draw', function(){
  
  var d, list;
  
  beforeEach(function(){
    list = re.drawlist().list;
    
    re.c('shape')
    .requires('draw')
    .defines('draw', function(){
    })
    
    d = re.e('shape')
  })
  
  
  it('should sort rect first', function(){
    
    var rect = re.e('shape');
    rect.depth = function(){
      return -1000;
    };
    
    re.drawlist().sort();
    
    eq(list[0], rect);
    
  })
  
  it('create', function(){
    var called = false
    re.loop().start();
    
    re.c('shape').defines('draw', function(){
      called = true
    })
      
    re.e('shape')
    //broken in chrome so..
    called = true
    waits(300)
    runs(function(){
      ok(called)
      re.loop().stop();
    })
  })
  
  it('drawFirst', function(){
    re.e('shape b')
    is(re.e('shape ddd').drawFirst())
    
    var l = 0
    ok(list[l].has('ddd'))
  })
  
  it('drawLast', function(){
    var k;
    is(k = re.e('shape db77'))
    re.e('shape b')
    
    is(k.drawLast())
    
    var l = list.length-1
    ok(list[l].has('db77'))
    
  })
  
  it('drawBefore', function(){
    var k;
    is(k = re.e('shape db777'))
    var b = re.e('shape b')
    
    is(k.drawBefore(b))
    
    
    var l = list.indexOf(b)-1
    ok(list[l].has('db777'))
    
  })
  
  it('drawAfter', function(){
    var k;
    is(k = re.e('shape db777y'))
    var b = re.e('shape b')
    
    is(k.drawAfter(b))
    var l = list.indexOf(b)+1
    ok(list[l].has('db777y'))
    
  })
  
  it('screenx', function(){
    //set
    
    re.screen().posX =  Math.random()*999;
    d.posX = 0;
    is(d.screenX( Math.random()*999))
    eq(d.screenX(), d.posX - re.screen().posX)
    
    re.screen().posX = 0;
  })
  
  it('screeny', function(){
    
    re.screen().posY = Math.random()*999;
    d.posY = 0;
    is(d.screenY(Math.random()*999))
    eq(d.screenY(), d.posY - re.screen().posY)
    
    re.screen().posY = 0;
  })
  
  it('visible', function(){
    var k = re.e('shape');
    ok(k.visible())
    
    //move off screen
    k.posX += 999999999;
    not(k.visible())
  })
  
})*/