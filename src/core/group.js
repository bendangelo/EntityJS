/*
The group class automatically adds / removes entities when the comp is added to it. Each group acts as a singleton and is an array of entities. It is usually used in a system to catch specific entities and process them.

Group is actually an array just like the query class. This will eventually replace the query class!

Usage:

	re.group("monsters");
	//OR
	re.g("monsters")
	.requires("units")
	.statics({
		findAt:function(x, y){
			return this.find(function(e){
				return e.atTile(x, y);
			});
		}
	});
	
	//create new instance
	re.g("monsters").create();

	re.e('monsters'); //joined group
	
	re.monsters.findAt(0, 0);
*/
re.group = re.g = function(title, data){

};