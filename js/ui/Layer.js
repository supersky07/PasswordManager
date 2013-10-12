Mars.Class('Layer', null, function(){
    this._init = function(content){
        this.self = Mars.C('div');
        this.self.className = 'layer';
        this.self.style.zIndex = Mars.utils.getUniqueId();
        this.self.innerHTML = content || '';
        document.body.appendChild(this.self);
        this.show();
    }
    this.show = function(){
        var winSize = Mars.dom.getViewport();
        var contentSize = Mars.dom.getBoundingClientRect(this.self);
        var top = (winSize.height - contentSize.height) / 2;
        this.self.style.left = (winSize.width - contentSize.width) / 2 + 'px';
        this.self.style.top = -contentSize.height + 'px';
        this.self.style.webkitTransform = 'translate3d(0, ' + (contentSize.height + top) + 'px, 0)';
    };
    this.hide = function(){
        this.self.parentNode.removeChild(this.self);
    };
});
