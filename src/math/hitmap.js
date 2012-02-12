/*

The hitmap component is used for collision detection in a tile-based game.
This can be sent to a physics entity and it will recieve checks if it hits
a tile.

Creating this bind system will allow other developers to easily implement
their own hit collision system.
*/
re.c('hitmap')
.requires('automap')
.defines({

    hitValue:1,
    
    checkAxisX:function(value, x, y, vx, vy){
        
        return value == this.hitValue;
        
    },
    
    checkAxisY:function(value, x, y, vx, vy){
        return value == this.hitValue;
    },
    
    checkHit:function(posX, posY, velX, velY, bodX, bodY, padX, padY){
        if(arguments.length == 1){
            var velX = posX.velX;
            var velY = posX.velY;
            
            var bodX = posX.bodyX;
            var bodY = posX.bodyY;
            
            var padX = posX.padX;
            var padY = posX.padY;
            
            var posY = posX.posY;
            posX = posX.posX;
        }
        
        var res = {
            posX:posX,
            posY:posY,
            tarX:-1,
            tarY:-1
        };
        
        var step = ~~(Math.max(Math.abs(velX), Math.abs(velY)) / ((re.tile.sizeX + re.tile.sizeY) * 0.5) + 0.5);
        
        if(step > 1) {
            var sx = velX / step;
            var sy = velY / step;
            
            for(var i=0; i<step && (sx || sy); i++) {
                
                this.hitmap_step(res, posX, posY, sx, sy, bodX, bodY, padY, padY);
                
                if(res.hitX) {
                    sx = 0;
                }
                
                if(res.hitY) {
                    sy = 0;
                }
            }
            
        } else {
            
            this.hitmap_step(res, posX, posY, velX, velY, bodX, bodY, padX, padY);
            
        }
        
        return res;
    }
    
})
.namespaces({
    
    /*
    TODO:
    refactor
    possibly utilize entity methods for more robust calculations.
    */
    step:function(res, x, y, vx, vy, width, height, padx, pady){
    
        res.posX += vx;
        res.posY += vy;
        
        var t, ty, tx;
        
        if(vx) {
            
            t = re.tile.sizeX;
            
            var offsetx = (vx > 0 ? width - padx : padx);
            
            var firsty = Math.floor((y + pady)/ t);
            var lasty = Math.ceil((y + height - pady) / t);
            
            tx = Math.floor((x + vx + offsetx) / t);
            
            var offx = (vx < 0 ? t : 0);
            //is inside
            if(tx >= 0 && tx < this.lengthX && lasty >= 0 && firsty < this.lengthY) {
                
                for(ty = firsty; ty<lasty; ty++){
                    
                    if(this.map[ty]){
                        
                        this.trigger('hit', this.map[ty][tx], tx, ty);
                        
                        if(this.checkAxisX(this.map[ty][tx], x, y, vx, vy)) {
                            res.hitX = true;
                            res.posX = tx * t + offx  - offsetx;
                            res.tarX = tx * t;
                            res.tarY = ty * t;
                            break;
                        }
                    }
                    
                }
                
            }
            
        }
        
        if(vy) {
            t = re.tile.sizeY;
            
            var offsety = (vy > 0 ? height -pady : pady);
            
            var firstx = Math.floor((res.posX + padx) / t);
            var lastx = Math.ceil((res.posX + width - padx) / t);
            ty = Math.floor((y + vy + offsety) / t);
            
            var offy = (vy < 0 ? t : 0);
            // Still inside this collision map?
            if(ty >= 0 && ty < this.lengthY && lastx >= 0 && firstx< this.lengthX) {
                    
                for(tx = firstx; tx<lastx; tx++) {
                    
                    if(this.map[ty]){
                        
                        this.trigger('hit', this.map[ty][tx], tx, ty);
                        
                        if(this.checkAxisY(this.map[ty][tx], x, y, vx, vy)) {
                            res.hitY = true;
                            res.posY = ty * t + offy - offsety;
                            res.tarX = tx * t;
                            res.tarY = ty * t;
                            break;
                        }
                    }
                    
                }
            }
            
            
            
        }
        
    }
    
});