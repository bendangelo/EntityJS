re.c('cursor')
.requires('isoimage mouse')
.defines({
  
  screenable:true,
  frameX:2,
  
  click:function(x, y){
    var iso = re.iso.toIso(x, y);
    
    console.log(iso.isoX, iso.isoY);
    
    var box = re('#box')[0];
    
    box.iso(iso.isoX, iso.isoY);
    box.drawable = true;
  },
  
  move:function(x, y){
    this.attr(re.iso.toPos(x, y));
    
  }
  
})
.init(function(){
  this.on({
    'click':this.click,
    'mousemove':this.move
  });
});