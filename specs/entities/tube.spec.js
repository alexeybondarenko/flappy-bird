describe('TubeEntity', function () {
    describe('constructor', function () {
        describe('with default data', function () {
            var tube = new Tube ();
            it ('should have default width value', function () {
                expect(tube.width).toBeDefined();
            });
        });
        describe('width data', function () {
            var width = 50,
                aperture = {
                    position: 200,
                    width: 40
                },
                height = 400,
                x = 400;

            var tube = new Tube (width, aperture.position, height, x, aperture.x);
            it ('should init properties', function () {
                expect(tube.width).toBe(width);
                expect(tube.x).toBe(x);
                expect(tube.height).toBe(height);
            });
            it ('should calculate aperture', function () {
                expect(tube.aperture.start).toBeDefined();
                expect(tube.aperture.end).toBeDefined();
            });
        });
    });
    describe('checkCollisionWithPlayer', function () {
        var width = 50,
            aperture = {
                position: 200,
                width: 40
            },
            height = 400,
            x = 400;

        var tube = new Tube (width, aperture.position, height, x, aperture.x);
        var player = new Bird(height);
        player.radius = 40;
        it ('should have collisions', function () {
            player.x = 400;
            it ('with bottom rect', function () {
                player.y = 10;
                expect(tube.checkCollisionWithPlayer(player)).toBe(true);
            });
            it ('with top rect', function () {
                player.y = 30;
                expect(tube.checkCollisionWithPlayer(player)).toBe(true);
            });
            it ('with both rect', function () {
                player.y = 200;
                expect(tube.checkCollisionWithPlayer(player)).toBe(true);
            });
        });
        it ('should have\'nt collisions', function () {
            player.x = 300;
            expect(tube.checkCollisionWithPlayer(player)).toBe(false);
        });
    });
    describe('update', function () {
        var tube = new Tube ();
        tube.x = 400;
        it ('should change coords by time', function () {
            var x = tube.x;
            tube.update(.3);
            expect(x).not.toBe(tube.x);
        });
    });
});
