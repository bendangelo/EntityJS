re.c('cursor')
.requires('isoimage mouse')
.defines({
  
  screenable:true,
  frameX:2,
  
  click:function(x, y){
    var iso = re.iso.toIso(x, y);
    
    console.log(iso.isoX, iso.isoY);
    
    var box = re('#box')[0];
    
    box.place(iso.isoX, iso.isoY);
    box.drawable = true;
    
    //make sure to sort before you alter posY
    re.depth.sort();
  },
  
  move:function(x, y){
    var iso = re.iso.toIso(x, y);
    
    this.place(iso.isoX, iso.isoY);
    
    re.depth.sort();
  }
  
})
.init(function(){
  this.on({
    'click':this.click,
    'mousemove':this.move
  });
});