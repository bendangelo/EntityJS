
re.constants  = {
	canvasId:'#canvas',
	assets:'home.png win.png',
	size:{x:500, y: 400},
	maxScore:1000
}

re.ready(function(){
	
	re.sys.init(re.constants.canvasId)
	.start();
	
	//go to scene preload
	re.scene('preload');
	
	//remove root
	re.load.path = '';
	
	re.load(re.constants.assets)
	.complete(function(){
		
		//go to home scene
		re.scene('start');
		
	});
	
});

//defines scenes

//first scene and openning scene
re.scene('preload')
//since a scene is just an entity
//we can add components to it
.comp('font')
.defines({
	text: 'Preloading', 
	textColor:'#66b44d',
	posX: re.constants.size.x * 0.5,
	posY: re.constants.size.y * 0.5
})
.enter(function(){
	
	//called upon entering a scene
	
	//property from the draw component
	this.drawing = true;
	
})
.exit(function(newScene){
	
	//called upon exiting a scene
	
	this.drawing = false;
	
	//first argument is the new scene its switching to
	console.log('New scene is: '+newScene);
	
});

//create scenes directly from re.e
re.e('scene:start')
.enter(function(){

	//display bitmap home.png
	this.home = re.e('bitmap home.png');
	
	this.home.posX = 20;
	this.home.posY = 50;
	
	//add enter listener
	this.enter = re.e('keyboard')
	//add two signals listens for keyup of enter AND space. Cool eh??
	.bind('keyup', function(key){
		if(key == 'space' || key == 'enter'){
			var score = Math.floor(Math.random() * re.constants.maxScore);
			
			//you can send arguments to scenes
			re.scene('win', score, 'Awsome score!');
		}
	});

})
.exit(function(){
	
	this.home.dispose();
	this.enter.dispose();
	
});

//final scene accepts two arguments
re.scene('win')
.enter(function(points, rating){
	
	this.win = re.e('win.png bitmap')
	.defines({
		posX:100,
		posY:10
	});
	
	this.message = re.e('font');
	
	this.message.text = 'Your score is: '+points+'... '+rating;
	this.message.posX = 150;
	this.message.posY = 300;
	
	this.ret = re.e('font');
	this.ret.text = 'Press any key to return.';
	this.ret.posX = this.message.posX;
	this.ret.posY = this.message.posY + 30;
	
	this.key = re.e('keyboard')
	.bind('keyup', function(){
	
		re.scene('start');
		
	});
	
})
.exit(function(){
	
	//finds all draw entities and disposes them
	//all entities that draw to the screen have the draw component
	//but don't delete any scene entities, remember the scene preload is a draw entity!
	re('draw -scene').dispose();
	
	this.ret.dispose();
	
	//samething as writing
	/*this.win.dispose();
	this.text.dispose();*/
	
});