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

    var lstTime = null;

    var container = document.querySelector('#game');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    container.appendChild(canvas);

    canvas.width = 600;
    canvas.height = 400;

    var brickPattern = null;

    // Loading resources

    resources.load([
        'img/brickwall.png'
    ]);
    resources.onReady(init);

    // Initializing
    function init () {
        console.log('init');

        // backgrounds
        brickPattern = ctx.createPattern(resources.get('img/brickwall.png'), 'repeat');

        reset();
        lstTime = Date.now();
        main();
    }

    // Main loop
    function main () {
        var now = Date.now();
        var dt = (now - lstTime) / 1000.0;

        update(dt);
        render(ctx);

        lstTime = now;
        requestAnimFrame(main);
    }
    function reset () {

    }

    /**
     * Game loops
     */

    function render (ctx) {
        ctx.fillStyle = brickPattern;
        ctx.fillRect(0, 0, canvas.width,  canvas.height);

        player.render(ctx);
    }
    function update (dt) {
        handleInputs (dt);

        player.update(dt);

        checkCollisions();
    }


    /**
     * Inputs
     */

    var keyPressed = {};
    document.addEventListener('keydown', function (e, data) {
        keyPressed[e.keyCode] = true;
    });
    document.addEventListener('keyup', function (e, data) {
        keyPressed[e.keyCode] = false;
    });
    document.addEventListener('blur', function (e, data) {
        keyPressed = {};
    });

    function handleInputs (dt) {
        if (keyPressed[32]) { // space pressed
            player.speedUp(dt);
        }
    }

    function isHaveCollisions () {
        if (player.y <= 0 || player.y >= canvas.height) {
            return true;
        }
        return false;
    }
    function checkCollisions () {
        //if (isHaveCollisions()) {
        //    console.log('have collisions');
        //}
    }

    var Tube = function () {

    };
    Tube.prototype.x = 0;
    Tube.prototype.width = 20;
    Tube.prototype.aperture = {
        width: 20,
        position: 20 // y position of aperture center in percentage
    };
    //Tube.prototype.render = function (ctx) {
    //    ctx.fillStyle =
    //}
    /**
     * Birst
     */
    var Bird = function () {

    };
    Bird.prototype.acceleration = -9.8;

    Bird.prototype.speed = 0;
    Bird.prototype.x = 200;
    Bird.prototype.y = 50;

    // render bird on canvas
    Bird.prototype.render = function (ctx) {
        ctx.fillStyle = "#00A308";
        ctx.beginPath();
        ctx.arc(this.x, canvas.height - this.y, 10, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    };
    // update object based on the time delta
    Bird.prototype.update = function (dt) {
        //dt *= 10;
        this.speed += this.acceleration * dt * 90;
        this.y += this.speed * dt;
        if (this.y < 0) {
            this.y = 0;
            this.speed = 0;
        }
    };
    Bird.prototype.speedUp = function (x, y) {
        this.speed += 80;
    };

    var player = new Bird ();


})();
