describe('support', function(){

	it('find first support sound', function(){
		
    is(re.support('aac', 'ogg', 'mp3', 'wav'), 'string')
    
	});

  it('should support canvas', function(){
    is(re.support('canvas'), 'boolean')
  })
  
  it('should support both', function(){
    is(re.support('text canvas'), 'boolean')
  })
  
});
