describe('cycle/drawlist', function(){
  
  var drawlist;
  
  beforeEach(function(){
    
    drawlist = re.drawlist('test');
    
  });
  
  it('add', function(){
    var blah = re.e('circle');
    drawlist.add(blah);
    
    ok(drawlist.list.include(blah))
  })
  
  it('remove', function(){
    
    var blah = re.e('circle');
    drawlist.add(blah);
    drawlist.remove(blah);
    not(drawlist.list.include(blah))
  })
  
  it('drawlist', function(){
    //drawlist.drawlist();
    //smoke test
  })
  
  it('sort', function(){
    drawlist.sort();
    //an other smoke test
  })
  
});