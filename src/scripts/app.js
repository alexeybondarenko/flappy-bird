(function () {
    'use strict';

    // A cross-browser requestAnimationFrame
    // See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    var requestAnimFrame = (function(){
        return window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var canvas = document.querySelector('#game');
    var ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    var lstTime = null;

    function main () {
        var now = Date.now();
        var dt = (now - lasTime) / 1000.0;

        update(dt);
        render();

        lstTime = now;
        requestAnimFrame(main);
    }

    function render () {

    }
    function update (dt) {

    }

})();
