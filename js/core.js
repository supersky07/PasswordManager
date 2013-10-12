var Mars = (function(){
    var classes = {};
    var __inDeclare = false;
    function Class(className, superClass, classImp) {
        var sp, proto;
        if(!superClass) {
            sp = null;
            superClass = Object;
        } else {
            sp = superClass.prototype;
        }
        var clazz = function() {
            if(__inDeclare) return;
            this._init.apply(this, arguments);
        };
        __inDeclare = true;
        proto = clazz.prototype = new superClass();
        __inDeclare = false;
        proto.constructor = clazz;
        proto._className = className;
        if(typeof classImp === "function") {
            classImp.apply(proto, [sp]);
        }
        classes[className] = clazz;
        return clazz;
    }
    var extend = function(ns, obj){
        if(!Mars[ns]){
            Mars[ns] = obj;
        }
    };
    var Mars = {
        classes : classes,
        Class : Class,
        extend : extend
    };

    return Mars;
})();
