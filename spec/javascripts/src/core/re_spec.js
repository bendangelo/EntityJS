describe('re', function(){
  
  re.e('queryre')
  
  it('should query', function(){
    eq(re('queryre').length, 1)
  })
  
  it('should get element by id', function(){
    setup_canvas()
    
    is(re.$('#game-canvas'))
    is(re.$('#game-canvas'))
    is(re.$('#game-canvas'))
    
    teardown_canvas()
  })
  
  it('should get element by tag', function(){
    setup_canvas()
    
    is(re.$('canvas'))
    is(re.$('canvas'))
    is(re.$('canvas'))
    
    teardown_canvas()
  })
  
  it('indexOf', function(){
    eq(re.indexOf([1,2,3,4,3], 3), 2)
    eq(re.indexOf([1,3,2,4,3], 3), 1)
  })
  
  it('lastIndexOf', function(){
    eq(re.lastIndexOf([1,3,2,4,3], 3), 4)
    eq(re.lastIndexOf([6,3,2,4,1], 3), 1)
    
  })
  
  it('should create element', function(){
    is(re.$new('canvas'), 'htmlcanvaselement')
  })
  
  it('should re.is work', function(){
    ok(re.is({}))
    ok(re.is(1))
    ok(re.is(1, 'Number'))
    
    not(re.is(null))
    not(re.is(undefined))
    
    not(re.is(null, 'array'))
    not(re.is(1, 'string'))
    not(re.is('', 'number'))
    not(re.is('', 'Number'))
    
    ok(re.is('', 'string'))
    ok(re.is(1, 'number'))
    ok(re.is([], 'array'))
    ok(re.is(/sd/, 'regexp'))
    ok(re.is(re.$new('canvas'), 'htmlcanvaselement'))
    var k = {};
    ok(re.is(k, 'object'))
    var f = function(){};
    ok(re.is(f, 'function'))
  })
  
  it('should define indexof', function(){
    is(Array.prototype.indexOf, 'function')
  })
  
})