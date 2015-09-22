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
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


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

    var now
    // Main loop
    function main () {
        now = Date.now();
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
        renderTubes(ctx);
    }
    function renderTubes (ctx) {
        tubes.forEach(function (item) {
            renderTube(item, ctx);
        });
    }
    function renderTube (tube, ctx) {
        tube.render(ctx);
    }

    function update (dt) {
        handleInputs (dt);

        player.update(dt);
        updateTubes(dt);
        checkCollisions();
    }

    var totalDelay;
    function updateTubes (dt) {

        tubes = clearTubes (tubes);
        if (totalDelay < 2) {
            totalDelay += dt;
        } else {
            addTube();
            totalDelay = 0;
        }
        (tubes || []).forEach(function (item) {
            updateTube(item, dt);
        });
    }
    function updateTube (tube, dt) {
        tube.update(dt);
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

    var tubeSpeed = 80,
        aperture = {
            width: 90
        };

    function Tube (width, position) {
        this.width = width || 40;
        this.aperture = position || 120;
    }
    Tube.prototype.x = canvas.width;

    Tube.prototype.render = function (ctx) {
        ctx.fillStyle = '#519265';
        console.log('render', this);
        // top rect
        var topRectEnd = this.aperture - aperture.width / 2;
        ctx.fillRect(this.x, 0, this.width, topRectEnd);
        ctx.fillRect(this.x, topRectEnd + aperture.width, this.width, canvas.height - topRectEnd - aperture.width);
    };
    Tube.prototype.update = function (dt) {
        this.x -= tubeSpeed * dt;
    };

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

    function clearTubes (tubes) { // clear invisible tubes
        var cur;
        for (var i = 0; i < tubes.length; i++) {
            cur = tubes[i];
            if ((cur.x + cur.width + 10) < 0) {
                tubes.shift();
                i--;
                console.log('clear');
            } else {
                break;
            }
        }
        return tubes;
    }

    function addTube () {
        tubes.push(new Tube(50, getRandomInt(50, canvas.height - 50)));
    }

    var tubes = [];
    var player = new Bird ();


})();
