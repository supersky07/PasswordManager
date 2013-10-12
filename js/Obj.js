Mars.Class('Obj', null, function(){
    this._init = function(){
        
    }
    this.merge = function(target, source){
        for(var key in target){
            if(source[key] != null){
                target[key] = source[key];
            }
        }
        return target;
    }
});
Mars.extend('Obj', new Mars.classes.Obj());