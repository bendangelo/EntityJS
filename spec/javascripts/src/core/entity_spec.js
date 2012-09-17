describe('entity', function(){
  
  var e;
  var c;
  
  beforeEach(function(){
    e = re.e()
    c = re.c(f('name'))
  });
  
  it('multiple', function(){
      eq(re.e('bob', 10).length, 10);
      eq(re.e('ki', 2).comps(), ['ki']);
      
  });
  
  it('should create 1 in query', function(){
    eq(re.e('dfggggg', 1).length, 1)
    
    eq(re('dfggggg').length, 1)
  })
  
  it('should get', function(){
    e.blah = 10;
    e.bla = function(){
      return this.blah;
    };

    eq(e.get('blah'), 10);
    eq(e.get('bla'), 10);
  });

  it('should trigger once', function(){
    var count = 0;
    e.once('blah', function(){
      count++;
    });

    e.trigger('blah');
    e.trigger('blah');
    e.trigger('blah');

    eq(count, 1);
  });

  it('comp', function(){
    e.comp('qwdqwd wer')
    
    ok(e.has('qwdqwd wer'))
    
    e.comp(['yep45', 'ok12'])
    ok(e.has('yep45 ok12'))
  })
  
  it('should add events from comp', function(){
    var func = function(){
      
    }
    c.events('mousedown', func);
    
    e.comp(c.name);
    
    ok(e.has('^mousedown'));
    is(e.mousedown);
  })
  
  it('should define properly', function(){
    re.c('blah1')
    .defines({
      f:function(){
        return false;
      }
    });
    
    re.c('sdfdff')
    .requires('blah1')
    .defines({
      f:function(){
        return true;
      }
    });
    
    ok(re.e('sdfdff').f())
  })
  
  it('should call init', function(){
      var called = false
      var v1, v2;
          c.init(function(val1, val2){
              called = true
              v1 = val1
              v2 = val2
          })
          var called2 = false
              c.on('init', function(){
              called2 = true
              })
              e.comp(c.name+':10:99')
          
          //future?
          //e.comp(c.name, 10, 99)
          
          ok(called)
          eq(v1, '10')
          eq(v2, '99')
          ok(called2)
   })
  
  it('requires', function(){
      c.requires('bob')
      c.requires(['bob2'])
      
      e.comp(c.name)
      
      ok(e.has('bob bob2'))
   })
  
  it('comp defaults', function(){
      c.defaults({ok:10, b:99})
      c.defaults('yep', 'y')
      
      e.ok = 'same'
      e.comp(c.name)
      
      eq(e.ok, 'same')
      eq(e.b, 99)
      eq(e.yep, 'y')
  })
      
  it('comp defines', function(){
      c.defines({ok:10, b:99})
      c.defines('yep', 'y')
      
      e.comp(c.name)
      
      eq(e.ok, 10)
      eq(e.b, 99)
      eq(e.yep, 'y')
  })
  
  it('comp interface', function(){
    re.c('temp')
    .interfaces('yep');
    
      try {
    re.e('temp');
      }catch(e){
      eq(e, 'Interface: yep missing')
      }
  })
  
  it('comp asserts', function(){
     c
    .asserts('yep');
    
      try {
    re.e(c.name+' yep');
      }catch(e){
      eq(e, 'Assert: yep is not allowed')
      }
  })
  
  it('removeComp', function(){
  var called = false
      c.dispose(function(){
          called = true
      })
      var called2 = false
      var en = null
          c.on('dispose', function(y){
              called2 = true
              en = y
          })
      
      e.comp(c.name)
      
      e.removeComp(['blah', c.name])
      not(e.has(c.name))
      ok(called)
      ok(called2)
      ok(en == e)
  })
  
  it('comps', function(){
    e.comp('ok bob')
    
    eq(e.comps(), ['ok', 'bob'])
  })
  
  it('clone', function(){
    e.comp('yep bob')
    eq(e.clone().comps(), e.comps())
    eq(e.clone(2).comps(), e.comps())
  })
  
  it('should clone empty entity', function(){
    is(re.e().clone())
  })
  
  it('super', function(){
      c.defines('d', function(v){return v; })
      .defaults('y', function(v){return v;})
      
      eq(e._super(c.name, 'd', 100), 100)
      eq(e._super(c.name, 'y', 'bob'), 'bob')
      e.comp(c.name)
      ok(e._super('','has', c.name))
  })
  
  it('attr overwrite method', function(){
    
    var called = false;
    
    e.attr({
      blah:function(){}
    });
    
    e.attr({
      blah:function(){
        called = true;
      }
    });
    
    e.blah();
    
    ok(called);
  });
  
  it('should dispose of all components properly', function(){
    var called = false, called2 = false;
    
    e.comp('image iso');
    
    re.c('draw').on('dispose', function(e){
      called = true;
    })
    
    re.c('draw').dispose(function(){
      called2 = true;
    })
    
    e.dispose();
    ok(called);
    ok(called2)
    
  })
  
  it('should throw error on undefined parent method', function(){
    var called = false;
    try {
      e._super('image', 'asdfsdf')
    } catch(e){
      called = true;
    }
    ok(called)
  })
  
  it('has', function(){
    ok(e.has('!bob'))
    ok(!e.has('^sig'))
    not(e.has('#asdsd'))
    not(e.has('sdcsdc'))
    
        e.on('values', function(){})
        ok(e.has('^values'))
        
        e.comp('tst')
        ok(e.has('tst'))
        ok(e.has('tst ^values'))
        e.id = 'we'
        ok(e.has('#we'))
        not(e.has('!tst'))
        
        ok(e.has('^values tst #we'))
  })
  
  it('bindings', function(){
      var called = false, va, va2
      e.on('values', function(v, v2){
          called = true
          va = v
          va2 = v2
          return false
      });
      
      ok(e.has('^values'))
      eq(e.trigger('values', 10, 55),e)
      ok(called)
      eq(va, 10)
      eq(va2, 55)
      not(e.has('^values'))
      
          var func = function(){};
          e.on({
          yep:function(){},
              ok:func
          })
          ok(e.has('^yep'))
          e.off('yep')
          not(e.has('^yep'))
           
          ok(e.has('^ok'))
            e.off({ok:func})
              
            not(e.has('^ok'))
              
              //remove all
       e.on('key', function(){});
       is(e.off());
      eq(e._re_listens, {});
  })
  
  it('should change context of event', function(){
    
    var obj = {};
    
    e.on({
      blah:function(){
        eq(obj, this);
      }
    }, obj);
    
    e.on('blah2', function(){
      eq(obj, this);
    }, obj);
    
    e.trigger('blah2').trigger('blah');
    
  });
  
  it('should add multiple events', function(){
    
    var called = false;
    var called2 = false;
    
    e.on({
      call:function(){called = true},
      call2:function(){called2 = true}
    });
    
    e.trigger('call');
    e.trigger('call2');
    
    ok(called)
    ok(called2)
    
  })
  
  it('attr', function(){
    //add attributes
      e.attr({x:10, y:'sdd', func:function(){}})
      
      eq(e.x, 10)
      eq(e.y, 'sdd')
      is(e.func, 'function')
      
      e.attr('ok', 87)
      eq(e.ok, 87)
      
     //run setter methods
     e.posX = function(value1){
       this.val = value1;   
     };
     
      e.attr('posX', 154)
      eq(e.val, 154)
      
      //multiple
          e.size = function(width, height){
              this.width = width
              this.height = height
          };
      e.attr({
          size:[45, 40]
      });
      
      eq(e.width, 45)
      eq(e.height, 40)
  })
  
  it('def', function(){
      e.first = 99
    e.def('first', 10)
    eq(e.first, 99)
    
        e.def({ok:10, yep:99});
     eq(e.ok, 10)
     eq(e.yep, 99)
  })
  
  it('dispose', function(){
  var called = false
  var co;
  var en;
  var called2 = false;
  
  //listen for dispose call on component
      c.dispose(function(comp){
          called = true
          co = comp
      })
      
      //component dispose trigger
          c.on('dispose', function(e){
          called2 = true
          en = e
          })
      
          //add comp to testing entity
      e.comp(c.name)
      
      var called3 = false
      //listen for dispose trigger on entity
          e.on('dispose', function(){
              called3 = true
          });
      
          //call it
      e.dispose()
      
      //asserts
      ok(called)
      eq(co, c)
      ok(called2)
      eq(en, e)
      ok(called3)
  })
  
})