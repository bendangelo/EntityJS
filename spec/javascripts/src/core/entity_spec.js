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
    //length issues in ie, leave out for now
    //eq(re.e('dfggggg', 1).length, 1)
    
    //eq(re('dfggggg').length, 1)
  })
  
  it('comp', function(){
    e.comp('qwdqwd wer')
    
    ok(e.has('qwdqwd wer'))
    
    e.comp(['yep45', 'ok12'])
    ok(e.has('yep45 ok12'))
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
          c.init(function(comp, val1, val2){
              called = true
              v1 = val1
              v2 = val2
          })
          var called2 = false
              c.on('init', function(y){
              called2 = true
              ok(y == e)
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
      
      e.removeComp(c.name)
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
  
  it('parent', function(){
      c.defines('d', function(v){return v; })
      .defaults('y', function(v){return v;})
      
      eq(e.parent(c.name, 'd', 100), 100)
      eq(e.parent(c.name, 'y', 'bob'), 'bob')
      e.comp(c.name)
      ok(e.parent('', 'has', c.name))
  })
  
  it('should throw error on undefined parent method', function(){
    var called = false;
    try {
      e.parent('image', 'asdfsdf')
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
      eq(e._re_signals, {});
  })
  
  it('should add multiple bindings', function(){
    
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
      c.dispose(function(comp){
          called = true
          co = comp
      })
          c.on('dispose', function(e){
          called2 = true
          en = e
          })
      e.comp(c.name)
      var called3 = false
          e.on('dispose', function(){
              called3 = true
          });
      
      e.dispose()
      
      ok(called)
      eq(co, c)
      ok(called2)
      eq(en, e)
      ok(called3)
  })
  
})