(function () {

    function circleIntersectsRectangle(circle, rect) {
        var halfWidth = rect.width / 2,
            halfHeight = rect.height / 2;

        if (Math.abs(circle.x - (rect.x + halfWidth)) >= (circle.radius + halfWidth)) {
            console.log('> x');
            return false;
        }
        if (Math.abs(circle.y - (rect.y + halfHeight)) >= (circle.radius + halfHeight)) {
            console.log('> y');
            return false;
        }

        return true;
    }

    function Tube (width, position, height, x, apertureWidth) {
        this.width = width || 40;
        this.x = x;
        this.height = height;

        this.aperture = {
            start: position - this.width / 2
        };
        this.aperture.end = this.aperture.start + apertureWidth;
    }
    Tube.prototype.checkCollisionWithPlayer = function (player) {
        var circle = {
            x: player.x,
            y: player.y,
            radius: player.radius
        }, rectTop = {
            x: this.x,
            y: 0,
            width: this.width,
            height: this.aperture.start
        }, rectBottom = {
            x: this.x,
            y: this.aperture.end,
            width: this.width,
            height: this.height
        };
        return circleIntersectsRectangle (circle, rectTop) || circleIntersectsRectangle (circle, rectBottom);
    };
    Tube.prototype.render = function (ctx) {
        ctx.fillStyle = '#519265';
        console.log('render', this);
        // top rect
        var topRectEnd =
        ctx.fillRect(this.x, 0, this.width, this.aperture.start);
        ctx.fillRect(this.x, this.aperture.end, this.width, this.height - this.aperture.end);
    };
    Tube.prototype.update = function (dt) {
        this.x -= tubeSpeed * dt;
    };

    window.tubeSpeed = 120;
    //window.tubeApertureWidth = 100;
    window.tubeApertureWidth = 200;

    window.Tube = Tube;
})();
