EUnit = {
  stack:[],
  
  runStack:function(){
    for(var i in EUnit.stack){
      QUnit.push.apply(QUnit, EUnit.stack[i]);
    }
  },
  
  push:function(){
    this.stack.push(arguments);
    
  return !(QUnit.config.blocking) ? EUnit.runStack() : QUnit.config.queue.unshift(EUnit.runStack);
  }
};
/*
Expects a trigger call from the given obj.

var e = re.e('flicker');

expectTrigger(obj, 'flicker:end', function(){
  //if triggered this will be called
});

*/
function expectTrigger(obj, trigger, func){
  var called = false;
  obj.on(trigger, function(){
    called = true;
    if(func) func.apply(obj, arguments);
  });
  
  EUnit.push([called, called, true, "Expected entity to trigger"+trigger]);
}

/*
Generates a factory entity for easy use in the module()

//this will create a new re.e('coin') for every test()
module('coin', factory('coin', function(e){
  //called on coin creation.
}));

//setup teardown methods together
module('coin', factory('coin', {
setup:function(e){
  //called on coin creation.
},
teardown:function(e){
  //called after each test
}
}));

*/
var e;
function factory(comps, obj){
  return {
    setup:function(){
      e = re.e(comps);
      if(typeof obj == 'function') obj(e);
      if(obj && obj.setup) obj.setup(e);
    },
    teardown:function(){
      if(obj && obj.teardown) obj.teardown(e);
      e.dispose();
    }
  }
}