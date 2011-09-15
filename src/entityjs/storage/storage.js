/*
The storage component contains methods for storing locally or session values.
This utilizes the new HTML5 localstorage and sessionstorage.

The component will have an option for local or session.

TODO!

//create new local storage
re.e('storage:local');

//create new session storage
re.e('storage:session');

*/
re.c('storage')
.init(function(c, type){
	throw 'Storage not implemented!';
});