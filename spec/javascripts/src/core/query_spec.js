describe('query', function(){
  
    it('should query', function(){
        re.e('tesee');
        re.e('tesee bob99');
        
        eq(re('bob99 tesee').length, 1);
        eq(re('tesee').length, 2);
        
        re.e('tesee ttt')
        eq(re('tesee').length, 3);
        eq(re('tesee !ttt').length, 2);
        
        re.e('tesee').on('sig', function(){});
        eq(re('tesee ^sig').length, 1);
        
        re.e('tesee').attr('id', 'id');
        ok(re('tesee').length != 0);
        eq(re('#id').length, 1);
    });
  
  it('should be right length', function(){
    var g = f('name')
    re.e(g)
    eq(re(g).length, 1)
  });
    
  it('should select *', function(){
      var c = re._e.length;
      eq(re('*').length, c);
  });
  
    it('should filter', function(){
        re.e().attr({k:99});
        
        eq(re(function(){
            return this.k == 99
        }).length, 1)
    });
  
    it('method', function(){
        eq(re.e('ok', 3).method('comp', 'b').comps(), ['ok', 'b'])
    });
  
    it('each', function(){
      var i = 0;
      is(re('dd', 3).each(function(c, l){
        eq(i++, c);
        eq(l, 3)
      }))
    });
    
    it('tilemap', function(){
      is(re.e('tile', 10).tilemap(5, function(x, y, i, l){
        ok(x < 5)
        ok(y < 2)
        eq(l, 10)
      }));
      
    });
    
    it('comps', function(){
      eq(re('tile').comps(), ['tile'])
    });
    
    it('random', function(){
      is(re('tile').random(), 'object')
    ));
    
    it('pluck', function(){
      re('tile').attr({f:10, y:'d'});
      var k = re('tile').pluck('f y');
      eq(k.length, re('tile').length);
      eq(k[0].f, re('tile')[0].f);
      eq(k[0].y, re('tile')[0].y);
    });
        
    it('attr', function(){
        re('tile').attr('first', 'asdf');
        re('tile').each(function(){
          eq(this.first, 'asdf')
        })
        
        re('tile').attr({yap:'1232'});
        re('tile').each(function(){
          eq(this.yap, '1232')
        })
    });
    
    it('def', function(){
      re('tile').def('first', 'asdf');
      re('tile').each(function(){
        eq(this.first, 'asdf')
      })
      
      re('tile').def({yap:'1232', first:'d'});
      re('tile').each(function(){
        eq(this.yap, '1232')
        eq(this.first, 'asdf')
      })
    
    });

    it('comp', function(){
      
    });
    
    it('removeComp', function(){
    
    });
    
    it('on', function(){
    
    });
    
    it('off', function(){
    
    });
    
    it('trigger', function(){
    
    });
    
    it('has', function(){
    
    });
    
    it('dispose', function(){
    
    });
  
})