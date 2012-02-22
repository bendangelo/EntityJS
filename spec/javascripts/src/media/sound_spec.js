describe('sound', function(){
	
	var e;

	beforeEach(function(){
		e = re.e('sound alligator.sfx');
	});

	it('play', function(){
    var called = false;
    
    k = e.on('sound:end', function(){
      called = true;
    })
    
    is(e.play())
    
    waits(1500)
    runs(function(){
      ok(called)
    })
	});
  
  it('resume', function(){
    is(e.resume())
  })
  
  it('pause', function(){
    is(e.pause())
  })
  
  it('currenttime', function(){
    //is(e.currentTime())
  })
  
  it('ended', function(){
    //is(e.ended())
  })
  
});
