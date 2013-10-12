Mars.Class('DelegateEvent', null, function(){
    this._init = function(el, types){
        this.addEventListener(el, types);
        this.isTab = true;
    }
    this.addEventListener = function(el, types){
        types = types || ['touchmove', 'touchend'];
        var _this = this;
        for(var i = 0, len = types.length; i < len; i++){
            el.on(types[i], function(evt){
                _this.dispatchEvent(evt);
            });
        }
    };
    this.removeEventListener = function(obj, types){
        if(types.isArray()){
            for(var i = 0, len = types.length; i < len; i++){
                obj.off(types[i]);
            }
        }else{
            obj.off();
        }
    }
    this.dispatchEvent = function(evt){
        var type = evt.type;
        if(type === 'touchmove'){
            this.isTab = false;
            return;
        }
        if(type === 'touchend'){
            if(!this.isTab){
                this.isTab = true;
                return;
            }
        }
        
        var target = evt.target,
            //TODO 需要找到有action-type属性的真正的target
            fnName = target.getAttribute('action-type'),
            fn = this[fnName];
        //console.log(Mars.isFunction(fn));
        if(fn && typeof fn === 'function'){
            fn.call(this, evt);
        }
    }
});