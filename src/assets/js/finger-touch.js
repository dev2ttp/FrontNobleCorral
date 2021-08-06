(function(cjs, an) {

    var p; // shortcut to reference prototypes
    var lib = {};
    var ss = {};
    var img = {};
    lib.ssMetadata = [{
        name: "finger_touch_atlas_",
        frames: [
            [0, 0, 344, 434],
            [0, 436, 277, 253]
        ]
    }];


    // symbols:



    (lib.CachedTexturedBitmap_2 = function() {
        this.initialize(ss["finger_touch_atlas_"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedTexturedBitmap_4 = function() {
        this.initialize(ss["finger_touch_atlas_"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.Interpolación2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa_1
        this.instance = new lib.CachedTexturedBitmap_4();
        this.instance.parent = this;
        this.instance.setTransform(-69.2, -63.15, 0.5, 0.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-69.2, -63.1, 138.5, 126.5);


    (lib.Interpolación1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa_1
        this.instance = new lib.CachedTexturedBitmap_4();
        this.instance.parent = this;
        this.instance.setTransform(-69.2, -63.15, 0.5, 0.5);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-69.2, -63.1, 138.5, 126.5);


    // stage content:
    (lib.Sintítulo1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Modo_de_aislamiento
        this.instance = new lib.Interpolación1("synched", 0);
        this.instance.parent = this;
        this.instance.setTransform(75.2, 64.5);

        this.instance_1 = new lib.Interpolación2("synched", 0);
        this.instance_1.parent = this;
        this.instance_1.setTransform(75.2, 64.5);
        this.instance_1.alpha = 0;
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ _off: true, alpha: 0 }, 9).wait(11));
        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({ _off: false }, 9).wait(1).to({ startPosition: 0 }, 0).to({ alpha: 1 }, 9).wait(1));

        // Modo_de_aislamiento
        this.instance_2 = new lib.CachedTexturedBitmap_2();
        this.instance_2.parent = this;
        this.instance_2.setTransform(0, 52.8, 0.5, 0.5);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(20));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(86, 136.4, 86, 133.4);
    // library properties:
    lib.properties = {
        id: 'A165422B629D204285CD4F07809664F6',
        width: 172,
        height: 270,
        fps: 20,
        color: "#FFFFFF",
        opacity: 1.00,
        manifest: [
            { src: "img/finger_touch_atlas_.png", id: "finger_touch_atlas_" }
        ],
        preloads: []
    };



    // bootstrap callback support:

    (lib.Stage = function(canvas) {
        createjs.Stage.call(this, canvas);
    }).prototype = p = new createjs.Stage();

    p.setAutoPlay = function(autoPlay) {
        this.tickEnabled = autoPlay;
    }
    p.play = function() {
        this.tickEnabled = true;
        this.getChildAt(0).gotoAndPlay(this.getTimelinePosition())
    }
    p.stop = function(ms) {
        if (ms) this.seek(ms);
        this.tickEnabled = false;
    }
    p.seek = function(ms) {
        this.tickEnabled = true;
        this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000);
    }
    p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

    p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

    an.bootcompsLoaded = an.bootcompsLoaded || [];
    if (!an.bootstrapListeners) {
        an.bootstrapListeners = [];
    }

    an.bootstrapCallback = function(fnCallback) {
        an.bootstrapListeners.push(fnCallback);
        if (an.bootcompsLoaded.length > 0) {
            for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
                fnCallback(an.bootcompsLoaded[i]);
            }
        }
    };

    an.compositions = an.compositions || {};
    an.compositions['A165422B629D204285CD4F07809664F6'] = {
        getStage: function() { return exportRoot.getStage(); },
        getLibrary: function() { return lib; },
        getSpriteSheet: function() { return ss; },
        getImages: function() { return img; }
    };

    an.compositionLoaded = function(id) {
        an.bootcompsLoaded.push(id);
        for (var j = 0; j < an.bootstrapListeners.length; j++) {
            an.bootstrapListeners[j](id);
        }
    }

    an.getComposition = function(id) {
        return an.compositions[id];
    }


    an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {
        var lastW, lastH, lastS = 1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function resizeCanvas() {
            var w = lib.properties.width,
                h = lib.properties.height;
            var iw = window.innerWidth,
                ih = window.innerHeight;
            var pRatio = window.devicePixelRatio || 1,
                xRatio = iw / w,
                yRatio = ih / h,
                sRatio = 1;
            if (isResp) {
                if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                    sRatio = lastS;
                } else if (!isScale) {
                    if (iw < w || ih < h)
                        sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 1) {
                    sRatio = Math.min(xRatio, yRatio);
                } else if (scaleType == 2) {
                    sRatio = Math.max(xRatio, yRatio);
                }
            }
            domContainers[0].width = w * pRatio * sRatio;
            domContainers[0].height = h * pRatio * sRatio;
            domContainers.forEach(function(container) {
                container.style.width = w * sRatio + 'px';
                container.style.height = h * sRatio + 'px';
            });
            stage.scaleX = pRatio * sRatio;
            stage.scaleY = pRatio * sRatio;
            lastW = iw;
            lastH = ih;
            lastS = sRatio;
            stage.tickOnUpdate = false;
            stage.update();
            stage.tickOnUpdate = true;
        }
    }


})(createjs = createjs || {}, AdobeAn = AdobeAn || {});
var createjs, AdobeAn;