describe('ticker', function(){
  
  it('tick', function(){
    
    var t = re.e('tick');
    
    waits(100)
    runs(function(){
      match(t.tick().toString(), /10[0-9]/)
    })
    
    
    waits(80)
    runs(function(){
      match(t.tick().toString(), /[7-8][0-9]/)
    })
    
  })
  
})