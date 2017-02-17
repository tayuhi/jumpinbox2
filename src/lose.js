var cloud; //雲
var ThirdLayer3 = cc.Layer.extend({

    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
miss2 = 100;
//bgmの再生をとめる
if (audioEngine.isMusicPlaying()) {
    audioEngine.stopMusic();

//audioEngine.playEffect(res.warai);
}
        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        if (!audioEngine.isMusicPlaying()) {
            //audioEngine.playMusic("res/bgm_main.mp3", true);
  //          audioEngine.playMusic(res.paintmantitle, true);
        }
        //score回数
        missText = cc.LabelTTF.create("スコアは" + miss, "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText, 1);
        missText.setPosition(400, 600);
        missText.setScale(2);
        var  missText = cc.LabelTTF.create("お前の負けだ　出直してこい", "PixelMplus10", "32", cc.TEXT_ALIGNMENT_CENTER);
          this.addChild(missText,1);
          missText.setPosition(450, 550);
          missText.setScale(1.5);
        //雲
                this.schedule(this.addCloud, 4.5);
        //画像
        var sprite = cc.Sprite.create(res.losekao1);
        /*sprite.setPosition(size.width / 1.5, size.height / 2);
        sprite.setScale(10, 5);*/
        sprite.setPosition(500, 300);
        sprite.setScale(6, 6);

        this.addChild(sprite, 1);

        var haikei = cc.Sprite.create(res.titlehaikei);
        /*sprite.setPosition(size.width / 1.5, size.height / 2);
        sprite.setScale(10, 5);*/
        haikei.setPosition(450, 300);
        haikei.setScale(2.3, 2.5);
        this.addChild(haikei, 0);
/*        var moveAction = cc.MoveTo.create(5, new cc.Point(size.width / 2, size.height / 1.4));
        sprite.runAction(moveAction);

        var sprite2 = cc.Sprite.create(res.titleplay);
        sprite2.setPosition(size.width / 1.7, size.height / 10);
        sprite2.setScale(1.5);
        this.addChild(sprite2, 0);



        var playtenmetu = cc.Blink.create(3000,2000);

         sprite2.runAction(cc.Sequence.create(playtenmetu));
*/


        /*//画像
        var sprite = cc.Sprite.create(res.kage);
        sprite.setPosition(size.width / 1.3, size.height / 7);
        sprite.setScale(0.8);
        this.addChild(sprite, 0);
*/
    /*    var label = cc.LabelTTF.create("倉庫番", "Arial", 76);

        label.setPosition(size.width / 2, size.height * 1 / 6);
        this.addChild(label, 1);
*/


        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
        return true;
    },


    //雲
        addCloud: function( /*event*/ ) {
            var cloud = new Cloud();
            this.addChild(cloud);
        },
        removeCloud: function(cloud) {
            this.removeChild(cloud);
        },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
//      audioEngine.playEffect(res.powerup02);
stageflag = 0;
        cc.director.runScene(new FirstScene());


        //bgmの再生をとめる
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
//audioEngine.playEffect(res.warai);
        }


    },
});

//雲クラス
var Cloud = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.kumo);
    },
    onEnter: function() {
        this._super();
        this.setPosition(1000, 280);
        this.setScale(5, 5);
        var moveAction = cc.MoveTo.create(6.5, new cc.Point(-200, 270));
        this.runAction(moveAction);
        this.scheduleUpdate();
        //画面の外にでた雲を消去する処理
                if (this.getPosition().x < -50) {
                    gameLayer.removeCloud(this);
                }
    },

});

var loseScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 250));
        this.addChild(backgroundLayer);

        //ラベルとタップイベント取得
        var layer3 = new ThirdLayer3();
        this.addChild(layer3);

    }
});
