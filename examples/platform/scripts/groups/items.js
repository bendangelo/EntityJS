re.g('items')
.defines({

    coins:function(){
        return this.filter(function(e){
            return e.has('coin');
        });
    }

})