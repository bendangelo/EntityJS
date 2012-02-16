re.c('spring')
.requires('item flicker')
.defines({
  
  touch:function(){
    this.hero.velY = -5;
		
		if(re.pressed('w')){
			this.hero.velY = -25;
			this.flicker('bounce');
		}
  }
  
})
.init(function(){
  //add animation, can also send a string instead of an array
  this.addFlicker('bounce', 1, 300, '13 12');
	
	this.frame(12);
  
  this.comp('spring');
})
//used to place it in level.js
.alias('t12')
.alias('t13');