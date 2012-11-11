describe('circle', function(){
  
  var e;
  
  beforeEach(function(){
    e = re.e('circle');
  })
  
  it('should create circle', function(){
    is(e)
  })
  
  it('should draw', function(){
    is(e.draw(re.loop().context));
  })
  
  it('should radius', function(){
    is(e.radius(10), 'object');
    eq(e.radius(), 10)
    
    //chain call
    is(e.set('radius', 14))
    eq(e.radius(), 14)
  })
  
})