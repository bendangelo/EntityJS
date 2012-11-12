ETest = function(){
};

ETest.prototype.push = function(){
  var that = this;
  if(QUnit.config.blocking){
    that.run();
  } else {
    QUnit.config.queue.unshift(function(){
      that.run();
    });
  }
};

ETest.prototype.run = function(){
  ok(this.check(), this.message);
};

/*
Expects a trigger call from the given obj.

var e = re.e('flicker');

expectTrigger(e, 'flicker:finish', function(){
  //if triggered this will be called
});

var e = re.e('counter');

//expect given arguments
expectTrigger(e, 'maxed', [10]);

*/
function expectTrigger(obj, trigger, func){
  var trig = new ETest();
  trig.called = 0;
  trig.message = "Expected "+trigger+" to be triggered";
  
  trig.check = function(){
    return this.called;
  };
  
  trig.meth = function(){
    trig.called++;
    
    if(typeof func == 'object'){
      
      var args = Array.prototype.slice.call(arguments, 0);
      
      ok(!(args>func || args<func), "trigger "+trigger+" should have same arguments");
      
    } else if(typeof func == 'function'){
      func.apply(obj, arguments);
    }
  };
  
  obj.on(trigger, trig.meth);
  
  trig.push();
};

function expectValueUp(obj, prop){
  var trig = new ETest();
  trig.message = "Expected "+prop+" to value up";
  trig.old = obj[prop];
  
  trig.check = function(){
    return this.old < obj[prop];
  };
  
  trig.push();
};

function expectValueDown(obj, prop){
  var trig = new ETest();
  trig.message = "Expected "+prop+" to value down";
  trig.old = obj[prop];
  
  trig.check = function(){
    return this.old > obj[prop];
  };
  
  trig.push();
};

/*

re.e('circle')
.set('color', '#ff0000');

pixelEqual(10, 10, 255, 0, 0, 0);

*/
function pixelEqual(x, y, r, g, b, a, message){
  var actual = Array.prototype.slice.apply(re.loop().context.getImageData(x, y, 1, 1).data), expected = [r, g, b, a];
	QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
}

/*
Expects an entity or component to have a current event attached.

var e = re.e();

expectEvent(e, 'update'); //false

e.on('update', function(){
  
});

expectEvent(e, 'update') //true

*/
function expectEvent(ent, trigger, func){
  if(arguments.length == 2){
    ok(ent.has('^'+trigger), "Expected entity to have event "+trigger);
  } else {
    var fin = false;
    for(var i in ent._re_signals[trigger]){
      fin = (ent._re_signals[trigger][i] == func)
      if(fin) break;
    }
    
    ok(fin, "Expected entity to have event "+trigger+" with function");
    
  }
}

/*
Generates a factory for creating complex entities.

//create coin factory
factory('coin', function(){
  //set values on the newly created coin
  this.value = 10;
  
  //has all normal methods
  this.def('blah', 10);
  this.on('update', function(){
  });
});

//create coin
var e = factory('coin');
e.value // 10
e.has('coin') //true

//can also use f
var coin2 = f('coin');
coin2.value //10

//create coin with custom factory
//still has other defines properties

var customCoin = f('coin', function(){
  this.getValue = function(){
    return this.value;
  };
});

customCoin.value //10
customCoin.getValue(); //10

//create custom enemy

test('blah', function(){
  
  enemy = f('enemy', {health:100, attack:10});

});

*/
var _factories = {};
function factory(comps, func){
  //define new factory
  if(func && !_factories[comps]){
    _factories[comps] = func;
    
  } else {
    //create
    var e = re.e(comps);
    
    //call defined factory
    if(_factories[comps]) _factories[comps].call(e);
    
    //add custom attributes
    if(typeof func == 'object') e.set(func);

    //call custom method
    if(func) func.call(e);
    return e;
  }
}
var f = factory;

/*
Generates a factory entity for easy use in the module()

//light weight
//a new coin in coin will be created for every test()
module('coin', lazy('coin'));

//do something after coin creation
module('coin', lazy('coin', function(e){
  //called on coin creation.
}));

//setup teardown methods together
module('coin', lazy('coin', {
setup:function(e){
  //called on coin creation.
},
teardown:function(e){
  //called after each test
}
}));

test('coin should have valid of 10', function(){
  equal(coin.value, 10);
})

etc..

*/
function lazy(comps, obj){
  var name;
  if(typeof comps == 'string') comps = comps.split(' ');
  name = comps[0];
  var e;
  
  return {
    setup:function(){
      
      this[name] = e = f(comps.join(' '));
      
      if(typeof obj == 'function') obj(e);
      if(obj && obj.setup) obj.setup(e);
    },
    teardown:function(){
      if(obj && obj.teardown) obj.teardown(e);
      e.dispose();
    }
  }
}

/*
  Simple scene testing.

  module('scenes/home', lazyScene('home', 'hello'));
  
  //goes into home..
  //re.scene('home').enter('hello');
  test('shows title', function(){
    eq(re('text').first().text(), 'hello');
  });
  //afterwards
  //re.scene('home').exit();
*/
function lazyScene(scene){
  var args = Array.prototype.slice.call(arguments, 1);
  return {
    setup:function(){
      var s = this.scene = re.scene(scene);

      s.enter.apply(s, args);
    },
    teardown:function(){
      this.scene.exit();
    }
  };
};

/*
Some super lazy evaluations
*/
var eq = equal;
var not = function(arg, message){ok(!arg, message);}

/*
Object exists or is of type.

is({}, 'object');
is(null) //false
is(1)
is('sdsf', 'string') //true
*/
function is(obj, type){
  if(arguments.length == 1){
    ok(obj != null, "Expected to be present");
  } else{
    ok(obj != null && Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == type.toLowerCase())
  }
}

/*
Between or equal to two numbers

between(10, 30, 90)
*/
function between(test, low, high){
  if(low > high){
    var t = low;
    low = high;
    high = t;
  }

  ok(test >= low && test <= high, "Expected to be between "+low+"-"+high);
}

/*
Matches a regular expression

match('hello', /h/, 'i');
*/
function match(test, reg, i){
  if(typeof reg == 'string'){
    reg = new RegExp(reg, i)
  }
  
  ok(test.match(reg) != null, "Expected to match "+reg)
  
}


QUnit.extend( QUnit, {
  /**
   * Checks that the first two arguments are equal, or are numbers close enough to be considered equal
   * based on a specified maximum allowable difference.
   *
   * @example close(3.141, Math.PI, 0.001);
   *
   * @param Number actual
   * @param Number expected
   * @param Number maxDifference (the maximum inclusive difference allowed between the actual and expected numbers)
   * @param String message (optional)
   */
  close: function(actual, expected, maxDifference, message) {
    var passes = (actual === expected) || Math.abs(actual - expected) <= maxDifference;
    QUnit.push(passes, actual, expected, message);
  },

  /**
   * Checks that the first two arguments are numbers with differences greater than the specified
   * minimum difference.
   *
   * @example notClose(3.1, Math.PI, 0.001);
   *
   * @param Number actual
   * @param Number expected
   * @param Number minDifference (the minimum exclusive difference allowed between the actual and expected numbers)
   * @param String message (optional)
   */
  notClose: function(actual, expected, minDifference, message) {
    QUnit.push(Math.abs(actual - expected) > minDifference, actual, expected, message);
  }
});