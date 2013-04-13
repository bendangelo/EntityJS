describe('align', function(){
    
    var e;
    
    beforeEach(function(){
        e = re.e('align circle');
    });
    
    it('align hor', function(){
        is(e.alignHor(10));
        eq(e.posX, re.loop().sizeX * 0.5 - e.sizeX * 0.5 + 10 |0)
    });
    
    it('align ver', function(){
        is(e.alignVer(1));
        eq(e.posY, re.loop().sizeY * 0.5 - e.sizeY * 0.5 + 1 |0)
    
    });
    
    it('align right', function(){
        is(e.alignRight(5));
        eq(e.posX, re.loop().sizeX - e.sizeX + 5)
    
    });
    
    it('align left', function(){
        is(e.alignLeft(5));
        eq(e.posX, 5)
    
    });
    
    it('align top', function(){
        is(e.alignTop(5));
        eq(e.posY, 5)
    
    });
    
    it('align bottom', function(){
        is(e.alignBottom(5));
        eq(e.posY, re.loop().sizeY - e.sizeY  + 5)
    
    });
});