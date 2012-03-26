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
    
        re.c('mouse').event(e, c);
        
    },
    
    event:function(e, extra){
        
        //calculate mouse coordinate
        var x = e.offsetX;
        var y = e.offsetY;
        
        //calculate offset
        //TODO: fix scale
        
        var canvas = re.sys.canvas;
        var sx = canvas.width / canvas.offsetWidth;
        var sy = canvas.height / canvas.offsetHeight;
        
        x *= sx;
        y *= sy;
        
        var that = re.c('mouse');
        
        /*
        if(re.preventDefault && re.preventDefault.d[key]){
          e.preventDefault();
        }
        */
        
        var c, t, obj;
        for(var i=0; i<that.l.length; i++){
          t = that.l[i];
          if(t.screenable){
            x = re.screen.toScreenX(x);
            y = re.screen.toScreenY(y);
          }
          t.trigger(e.type, x, y, e);
          
          if(extra){
            t.trigger(e.type+':'+extra, x, y, e);
          }
        }
        
    },
    
    i:function(){
      var c = re.sys.canvas;
      re.listener('mousedown', this.press, c);
      re.listener('mouseup', this.press, c);
      re.listener('mousemove', this.event, c);
      re.listener('click', this.event, c);
      re.listener('dblclick', this.event, c);
      re.listener('contextmenu', this.event, c);
    }
    
})
.init(function(c){
    //add to listener array
    c.l.push(this);
})
.dispose(function(c){
    //remove from listener array
    
    c.l.splice(c.l.indexOf(this), 1);
});