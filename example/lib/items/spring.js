re.c('spring')
.requires('item animate')
.defines({
  
  touch:function(){
    this.hero.velY = -5;
		
		if(re.pressed('w', 'up')){
			this.hero.velY = -25;
			this.animate('bounce');
		}
  }
  
})
.init(function(){
  //add animation, can also send a string instead of an array
  this.animates = {
    bounce:[300, [13, 12], 1]
  };
	
	this.frame(12);
  
  this.comp('spring');
})
//used to place it in level.js
.alias('t12')
.alias('t13');