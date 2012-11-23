describe('comp', function(){

  var k;
  var i=0;

  beforeEach(function(){
    i++
    k = re.c('stat'+i)
  })

  it('should create statics', function(){

    k
    .statics({
      type:10
    })
    .statics('yep', 'yep');

    eq(re[k.name].type, 10)
    eq(re[k.name].yep, 'yep')
  });

  it('should add accessor', function(){

    k.accessors("a b");

    ok(k._re_getters.a);
    ok(k._re_getters.b);

    ok(k._re_setters.a);
    ok(k._re_setters.b);

  });

  it('should create comp in new style', function(){

    re.c('jump12', {
      requires:"sdf",

      init:function(){

      },

      defines:{
        ok:10
      },

      defaults:{
        k:10
      },

      factory:function(){

      }

    });

    eq(re.c('jump12')._re_requires, ['sdf']);
    eq(re.c('jump12')._re_defines, {ok:10});
    eq(re.c('jump12')._re_defaults, {k:10});

  });

  it('should use default factory', function(){
    var a = 10;

    eq(re[k.name]("blah", a).blah, a);

  });

  it('should create a factory', function(){
    var val = 10;

    k.factory(function(ref){
      this.ref = ref;
    });

    eq(re[k.name](val).ref, val);

  });

  it('should overwrite method', function(){


    k.method(function(){
      eq(this, re[k.name]);
    });

    re[k.name]();
  });

  it('should add events', function(){
    k.events('mouseup', function(){})
    k.events({
      mousedown:function(){}
    });

    is(k._re_events.mouseup)
    is(k._re_events.mousedown)

  })

  it('should requires', function(){
    k
    .requires('test test2');

    contains(k._re_requires, 'test')
    contains(k._re_requires, 'test2')

    k.requires(['test3'])
    contains(k._re_requires, 'test3')
  })

  it('should alias', function(){

    k
    .statics('bob', 'bob')
    .alias('bob');

    ok(re.c('bob') == k)
  })

  it('should defaults', function(){
   k
    .defaults({
      ok:1,
      ok2:2
    })
    .defaults('ok3', 3);

    ok(k._re_defaults['ok3'] == 3)
    ok(k._re_defaults['ok2'] == 2)
    ok(k._re_defaults['ok'] == 1)
  })

  it('should namespaces', function(){
    var k = re.c('stat')
    .namespaces({
      ok:1,
      ok2:2
    })
    .namespaces('ok3', 3);

    ok(k._re_defines['stat_ok3'] == 3)
    ok(k._re_defines['stat_ok2'] == 2)
    ok(k._re_defines['stat_ok'] == 1)

  })

  it('should defines', function(){
    k
    .defines({
      b:1,
      b2:2
    })
    .defines('b3', 3);

    ok(k._re_defines['b3'] == 3)
    ok(k._re_defines['b2'] == 2)
    ok(k._re_defines['b'] == 1)
  })

  it('should init', function(){
    var fun = function(){

    }
    k.init(fun)

    ok(k._re_init == fun)
  })

  it('should dispose', function(){
    var fun = function(){

    }
    k.dispose(fun)

    ok(k._re_dispose == fun)

  })

  it('should run', function(){
    k.run(function(){
      ok(this == k)
    })
  })

})