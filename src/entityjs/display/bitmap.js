re.comp('bitmap')
.require('point draw -sprite')
.init(function(){
	
	this.signal('draw', this.draw);
	
})
.dispose(function(){
	
	this.signal('-draw', this.draw);
	
})
.default({
	image:null
})
.define({
	
	draw:function(context){
		if(this.image){
			var x = this.pos.x;
			var y = this.pos.y;
			
			if(this.group){
				x += this.group.pos.x;
				y += this.group.pos.y;	
			}
			
			context.drawImage(this.image, x, y, this.image.width, this.image.height);
		}
	}
	
});