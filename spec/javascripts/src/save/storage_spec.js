describe('storage', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('storage:session');
    
    //make sure this works..
    re.e('storage:local').dispose();
	});
  
  it('should define then clear', function(){
    
    is(e.item('bob', 10))
    
    eq(e.item('bob'), 10)
    
    is(e.clear())
  })
  
	it('length', function(){
		
    is(e.item('b', 10))
    
    eq(e.length(), 1)
    
    eq(e.key(0), 'b')
    
	});
  
  it('should remove item', function(){
    is(e.item('d', 10))
    
    ok(e.removeItem('d'))
  })
  
});
