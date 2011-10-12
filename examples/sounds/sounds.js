/*
This demo works in all 5 browsers. Even IE9.

This example shows how you can play sound effects in the browser.
Because not every browser all supports one codec you will need TWO
sound codecs in your game. Of course you only want to load one file type.

First you must get the currently supported sound codec.
Then load that specific codec of sound. Look at re.load()
*/
re.ready(function(){
	
	//no need to start rendering. Nothing to show
	//re.sys.init('#canvas').start();
	
	//find supported codec
	var codec = re.support('ogg', 'mp3');
	
	console.log('Codec supported '+codec);
	
	//only load sound with the supported codec!
	re.load('sound1.'+codec)
	.complete(function(){
		
		console.log('complete');
		
		//when sounds are loaded they are all given a special prefix
		//this lets you run the program normally without using re.support() everywhere
		s1 = re.e('sound sound1.sfx'); //could use sound1.ogg
		
		re.e('keyboard')
		.addSignal('keyup:x', function(){
			//play sound 1
			s1.play();
		})
		.addSignal('keyup:z', function(){
			//call sound directly
			re.c('sound1.sfx').sound.play();
		});
		
	});
	
	
});