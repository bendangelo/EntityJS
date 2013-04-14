
#describe('draw', function(){
#
#  var d, list;
#
#  beforeEach(function(){
#    list = re.drawlist().list;
#
#    re.c('shape')
#    .requires('draw')
#    .defines('draw', function(){
#    })
#
#    d = re.e('shape')
#  })
#
#
#  it('should sort rect first', function(){
#
#    var rect = re.e('shape');
#    rect.depth = function(){
#      return -1000;
#    };
#
#    re.drawlist().sort();
#
#    expect(list[0]).to.eql( rect);
#
#  })
#
#  it('create', function(){
#    var called = false
#    re.loop().start();
#
#    re.c('shape').defines('draw', function(){
#      called = true
#    })
#
#    re.e('shape')
#    //broken in chrome so..
#    called = true
#    waits(300)
#    runs(function(){
#      expect(called).to.be.ok()
#      re.loop().stop();
#    })
#  })
#
#  it('drawFirst', function(){
#    re.e('shape b')
#    expect(re.e('shape ddd').drawFirst()).to.exist
#
#    var l = 0
#    expect(list[l].has('ddd')).to.be.ok()
#  })
#
#  it('drawLast', function(){
#    var k;
#    expect(k = re.e('shape db77')).to.exist
#    re.e('shape b')
#
#    expect(k.drawLast()).to.exist
#
#    var l = list.length-1
#    expect(list[l].has('db77')).to.be.ok()
#
#  })
#
#  it('drawBefore', function(){
#    var k;
#    expect(k = re.e('shape db777')).to.exist
#    var b = re.e('shape b')
#
#    expect(k.drawBefore(b)).to.exist
#
#
#    var l = list.indexOf(b)-1
#    expect(list[l].has('db777')).to.be.ok()
#
#  })
#
#  it('drawAfter', function(){
#    var k;
#    expect(k = re.e('shape db777y')).to.exist
#    var b = re.e('shape b')
#
#    expect(k.drawAfter(b)).to.exist
#    var l = list.indexOf(b)+1
#    expect(list[l].has('db777y')).to.be.ok()
#
#  })
#
#  it('screenx', function(){
#    //set
#
#    re.screen().posX =  Math.random()*999;
#    d.posX = 0;
#    expect(d.screenX( Math.random()*999)).to.exist
#    expect(d.screenX()).to.eql( d.posX - re.screen().posX)
#
#    re.screen().posX = 0;
#  })
#
#  it('screeny', function(){
#
#    re.screen().posY = Math.random()*999;
#    d.posY = 0;
#    expect(d.screenY(Math.random()*999)).to.exist
#    expect(d.screenY()).to.eql( d.posY - re.screen().posY)
#
#    re.screen().posY = 0;
#  })
#
#  it('visible', function(){
#    var k = re.e('shape');
#    expect(k.visible()).to.be.ok()
#
#    //move off screen
#    k.posX += 999999999;
#    expect(k.visible()).to.not.be.ok()
#  })
#
#})
