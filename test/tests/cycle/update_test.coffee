
#describe('update', function(){
#
#  var k;
#  var first;
#  var last;
#
#  beforeEach(function(){
#    //fake
#    first = re.e('update')
#
#    k = re.e('update')
#
#    last = re.e('update')
#  })
#
#  it('update first', function(){
#
#    expect(k.updateFirst()).to.exist
#    var l = 0;
#    expect(re.update.l[l]).to.eql( k)
#  })
#
#  it('update last', function(){
#    expect(k.updateLast()).to.exist
#    var l = re.update.l.length-1;
#    expect(re.update.l[l]).to.eql( k)
#  })
#
#  it('update after', function(){
#    expect(k.updateAfter(last)).to.exist
#
#    var him = re.update.l.indexOf(last)
#    expect(re.update.l[him+1]).to.eql( k)
#  })
#
#  it('update before', function(){
#    expect(k.updateBefore(last)).to.exist
#
#    var him = re.update.l.indexOf(last)
#    expect(re.update.l[him-1]).to.eql( k)
#
#  })
#
#  it('should update all', function(){
#
#    var called = false;
#    var called2 = false;
#    var val = 0;
#
#    k.on('update', function(v){
#      called = true;
#      val = v;
#    })
#
#    k.on('update', function(){
#      called2 = true
#    })
#
#    re.update.update(10)
#
#    expect(called2).to.be.ok()
#    expect(called).to.be.ok()
#    expect(val).to.eql( 10)
#
#    k.dispose();
#  })
#
#  it('updatable', function(){
#
#    var n;
#
#    k.on('update',function(v){
#      n = v
#    });
#
#    k.trigger('update', 10)
#
#    expect(n).to.eql( 10)
#
#    k.updatable = false
#
#    k.trigger('update', 0)
#
#    expect(n).to.eql( 0)
#  })
#})
