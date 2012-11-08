/*
The mouse system listens for mouse events and triggers events on all mouse entities. This should be overwritten for more advanced functionality.

@usage
re.e('mouse')
.on('mousedown:middle', function(x, y){
    //x - x position
    //y - y position
  
    //convert to screen position
    re.screen.toScreenX(x);
});

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

        //register mouse action
        if(re.pressed && re.pressed.d){
            re.pressed.d[c] = type == 'mousedown';
        }

        return this.processAll(x, y, type, button, event);
    },

    processX:function(e, x){

      if(e.screenable){
        x = re.screen().toScreenX(x);
      }
      
      //offset mouse coordinates
      return x + this.offX;
    },

    processY:function(e, y){
      if(e.screenable){
        y = re.screen().toScreenY(y);
      }
      
      //offset mouse coordinates
      return y + this.offY;
    },

    process:function(e, x, y, type, button, event){
      
      x = this.processX(e, x);
      y = this.processY(e, y);

      e.trigger(type, x, y, e);
      
      if(button){
        e.trigger(type+':'+button, x, y, event);
      }
    },

    bindEvents:function(canvas){

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
    },

    offX:0,
    offY:0
    
})
.init(function(canvas){
  this.entities = re.g('mouse').create();
  this.bindEvents(canvas);
});