/*
The drawlist is an array of draw entities. Which can all be drawn at once using the .draw() method.

The draw component contains one drawlist for basic drawing. For cases when multiple drawlists is needed,
such as for large depth sorts, its more efficient to depth sort on the wanted draw objects rather than all
existing draw entities.

For example:

In a case of an isometric game, certain tiles should appear behind or in

*/

re.c('drawlist')
.method(function(name){
  var name = name || '';
  
  //name default to '' and returns default drawlist
  
  if(!re.drawlist._lists[name]){
    //add new list
    re.e('drawlist:'+name);
  }
  
  return re.drawlist._lists[name];
})
.statics({
  _lists:{}
})
.defines({
  
  add:function(e){
    if(e.drawlist){
      e.drawlist.remove(e);
    }
    
    e.drawlist = this;
    this.list.last(e);
    return this;
  },
  
  remove:function(e){
    if(e.drawlist){
      this.list.erase(e);
      e.drawlist = null;
    }
    return this;
  },
  
  drawlist:function(c){
        var lis = this.list;
        
        for(var i=0, b; i<lis.length; i++){
          b = lis[i];
            b.visible() && b.render(c);
        }
        
  },
    
  sort:function(){
    
    this.list.sort(function(a, b){
      if(a.depth && b.depth){
        return a.depth() - b.depth();
      }
      return 0;
    });
    
  }
  
})
.init(function(name){
  re.drawlist._lists[name] = this;
  this.listName = name;
  this.list = re();
})
.dispose(function(){
  delete re.drawlist._lists[this.listName];
});