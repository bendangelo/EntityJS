/*

Usage:

//expects the method to be called before the end of the test
expectCall(re, 'pressed')

//expects a method to be called with the given arguments
expectCall(re, 'pressed').with('a')

//expects a method to be called a number of times
expectCall(re, 'pressed').calls(2)

//callback usage
var callback = expectCall();

loader.load(callback); //should be called before end

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
  var Expectation, expectCall, finishMock, mock, mocked, mocking, stack, stub, testExpectations,
    __slice = [].slice;

  mocking = null;

  stack = [];

  Expectation = (function() {

    function Expectation(args) {
      var _this = this;
      $.each(args, function(i, el) {
        return _this[i] = el;
      });
      this.calledWith = [];
    }

    Expectation.prototype.isCallback = function() {
      return this.object === void 0;
    };

    Expectation.prototype["with"] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.expectedArgs = args;
      return this;
    };

    Expectation.prototype.calls = function(calls) {
      this.expectedCalls = calls;
      return this;
    };

    Expectation.prototype.undo = function() {
      if (this.object != null) {
        return this.object[this.method] = this.originalMethod;
      }
    };

    return Expectation;

  })();

  expectCall = function(object, method, calls) {
    var expectation, mock;
    if (calls == null) {
      calls = 1;
    }
    expectation = new Expectation({
      expectedCalls: calls,
      callCount: 0
    });
    mock = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (expectation.originalMethod) {
        expectation.originalMethod.apply(object, args);
      }
      expectation.callCount += 1;
      return expectation.calledWith.push(args);
    };
    mocking.expectations.push(expectation);
    if (arguments.length) {
      expectation.originalMethod = object[method];
      expectation.object = object;
      expectation.method = method;
      object[method] = mock;
      return expectation;
    }
    return mock;
  };

  stub = function(object, method, fn) {
    var retur, stb;
    if (typeof fn !== 'function') {
      retur = fn;
      fn = function() {
        return retur;
      };
    }
    stb = {
      object: object,
      method: method,
      original: object[method]
    };
    object[method] = fn;
    mocking.stubs.push(stb);
    return stb;
  };

  mock = function(test) {
    var mk;
    mk = {
      expectations: [],
      stubs: []
    };
    mocking = mk;
    stack.push(mk);
    test.call(QUnit.current_testEnvironment);
    if (!QUnit.config.blocking) {
      return finishMock();
    } else {
      return QUnit.config.queue.unshift(finishMock);
    }
  };

  mocked = function(fn) {
    return function() {
      return mock(fn);
    };
  };

  finishMock = function() {
    testExpectations();
    stack.pop();
    return mocking = stack.length > 0 ? stack[stack.length - 1] : null;
  };

  testExpectations = function() {
    var expectation, stb, _results;
    while (mocking.expectations.length > 0) {
      expectation = mocking.expectations.pop();
      if (expectation.isCallback()) {
        equal(expectation.callCount, expectation.expectedCalls, "callback should have been called " + expectation.expectedCalls + " times");
      } else {
        equal(expectation.callCount, expectation.expectedCalls, "method " + expectation.method + " should be called " + expectation.expectedCalls + " times");
        expectation.undo();
      }
      if (expectation.expectedArgs) {
        $.each(expectation.calledWith, function(i, el) {
          return deepEqual(expectation.expectedArgs, el, "expected to be called with " + expectation.expectedArgs + ", called with " + el);
        });
      }
    }
    _results = [];
    while (mocking.stubs.length > 0) {
      stb = mocking.stubs.pop();
      _results.push(stb.object[stb.method] = stb.original);
    }
    return _results;
  };

  window.expectCall = expectCall;

  window.stub = stub;

  window.mock = mock;

  window.QUnitMock = {
    mocking: mocking,
    stack: stack
  };

  window.test = function() {
    var arg, args, i, _i, _len;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
      arg = args[i];
      if (typeof arg === 'function') {
        args[i] = mocked(arg);
      }
    }
    return QUnit.test.apply(QUnit.current_testEnvironment, args);
  };

  window.asyncTest = function(testName, expected, callback) {
    if (arguments.length === 2) {
      callback = expected;
      expected = 0;
    }
    return QUnit.test(testName, expected, mocked(callback), true);
  };

}).call(this);