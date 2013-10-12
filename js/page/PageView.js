Mars.Class('PageView', null, function(superClass){
    this._init = function(hashData, pageEl){
        //TODO HashData可能没有值，路由里应该定义根路径时对应的路由信息
        this.id = hashData[0]; //默认hash的第一个路径为pageId
        this.hashData = hashData;
        var router = Mars.router;
        this.routeData = router.getRouteData(this.id);//获取当前页面的route信息
        this.winSize = Mars.utils.getWinSize();
        this.winWidth = this.winSize.width;
        this.curPos = {left : 0, top : 0};
        this.size = null;
        this.pageManager = Mars.pageManager;
        this.transitionType = this.routeData.transitionType || 'slide';
        if(!pageEl){
            pageEl = Zepto('<div class="page-view">');
            this.pageManager.getGround().append(pageEl);
        }
        this.page = pageEl;

        //阻止动画结束事件冒泡到ground上
        pageEl.on('webkitTransitionEnd', function(){
            return false;
        });
        pageEl.html(Zepto('#' + this.routeData.viewId).html());
        this.resize();
            
        this.init();
    };
    this.init = function(){
        var controller = new Mars.classes[this.routeData.controller](this.page);
    };
    this.setPos = function(pos){
        /*//只有slide会设置页面位置，其他情况位置都为0,0。
        if(this.transitionType != 'slide') return;*/
        pos = Mars.Obj.merge({
            left : 0,
            top : 0
        }, pos || {});
        this.curPos = pos;
        this.page.css(pos);
    };
    //window.resize里面处理也许更合适
    this.resize =function(w){
        w = w || Mars.utils.getWinSize().width;
        this.size = {
            'width' : w,
            'height' : Mars.utils.getWinSize().height
        };
        this.page.css(this.size);
    };
    this.show = function(){
        if(this.transitionType == 'fade'){
            this.page.show(400);
        }else{
            this.startShowTransition(this.transitionType);
        }
        //var d = this.pageManager.getData(that.id);
        //Mars.broadcaster.send('page_active_' + that.id, d);
    };
    this.hide = function(){
        if(this.transitionType == 'fade'){
            this.page.hide();
        }else{
            this.startHideTransition(this.transitionType);
        }
        //$.listener.fire('page_un_active_' + that.id, d);
    };
    this.getCurPos = function(){
        return this.curPos;
    };
    this.getHashString = function(){
        return '/' + this.hashData.join('/');
    };
    this.getTransitionType = function(){
        return this.transitionType;
    };
    //启动动画
    this.startShowTransition = function(type){
        var _this = this;
        switch(type){
            case 'pop':
                _this.popup();
                break;
            case 'fade':
                _this.page.show(400);
                break;
            default:
                _this.page.show();
        }
    };
    this.startHideTransition = function(type){
        var _this = this;
        switch(type){
            case 'pop':
                _this.popdown();
                break;
            case 'fade':
                _this.page.show(400);
                break;
            default:
                _this.page.show();
        }
    };
    this.onTransitionEnd = function(){
        this.pageManager.onTransitionEnd();
    }
    //动画
    this.popup = function(){
        var _this = this;
        this.setPos({
            left : 0,
            top : this.size.height
        });
        this.page.animate({
            '-webkit-transform' : 'translate3d(0,' + -this.size.height + 'px, 0)'
        }, 'fast', 'ease-out', function(){
            _this.onTransitionEnd();
        });
    };
    this.popdown = function(){
        var _this = this;
        this.page.animate({
            '-webkit-transform' : 'translate3d(0, 0, 0)'
        }, 'fast', 'ease-out', function(){
            _this.onTransitionEnd();
        });
    };
});