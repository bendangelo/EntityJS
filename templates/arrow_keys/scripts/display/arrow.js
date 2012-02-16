/*
The arrow component is a simple sprite with key controls.
It listens to system updates and will move around based on WASD keys.

The image comes from arrow.png, you can view the element here, re.c('arrow.png').image.

The sprite component automatically finds the ._image on the entity and draws it to screen.
It will chop the image into frames based on the sizeX and sizeY values.

The original image is 80x80 and has 4 frames. So its frame sizes will be 40x40.

Switch between frames by using .frame(id), and get the current frame with .frame()

The posX and posY come from the sprite component and defines the position of the image on screen.

*/
re.c('arrow')
.requires('update sprite keyboard arrow.png')
.defines({
  
  //speed of the arrow
  speed:10,
  //defines the sprite frame size
  sizeX:40,
  sizeY:40,
  
  update:function(){
    var s = this.speed;
    
    //if w or up key is currently pressed..
    if(re.pressed('w', 'up')){
      //moves position y
			this.posY -= s;
			
      //change sprite frame
			this.frame(0);
			
		} else if(re.pressed('s', 'down')){
		
			this.posY += s;
			this.frame(2);
			
		}
		
		if(re.pressed('a', 'left')){
		
			this.posX -= s;
			this.frame(3);
			
		} else if(re.pressed('d', 'right')){
		
			this.posX += s;
			this.frame(1);
			
		}
    
  }
  
})
.init(function(){
  
  //move to the center of the screen
	this.posX = re.sys.sizeX * 0.5;
	this.posY = re.sys.sizeY * 0.5;
  
  //add event listener
  this.on('update', this.update);
  
});