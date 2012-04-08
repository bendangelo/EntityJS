describe('math/range', function(){
  
  it('should return range',function(){
    var i = re.range(0, 2, 1);
    
    eq(i, re([0, 1]))
  })

})