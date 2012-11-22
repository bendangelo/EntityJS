/*
A simple circle component. Keep in mind this is extending the default circle in the
game engine.

A circle can be created on of two ways:

re.e('circle');

or through a factory:

re.circle(10, "#00CCFF");

*/
re.c('circle')
.factory(function(radius, color){
	//this is called when using re.circle()
	this.radius = radius;
	this.color = color;
})
.requires('align render update')
.defines({
	//define properties
  speed:15,
  color:'#ff0000'
})
.events({

	//adds a listener for updates
	update:function(){

	    //move on keypressed
	    if(re.pressed('a', 'left')) this.posX -= this.speed;
	    if(re.pressed('d', 'right')) this.posX += this.speed;
	    
	    if(re.pressed('w', 'up')) this.posY -= this.speed;
	    if(re.pressed('s', 'down')) this.posY += this.speed;
    
	}

});