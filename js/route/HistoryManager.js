//历史记录 处理hash变化
Mars.Class('HistoryManager', null, function(){
    this._init = function(){
        this.init();
    };
    this.init = function(){
		if('onhashchange' in window){
			var _this = this;
			Zepto(window).on('hashchange', function(){
				_this.hashchanged();
			});
		}
    };
    this.getHash = function(){
		var matches = location.href.match(/#(.*)$/);
  		return matches ? matches[1] : '';
	};
	this.parseHash = function(hash){
		hash = hash || this.getHash();
		var hashParamsArr = hash.split('/');
		hashParamsArr.forEach(function(o, i){//去除空字符串
			if(o === ''){
				hashParamsArr.splice(i, 1);
			}
		});
		return hashParamsArr;
	};
	this.hashchanged = function(){
		//console.log(this.parseHash());
		Mars.broadcaster.send('hashchange', this.parseHash());
	};
	this.navigate = function(hash){
		window.location.hash = '#' + hash;
	};
	this.setHash = function(hash){
		var curHash = window.location.hash;
		var url = window.location.href.replace(curHash, '') + '#' + hash;
		window.history.pushState(null, document.title, url);
	}
	//根据当前hash，返回hash数据
	this.getCurHashData = function(){
		return this.parseHash();
	}
});
Mars.extend('historyManager', new Mars.classes.HistoryManager());