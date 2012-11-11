factory('level', function(){
  this.targets = [];
  this.map = [[]];
  this.start = [0,0];
  
  this.setup();
});

//fake level for ball testing
factory('level box', function(){
  this.targets = [
  [4, 4],
  [3, 1]
  ];
  
  this.map = [
  [8,1,1,1,5],
  [4,0,0,0,2],
  [4,0,0,0,2],
  [4,0,0,0,2],
  [7,3,3,3,6]
  ];
  
  this.start = [0,0];
  
  this.setup();
});

factory('ball', function(){
  
  //stub out level
  this.level = {
    automap:function(){
      return null;
    }
  };
  
});

//starts system from running
//re.ready is disabled in testing
addEventListener('load', function(){
  re.loop().init(re.canvas).start();
});