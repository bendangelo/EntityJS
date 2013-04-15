re.c('counter')
.defines({
  
  _count:0,
  
  add:function(value){
    if(re.is(value)){
      this._count += value;
      this.coinText.text("Coins: "+this._count);
      
      return this;
    }
    
    return this._count;
  }
  
})
.init(function(){
  
  //define text
  this.coinText = re.e('bit')
  .alignLeft(5)
  .alignTop(5)
  //ignore screen coordinates
  .set('screenable', false);
  
  //set default text
  this.add(0);
})
.dispose(function(){
  
  this.coinText.dispose();
  
});