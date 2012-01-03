/*


*/

re.constants = {
	canvasId:'#canvas'
};

re.ready(function(){
	
	//because we're not running on a server turn off root path
	re.load.path = '';
	
	//inits the system
	re.sys.init(re.constants.canvasId).start();
	
	re.sys.clearColor = '#FFFFFF';
	
	re.e('mouse update pressed')
	.bind('mousedown',function(){
		console.log('Mouse down!');
	})
	.bind('mouseup', function(){
		console.log('Mouse up!');
	
	})
	.bind('mousemove', function(x, y){
		console.log('Mouse move!',x+' '+y);
	
	})
	.bind('click', function(){
		console.log('Mouse click!');
	
	})
	.bind('dblclick', function(){
		console.log('Mouse double click!');
	
	})
	.bind('contextmenu', function(){
		console.log('Contextmenu!');
	
	})
	.bind('update', function(){
		
		if(this.pressed('mouse:left')){
			console.log('mouse:left');
		}
		
		if(this.pressed('mouse:right')){
			console.log('mouse:right');
		}
		
		if(this.pressed('mouse:middle')){
			console.log('mouse:middle');
		}
		
	});
	
});