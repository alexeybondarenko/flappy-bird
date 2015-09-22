(function () {

    var Bird = function (canvasHeight) {

        this.canvasHeight = canvasHeight;
    };
    Bird.prototype.acceleration = -9.8;

    Bird.prototype.speed = 0;
    Bird.prototype.x = 200;
    Bird.prototype.y = 50;

    // render bird on canvas
    Bird.prototype.render = function (ctx) {
        ctx.fillStyle = "#00A308";
        ctx.beginPath();
        ctx.arc(this.x, this.canvasHeight - this.y, 10, 0, Math.PI*2, true);
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

    window.Bird = Bird;
})();
