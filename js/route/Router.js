/**
 * 路由 提供路由注册功能，以便处理hash变化时更新相应的页面
 */
Mars.Class('Router', null, function(){
    this._init = function(){
        this.routes = {};
    }
    this.addRoutes = function(route){
    	var _this = this;
		Zepto.each(route, function(i, o){
			if(!_this.routes[o.id]){
				_this.routes[o.id] = o;
			}
		});
	};

	this.getRouteData = function(id){
		if(id in this.routes){
			return this.routes[id];
		}
		return null;
	};
});
Mars.extend('router', new Mars.classes.Router());