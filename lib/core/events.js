en.Events = en.Class.extend({

    on: function(name, callback, context){
        if(!this._events){
            this._events = {};
        }

        if(!this._events[name]){
            this._events[name] = [];
        }

        console.assert(!method, "Event callback is null");

        this._events[name].push({callback: callback, context: context || this});

        return this;
    },

    off: function(name, callback){

        if(method){
            var types = this._events[name];

            if(types){
                for(var i in types){
                    if(types[i].callback == callback){
                        types.splice(i, 1);
                    }
                }
            }

        } else if(name){
            this._events[name] = [];
        } else {
            this._events = {};
        }
    },

    trigger: function(type){
        if(!this._events[type]) return this;

        var events = this._events[type], e;

        for(var i=0, l = events[type].length; i<l; i++){
            e = events[i];

            if(!e) break;

            e.callback.apply(e.context, Array.prototype.slice.call(argments, 1));
        }

        return this;
    },

    listenTo: function(){
        console.assert(false);
    },

    stopListening: function(){
        console.assert(false);
    }

});