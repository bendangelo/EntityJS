/*
The mouse component allows an entity to listen to mouse triggers.

@usage
re.e('mouse')
.on('mousedown:middle', function(x, y){
    //x - x position
    //y - y position
  
    //convert to screen position
    re.screen.toScreenX(x);
})

FUTURE: rename triggers to the standard format
mousemove -> mouse:move
*/
re.s('mouse')
.defines({
    
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
    
        this.event(e, c);
        
    },
    
    event:function(e, extra){
        
        var canvas = this.canvas;
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
        
        
        var listeners = this.entities;
        
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
        
    }
    
})
.defaults({
  offX:0,
  offY:0
})
.init(function(canvas){
  this.entities = re.g('mouse').create();
  this.canvas = canvas;

  var e = this.event.bind(this),
  p = this.press.bind(this);

    re.listener('mousedown', p, canvas);
    re.listener('mouseup', p, canvas);
    re.listener('mousemove', e, canvas);
    re.listener('mouseover', e, canvas);
    re.listener('mouseout', e, canvas);
    re.listener('click', e, canvas);
    re.listener('dblclick', e, canvas);
    re.listener('contextmenu', e, canvas);
});