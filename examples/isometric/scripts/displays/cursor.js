re.c('cursor')
.requires('isoimage isomouse')
.defines({
  
  screenable:true,
  frameX:2,
  
  click:function(x, y){
    
    console.log(x, y);
    
    var box = re('#box');
    
    box.place(x, y);
  },
  
  mousemove:function(x, y){
    
    this.place(x, y);
    
  }
  
});