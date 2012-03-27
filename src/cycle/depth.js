/*
The depth component sorts draw entities and determines which is on top.

A depth function should be implemented for each entity to determine the depth.

Higher depths are on top, lower depths are on bottom.
*/
re.c('depth')
.requires('draw')
.statics({
  sort:function(){
    //collect draw entities
    var entities = re.c('draw').l;
    
    entities.sort(function(a, b){
      var v1 = (a.depth) ? a.depth() : this.defaultDepth;
      var v2 = (b.depth) ? b.depth() : this.defaultDepth;
      
      return v1 - v2;
    });
    
  },
  
  defaultDepth:1
  
})
.interfaces('depth');