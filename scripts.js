(function () {

    var explosion;
    var explosionImage;
    var canvas;

    function gameLoop () {

        window.requestAnimationFrame(gameLoop);


        explosion.update();
        explosion.render();
    }

    function sprite (options) {

        var that = {};
        var frameIndex = 0;
        var tickCount = 0;
        var ticksPerFrame = options.ticksPerFrame || 0;
        var numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

                tickCount = 0;

                if (frameIndex < numberOfFrames - 1) {
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

        that.render = function () {
            that.context.clearRect(0, 0, that.width, that.height);
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                0,
                0,
                that.width / numberOfFrames,
                that.height);
        };

        return that;
    }

    canvas = document.getElementById("testSprite");
  //  canvas.width = 64;
  //  canvas.height = 64;

    explosionImage = new Image();

    explosion = sprite({
        context: canvas.getContext("2d"),
        width: 1024,
        height: 64,
        image: explosionImage,
        numberOfFrames: 16,
        ticksPerFrame: 1
    });

    explosionImage.addEventListener("load", gameLoop);
    explosionImage.src = "explosion.png";

} ());

