re.c('target')
.requires('draw tile')
.defines({
  color:'#0000ff',
  
  draw:function(c){
    
    c.fillStyle = this.color;
    
    c.fillRect(this.sizeX / 2 - 5, this.sizeY / 2 - 5, 10, 10);
  }
  
});