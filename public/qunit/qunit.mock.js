//TODO: fix up
/*

Implements:

//expects the method to be called before the end of the test
expectCall(re, 'pressed')

//expects a method to be called with the given arguments
expectCall(re, 'pressed', ['a'])

//expects a method to be called a number of times
expectCall(re, 'pressed', null, 2)

//stubs a method with a custom method
stub(re, 'pressed', function(value){
  return false;
});

//method does nothing
stub(re, 'pressed');

//method returns 10
stub(re, 'pressed', 10);

*/
(function() {
  var expectCall, finishMock, mock, mocked, mocking, stack, stub, testExpectations;
  var __slice = Array.prototype.slice;
  mocking = null;
  stack = [];
  expectCall = function(object, method, args, calls) {
    var expectation;
    calls = (typeof calls !== "undefined" && calls !== null) ? calls : 1;
    
    expectation = {
      object: object,
      method: method,
      expectedCalls: calls,
      expectedArgs: args,
      originalMethod: object[method],
      callCount: 0
    };
    object[method] = function() {
      var args;
      args = __slice.call(arguments, 0);
      expectation.originalMethod.apply(object, args);
      
      expectation.args = args;
      
      return expectation.callCount += 1;
    };
    mocking.expectations.push(expectation);

    return object[method];
  };
  stub = function(object, method, fn) {
    var stb;
    
    if(fn == null){
      fn = function(){};
    } else if(typeof fn != 'function'){
      var value = fn;
      fn = function(){
        return value;
      };
    }
    
    stb = {
      object: object,
      method: method,
      original: object[method]
    };
    object[method] = fn;

    if(!mocking || !mocking.stubs){
      throw "Can only stub inside tests!";
    }

    return mocking.stubs.push(stb);
  };
  mock = function(test) {
    var mk;
    mk = {
      expectations: [],
      stubs: []
    };
    mocking = mk;
    stack.push(mk);
    test();
    return !(QUnit.config.blocking) ? finishMock() : QUnit.config.queue.unshift(finishMock);
  };
  mocked = function(fn) {
    return function() {
      return mock(fn);
    };
  };
  finishMock = function() {
    testExpectations();
    stack.pop();
    return (mocking = stack.length > 0 ? stack[stack.length - 1] : null);
  };
  testExpectations = function() {
    var _a, expectation, stb;
    while (mocking.expectations.length > 0) {
      expectation = mocking.expectations.pop();
      equal(expectation.callCount, expectation.expectedCalls, "method " + (expectation.method) + " should be called " + (expectation.expectedCalls) + " times");
      
      if(expectation.expectedArgs){
        //equal(expectation.expectedArgs.length, expectation.args.length, "method " + (expectation.method) + " should have " + (expectation.expectedArgs.length) + " arguments")
        
        //check args
        var eargs = expectation.expectedArgs;
        var args = expectation.args;
        ok(!(eargs>args || eargs<args), "method "+ expectation.method +" should have same arguments");
        
      }
      
      expectation.object[expectation.method] = expectation.originalMethod;
    }
    _a = [];
    while (mocking.stubs.length > 0) {
      _a.push((function() {
        stb = mocking.stubs.pop();
        return (stb.object[stb.method] = stb.original);
      })());
    }
    return _a;
  };
  window.expectCall = expectCall;
  window.stub = stub;
  window.mock = mock;
  window.QUnitMock = {
    mocking: mocking,
    stack: stack
  };
  window.test = function() {
    var _a, _b, arg, args, i;
    args = __slice.call(arguments, 0);
    _a = args;
    for (i = 0, _b = _a.length; i < _b; i++) {
      arg = _a[i];
      if (typeof arg == 'function') {
        args[i] = mocked(arg);
      }
    }
    return QUnit.test.apply(this, args);
  };
  window.asyncTest = function(testName, expected, callback) {
    if (arguments.length === 2) {
      callback = expected;
      expected = 0;
    }
    return QUnit.test(testName, expected, mocked(callback), true);
  };
})();