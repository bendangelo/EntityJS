/*
EntityJS methods to simulate user inputs.
*/

function _findKeyCode(code){
  var codes = re.keyboard.keyCodes;
  
  for(var i in codes){
    if(codes[i] == code){
      return i;
    }
  }
  return null;
}

//sim keyboard presses

/*
Calls keydown. This will keep it down until keyup is called.
keydown('w');
*/
function keydown(key, e){
  e = e || {};
  
  e.type = 'keydown';
  e.keyCode = _findKeyCode(key);
  
  re.keyboard.event(e);
};

/*
Calls keyup, even if keydown was not pressed beforehand.
keyup('w');
*/
function keyup(key, e){
  e = e || {};
  
  e.type = 'keyup';
  e.keyCode = _findKeyCode(key);
  
  re.keyboard.event(e);
};

/*
Calls keydown before the callback and then keyup after.

keypress('w', function(){
  
  //w is down
  
  //w is up
});

//w is not down

//Can also enter in an array of keys
keypress(['w','a','s','d'], function(key, event){
  
})

//Can also send custom attributes to the event object.
var e = re.e('keyboard')
.on('keydown', function(key, event){
  re.log(event.myCustom); //cake
});
keypress('w', null, {myCustom:'cake'});

//key in mind the callback method is also optional

*/
function keypress(key, callback, e){
  if(typeof key == 'object'){
    for(var i in key){
        keypress(key[i], callback, e);
    }
    return;
  }
  keydown(key, e);
  if(callback) callback(key, e);
  keyup(key, e);
};

function _mouseEvent(e, type, x, y, key){
  e = e || {};
  
  e.type = type;
  e.clientX = x + document.body.scrollLeft + document.documentElement.scrollLeft;
  e.clientX = y + document.body.scrollTop + document.documentElement.scrollTop;
  
  if(key){
    re.mouse.press(e);
  } else {
    re.mouse.event(e);
  }
}

//sim mouse clicks

/*
Will hold the mouse down until mouse up is called.

//click at 10,20 with the middle key
//add custom to the event object.
mousedown(10, 20, 'middle', {custom:234});

*/
function mousedown(x, y, key, e){
  
  _mouseEvent(e, 'mousedown', x, y, key || 'left');
};

/*
Will call mouse up on the given x, y.
Mousedown does not need to be called for this to work.

mouseup(20, 40, 'right');
*/
function mouseup(x, y, key, e){
  _mouseEvent(e, 'mouseup', x, y, key || 'left');
};

/*
Calls mousemove on the given coordinate.

mousemove(20, 30);

*/
function mousemove(x, y, e){
  _mouseEvent(e, 'mousemove', x, y);
};

/*
Calls contextmenu on the given coordiante.

contextmenu(30, 50)
*/
function contextmenu(x, y, e){
  _mouseEvent(e, 'contextmenu', x, y);
  
};

/*
Clicks on the given coordinate and optionally call a method inbetween.

click(20, 30);

//with callback
click(40, 50, function(x, y, key, event){
  //mousedown..  

  
  //mouseup..
});

//mouse not down

//call with custom key and event
click(20, 50, null, 'middle', {blah:23});

//multiple clicks

click([[0,1], [30, 20], [34, 73]], function(x, y, key, event){
  
  re.log('clicks', x, y, key, event);

}, 'right', {extra:10});

*/
function click(x, y, callback, key, e){
  
  if(typeof x == 'object'){
    
    for(var i in x){
      click(x[i][0], x[i][1], y, callback, key);
    }
    
    return;
  }
  
  mousedown(x, y, key, e);
  _mouseEvent(e, 'click', x, y);
  if(callback) callback(x, y, key, e);
  mouseup(x, y, key, e);
};

/*
Same as the click method, except it calls click twice and then dispatches the callback.


dblclick(20, 40, function(x, y, key, e){
  //blah
}, 'left', {bl:sdf});

*/
function dblclick(x, y, callback, key, e){
  click(x, y, null, key, e);
  click(x, y, null, key, e);
  _mouseEvent(e, 'dblclick', x, y);
  if(callback) callback(x, y, key, e);
};