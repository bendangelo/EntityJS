/*
The tween component tweens properties of entities to the given value over a period of time.

This is useful for animations.

NOT IMPLMENETED will be in V0.3
*/
re.c('tween')
.require('update')
.global({
	
	tween:function(obj, time, props){
		//return this._re_defines.tween.call(obj, time, props);
	}
	
})
.namespace({

	update:function(t, time){
		
		
		
	}

})
.define({
	
	tween:function(time, props){
		this.time = time || 5;
		
		this.signal('-update', this.tween_update);
		
		//collect properties
		for(var i in props){
			
			if(!props.hasOwnProperty(i)) continue;
			
			this.tween_props[i] = {s:re.sys.time, i:props[i]};
			
		}
		
		return this;
	}
	
})
.init(function(){
	
	this.tween_props = {};
	
});
re.tween = re.c('tween').tween;