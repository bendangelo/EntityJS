    /*
    If component exists, the component will NOT be overwritten.

    @return component reference
    */
    re.comp = re.c = function(title, data){

        if(!re._c[title]){
            re._c[title] = new re.c.init(title);
        }

        //set data
        if(data){
            for(var i in data){
                re._c[title][i](data[i]);
            }
        }

        return re._c[title];
    };

    re.c.init = function(name){

        this.name = name;
        this._re_defaults = {};
        this._re_defines = {};
        this._re_events = {};
        this._re_setters = {};
        this._re_getters = {};

        //defines the special re.[comp]()
        if(!re[this.name]){
            var that = this;

            re[this.name] = function(){
                return that._re_method.apply(that, arguments);
            };

        }
    };

    /*
    p._re_requiress = null;

    p._re_init = null;

    p._re_dispose = null;

    p._re_asserts = null;

    p._re_interface = null;
    */

re.c.init.prototype = {
    /*
    Quick way to convert sentences to arrays.
    */
    z:function(n, r){

        if(!this[n]){
            this[n] = [];
        }

        if(re.is(r, 'string')){
            this[n] = this[n].concat(r.split(' '));
        } else {
            this[n] = this[n].concat(r);
        }

        return this;
    },

    //turns global method into a singleton
    singleton:function(name){
        this._re_method = function(){
            return this._singleton || (this._singleton = re.e(name||this.name));
        }
        return this;
    },

    /*
        Adds getter and setter for given attributes.
    */
    accessors:function(attrs){
        if(re.is(attrs,"string")) attrs = attrs.split(" ");

        var pri;
        for(var i in attrs){
            pri = "_"+attrs[i];

            this.getters(attrs[i], new Function("return this."+pri+";"));

            this.setters(attrs[i], new Function("v", "this."+pri+" = v;"));
        }
    },

    getters:function(obj, value){
        if(value){
            //single
            this._re_getters[obj] = value;
        } else {
            //multiple
            for(var i in obj){
                this._re_getters[i] = obj[i];
            }
        }
        return this;
    },

    setters:function(obj, value){
        if(value){
            //single
            this._re_setters[obj] = value;
        } else {
            //multiple
            for(var i in obj){
                this._re_setters[i] = obj[i];
            }
        }
        return this;
    },

    statics:function(obj, value){

        if(!re.is(value)){

            for(var type in obj){
                re[this.name][type] = obj[type];
            }

        } else {
            re[this.name][obj] = value;
        }

        return this;
    },

    events:function(obj, value){

      if(!re.is(value)){

          for(var type in obj){
              this._re_events[type] = obj[type];
          }

      } else {
          this._re_events[obj] = value;
      }

      return this;
    },

    /*
    Defines a more formal constructor for when references are needed.

    re.c('control')
    .factory(function(ref, val){
        this.ref = ref;
        this.val = val;
    });

    //new control entity
    re.control(val1, val2);

    */
    factory:function(f){

        this._re_factory = f;

        return this;
    },

    /*
    Controls the factory method flow.

    Will create a new entity and try to use the defined factory or else
    uses the default:

    //default factory
    re.circle({radius:10, color:"#ff0000"});

    */
    _re_method:function(){
        var e = re.e(this.name), f = this._re_factory;

        if(f)
            f.apply(e, arguments);
        else
            e.set.apply(e,arguments); //this is the default factory method

        return e;
    },

    /*
    Overwrites the factory method for a custom use.

    re.c('monster')
    .method(function(){
        return re('monster');
    });

    re.monster(); //calls method

    */
    method:function(f){
        this._re_method = f.bind(re[this.name]);
        return this;
    },

    requires:function(r){
        return this.z('_re_requires', r);
    },

    /*
    Creates new names for a component.

    //create a new alias of draw
    re.c('draw')
    .alias('bob');

    //remove alias
    re.c('draw')
    .alias('-bob');

    //aliases can even delete components itself
    re.c('draw').alias('-draw');

    //add two aliases
    re.c('draw').alias('dr bob');

    */
    alias:function(s){

        var p = s.split(' ');

        if(p.length > 1){

            for(var i in p){
                this.alias(p[i]);
            }

            return this;
        }

        if(s.charAt(0) == '-'){
            //only remove if its a reference
            if(re._c[s.substr(1)] == this){
                delete re._c[s.substr(1)];
            }
        } else {

            re._c[s] = this;
        }

        return this;
    },

    /*
    Default adds onto but doesn't overwrite values.
    */
    defaults:function(d, value){

        if(arguments.length == 1){

            for(var k in d){
                this._re_defaults[k] = d[k];
            }

        } else {

            this._re_defaults[d] = value;

        }

        return this;
    },

    /*
    The namespace method is used to put private component variables
    in its own space. This prevents unwanted overrites.

    re.c('draw')
    .namespace({
    pos:0,
    type:'none'

    });

    //or
    re.c('draw')
    .namespace("pos", 0);

    //Will cast to
    this.draw_pos = 10;
    this.draw_type = 'none';

    */
    namespaces:function(obj, value){
        var name = this.name+'_';

        if(arguments.length == 1){

            for(var k in obj){
                this._re_defines[name+k] = obj[k];
            }

        } else {
            this._re_defines[name+obj] = value;
        }

        return this;
    },

    /*
    defines overrides everything.
    */
    defines:function(d, value){

        if(arguments.length == 1){

            for(var k in d){
                this._re_defines[k] = d[k];
            }

        } else {
            this._re_defines[d] = value;
        }

        return this;
    },

    init:function(method){

        this._re_init = method;

        return this;
    },

    dispose:function(method){

        this._re_dispose = method;

        return this;
    },

    /*
    The run method allows a function to be ran in the context
    of the component.

    Useful to keep everything in one big component.
    */
    run:function(method){

        //re.ready(function(){
            method.call(this);
        //});

        return this;
    }

};