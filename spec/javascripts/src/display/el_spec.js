describe('displays/el', function(){
  
  var e;
  
  beforeEach(function(){
    e = re.e('el');
  })
  
  it('should define valid dom', function(){
    is(e.el, 'htmldivelement');
    eq(e.posX(), 0)
    eq(e.posY(), 0)
    eq(e.sizeX(), 0)
    eq(e.sizeY(), 0)
  })
  
});