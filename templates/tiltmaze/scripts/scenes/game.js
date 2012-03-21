re.scene('game')
.enter(function(levelNum){
  
  this.setLevel(levelNum);
  this.currentLevel.setup();
  
  
})
.attr({
  
  setLevel:function(num){
    
    this.currentLevel = re.level.get(num);
    this.num = num;
    
    if(!re.is(level)){
      this.num = 0;
      this.currentLevel = re.level.get(0);
    }
    
  },
  
  advance:function(){
    this.num++;
    
    re.scene('game').enter(this.num);
  },
  
  restart:function(){
    re.scene('game').enter(this.num);
  },
  
  quit:function(){
    re.scene('home').enter();
  }
  
})
.exit(function(){
  
  this.currentLevel.teardown();
  
});