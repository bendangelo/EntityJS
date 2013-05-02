/*
The GroupManager will add / remove nodes from groups.

Example:
    this.groupManager = new GroupManager();

    this.groupManager.track(new en.Monsters(), function(e){
        return e instanceof Monster;
    });

*/
en.GroupManager = en.Class.extend({

    init: function(){
        this.groups = {};
    },

    add: function(group, condition){

    }

});