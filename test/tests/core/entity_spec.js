describe('entity', function(){

  var e;
  var c;

  re.g('blah').create();

  beforeEach(function(){
    e = re.e()
    c = re.c(f('name'))
  });

  it('should add / remove from group', function(){

    var e = re.e('blah');

    ok(re._g['blah'].contains(e));

    e.dispose();

    ok(!re._g['blah'].contains(e));

  });

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

  it("should define accessors", function(){

    re.c('totally')
    .accessors("posX posY");

    e.comp("totally");

    var val = 4;

    e.posX = val;

    eq(e.posX, val);

    eq(e._posX, val);

    e.posY = val;

    eq(e.posY, val);
    eq(e._posY, val);

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

          c.init(function(){
              called = true
          })

              e.comp(c.name)

          ok(called)
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

  it('removeComp', function(){
  var called = false
      c.dispose(function(){
          called = true
      })
      var called2 = false
      var en = null

      e.comp(c.name)

      e.removeComp(['blah', c.name])
      not(e.has(c.name))
      ok(called)
  })

  it('comps', function(){
    e.comp('ok bob')

    eq(e.comps(), ['ok', 'bob'])
  })

  it('clone', function(){
    e.comp('yep bob')
    eq(e.clone().comps(), e.comps())
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

    e.set({
      blah:function(){}
    });

    e.set({
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

    re.c('draw').dispose(function(){
      called2 = true;
    })

    e.dispose();
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
        e.comp('tst')
        ok(e.has('tst'))
  })

  it('bindings', function(){
      var called = false, va, va2
      e.on('values', function(v, v2){
          called = true
          va = v
          va2 = v2
          return false
      });

      eq(e.trigger('values', 10, 55),e)
      ok(called)
      eq(va, 10)
      eq(va2, 55)

          var func = function(){};
          e.on({
          yep:function(){},
              ok:func
          })
          e.off('yep')

            e.off({ok:func})


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
      e.set({x:10, y:'sdd', func:function(){}})

      eq(e.x, 10)
      eq(e.y, 'sdd')
      is(e.func, 'function')

      e.set('ok', 87)
      eq(e.ok, 87)

     //run setter methods
     e.posX = function(value1){
       this.val = value1;
     };

      e.set('posX', 154)
      eq(e.val, 154)

      //multiple
          e.size = function(width, height){
              this.width = width
              this.height = height
          };
      e.set({
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

  //listen for dispose call on component
      c.dispose(function(comp){
          called = true
          co = comp
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
      ok(called3)
  })

})