re.c('counter')
.requires('text align')
.defines({
  
  count:-1,
  maxCount:5,
  
  up:function(){
    this.count++;
    
    this.text(this.count);
    
    if(this.count >= this.maxCount){
      this.trigger('max', this.name);
    }
  }
  
})
.init(function(){
  //setup text
  this.up();
})