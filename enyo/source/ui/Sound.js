enyo.kind({
        name: "enyo.Sound",
        kind: enyo.Component,
        
        create: function() {
                this.inherited(arguments);
                this.srcChanged();
                this.preloadChanged();
        },
        srcChanged: function() {
                var path = enyo.path.rewrite(this.src);
                if (window.PhoneGap) {
                        this.media = new Media("/android_asset/www/Effect_Tick.ogg");
                } else {
                        this.audio = new Audio();
                        this.audio.src = path;
                }
                  //this.setAttribute("src", path);
        },
        preloadChanged: function() {
                //this.setAttribute("autobuffer", this.preload ? "autobuffer" : null);
                //this.setAttribute("preload", this.preload ? "preload" : null);
        },
        //* @public
        play: function() {
                if (window.PhoneGap) {
                        new Media(this.src).play()
                        this.media.play();
                } else {
                        if (!this.audio.paused) {
                                this.audio.currentTime = 0;
                        } else {
                                this.audio.play();
                        }
                }
        }
});