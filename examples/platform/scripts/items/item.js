re.c('item')
//order matters!
//items.png defines sizeX, sizeY
//tsprite overwrites the sizes
.requires('items.png tsprite update hit')
.namespaces({
  
  update:function(t){

	  if(this.hero.hitBody(this.posX, this.posY, this.sizeX, this.sizeY, 10, 0)){
	 		this.touching = true;
			this.touch(t);
			
		} else if(this.touching){
			
			this.touching = false;
			
			this.untouch(t);
		}
		
	}
  
})
.defaults({
  touching:false,
  
  touch:function(){
    
  },
  
  untouch:function(){
    
  }
})
.init(function(){
  this.hero = re('#hero');
  
  this.on('update', this.item_update);
  
  // this.updateBefore(this.hero);
})
.dispose(function(){
  this.off();
});