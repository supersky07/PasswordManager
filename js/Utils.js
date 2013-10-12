Mars.Class('Utils', null, function(){
    this._init = function(){
        this._uid = 0;
    };
    //获得一个唯一的id，自增整数
    this.getUniqueId = function(){
        return this._uid++;
    };
    //解析一个简单的html片段
    this.parseTpl = function(tpl, data){
        if(!data) return tpl;
        return tpl.replace(/\{\$(.+?)\}/ig, function(_1, _2){
            if(data[_2] != undefined){
                return data[_2];
            }
            return _1;
        });
    };
    this.formatDate = function(timestamp){
        var date = new Date(parseInt(timestamp));
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var week = date.getDay();

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        return year + '年' + this.doubleDigits(month) + '月' + this.doubleDigits(day) + '日 ' + this.doubleDigits(hours) + ':' + this.doubleDigits(minutes) + ':' + this.doubleDigits(seconds);
    };
    //获取0~9双数字表示
    this.doubleDigits = function(d){
        if(typeof d === 'number'){
            return d < 10 ? '0' + d : d;
        }
        return 0;
    };
    this.getWinSize = function(){
        var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
        var h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
        return {
            width : w,
            height : h
        }
    };
});
Mars.extend('utils', new Mars.classes.Utils());