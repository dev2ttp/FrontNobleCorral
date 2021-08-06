(function(cjs, an) {

    var p; // shortcut to reference prototypes
    var lib = {};
    var ss = {};
    var img = {};
    lib.ssMetadata = [
        { name: "print_atlas_", frames: [
                [312, 0, 279, 401],
                [0, 0, 310, 425],
                [0, 611, 462, 185],
                [312, 403, 492, 206],
                [0, 427, 33, 33]
            ] }
    ];


    // symbols:



    (lib.CachedTexturedBitmap_10 = function() {
        this.initialize(ss["print_atlas_"]);
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedTexturedBitmap_11 = function() {
        this.initialize(ss["print_atlas_"]);
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedTexturedBitmap_5 = function() {
        this.initialize(ss["print_atlas_"]);
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedTexturedBitmap_6 = function() {
        this.initialize(ss["print_atlas_"]);
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();



    (lib.CachedTexturedBitmap_7 = function() {
        this.initialize(ss["print_atlas_"]);
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();



    (lib.Interpolación4 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa_1
        this.instance = new lib.CachedTexturedBitmap_11();
        this.instance.parent = this;
        this.instance.setTransform(-77.65, -106.1, 0.5, 0.5);

        this.instance_1 = new lib.CachedTexturedBitmap_10();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-67.25, -99.7, 0.5, 0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }, { t: this.instance }] }).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-77.6, -106.1, 155, 212.5);


    (lib.Interpolación3 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa_1
        this.instance = new lib.CachedTexturedBitmap_11();
        this.instance.parent = this;
        this.instance.setTransform(-77.65, -106.1, 0.5, 0.5);

        this.instance_1 = new lib.CachedTexturedBitmap_10();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-67.25, -99.7, 0.5, 0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_1 }, { t: this.instance }] }).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-77.6, -106.1, 155, 212.5);


    // stage content:
    (lib.Sintítulo2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer_1
        this.instance = new lib.CachedTexturedBitmap_7();
        this.instance.parent = this;
        this.instance.setTransform(210.25, 105.15, 0.5, 0.5);

        this.instance_1 = new lib.CachedTexturedBitmap_6();
        this.instance_1.parent = this;
        this.instance_1.setTransform(2.3, 79.05, 0.5, 0.5);

        this.instance_2 = new lib.CachedTexturedBitmap_5();
        this.instance_2.parent = this;
        this.instance_2.setTransform(9.2, 84.3, 0.5, 0.5);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_2 }, { t: this.instance_1 }, { t: this.instance }] }).wait(30));

        // Layer_1
        this.instance_3 = new lib.Interpolación3("synched", 0);
        this.instance_3.parent = this;
        this.instance_3.setTransform(127.05, -109.6);

        this.instance_4 = new lib.Interpolación4("synched", 0);
        this.instance_4.parent = this;
        this.instance_4.setTransform(127.05, 390.4);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_3 }] }).to({ state: [{ t: this.instance_4 }] }, 29).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance_3).to({ _off: true, y: 390.4 }, 29).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(127.3, -77.2, 121.00000000000001, 574);
    // library properties:
    lib.properties = {
        id: '2F1DD6CFBB733F47A1FD4D5FE6CAEF66',
        width: 250,
        height: 277,
        fps: 24,
        color: "#FFFFFF",
        opacity: 1.00,
        manifest: [
            { src: "img/print_atlas_.png", id: "print_atlas_" }
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
    p.play = function() { this.tickEnabled = true;
        this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
    p.stop = function(ms) { if (ms) this.seek(ms);
        this.tickEnabled = false; }
    p.seek = function(ms) { this.tickEnabled = true;
        this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
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
    an.compositions['2F1DD6CFBB733F47A1FD4D5FE6CAEF66'] = {
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