describe('defaults', function(){
	
	it('should default to zero', function(){
		
    var k = re.defaults(0, 10, 30);
    
    expect(k).toEqual(0);
	});

	it('should default to last', function(){
		var k = re.defaults(null, undefined, 100);

		expect(k).toEqual(100);
	});

});
