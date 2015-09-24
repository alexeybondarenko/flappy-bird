(function () {

    var Bird = function (canvasHeight) {

        this.canvasHeight = canvasHeight;
    };
    Bird.prototype.acceleration = -9.8; // metres / sec^2

    Bird.prototype.speed = 0;
    Bird.prototype.x = 200;
    Bird.prototype.y = 50;
    Bird.prototype.radius = 10;

    // render bird on canvas
    Bird.prototype.render = function (ctx) {
        ctx.fillStyle = "#3C0069";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    };
    // update object based on the time delta
    Bird.prototype.update = function (dt) {
        dt *= 9.8;
        this.y -= this.speed * dt + this.acceleration * dt*dt / 2;
        this.speed += this.acceleration * dt;
        if (this.y > this.canvasHeight) {
            this.y = this.canvasHeight;
            this.speed = 0;
        }
    };
    Bird.prototype.speedUp = function (x, y) {
        console.log('speedUp');
        this.speed = 40;
    };

    window.Bird = Bird;
})();
