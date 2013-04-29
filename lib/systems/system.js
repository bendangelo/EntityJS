en.System = en.Class.extend({

    init: function(){
        this.entities = [];
    },

    processAll: function(){
        for(var i in this.entities){
            this.process(this.entities[i]);
        }
    }

});