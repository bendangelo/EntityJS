/*
The pressed method is used to check if a key or keys are currently pressed.
This is most useful in mousemove, keydown or usually an update listener.

@usage
//move player
re.e('update image player.png')
.on('update', function(){
  
  if(re.pressed(['w', 'up'])){
    this.posY -= 10;
  }

});

//click based on key
re.e('mouse image button.png')
.on('click', function(){
  
  if(re.pressed('mouse:middle')){
    //do something..
  }

});

*/
re.pressed = function(key){
		
		var c = arguments;
		
		if(re.is(key, 'array')) c = key;
		
		for(var i=0, l = c.length; i<l; i++){
			if(re.pressed.d[c[i]]){
				return true;
			}
		}
		
		return false;
};
re.pressed.d = {};