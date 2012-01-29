describe('query', function(){
  
  it('should be right length', function(){
    re.e('test1')
    eq(re('test1').length, 1)
  })

})