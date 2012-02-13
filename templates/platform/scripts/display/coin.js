re.c('coin')
.requires('tsprite items.png')
.defines({
  
  collect:function(){
    
    this.dispose();
    
    return this.trigger('collect');
  }
  
});