/*
The touch component handles touch events and dispatches signals.
*/
re.c('touch')
.global({
	
	touchEvent:function(e){
		
	},
	
	active:false,
	
	initListeners:function(){
		if(!this.active){
			this.active = true;
			
			re.listener('touchstart', this.touchEvent, false);
			re.listener('touchmove', this.touchEvent, false);
			re.listener('touchend', this.touchEvent, false);
			
		}
	}
	
})
.init(function(c){
	c.initListeners();
	
});