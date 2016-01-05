// prototype to start drawing on touch using canvas moveTo and lineTo
$.fn.dragTouch = function() {
        var start = function(e) {
        e = e.originalEvent;
                ctx.beginPath();
                x = e.changedTouches[0].pageX;
                y = e.changedTouches[0].pageY-44;
                ctx.moveTo(x,y);
        };
        var move = function(e) {
                e.preventDefault();
        e = e.originalEvent;
                x = e.changedTouches[0].pageX;
                y = e.changedTouches[0].pageY-44;
                ctx.lineTo(x,y);
                ctx.stroke();
        };
        $(this).on("touchstart", start);
        $(this).on("touchmove", move);
};

// prototype to start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
$.fn.dragPointer = function() {
        var start = function(e) {
        e = e.originalEvent;
                ctx.beginPath();
                x = e.pageX;
                y = e.pageY-44;
                ctx.moveTo(x,y);
        };
        var move = function(e) {
                e.preventDefault();
        e = e.originalEvent;
                x = e.pageX;
                y = e.pageY-44;
                ctx.lineTo(x,y);
                ctx.stroke();
    };
        $(this).on("MSPointerDown", start);
        $(this).on("MSPointerMove", move);
};
// prototype to start drawing on mouse using canvas moveTo and lineTo
$.fn.dragMouse = function() {
console.log('inside fn.dragMouse');
        var clicked = 0;
        var start = function(e) {
console.log('start');
                clicked = 1;
//                ctx.beginPath();
                x = e.pageX;
                y = e.pageY-44;
//                ctx.moveTo(x,y);
console.log('start (' + x + ',' + y + ')');
        };
        var move = function(e) {
                if(clicked){
                        x = e.pageX;
                        y = e.pageY-44;
//                        ctx.lineTo(x,y);
//                        ctx.stroke();
console.log('move (' + x + ',' + y + ')');
                }
        };
        var stop = function(e) {
                clicked = 0;
        };
        $(this).on("mousedown", start);
        $(this).on("mousemove", move);
        $(window).on("mouseup", stop);
};

