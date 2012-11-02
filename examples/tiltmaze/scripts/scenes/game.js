re.scene('game')
.enter(function(levelNum){
  
  //prevent default browser actions
  re.preventDefault('left right up down');
  
  this.setLevel(levelNum);
  this.currentLevel.setup();
  
  var self = this;
  
  //set keyboard shortcuts
  re.e('keyboard')
  .on('keyup:q', function(){
    self.quit();
  })
  .on('keyup:r', function(){
    self.restart();
  });
  
})
.set({
  
  setLevel:function(num){
    
    this.currentLevel = re.level.get(num);
    this.num = num;
    
    if(!re.is(this.currentLevel)){
      this.num = 1;
      this.currentLevel = re.level.get(1);
    }
    
  },
  
  advance:function(){
    this.num++;
    
    this.enter(this.num);
  },
  
  restart:function(){
    this.enter(this.num);
  },
  
  quit:function(){
    re.scene('home').enter();
  }
  
})
.exit(function(){
  
  this.currentLevel.teardown();
  re('keyboard').dispose();
  
});