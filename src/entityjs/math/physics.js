/*
The Physics component adds new physical and time calculated variables to an entity.

These variables will give the entity a more fluid movement in 2d space.
*/
re.physics = re.c('physics')
.require('point update')
.static({
	defaultHitmap:null,
	gravity:{x:0, y:0},
	MOVEMENT:'movement'
})
.init(function(c){
	
	if(!this.has('size') || !this.has('radius')){
		this.comp('size');	
	}
	
	this.vel = {x:0, y:0};
	this.fri = {x:0.5, y:0.5};
	this.acc = {x:0, y:0};
	this.maxVel = {x:10, y:10};
	this.res = {x:0, y:0};
	this.mas = {x:1, y:1};
	
	this.signal('update', this.update);
	
	//setup default hitmap
	this.hitmap = c.defaultHitmap;
	
})
.dispose(function(){
	
	this.signal('-update', this.update);
	
})
.default({
	hitmap:null,
	
	vel:null,
	//friction
	fri:null,
	acc:null,
	maxVel:null,
	//restitution
	res:null,
	mas:null,
	
	update:function(){
		
		this.vel.x = this.calculateVel(this.vel.x, this.acc.x, this.fri.x, this.maxVel.x, re.physics.gravity.x, this.mas.x);
		this.vel.y = this.calculateVel(this.vel.y, this.acc.y, this.fri.y, this.maxVel.y, re.physics.gravity.y, this.mas.y);
		
		//check collisions and get result
		this.movement(this.hitmap.checkHit(this.pos.x, this.pos.y, this.vel.x, this.vel.y, this.size.x, this.size.y));
	},
	
	movement:function(result){
		if(result.hit.x){
			this.vel.x = -this.vel.x*this.res.x;
		}
		
		if(result.hit.y){
			this.vel.y = -this.vel.y*this.res.y;
		}
		
		this.pos = result.pos;
		
		this.signal(re.physics.MOVEMENT, result);
	},
	
	calculateVel:function(vel, acc, fri, max, gra, mas){
		
		var v = (vel + acc) * fri + gra * mas;
		v.limit(-max, max);
		
		return v;
	}
	
});