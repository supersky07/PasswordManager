Mars.Class('Toast', null, function(){
    this._init = function(){
        this.self = $('<div class="ui-toast">');
        this.content = $('<span class="ui-toast-content">');
        this.self.append(this.content);
        this.timeoutId = null;
    };
    this.show = function(txt, time){
        if(txt === '') return;
        window.clearTimeout(this.timeoutId);
        this.content.html(txt);
        var self = this.self;
        $('body').append(self);
        this.timeoutId = window.setTimeout(function(){
            self.remove();
        }, time || 1500);
    };
});
Mars.extend('toast', new Mars.classes.Toast());