re.c('coin')
.requires('item flicker')
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
  
  this.sfx = re.e('sound coin.sfx');
  
	this.addFlicker('glow', -1, 1800, '14 15 15');
	this.flicker('glow');
})
//accepted tile frames in items.png which will become coins
.alias('t14')
.alias('t15');