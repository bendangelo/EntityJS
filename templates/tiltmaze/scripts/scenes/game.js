re.scene('game')
.enter(function(levelNum){
  
  //prevent default browser actions
  re.preventDefault('left right up down');
  
  this.setLevel(levelNum);
  this.currentLevel.setup();
  
  //set keyboard shortcuts
  re.e('keyboard')
  .on('keyup:q', this.quit)
  .on('keyup:r', this.restart);
  
})
.attr({
  
  setLevel:function(num){
    
    this.currentLevel = re.level.get(num);
    this.num = num;
    
    if(!re.is(this.currentLevel)){
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
  re('keyboard').dispose();
  
});