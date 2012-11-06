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
        
        return this.mouse(x, y, e.type, extra, e);
    },

    mouse:function(x, y, type, button, event){
        return this.processAll(x, y, type, button, event);
    },

    process:function(e, x, y, type, button, event){
      var tx, ty;

      if(e.screenable){
        tx = re.screen().toScreenX(x);
        ty = re.screen().toScreenY(y);
      } else {
        tx = x;
        ty = y;
      }
      
      //offset mouse coordinates
      tx += e.offX;
      ty += e.offY;
      
      e.trigger(type, tx, ty, e);
      
      if(button){
        e.trigger(type+':'+button, tx, ty, event);
      }
    }

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