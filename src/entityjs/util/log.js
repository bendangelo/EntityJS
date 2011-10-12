/*
The log component extends a cross browser console.log command.

//example usage
re.e('log')
.log('example log');

//global usage
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

re.c('log')
.extend('log', re.log);