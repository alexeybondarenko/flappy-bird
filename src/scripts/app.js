(function () {
    'use strict';

    // A cross-browser requestAnimationFrame
    // See [link](https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/)
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
    // Generate random number from min to max
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ## Canvas element
    // Game container element
    var container = document.querySelector('#game');
    // Create new canvas element
    var canvas = document.createElement('canvas');
    // Get 2D graphic context from canvas.
    // Canvas provides methods for drawing shapes and manipulating with them.
    var ctx = canvas.getContext('2d');

    // Score element
    var $gameScore = container.querySelector('.game__score');

    // Appending canvas to container element
    container.appendChild(canvas);

    canvas.width = 600;
    canvas.height = 400;

    // ## Resize
    // Callback on resizing event. We make canvas element full-screen size.
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize, false); resize();

    // ## Resources
    // We load resources for the app using simple library [resources.js](./resources.html)
    resources.load([
        'img/brickwall.png'
    ]);
    // Waiting of ready event
    resources.onReady(init);


    var lstTime = null,
        now;

    var brickPattern = null;

    // ## Initializing
    function init () {
        console.log('init');

        // Setting background pattern variable
        brickPattern = ctx.createPattern(resources.get('img/brickwall.png'), 'repeat');

        reset();
        lstTime = Date.now();
        main();
    }

    // ## Game loop
    // Game process include frame rendering one be one. So we neww the loop, which initialize re-render call.

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
        player.y = 300;
        player.x = Math.min(canvas.width * .30, 200);
        console.log(player.x);
        player.speed = 0;
    }
    function stopGame () {
        isGameOver = true;
        container.classList.add('is-over');
    }
    function startGame () {
        isGameOver = false;
        container.classList.remove('is-welcome');
        container.classList.remove('is-over');
        score = 0;
        reset();
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

        if (isGameOver) {
            return;
        }
        player.update(dt);
        updateTubes(dt);
        checkCollisions();
        $gameScore.innerText = score;
    }

    var totalDelay;
    function updateTubes (dt) {

        passedTubes = clearTubes (passedTubes);
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

    function action () {
        if (isGameOver) {
            startGame ();
        }
        player.speedUp();
    }
    var isTouchDevice = true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
    document.addEventListener('keyup', function (e, data) {
        if (e.keyCode == 32) { // space pressed
            action ();
        }
    });
    if (isTouchDevice) {
        document.addEventListener('touchend', function (e, data) {
            action();
        });
    } else {
        document.addEventListener('click', function (e, data) {
            action();
        });
    }

    function isHaveCollisions () {
        if (player.y <= 0 || player.y >= canvas.height) {
            return true;
        }
        return isHaveCollisionsWithTubes (player);
    }

    function isHaveCollisionsWithTubes (player) {

        if (!tubes[0]) return false;
        if (tubes[0].checkCollisionWithPlayer (player)) return true;

        if ((player.x - (tubes[0].x + tubes[0].width)) > player.radius) {
            passedTubes.push(tubes.shift());
            score++;
        }
        return false;
    }
    function checkCollisions () {
        if (isHaveCollisions()) {
            stopGame();
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
        tubes.push(new Tube(50, getRandomInt(50, canvas.height - tubeApertureWidth / 2 - 50), canvas.height, canvas.width, tubeApertureWidth));
    }

    var isGameOver = true;
    var tubes = [],
        passedTubes = [];
    var score = 0;
    var player = new Bird (canvas.height);

})();
