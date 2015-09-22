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

    var now;
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
        tubes = [];
        isGameOver = true;
        player.y = 200;
        player.speed = 0;
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
        if (isGameOver) {
            return;
        }
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
            isGameOver = false;
        }
    }

    function isHaveCollisions () {
        if (player.y <= 0 || player.y >= canvas.height) {
            return true;
        }
        return isHaveCollisionsWithTubes (player);
    }
    function isHaveCollisionsWithTubes (player) {
        var cur = null;
        for (var i = 0, l = tubes.length; i < l; i++) {
            cur = tubes[i];

        }
    }
    function checkCollisions () {
        if (isHaveCollisions()) {
            reset();
            console.log('have collisions');
        }
    }

    function clearTubes (tubes) { // clear invisible tubes
        var cur;
        for (var i = 0; i < tubes.length; i++) {
            cur = tubes[i];
            if ((cur.x + cur.width + 10) < 0) {
                tubes.shift();
                i--;

            } else {
                break;
            }
        }
        return tubes;
    }

    function addTube () {
        tubes.push(new Tube(50, getRandomInt(50, canvas.height - 50), canvas.height, canvas.width, tubeApertureWidth));
    }

    var isGameOver = false;
    var tubes = [];
    var player = new Bird (canvas.height);


})();
