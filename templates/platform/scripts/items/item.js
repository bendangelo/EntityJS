re.c('item')
.requires('tsprite update hit items.png')
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
  this.hero = re('hero')[0];
  
  this.on('update', this.item_update);
  
  this.updateBefore(this.hero);
})
.dispose(function(){
  this.off();
});