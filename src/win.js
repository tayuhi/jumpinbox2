var cloud; //雲
var sprite;

var ThirdLayer2 = cc.Layer.extend({

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
        missText = cc.LabelTTF.create("現在のスコアは" + miss, "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText, 1);
        missText.setPosition(400, 600);
        missText.setScale(2);
        //dotした回数
      var  missText = cc.LabelTTF.create("お前の勝ちだ 次のステージに進め", "PixelMplus10", "32", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText,1);
        missText.setPosition(450, 550);
        missText.setScale(1.5);
        //雲
        this.schedule(this.addCloud, 4.5);
        //画像
        sprite = cc.Sprite.create(res.winkao1);
        /*sprite.setPosition(size.width / 1.5, size.height / 2);
        sprite.setScale(10, 5);*/
        sprite.setPosition(500, 300);
        sprite.setScale(6, 6);
        this.addChild(sprite, 1);
        this.scheduleUpdate();
        sprite.schedule(this.workingsprite, 0.1);
        sprite.arukiflag = 0;

        var haikei = cc.Sprite.create(res.titlehaikei);
        /*sprite.setPosition(size.width / 1.5, size.height / 2);
        sprite.setScale(10, 5);*/
        haikei.setPosition(450, 300);
        haikei.setScale(2.3, 2.5);
        this.addChild(haikei, 0);



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

    workingsprite: function(event) {
        if (sprite.arukiflag == 0) {
            sprite.initWithFile(res.winkao1);
            sprite.arukiflag = 1;

        } else if (sprite.arukiflag == 1) {
            sprite.initWithFile(res.winkao2);
            sprite.arukiflag = 2;
        } else if (sprite.arukiflag == 2) {
            sprite.initWithFile(res.winkao3);
            sprite.arukiflag = 3;

        } else if (sprite.arukiflag == 3) {
            sprite.initWithFile(res.winkao4);
            sprite.arukiflag = 4;
        } else if (sprite.arukiflag == 4) {
            sprite.initWithFile(res.winkao5);
            sprite.arukiflag = 5;

        } else if (sprite.arukiflag == 5) {
            sprite.initWithFile(res.winkao6);
            sprite.arukiflag = 6;
        } else if (sprite.arukiflag == 6) {
            sprite.initWithFile(res.winkao5);
            sprite.arukiflag = 7;

        } else if (sprite.arukiflag == 7) {
            sprite.initWithFile(res.winkao4);
            sprite.arukiflag = 8;
        } else if (sprite.arukiflag == 8) {
            sprite.initWithFile(res.winkao3);
            sprite.arukiflag = 9;

        } else if (sprite.arukiflag == 9) {
            sprite.initWithFile(res.winkao2);
            sprite.arukiflag = 10;
        } else if (sprite.arukiflag == 10) {
            sprite.initWithFile(res.winkao1);
            sprite.arukiflag = 0;
        }
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
if(stageflag == 1){
        cc.director.runScene(new gameScene2());
}else if(stageflag == 2){
  cc.director.runScene(new gameScene1());
}else if(stageflag == 3){
  cc.director.runScene(new gameScene4());
}else if(stageflag == 4){
  cc.director.runScene(new gameScene5());
}

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

var WinScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 250));
        this.addChild(backgroundLayer);

        //ラベルとタップイベント取得
        var layer3 = new ThirdLayer2();
        this.addChild(layer3);

    }
});
