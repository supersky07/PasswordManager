Mars.Class('Broadcaster', null, function(){
    this._init = function(){
        this.channels = {};
    };
    this.add = function(name, callback, scope){
        if(name === '' || !$.isFunction(callback) || !scope) return false;
        if(name in this.channels){
            var listeners;
            for(var key in this.channels){
                listeners = this.channels[key];
                var listener;
                for(var i = 0, len = listeners.length; i < len; i++){
                    listener = listeners[i];
                    if(listener.fn === callback && listener.scope === scope){//已经添加过，不再添加
                        return false;
                    }
                }
            }
            this.channels[name].push({fn:callback, scope:scope});
        }else{
            this.channels[name] = [];
            this.channels[name].push({fn:callback, scope:scope});
        }
    };
    this.remove = function(name, callback){
        if(!(name in this.channels)) return;
        if($.isFunction(callback)){
            var listeners = this.channels[name];
            for(var i = 0, len = listeners.length; i < len; i++){
                if(listeners[i].fn === callback){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }else{
            delete this.channels[name];//删除所有名为name的通知
        }
    };
    this.send = function(name, params){
        if(!(name in this.channels)) return;
        var listeners = this.channels[name];
        var listener;
        for(var i = 0, len = listeners.length; i < len; i++){
            listener = listeners[i];
            listener.fn.call(listener.scope, params);
        }
    };
});
Mars.extend('broadcaster', new Mars.classes.Broadcaster());