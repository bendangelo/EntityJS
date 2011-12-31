/*
The tween component tweens properties of entities to the given value over a period of time.

This is useful for animations.

re.e('tween')
.tween(0.8, {x:10});

*/
re.c('tween')
.require('update')
.global({
	
	tween:function(obj, time, props){
		return obj.comp('tween')
		.tween(time, props);
	}
	
})
.namespace({

	update:function(t){
		
		
		
	}

})
.defaults({
	
	tweening:false
	
})
.extend({
	
	tween:function(time, props){
		this.time = time || 5;
		
		if(this.tweening){
			this.unbind('update', this.tween_update);
		}
		
		//collect properties
		for(var i in props){
			
			if(!props.hasOwnProperty(i)) continue;
			
			this.tween_props[i] = {s:re.sys.stepSize, i:props[i]};
			
		}
		
		return this;
	}
	
})
.init(function(){
	
	this.tween_props = {};
	
});
re.tween = re.c('tween').tween;