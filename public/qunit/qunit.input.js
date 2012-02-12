/*
EntityJS methods to simulate user inputs.
*/

function _findKeyCode(code){
  var codes = re.c('keyboard').keyCodes;
  
  for(var i in codes){
    if(codes[i] == code){
      return i;
    }
  }
  return null;
}

//sim keyboard presses

//calls keydown
/*
keydown('w');
*/
function keydown(key, e){
  e = e || {};
  
  e.type = 'keydown';
  e.keyCode = _findKeyCode(key);
  
  re.c('keyboard').event(e);
};

//calls keyup
/*
keyup('w');
*/
function keyup(key){
  e = e || {};
  
  e.type = 'keyup';
  e.keyCode = _findKeyCode(key);
  
  re.c('keyboard').event(e);
};

/*
Calls keydown before the callback and then keyup after.

keypress('w', function(){
  
  //w is down
  
  //w is up
});

//w is not down

*/
function keypress(key, callback, e){
  keydown(key, e);
  callback();
  keyup(key, e);
};

function _mouseEvent(e, type, x, y, key){
  e = e || {};
  
  e.type = type;
  e.clientX = x + document.body.scrollLeft + document.documentElement.scrollLeft;
  e.clientX = y + document.body.scrollTop + document.documentElement.scrollTop;
  
  if(key){
    re.c('mouse').press(e);
  } else {
    re.c('mouse').event(e);
  }
}

//sim mouse clicks
function mousedown(x, y, key, e){
  
  _mouseEvent(e, 'mousedown', x, y, key || 'left');
};

function mouseup(x, y, key, e){
  _mouseEvent(e, 'mouseup', x, y, key || 'left');
};

function mousemove(x, y, e){
  _mouseEvent(e, 'mousemove', x, y);
};

function contextmenu(x, y, e){
  _mouseEvent(e, 'contextmenu', x, y);
  
};

function click(x, y, callback, key, e){
  mousedown(x, y, key);
  _mouseEvent(e, 'click', x, y);
  if(callback) callback();
  mouseup(x, y, key);
};

function dblclick(x, y, callback, key, e){
  click(x, y, callback, key, e);
  click(x, y, callback, key, e);
};