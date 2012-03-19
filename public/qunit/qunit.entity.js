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
Disable re.ready for testing
*/
re.ready = function(){};

window.addEventListener('load', function(){
  re.sys.init(re.canvas);
}, true);

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
Expects the given entity to have the given flicker present

var e = re.e();

expectFlicker(e, 'run'); //false

e.comps('flicker').addFlicker('run', 123, 21, [2]);

expectFlicker(e, 'run') //true

*/
function expectFlicker(ent, flick){
  ok(ent.flicker_reels[flick] != null, "Expected entity to have flicker "+flick);
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

*/
var _factories = {};
function factory(comps, func){
  var e = re.e(comps);
  
  //don't enter in arrays, strings only
  if(func) _factories[comps] = func;
  
  if(_factories[comps]) _factories[comps].call(e);
  
  return e;
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
      
      window[name] = e = f(comps.join(' '));
      
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
Some super lazy evaluations
*/
var eq = equal;
var not = function(arg, message){ok(!arg, message);}
function is(obj, type){
  if(arguments.length == 1){
    ok(obj != null, "Expected to be present");
  } else{
    ok(obj != null && Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == type.toLowerCase())
  }
}

function match(test, reg, i){
  if(typeof reg == 'string'){
    reg = new RegExp(reg, i)
  }
  
  ok(test.match(reg) != null, "Expected to match "+reg)
  
}
