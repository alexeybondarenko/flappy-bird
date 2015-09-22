(function () {

    function Tube (width, position, height, x) {
        this.width = width || 40;
        this.aperture = position || 120;
        this.x = x;
        this.height = height;
    }
    Tube.prototype.render = function (ctx) {
        ctx.fillStyle = '#519265';
        console.log('render', this);
        // top rect
        var topRectEnd = this.aperture - tubeApertureWidth / 2;
        ctx.fillRect(this.x, 0, this.width, topRectEnd);
        ctx.fillRect(this.x, topRectEnd + tubeApertureWidth, this.width, this.height - topRectEnd - tubeApertureWidth);
    };
    Tube.prototype.update = function (dt) {
        this.x -= tubeSpeed * dt;
    };

    window.tubeSpeed = 80;
    window.tubeApertureWidth = 90;

    window.Tube = Tube;
})();
