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
  
  it('should return empty query', function(){
    eq(re().length, 0);
  })
  
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
  
    it('invoke', function(){
        eq(re.e('ok', 3).invoke('comp', 'b').comps(), ['ok', 'b'])
    });
  
    it('each', function(){
      var i = 0;
      is(re('dd', 3).each(function(e, c, l){
        eq(i++, c);
        eq(l, 3)
      }))
    });
    
    it('tilemap', function(){
    
      is(re.e('tile', 10).tilemap(5, function(e, x, y, i, l){
        ok(x < 5)
        ok(y < 2)
        is(l)
      }));
      
    });
    
    it('comps', function(){
      eq(re('tile').comps(), ['tile'])
    });
    
    it('random', function(){
      is(re('tile').random(), 'object')
    });
    
    it('pluck', function(){
      re('tile').attr({f:10, y:'d'});
      var k = re('tile').pluck('f y');
      eq(k.length, re('tile').length);
      eq(k[0].f, re('tile')[0].f);
      eq(k[0].y, re('tile')[0].y);
    });
        
    it('attr', function(){
        re('tile').attr('first', 'asdf');
        re('tile').each(function(e){
          eq(e.first, 'asdf')
        })
        
        re('tile').attr({yap:'1232'});
        re('tile').each(function(e){
          eq(e.yap, '1232')
        })
    });
    
    it('def', function(){
      re('tile').def('first', 'asdf');
      re('tile').each(function(e){
        eq(e.first, 'asdf')
      })
      
      re('tile').def({yap:'1232', first:'d'});
      re('tile').each(function(e){
        eq(e.yap, '1232')
        eq(e.first, 'asdf')
      })
    
    });

    it('comp', function(){
      is(re.e('re',3).comp('yy'));
      
      ok(re('re').has('yy'));
    });
    
    it('removeComp', function(){
        is(re.e('kw gg33', 2).removeComp('gg33'))
        
        eq(re('gg33').length, 0)
    });
    
    it('on', function(){
        is(re.e('ssss', 1).on('mousedown', function(){}));
        
        eq(re('ssss ^mousedown').length, 1)
    });
    
    it('off', function(){
        is(re.e('k54',1).on('mouse', function(){}).off());
        ok(re('k54 ^mouse').length == 0)
    });
    
    it('trigger', function(){
        re.e('g55');
        var called = null;
        re('g55').on('bind', function(v){called=v});
        re('g55').trigger('bind', 'bob');
        
        eq('bob', called);
    });
    
    it('has', function(){
        var k = re.e('bob ref',2).on('key', function(){});
        
        ok(k.has('bob'));
        ok(k.has('ref'));
        ok(k.has('^key'));
        ok(k.has('!sddd'));
        ok(k.has('bob ref ^key !sddd'));
        
        //empty query should always return false
        not(re().has('ok'))
        
        not(re.e('sdf',2).has('^wef'));
    });
    
    it('include', function(){
      
      var en = re.e();
      
      var query = re();
      
      not(query.include(en));
      
      query.push(en);
      
      ok(query.include(en));
      
    })
    
    it('min', function(){
      var query = re();
      
      query.push(0)
      query.push(10)
      query.push(2)
      query.push(5)
      
      eq(query.min(function(e, i, l){
        eq(this, 'ok')
        is(i)
        is(l)
        
        return e;
        
        }, 'ok'), 0)
    })
    
    it('max', function(){
      
      var query = re();
      
      query.push(0)
      query.push(10)
      query.push(2)
      query.push(5)
      
      eq(query.max(function(e, i, l){
        eq(this, 'ok')
        is(i)
        is(l)
        
        return e;
        
        }, 'ok'), 10)
    })
    
    it('find', function(){
      var e = re();
      e.push(1);
      e.push(10);
      
      //find index with 10
      eq(e.find(function(t){
        eq(e, this)
        return t == 10;
        }), 10);
    })
    
    it('isEmpty', function(){
      ok(re().isEmpty())
    })
    
    it('every', function(){
      
      //check if all entities in query have value blah
      var e = re();
      e.push(re.e());
      e.push(re.e().attr('blah', true));
      
      not(e.every(function(e){
        return e.blah;
        }));
      
      e.attr('blah', true)
        
      //should now all have blah
      ok(e.every(function(e){
        return e.blah;
        }));
        
      //length zero..
      ok(re().every(function(){
        return false;
      }))
    })
    
    it('dispose', function(){
        is(re.e('rgfdvdvdfv', 2).dispose());
        eq(re('rgfdvdvdfv').length, 0);
    });
    
})