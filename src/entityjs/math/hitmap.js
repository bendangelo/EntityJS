/*

The hitmap component is used for collision detection in a tile-based game.
This can be sent to a physics entity and it will recieve checks if it hits
a tile.

Creating this signal system will allow other developers to easily implement
their own hit collision system.
*/
re.c('hitmap')
.require('arraymap')
.define({
	hitValue:1,
	
	checkAxisX:function(value, x, y, vx, vy){
		
		return value == this.hitValue;
		
	},
	
	checkAxisY:function(value, x, y, vx, vy){
		return value == this.hitValue;
	},
	
	checkHit:function(pos, vel, size){
		if(arguments.length == 1){
			var vel = pos.vel;
			var size = pos.size;
			pos = pos.pos;
		}
		
		var res = {
			pos:{x:pos.x, y:pos.y},
			tile:{}
		};
		
		var step = ~~(Math.max(Math.abs(vel.x), Math.abs(vel.y)) / ((re.tile.size.x + re.tile.size.y) * 0.5) + 0.5);
		
        if(step > 1) {
            var sx = vel.x / step;
            var sy = vel.y / step;
            
            for(var i=0; i<step && (sx || sy); i++) {
				
                this.hitmap_step(res, pos.x, pos.y, sx, sy, size.x, size.y);
                
                if(res.x) {
					sx = 0;
				}
				
                if(res.y) {
					sy = 0;
				}
            }
			
        } else {
			
            this.hitmap_step(res, pos.x, pos.y, vel.x, vel.y, size.x, size.y);
			
        }
		
		return res;
	}
	
})
.namespace({
	
	/*
	TODO:
	refactor
	possibly utilize entity methods for more robust calculations.
	*/
	step:function(res, x, y, vx, vy, width, height){
	
		res.pos.x += vx;
        res.pos.y += vy;
        
		var t, ty, tx;
		
        if(vx) {
			
			t = re.tile.size.x;
			
            var offsetx = (vx > 0 ? width : 0);
			
            var firsty = Math.floor(y / t);
            var lasty = Math.ceil((y + height) / t);
			
            tx = Math.floor((x + vx + offsetx) / t);
            
            var offx = (vx < 0 ? t : 0);
			//is inside
            if(tx >= 0 && tx < this.size.x && lasty >= 0 && firsty < this.size.y) {
				
                for(ty = firsty; ty<lasty; ty++){
					
                    if(this.map[ty]){
						
						//signal
						this.signal('hit', this.map[ty][tx], tx, ty);
						
						if(this.checkAxisX(this.map[ty][tx], x, y, vx, vy)) {
							res.x = true;
							res.pos.x = tx * t + offx  - offsetx;
							res.tile.x = tx * t;
							res.tile.y = ty * t;
							break;
						}
                    }
					
                }
				
            }
			
        }
		
        if(vy) {
			t = re.tile.size.y;
			
            var offsety = (vy > 0 ? height : 0);
			
            var firstx = Math.floor(res.pos.x / t);
            var lastx = Math.ceil((res.pos.x + width) / t);
            ty = Math.floor((y + vy + offsety) / t);
            
            var offy = (vy < 0 ? t : 0);
            // Still inside this collision map?
            if(ty >= 0 && ty < this.size.y && lastx >= 0 && firstx< this.size.x) {
					
                for(tx = firstx; tx<lastx; tx++) {
					
                    if(this.map[ty]){
						
						this.signal('hit', this.map[ty][tx], tx, ty);
						
						if(this.checkAxisY(this.map[ty][tx], x, y, vx, vy)) {
							res.y = true;
							res.pos.y = ty * t + offy - offsety;
							res.tile.x = tx * t;
							res.tile.y = ty * t;
							break;
						}
                    }
					
                }
            }
			
			
			
        }
		
	}
	
});