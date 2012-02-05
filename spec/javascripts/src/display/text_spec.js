describe('text', function(){
  
  var f;
  
  beforeEach(function(){
    f = re.e('text');
  })
  
  afterEach(function(){
    f.dispose()
  })
  
  it('text', function(){
    ok(f.text('pl'))
    
    eq(f.text(), 'pl')
  })
  
  it('visible', function(){
    is(f.text('ok'))
    ok(f.visible())
    is(f.text(''))
    not(f.visible())
  })
  
  it('should draw', function(){
    is(f.draw(re.sys.context))
  })
  
})