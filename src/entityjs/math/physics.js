/*
The Physics component adds new physical and time calculated variables to an entity.

These variables will give the entity a more fluid movement in 2d space.
*/
re.physics = re.c('physics')
.require('point update')
.global({
	/*
	hitmap:null,
	*/
	gra:{x:0, y:0},
	
	//velocity lower than this will be rounded down
	minVel:0.01
})
.init(function(c){
	
	if(!this.has('size') || !this.has('radius')){
		this.comp('size');	
	}
	
	this.vel = {x:0, y:0, max:{x:100, y:100}};
	this.fri = {x:0.9, y:0.4};
	this.acc = {x:0, y:0};
	this.res = {x:0, y:0};
	this.mas = {x:1, y:1};
	
	this.signal('update', this.physics_update);
	
	//setup defaults
	this.hitmap = c.hitmap;
	
	this.gra = {x:c.gra.x, y:c.gra.y};
	
})
.dispose(function(){
	
	this.signal('-update', this.physics_update);
	
})
.namespace({
	
	update:function(t){
		
		this.vel.x = this.force(this.vel.x, this.acc.x, this.fri.x, this.gra.x, this.mas.x, t, this.vel.max.x);
		this.vel.y = this.force(this.vel.y, this.acc.y, this.fri.y, this.gra.y, this.mas.y, t, this.vel.max.y);
		
		//check collisions and get result
		if(this.hitmap){
			
			this.step(this.hitmap.checkHit(this));
			
		} else {
			
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
			
			this.step(this.pos);
		}
	}
	
})
.define({
	/*
	hitmap:null,
	
	vel:null,
	//friction
	fri:null,
	acc:null,
	vel.max:null,
	//restitution
	res:null,
	mas:null,
	gra:null
	*/
	
	step:function(pos, hitx, hity, tilex, tiley){
		
		if(arguments.length == 1){
			hitx = pos.x;
			hity = pos.y;
			if(pos.tile){
				tilex = pos.tile.x;
				tiley = pos.tile.y;
			}
			pos = pos.pos;
		}
		
		this.pos = pos;
		
		this.signal('step', hitx, hity, tilex, tiley);
		
		if(hitx){
			this.vel.x = this.forceRes(this.vel.x, this.res.x);
		}
		
		if(hity){
			this.vel.y = this.forceRes(this.vel.y, this.res.y);
		}
		
		if(Math.abs(this.vel.x) < re.physics.minVel){
			this.vel.x = 0;
		}
		if(Math.abs(this.vel.y) < re.physics.minVel){
			this.vel.y = 0;
		}
	},
	
	forceRes:function(vel, res){
		return vel * -res;
	},
	
	forceGra:function(gra, mas, tim){
		return gra * mas * tim;
	},
	
	forceVel:function(vel, acc, fri, tim){
		return (vel + acc * tim) * fri;
	},
	
	force:function(vel, acc, fri, gra, mas, tim, max){
		
		var v = this.forceVel(vel, acc, fri, tim) + this.forceGra(gra, mas, tim);
		
		v = Math.min(max, Math.max(-max, v));
		
		return v;
	},
	
	isIdle:function(){
		return (this.vel.y == 0 && this.vel.x == 0 && this.acc.x == 0 && this.acc.y == 0);
	}
	
});