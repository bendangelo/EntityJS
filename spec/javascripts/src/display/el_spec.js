describe('displays/el', function(){
  
  var e;
  
  beforeEach(function(){
    e = re.e('el:div');
  })
  
  it('should define valid dom', function(){
    debugger
    is(e.el, 'htmldivelement')
  })
  
});