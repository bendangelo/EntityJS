describe('math/iso', function(){
  
  var e;
  
  beforeEach(function(){
    re.iso.sizeX = 30;
    re.iso.sizeY = 30;
    re.iso.sizeZ = 30;
    
    e = re.e('iso');
    
  });
  
  it('toPos', function(){
    var e = re.iso.toPos(125, 82)
    
    eq(e.posX, 90)
    e = re.iso.toPos(125, 82)
    eq(e.posY, 75)
  })
  
  it('toPosX', function(){
    
    eq(re.iso.toIsoX(125, 82), 4)
    eq(re.iso.toIsoY(125, 82), 1)
    eq(re.iso.toPosX(125, 82), 90);
    
  })
  
  it('toPosY', function(){
    eq(re.iso.toIsoX(65, 96), 3)
    eq(re.iso.toIsoY(65, 96), 2)
    
    eq(re.iso.toPosY(65, 96), 75);
    
  })
  
  it('toIso', function(){
    var e = re.iso.toIso(-9, 90)
    
    eq(e.isoX, 2)
    
    e = re.iso.toIso(-5, 30)
    
    eq(e.isoY, 1)
  })
  
  it('toIsoX', function(){
    
    eq(re.iso.toIsoX(-9, 90), 2);
  })
  
  it('toIsoY', function(){
    
    eq(re.iso.toIsoY(-5, 30), 1);
  })
  
  it('should add correctly', function(){
    
    var oldX = e.isoX();
    e.isoY(4);
    
    for(var i=0; i<8; i++){
      e.isoY(e.isoY() + 0.25)
    }
    
    eq(e.isoY(), 6);
    eq(e.isoX(), oldX);
    
  });
  
  it('iso normal args', function(){
    
    eq(e.iso(2, 2, 2), e);
    
    eq(e.isoX(), 2)
    eq(e.isoY(), 2)
    eq(e.isoZ(), 2)
    
  })
  
  it('iso obj args', function(){
    
    eq(e.iso({x:2, y:2, z:2}), e);
    
    eq(e.isoX(), 2)
    eq(e.isoY(), 2)
    eq(e.isoZ(), 2)
    
  })
  
  it('iso copy other iso position', function(){
    
    var iso = re.e('iso');
    iso.iso(2, 2, 2);
    
    eq(e.iso(iso), e);
    
    eq(e.isoX(), 2)
    eq(e.isoY(), 2)
    eq(e.isoZ(), 2)
    
  })
  
  it('isoX', function(){
    eq(e.isoX(4), e);
    
    eq(e.isoX(), 4);
    
    eq(e.posX, 120)
    eq(e.posY, 60)
    
  })
  
  it('isoY', function(){
    eq(e.isoY(1), e);
    
    eq(e.isoY(), 1);
    
    eq(e.posX, -30)
    eq(e.posY, 15)
  })
  
  it('isoZ', function(){
    
    eq(e.isoZ(1), e);
    
    eq(e.isoZ(), 1);
  })
  
});