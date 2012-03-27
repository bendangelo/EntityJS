/*
The isodepth component automatically moves an entity to different depths,
so objects appear behind each other.
*/
re.c('isodepth')
.requires('iso depth')
.defines({
  
  depth:function(){
    return this.posX + this.posY;
  }
  
});