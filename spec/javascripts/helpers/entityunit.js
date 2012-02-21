function is(obj, type){
  if(arguments.length == 1){
    expect(obj).toNotBe(null)
    expect(obj).toNotBe(undefined)
  } else{
    ok(obj != null && Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == type.toLowerCase())
  }
}

function eq(test, value){
  expect(test).toEqual(value)
}

function neq(test, value){
  expect(test).not.toEqual(value)
}

function ok(test){
  expect(test).toBeTruthy()
}

function not(test){
  expect(test).toBeFalsy()
}

function be(test, type){
  expect(test).toBe(type)
}

function beNull(test){
  expect(test).toBeNull()
}

function match(test, reg, i){
  if(typeof reg == 'string'){
    reg = new RegExp(reg, i)
  }
  expect(test).toMatch(reg)
  
}

var indexOf = function(z, a,f){for(var c=z.length,r=-1,d=f>>>0;~(c-d);r=z[--c]===a?c:r);return r};

function contains(array, item){
  ok(indexOf(array, item) != -1);
}


function called(value){
  if(arguments.length == 1){
    expect(value).toHaveBeenCalled()
  } else {
    var a = Array.prototype.slice.apply(arguments, 1)
    var con = expect(value)
    con.toHaveBeenCalledWith.apply(con, a)
  }
}
