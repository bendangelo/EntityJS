/*
The sprite object defines a drawable image for an entity.
*/

re.c('sprite')
.require('point draw idgrid -bitmap')
.init(function(){
	
	this.frame = {x:0, y:0};
	this.frame.size = {x:0, y:0};
	
	this.signal('draw', this.draw);
	
})
.dispose(function(){
	
	this.signal('-draw', this.draw);
	
})
.define({
	
	setFrameId:function(id){
		this.frame.x = this.idToXt(id, this.image.width, this.frame.size.x);
		this.frame.y = this.idToYt(id, this.image.width, this.frame.size.y);
	},
	
	getFrameId:function(){
		return this.toId(this.frame.y, this.frame.x, this.image.width);
	},
	
	draw:function(context){
		if(this.image){
			var x = this.pos.x;
			var y = this.pos.y;
			
			if(this.group){
				x += this.group.pos.x;
				y += this.group.pos.y;
			}
			
			context.drawImage(this.image, this.frame.x * this.frame.size.x, this.frame.y * this.frame.size.y, this.frame.size.x, this.frame.size.y, x, y, this.frame.size.x, this.frame.size.y);
		}
		
		return this;
	}
	
});