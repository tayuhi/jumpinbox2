var cloud; //雲
var stageflag = 0;
var color0 = cc.color(255, 0, 0, 255);
var color = cc.color(255, 0, 0, 128);
var color2 = cc.color(0, 250, 0, 128);
var color3 = cc.color(0, 180, 0, 128);
var color4 = cc.color(0, 200, 250, 128);
var color5 = cc.color(100, 100, 100, 128);
var color6 = cc.color(250, 0, 0, 128);
var ThirdLayererabe = cc.Layer.extend({

    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        if (!audioEngine.isMusicPlaying()) {
            //audioEngine.playMusic("res/bgm_main.mp3", true);
            //          audioEngine.playMusic(res.paintmantitle, true);
              audioEngine.playMusic("res/akarui.mp3", true);
        }
        //雲
        this.schedule(this.addCloud, 4.5);
        //画像
        /*        var sprite = cc.Sprite.create(res.titlegazou);
                sprite.setPosition(size.width / 1.5, size.height / 2);
                sprite.setScale(10, 5);
                sprite.setPosition(500, 300);
                sprite.setScale(2,2);
                this.addChild(sprite, 1);
        */
        //ステジ回数
        missText = cc.LabelTTF.create("キーボードの1,2,3,4,5どれか押してステージを選べ", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText, 1);
        missText.setPosition(400, 650);
        missText.setScale(1.2);
        missText.setColor(color)

        missText = cc.LabelTTF.create("2回同じステージを遊ぶとバグるので気を付けよう", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText, 1);
        missText.setPosition(430, 110);
        missText.setScale(1.3);
        missText.setColor(color0)

        stagetext1 = cc.LabelTTF.create("STAGE1 草原", "Arial", "36", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(stagetext1, 1);
        stagetext1.setPosition(400, 550);
        stagetext1.setScale(1.2);
        stagetext1.setColor(color2)

        stagetext2 = cc.LabelTTF.create("STAGE2 森", "Arial", "36", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(stagetext2, 1);
        stagetext2.setPosition(380, 500);
        stagetext2.setScale(1.2);
        stagetext2.setColor(color3)

        stagetext3 = cc.LabelTTF.create("STAGE3 氷山", "Arial", "36", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(stagetext3, 1);
        stagetext3.setPosition(400, 450);
        stagetext3.setScale(1.2);
        stagetext3.setColor(color4)

        stagetext4 = cc.LabelTTF.create("STAGE4 工場", "Arial", "36", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(stagetext4, 1);
        stagetext4.setPosition(400, 400);
        stagetext4.setScale(1.2);
        stagetext4.setColor(color5)

        stagetext5 = cc.LabelTTF.create("STAGE5 火山", "Arial", "36", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(stagetext5, 1);
        stagetext5.setPosition(400, 350);
        stagetext5.setScale(1.2);
        stagetext5.setColor(color6)

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
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {

                if (keyCode == 49) s1(); // 1
            }
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {

                if (keyCode == 50) s2(); // 2
            }
        }, this);
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {

                if (keyCode == 51) s3(); // 3
            }
        }, this);
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {

                if (keyCode == 52) s4(); // 4
            }
        }, this);
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {

                if (keyCode == 53) s5(); // 5
            }
        }, this);

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

        //        cc.director.runScene(new gameScene());


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

var erabeScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 250));
        this.addChild(backgroundLayer);

        //ラベルとタップイベント取得
        var layer3 = new ThirdLayererabe();
        this.addChild(layer3);

    }
});

function s1() {
    cc.director.runScene(new gameScene());
    //bgmの再生をとめる
    if (audioEngine.isMusicPlaying()) {
        audioEngine.stopMusic();

        //audioEngine.playEffect(res.warai);
    }
}

function s2() {
    cc.director.runScene(new gameScene2());
    //bgmの再生をとめる
    if (audioEngine.isMusicPlaying()) {
        audioEngine.stopMusic();

        //audioEngine.playEffect(res.warai);
    }
}

function s3() {
    cc.director.runScene(new gameScene1());
    //bgmの再生をとめる
    if (audioEngine.isMusicPlaying()) {
        audioEngine.stopMusic();

        //audioEngine.playEffect(res.warai);
    }
}

function s4() {
    cc.director.runScene(new gameScene4());
    //bgmの再生をとめる
    if (audioEngine.isMusicPlaying()) {
        audioEngine.stopMusic();

        //audioEngine.playEffect(res.warai);
    }
}

function s5() {
    cc.director.runScene(new gameScene5());
    //bgmの再生をとめる
    if (audioEngine.isMusicPlaying()) {
        audioEngine.stopMusic();

        //audioEngine.playEffect(res.warai);
    }
}
