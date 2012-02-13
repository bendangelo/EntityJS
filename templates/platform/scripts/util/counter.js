re.c('counter')
.defines({
  
  _count:0,
  
  counter:function(value){
    if(re.is(value)){
      this._count += value;
      this.coinText.text("Coins: "+value);
      
      return this;
    }
    
    return this._count;
  }
  
})
.init(function(){
  
  //define text
  this.coinText = re.e('bit')
  .alignLeft(5)
  .alignTop(5);
  
  //set default text
  this.counter(0);
})
.dispose(function(){
  
  this.coinText.dispose();
  
});