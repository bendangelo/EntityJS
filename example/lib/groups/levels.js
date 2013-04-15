re.g('level')
.defines({

    load:function(index){
        return this[index].build();
    }

})
//collect levels as they are created
.create();

