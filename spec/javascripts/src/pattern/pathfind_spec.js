describe('pattern/pathfind', function(){
  
  var map, pathfind, automap;
  
  beforeEach(function(){
    //zero is walkable
    map = 
    [
    [0,0,0,0,0],
    [0,1,0,0,0],
    [0,0,0,1,0]
    ];
    
    //supplies within method
    automap = re.e('automap').automap(map);
    
    pathfind = re.e('pathfind');
    
    //implement custom check method
    pathfind.checkNode = function(x, y){
      return automap.within(x, y) && automap.automap(x, y) == 0;
    };
    
  });
  
  it('should move on self', function(){
    
    var path = pathfind.pathfind(0, 0, 0, 0);
    
    eq(path.length, 2)
    
  })
  
  it('should move up one tile', function(){
    
    var path = pathfind.pathfind(0, 0, 0, 1);
    
    eq(path.length, 2);
    
    eq(path.pop(), 1);
    
  });
  
  it('should navigate around 1s', function(){
    
    var path = pathfind.pathfind(0, 1, 2, 1);
    
    //first int is Y
    path.pop();
    //second is X
    not(path.pop(), 1);
    
  });
  
});