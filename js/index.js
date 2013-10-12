(function(){
	//注册应用的路由信息
	Mars.router.addRoutes([
		{id : 'home', controller : 'Home', viewId : 'view_home', transitionType : 'slide'},
		{id : 'content', controller : 'Home', viewId : 'view_content', transitionType : 'pop'},
		{id : 'about', controller : 'Home', viewId : 'view_about', transitionType : 'slide'}
	]);
	//启动应用
    Mars.pageManager.start({
        'ground' : Zepto('#ground'),
        'transitionType' : 'slide'
    });
})();