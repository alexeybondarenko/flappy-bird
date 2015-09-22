(function () {

    function Tube (width, position, height, x, apertureWidth) {
        this.width = width || 40;
        this.aperture = position || 120;
        this.x = x;
        this.height = height;
        this.apertureWidth = apertureWidth;

    }
    Tube.prototype.render = function (ctx) {
        ctx.fillStyle = '#519265';
        console.log('render', this);
        // top rect
        var topRectEnd = this.aperture - this.apertureWidth / 2;
        ctx.fillRect(this.x, 0, this.width, topRectEnd);
        ctx.fillRect(this.x, topRectEnd + this.apertureWidth, this.width, this.height - topRectEnd - this.apertureWidth);
    };
    Tube.prototype.update = function (dt) {
        this.x -= tubeSpeed * dt;
    };

    window.tubeSpeed = 120;
    window.tubeApertureWidth = 100;

    window.Tube = Tube;
})();
