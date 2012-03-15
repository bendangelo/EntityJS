EUnit = {
  stack:[],
  
  runStack:function(){
    for(var i in EUnit.stack){
      var k = EUnit.stack[i];
      
      ok(k.called, k.message);
    }
  },
  
  push:function(obj){
    this.stack.push(obj);
    
    return QUnit.config.queue.unshift(EUnit.runStack);
  }
};

/*
Disable re.ready for testing
*/

    
window.addEventListener('load', function(){
  //prevent ready from running
  re.ready = function(){};
  console.log('hey')
  //auto start system for helpfulness
  re.sys.init(re.canvas).start();
  
  //TODO: auto load sounds, images
}, true);

/*
Expects a trigger call from the given obj.

var e = re.e('flicker');

expectTrigger(e, 'flicker:end', function(){
  //if triggered this will be called
});

*/
function expectTrigger(obj, trigger, func){
  var trig = {
    called:0,
    message:"Expected "+trigger+" to be triggered"
  };
  
  trig.meth = function(){
    trig.called++;
    if(func) func.apply(obj, arguments);
  };
  
  obj.on(trigger, trig.meth);
  
  EUnit.push(trig);
}

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
Expects an entity or component to have a current listener attached.

var e = re.e();

expectListener(e, 'update'); //false

e.on('update', function(){
  
});

expectListener(e, 'update') //true

*/
function expectListener(ent, trigger, func){
  if(arguments.length == 2){
    ok(ent.has('^'+trigger), "Expected entity to have listener "+trigger);
  } else {
    var fin = false;
    for(var i in ent._re_signals[trigger]){
      fin = (ent._re_signals[trigger][i] == func)
      if(fin) break;
    }
    
    ok(fin, "Expected entity to have listener "+trigger+" with function");
    
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
//a new coin in e will be created for every test()
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
  equal(e.value, 10);
})

etc..

*/
var e;
function lazy(comps, obj){
  return {
    setup:function(){
      e = f(comps);
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
