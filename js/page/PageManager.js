Mars.Class('PageManager', null, function(){
    this._init = function(){
        this.pagesHash = {};    //key为pageId
        this.pageStack = [];     //相对于home的page队列，用于go和back导航
        this.pages = [];    //所有page
        this.curPage = null;    //当前page
        this.ground = null;     //page的父元素，slide动画在它上面触发
        this.winSize = Mars.utils.getWinSize();    //屏幕大小

        this.curPosX = 0;
        this.nextCurPage = null;
        this.groupTransitionTypes = ['slide', 'flip']
    };
    this.init = function(page){
        this.curPage = page;
        this.pageStack.push(page);
        this.pages.push(page);
        this.pagesHash[page.id] = page;
        page.setPos();
        
        var _this = this;
        
        Zepto(window).on('resize', function(){
            _this.onWinResize();
        });
        Mars.broadcaster.add('hashchange', function(data){
            var id = data[0];
            var page;
            if(id in _this.pagesHash){
                page = _this.pagesHash[id];
                _this.go(page);
            }else{
                /*var routeData = Mars.router.getRouteData(id);
                if(!routeData) return;*/
                page = new Mars.classes.PageView([id]);
                _this.pagesHash[id] = page;
                _this.go(page);
            }
        }, this);
    };
    //开始page管理，只调用一次
    this.start = function(params){
        params = Mars.Obj.merge({
            'ground' : '#ground',
            'pageId' : ''
        }, params);
        var _this = this;
        defaultFirstPid = params.pageId;
        this.ground = Zepto(params.ground);
        this.ground.css({
            'position' : 'relative',
            /*'-webkitTransition' : '-webkit-transform 0.2s ease-out'*/
        });
        /*this.ground.on('webkitTransitionEnd', function(){
            _this.onTransitionEnd();
        });*/
        var hashData = Mars.historyManager.getCurHashData();//如果页面中有hash，则加载当前hash对应的page，（用户刷新页面）
        var firstPage;
        if(hashData){
            firstPage = new Mars.classes.PageView(hashData);
        }else{
            firstPage = new Mars.classes.PageView([params.pageId]);
        }
        firstPage.show();
        this.init(firstPage);
    };
    //前进
    this.go = function(page){
        if(!page){
            throw 'need a page param'
        }
        var winWidth = this.winSize.width;
        this.curPage.resize(winWidth);//TODO移动浏览器不必resize。
        this.nextCurPage = page;
        this.pageStack.push(page);
        if(this.pages.indexOf(page) == -1){
            this.pages.push(page);
        }
        var transitionType = page.getTransitionType();
        if(this.groupTransitionTypes.indexOf(transitionType) != -1){    //两个页面的组合动画
            //从左向右滑入
            if(transitionType == 'slide'){
                page.setPos({
                    left : this.curPage.getCurPos().left + winWidth
                });
            }
            // ......其他组合动画实现
            this.curPosX -= winWidth;
            this.startTransition(transitionType, this.curPosX);
        }else{//动画是单个页面的
            page.show();
        }
        console.log('【 Go pageStack 】', this.pageStack)
    };
    //后退
    this.back = function(page){
        //可能页面出现滚动条
        var winWidth = this.winSize.width;
        var len = this.pageStack.length;
        if(!page){
            //只有一个页面，无法后退了。
            if(len < 2) return;
            page = this.pageStack[len - 2];
            this.pageStack.pop();//从page栈中移除
            Mars.historyManager.setHash(page.getHashString());
        }
        this.nextCurPage = page;
        //后退时需要判断当前页面的动画类型
        var transitionType = this.curPage.getTransitionType();
        if(this.groupTransitionTypes.indexOf(transitionType) != -1){    //两个页面的组合动画
            //当前页面是组合动画入场的，那么只需将ground拉回到原来位置即可，不必重新设置单个page的位置
            if(transitionType == 'slide'){
                /*page.setPos({
                    left : this.curPage.getCurPos().left - winWidth
                });*/
            }
            // ......其他组合动画实现
            
            this.curPosX += winWidth;
            this.startTransition(transitionType, this.curPosX);
        }else{//动画是单个页面的
            this.curPage.hide();
        }
        console.log('【 Back pageStack 】', this.pageStack)
    };
    //开始ground的动画。
    this.startTransition = function(type, x){
        if(type == 'slide'){
            var _this = this;
            _this.ground.animate({
                '-webkitTransform' : 'translateX(' + x + 'px)'
            }, '5s', 'ease-out', function(){
                _this.onTransitionEnd();
            });
        }
    };
    //动画结束事件。TODO page级别的动画，如fade，暂不触发。
    this.onTransitionEnd = function(evt){
        //if(evt && evt.target != this.ground[0]) return;
        //this.curPage.hide();
        this.curPage = this.nextCurPage;
        console.log('【 onTransitionEnd 】', this.curPage.id)
        //this.curPage.resize();//TODO移动浏览器不必resize。
    };
    //因为移动浏览器的orientationchange事件，这里应该resize所有页面
    this.onWinResize = function(){
        //TODO winWidth 从curPage获取
        /*this.winSize = Mars.utils.getWinSize();
        if(this.winWidth !== this.winSize.width){
            this.winWidth = this.winSize.width;
            Zepto.each(pages, function(i, p){
                p && p.resize && p.resize(this.winWidth);
            })
        }*/
    };
    this.getGround = function(){
        return this.ground;
    };
});
Mars.extend('pageManager', new Mars.classes.PageManager());