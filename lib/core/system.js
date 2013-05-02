en.System = en.Class.extend({

    init: function(group){
        this.group = group;
        this.nodes = group.nodes;
    },

    processAll: function(){
        for(var i in this.nodes){
            // process must be implemented
            this.process(this.nodes[i]);
        }
    }

});