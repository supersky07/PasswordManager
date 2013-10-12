Mars.Class('Home', Mars.classes.DelegateEvent, function(superClass){
	this._init = function(el){
		superClass._init.call(this, el, ['click']);
	};
	//DOM 事件处理
	this.back = function(){
		Mars.pageManager.back();
	}
});