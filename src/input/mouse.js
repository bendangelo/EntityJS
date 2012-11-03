/*
The mouse component allows an entity to listen to mouse triggers.

@usage
re.e('mouse')
.on('mousedown:middle', function(m){
    //m.x - x position
    //m.y - y position
    //m.screenX - screen x position
    //m.screenY - screen y position
})

FUTURE: rename triggers to the standard format
mousemove -> mouse:move
*/
re.c('mouse')
.statics({
    l:[],
    
    press:function(e){
        var b, c;
        
        //find which key
        if(e.which == null){
            //IE
            if(e.button < 2){
                b = 'left';    
            } else if(e.button == 4){
                b = 'middle';
            } else {
                b = 'right';    
            }
        } else {
            if(e.which < 2){
                b = 'left';    
            } else if(e.which == 2){
                b = 'middle';    
            } else {
                b = 'right';    
            }
        }
        
        c = 'mouse:'+b;
        
        //register mouse action
        if(re.pressed.d){
            re.pressed.d[c] = (e.type == 'mousedown');
        }
    
        re.mouse.event(e, c);
        
    },
    
    event:function(e, extra){
        
        var canvas = re.mouse.c;
        //calculate mouse coordinate
        var x = canvas.width / canvas.offsetWidth;
        var y = canvas.height / canvas.offsetHeight;
        
        //calculate offset
        if(e.offsetX != null){ //chrome, opera
          x *= e.offsetX;
          y *= e.offsetY;
        } else { //firefox
          x *= e.layerX - canvas.offsetLeft;
          y *= e.layerY - canvas.offsetTop;
        }
        
        
        var listeners = re.mouse.l;
        
        /*
        if(re.preventDefault && re.preventDefault.d[key]){
          e.preventDefault();
        }
        */
        
        var c, t, obj, tx, ty;
        for(var i=0; i<listeners.length; i++){
          t = listeners[i];
          if(t.screenable){
            tx = re.screen().toScreenX(x);
            ty = re.screen().toScreenY(y);
          } else {
            tx = x;
            ty = y;
          }
          
          //offset mouse coordinates
          tx += t.offX;
          ty += t.offY;
          
          t.trigger(e.type, tx, ty, e);
          
          if(extra){
            t.trigger(e.type+':'+extra, tx, ty, e);
          }
        }
        
    },
    
    i:function(){
      var c = this.c = re.main().canvas;
      re.listener('mousedown', this.press, c);
      re.listener('mouseup', this.press, c);
      re.listener('mousemove', this.event, c);
      re.listener('mouseover', this.event, c);
      re.listener('mouseout', this.event, c);
      re.listener('click', this.event, c);
      re.listener('dblclick', this.event, c);
      re.listener('contextmenu', this.event, c);
    }
    
})
.defaults({
  offX:0,
  offY:0
})
.init(function(){
    //add to listener array
    re.mouse.l.push(this);
})
.dispose(function(){
    //remove from listener array
    
    re.mouse.l.splice(re.mouse.l.indexOf(this), 1);
});