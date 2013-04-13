describe('rect', function(){
	
  var e;
  
  beforeEach(function(){
    e = re.e('rect')
  });
  
	it('draw', function(){
		is(e.draw(re.loop().context));
	});

});
