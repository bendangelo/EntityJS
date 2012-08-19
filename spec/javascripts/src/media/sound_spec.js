describe('sound', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('sound alligator.sfx');
	});

	it('play', function(){
    var called = false;
    
    k = e.on('sound:finish', function(){
      called = true;
    })
    
    is(e.play())
    
    waits(1500)
    runs(function(){
      ok(called)
    })
	});
  
  it('currenttime', function(){
    //is(e.currentTime())
  })
  
  it('ended', function(){
    //is(e.ended())
  })
  
});
