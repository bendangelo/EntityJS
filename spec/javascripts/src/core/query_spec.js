describe('query', function(){
  
  it('should be right length', function(){
    var g = f('name')
    re.e(g)
    eq(re(g).length, 1)
  })

})