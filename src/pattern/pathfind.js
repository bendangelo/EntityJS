/*
The pathfind comp finds a path towards a target position. The .search() method will return
an int array describing the movements to the target position.

searchNodes() and checkNode() can be overwritten.

//example

//1 is unwalkable
var map = 
[
[0,0,0,1],
[0,1,0,0]
]

//automap is helpful for two-dim arrays
var level = re.e('automap').automap(map);

var path = re.e('pathfind')
.set({
  //this is checked for every tile. Returning false will skip it, making the tile unwalkable.
  checkNode:function(x, y, parentX, parentY){
    return level.within(x, y) && level.automap(x, y) == 0;
  }
});

//search
var start = {x:0, y:0};
var end = {x:2, y:1};

//also called on every tile exactly like checkNode.
//this can be used for custom spcific pathfinds
var onCheck = function(x, y, parentX, parentY){
  return true;
}

//called when a tile is accepted into path
var onTile = function(x, y, parentX, parentY, cost){
  
}

var ints = path.pathfind(start.x, start.y, end.x, end.y, onCheck, onTile);

//will return a path of ints like so..
// [x3, y3, x2, y2, x1, y1]

while(ints.length){
  var y = ints.pop();
  var x = ints.pop();
  
  //move unit to x,y, etc..
  
}

*/
re.c('pathfind')
.method(function(){
    var p = re.e('pathfind');
    var path = p.pathfind.apply(p, arguments);
    p.dispose();
    return path;
})
.defines({
  
  pathfind_max:50,
  
  pathfind:function(x, y, targetX, targetY, onCheck, onTile){
    this.targetX = targetX;
    this.targetY = targetY;
    
    this.onCheck = onCheck;
    this.onTile = onTile;
    
    this.visit = {};
    this.nodes = [];
    
    this.addNode(x, y, -1, -1);
    
    var n, count = 0;
    
    while(this.nodes.length){
      n = this.nodes.shift();
      
      if(n.x == this.targetX && n.y == this.targetY){
        return this.makePath(n);
      } else {
        
        this.searchNodes(n.x, n.y, n.px, n.py);
        
        if(++count >= this.pathfind_max){
          //limit reached
          return null;
        }
        
      }
      
    }
    
    return null;
  },
  
  searchNodes:function(x, y){
    this.addNode(x+1, y, x, y);
    this.addNode(x-1, y, x, y);
    this.addNode(x, y+1, x, y);
    this.addNode(x, y-1, x, y);
  },
  
  checkNode:function(){
    return true;
  },
  
  makePath:function(node){
    var path = [], num=0;
    
    do{
      //starts at target and moves backwards to initial position
      
      path[num++] = node.x;
      path[num++] = node.y;
      
      node = this.nodes[node.px+'_'+node.py];
      
    } while(node && node.px != -1);
    
    return path;
  },
  
  addNode:function(x, y, px, py){
    
    if(!this.checkNode(x, y, px, py) || (this.onCheck && !this.onCheck(x, y, px, py))){
      return false;
    }
      
    var name = x+'_'+y;
    
    var cost = re.distance(x, y, this.targetX, this.targetY);
    
    if(!this.nodes[name] || this.nodes[name].cost > cost){
      
      var n = this.nodes[name] = {x:x, y:y, cost:cost, px:px, py:py};
      
      var placed = false;
      //enter in better cost nodes
      for(var i=0, l = this.nodes.length; i<l; i++){
        if(cost < this.nodes[i].cost){
          this.nodes.splice(i, 0, n);
          placed = true;
          break;
        }
      }
      
      //just push it
      if(!placed){
        this.nodes.push(n);
      }
      
      //hook in methods
      if(this.onTile) this.onTile(x, y, px, py, cost);
      
      return true;
    }
        
  }
  
});