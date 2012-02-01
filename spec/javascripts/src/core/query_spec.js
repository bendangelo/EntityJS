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
    
    });
    
    it('tilemap', function(){
    
    });
    
    it('comps', function(){
    
    });
    
    it('random', function(){
    
    );
    
    it('pluck', function(){
        
    });
        
    it('attr', function(){
        
    });
    
        it('def', function(){
        
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