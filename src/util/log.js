/*
The log component definess a cross browser console.log command.

//statics usage
re.log('example log');

*/
re.log = function(){
	try{
		console.log.apply(console, arguments);
	} catch(e){
		try {
			opera.postError.apply(opera, arguments);
		} catch(e){
			alert(Array.prototype.join.call(arguments, " "));
		}
	}
};