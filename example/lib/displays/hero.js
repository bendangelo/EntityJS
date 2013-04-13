re.c('hero')
.requires('hero.png tsprite update force animate body')
.defines({
  
  speed:40 * re.loop().stepSize,
  
  friX:0.75,
  friY:0.95,
  
  padX:6,
  
  bodyX:24,
  bodyY:24,
  
  jumpSpeed:480 * re.loop().stepSize,
  jump:false,
  ground:true,
  tag:"hero",
  
  update:function(){
    
    //jump
    if(this.ground && !this.jump && re.pressed('w', 'up')){
      this.forceJump();
    }
    
    //walk back and fourth
    if(re.pressed('a', 'left')){
      this.velX -= this.speed;
      this.scaleX = -1;
      
      if(!this.jump) this.animate('run');
    }
    
    if(re.pressed('d', 'right')){
      this.velX += this.speed;
      this.scaleX = 1;
      
      if(!this.jump) this.animate('run');
    }
    
    //switch back to idle animation if stopped moving
    if(this.isIdle(0.3)) this.animate('idle');
    
  },
  
  forceJump:function(){
    this.jump = true;
    this.velY -= this.jumpSpeed;
    
    this.animate('jump');
  },
  
  jumpReset:function(x, y, tx, ty){
    //check if a hit happened on the y axis
    if(y){
      this.jump = false;
      this.ground = (ty >= this.posY);
    }
  }
  
})
.init(function(){
  
  //add animations
  this.animates = {
	  idle:[800, [0, 1], -1],
	  run:[800, [2, 3], 1],
	  jump:[500, [4, 5, 4], 1],
	  ladder:[500, [6, 7], -1]
	};
  
  this.on({
    update:this.update,
    aftermath:this.jumpReset
  });
  
});