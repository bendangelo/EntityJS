re.c('coin')
.requires('item animate')
.defines({
  
  touch:function(){
    this.collect();
  },
  
  collect:function(){
    this.sfx.play();
    this.trigger('collect');
    this.dispose();
  }
  
})
.init(function(){
  //add comp for searchability
  this.comp('coin');
  
  //create new sound effect
  this.sfx = re.e('sound coin.sfx');
  
  //setup animations to play
	this.animates = {
    glow:[1800, [14, 15, 15], -1]
  };
  
	this.animate('glow');
})
//accepted tile frames in items.png which will become coins
.alias('t14')
.alias('t15');