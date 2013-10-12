(function(){
if('ontouchstart' in window) return;
var isMouseDown = false;
document.addEventListener('mousedown', function(ev){
    isMouseDown = true;
    mouseToTouch('touchstart', ev);
}, false);
document.addEventListener('mouseup', function(ev){
    isMouseDown = false;
    mouseToTouch('touchend', ev);
}, false);
document.addEventListener('mousemove', function(ev){
    if(!isMouseDown) return;
    mouseToTouch('touchmove', ev);
}, false);
function mouseToTouch(type, ev){
    var target = ev.target,
        tagName = target.tagName.toLowerCase();
    if(['select', 'input', 'textarea'].indexOf(tagName) === -1){
        ev.stopPropagation();
    }
    var touchEvent = document.createEvent('Event'),
        cX = ev.clientX,
        cY = ev.clientY,
        touches = [],
        touch = {};
    touchEvent.initEvent(type, true, true);
    touch.pageX = cX;
    touch.pageY = cY;
    touch.clientX = cX;
    touch.clientY = cY;
    touch.target = target;
    touches[0] = touch;
    touchEvent.touches = 
    touchEvent.changedTouches = 
    touchEvent.targetTouches = touches;
    touchEvent.target = target;
    target.dispatchEvent(touchEvent);
}
})();
