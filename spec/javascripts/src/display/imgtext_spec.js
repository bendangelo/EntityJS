describe('imgtext', function(){
  
  var e;
  
  beforeEach(function(){
    re.c('serif')
    .requires(['imgtext', f('image').name])
    .defines('imgtext', [1,2,3,4,3,4,5,6,7,8,9,4,5,3,4,5,6,7,2,3,4,5])
    
    e = re.e('serif')
    .set('text', 'blah')
  })
  
  it('visible', function(){
    ok(e.visible())
    
    e._text = null;
    
    not(e.visible())
  })
  
  it('draw', function(){
    is(e.draw(re.loop().context))
  })
  
  it('text', function(){
    eq(e.text(), 'blah')
    eq(e.text('new'), e)
    eq(e.text(), 'new')
  })
  
})