describe('re', function(){
  
  re.e('queryre')
  
  it('should create array', function(){
    eq(re([1]).length, 1)
  })
  
  it('should get element by id', function(){
    setup_canvas()
    
    is(re.$('#game-canvas'))
    is(re.$('#game-canvas'))
    is(re.$('#game-canvas'))
    
    teardown_canvas()
  })

  it('should find array by tag', function(){
    var array = re().tag('10');
    eq(array.tag(), re('#10').tag());
  })
  
  it('should get element by tag', function(){
    setup_canvas()
    
    is(re.$('canvas'))
    is(re.$('canvas'))
    is(re.$('canvas'))
    
    teardown_canvas()
  })
  
  it('should create canvas', function(){
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
    
    //doesn't work in ie8
    //ok(re.is(re.$new('canvas'), 'htmlcanvaselement'))
    
    var k = {};
    ok(re.is(k, 'object'))
    var f = function(){};
    ok(re.is(f, 'function'))
  })
  
})