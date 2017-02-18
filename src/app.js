//矢印移動↓
var startTouchstage3;
var endTouchstage3;
var touchingstage3 = false;

var cocos_boxstage3;
var arrow_nodestage3;
var arrow_linestage3;
var debug_label1stage3;
var debug_label2stage3;
//↑矢印
var worldstage3;
var shapeArraystage3 = [];
var sawariflagstage3 = false;

var dXstage3 = 0;
var dYstage3 = 0;
var dZstage3 = 0;
var shapestage3;
var shapeground1stage3;
var nanameyuka1stage3;
var nanameyuka2stage3;
var midorijama1stage3;
var midorijamp1stage3 = 0;
var akajama1stage3;
var akajamp1stage3 = 0;
var aojama1stage3;
var aojamp1stage3 = 0;
var haijama1stage3;
var haijamp1stage3 = 0;
var yuka;

var erebetajougestage3 = 150;
var erebetasayuu = 0;
var erebetaflagstage3 = false;

/*var miss2 = 10;
var missText2;

var miss = 0;
var missText;

var miss3 = 9999;
var missText3;
*/
var pickedTilesstage3 = [];
if (typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.totem = 0; // トーテム
    SpriteTag.destroyable = 1; //
    SpriteTag.solid = 2; //
    SpriteTag.ground = 3; //地面
    SpriteTag.ground1 = 4; //氷地面
    SpriteTag.gooru = 5; //ゴール
    SpriteTag.akaimono = 6; //赤的
    SpriteTag.haiiromono = 7; //灰敵
    SpriteTag.kusariki = 8; //腐った木
    SpriteTag.kusariki2 = 9; //腐った木
    SpriteTag.kusariki3 = 10; //腐った木
    SpriteTag.kusariki4 = 11; //腐った木
    SpriteTag.kusariki5 = 12; //腐った木
    SpriteTag.kusariki6 = 13; //腐った木
    SpriteTag.kusariki7 = 14; //腐った木
    SpriteTag.kusariki8 = 15; //腐った木
    SpriteTag.kusariki9 = 16; //腐った木
    SpriteTag.kusariki10 = 17; //腐った木
    SpriteTag.kusariki11 = 18; //腐った木
    SpriteTag.sinu = 44; //落下死
};
var gameLayerstage3;

var gameScene1 = cc.Scene.extend({
    onEnter: function() {
        this._super();
        gameLayerstage3 = new game3();
        gameLayerstage3.init();
        this.addChild(gameLayerstage3, 1);

        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        if (!audioEngine.isMusicPlaying()) {
            audioEngine.playMusic("res/yuki.mp3", true);
            //audioEngine.playMusic(res.kurisutarubgm, true);
        }

        //矢印移動はじ
        var size = cc.director.getWinSize();

        debug_label1stage3 = cc.LabelTTF.create("", "Arial", 26);
        debug_label1stage3.setPosition(size.width / 2, size.height * 0.8);
        this.addChild(debug_label1stage3, 1);
        debug_label2stage3 = cc.LabelTTF.create(" ", "Arial", 26);
        debug_label2stage3.setPosition(size.width * 2 / 3, size.height * 0.74);
        this.addChild(debug_label2stage3, 1);

        missText3 = cc.LabelTTF.create("ボーナスは9999", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText3, 1);
        missText3.setPosition(250, 650);
        missText3.setScale(0.7);
        //ステジ回数
        missText = cc.LabelTTF.create("ステージ3", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText, 1);
        missText.setPosition(400, 650);
        missText.setScale(0.7);
        //score回数
        missText = cc.LabelTTF.create("スコアは" + miss, "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText, 1);
        missText.setPosition(530, 650);
        missText.setScale(0.7);
        //jump数
        missText2 = cc.LabelTTF.create("残りジャンプは100", "Arial", "26", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(missText2, 1);
        missText2.setPosition(750, 650);
        missText2.setScale(0.7);

        cocos_boxstage3 = cc.Sprite.create( /*res.totem_png*/ );
        cocos_boxstage3.setScale(0.5);
        cocos_boxstage3.setPosition(size.width / 2, size.height / 2);

        this.addChild(cocos_boxstage3, 1);
        //cocos_boxstage3.setVisible(false);

        arrow_nodestage3 = new cc.DrawNode();
        this.addChild(arrow_nodestage3, 10);
        arrow_linestage3 = new cc.DrawNode();
        this.addChild(arrow_linestage3, 11);

        var points = [new cc.Point(0, 0),
            new cc.Point(-8, -10),
            new cc.Point(-3, -10),
            new cc.Point(0, -20),
            new cc.Point(3, -10),
            new cc.Point(8, -10),
        ]

        var fillColor = new cc.Color(128, 128, 128, 128);
        var lineWidth = 1;
        var lineColor = new cc.Color(255, 255, 255, 128);
        arrow_nodestage3.drawPoly(points, fillColor, lineWidth, lineColor);
        arrow_nodestage3.setPosition(size.width / 2, size.height / 2);

        this.scheduleUpdate();

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

    onTouchBegan: function(touch, event) {
        startTouchstage3 = touch.getLocation();

        cocos_boxstage3.setPosition(startTouchstage3);
        arrow_nodestage3.setPosition(startTouchstage3);

        return true;
    },
    onTouchMoved: function(touch, event) {
        endTouchstage3 = touch.getLocation();
        touchingstage3 = true;

    },
    onTouchEnded: function(touch, event) {

        endTouchstage3 = touch.getLocation();
        touchingstage3 = false;
        if (sawariflagstage3 == true) {
            shapestage3.body.applyImpulse(cp.v(dXstage3 * -2, dYstage3 * -2), cp.v(10, 0))
            miss2--;
            missText2.setString("残りジャンプできる回数は" + miss2);
        }
        //sawariflagstage3 = true;
        //cc.director.runScene(new MyScene());

    },

    update: function(dt) {
        stagebgm = 3;
        miss3--;
        missText3.setString("ボーナスは" + miss3);
        if (miss3 < 0) {
            miss3 = 0;
        }
        if (touchingstage3 && sawariflagstage3 == true) {

            //現在タッチしているX座標と前回の座標の差分をとる
            arrow_linestage3.setVisible(true);
            arrow_nodestage3.setVisible(true);

            this.calcDirection();
        } else {
            arrow_linestage3.setVisible(false);
            arrow_linestage3.clear();
            arrow_nodestage3.setVisible(false);
            arrow_nodestage3.clear();

        }

    },
    calcDirection: function() {

        /*var*/
        dXstage3 = endTouchstage3.x - startTouchstage3.x;
        /*var*/
        dYstage3 = endTouchstage3.y - startTouchstage3.y;
        /*var*/
        dZstage3 = Math.sqrt(dXstage3 * dXstage3 + dYstage3 * dYstage3);

        //  debug_label1stage3.setString(Math.floor(dZstage3 * Math.pow(10, 2)) / Math.pow(10, 2));

        //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
        if (dZstage3 > 60) {

            //  if (Math.abs(dXstage3) > 5 || Math.abs(dYstage3) > 5) {
            //角度（ラジアン）を求める
            var radian = Math.atan2(dYstage3, dXstage3)
            //角度（ラジアン）を角度（度数）に変換
            var angle = radian * 180 / Math.PI;
            //矢印を回転させる

            //前回の描画を消す
            arrow_linestage3.clear();
            arrow_nodestage3.clear();

            var pos = cocos_boxstage3.getPosition();

            //ドラックした長さを矢印のしっぽの位置にする
            var points = [new cc.Point(0, 0),
                new cc.Point(-35, -35),
                new cc.Point(-15, -35),
                new cc.Point(0, -(dZstage3 - 10)),
                new cc.Point(15, -35),
                new cc.Point(35, -35),
            ]

            //矢印を描画する
            var fillColor = new cc.Color(128, 228, 78, 240);
            var lineWidth = 1;
            var lineColor = new cc.Color(255, 255, 255, 128);
            arrow_nodestage3.drawPoly(points, fillColor, lineWidth, lineColor);
            //矢印はもともと270度の位置にあるので、回転角度を減算する
            arrow_nodestage3.setRotation(270 - angle);

        }

        //矢印移動おわ

    }
});

var game3 = cc.Layer.extend({
    init: function() {
        this._super();

        var backgroundLayer = cc.LayerGradient.create(cc.color(0xdf, 0x9f, 0x83, 255), cc.color(0xfa, 0xf7, 0x9f, 255));
        this.addChild(backgroundLayer);
        worldstage3 = new cp.Space();
        worldstage3.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(worldstage3);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);


        var wallBottom = new cp.SegmentShape(worldstage3.staticBody,
            cp.v(-4294967294, -100), // start point
            cp.v(4294967295, -100), // MAX INT:4294967295
            0); // thickness of wall
        worldstage3.addStaticShape(wallBottom);
        //雪山の拝啓はここ
        var haikei = cc.Sprite.create(res.yukiyama);
        haikei.setPosition(240, 200);
        haikei.setScale(0.6, 0.7);
        this.addChild(haikei, 0);

        for (i = 0; i < 1; i++) {
            var tile = new MemoryTileue();
            this.addChild(tile, 1);
            //タイルを格子状に配置する計算式
            tile.setPosition(100, 650);
            tile.setScale(3, 3);

        }


        for (i = 0; i < 1; i++) {
            var tileonp = new MemoryTileonp();
            this.addChild(tileonp, 1);
            //タイルを格子状に配置する計算式
            tileonp.setPosition(50, 50);
            tileonp.setScale(0.4, 0.2);

        }

        for (i = 0; i < 1; i++) {
            var tilereset = new MemoryTilereset();
            this.addChild(tilereset, 1);
            //タイルを格子状に配置する計算式
            tilereset.setPosition(800, 50);
            tilereset.setScale(0.8, 0.8);

        }
        // this.addBody(240,10,480,20,false,res.ground_png,"ground");
        // this.addBody(204,32,24,24,true,res.brick1x1_png,"destroyable");
        // this.addBody(276,32,24,24,true,res.brick1x1_png,"destroyable");
        // this.addBody(240,56,96,24,true,res.brick4x1_png,"destroyable");
        // this.addBody(240,80,48,24,true,res.brick2x1_png,"solid");
        // this.addBody(228,104,72,24,true,res.brick3x1_png,"destroyable");
        // this.addBody(240,140,96,48,true,res.brick4x2_png,"solid");
        // this.addBody(240,188,24,48,true,res.totem_png,"totem");


        /*
        this.addBody(276,32,24,24,true,res.brick1x1_png,SpriteTag.destroyable);
        this.addBody(240,56,96,24,true,res.brick4x1_png,SpriteTag.destroyable);
        this.addBody(240,80,48,24,true,res.brick2x1_png,SpriteTag.solid);
        this.addBody(228,104,72,24,true,res.brick3x1_png,SpriteTag.destroyable);
        this.addBody(240,140,96,48,true,res.brick4x2_png,SpriteTag.solid);
        */

        this.addBody(140, 188, 50, 50, true, res.totem_png, SpriteTag.totem);
        this.addBody(824, 432, 50, 50, true, res.midoriteki, SpriteTag.destroyable);
        this.addBody(144, 532, 50, 50, true, res.akateki, SpriteTag.akaimono);
        this.addBody(354, 732, 50, 50, true, res.aoteki, SpriteTag.akaimono);
        this.addBody(654, 132, 50, 50, true, res.haiteki, SpriteTag.haiiromono);
        this.addBody(340, 200, 85, 20, false, res.erebeta, SpriteTag.ground1);
        this.addBody(90, 575, 40, 200, false, res.kooriyukatate, SpriteTag.ground);
        this.addBody(130, 110, 200, 40, false, res.kooriyuka, SpriteTag.ground);
        this.addBody(340, 110, 200, 40, false, res.kooriyuka, SpriteTag.ground);
        this.addBody(650, 315, 200, 40, false, res.kooriyuka, SpriteTag.ground);
        this.addBody(350, 550, 200, 40, false, res.kooriyuka, SpriteTag.ground);
        this.addBody(550, 600, 200, 40, false, res.kooriyuka, SpriteTag.ground);
        this.addBody(650, 50, 200, 40, false, res.kooriyuka, SpriteTag.ground);
        this.addBody(345, 310, 200, 40, false, res.kooriyuka, SpriteTag.ground);
        this.addBody(160, 385, 200, 40, false, res.kooriyuka, SpriteTag.ground);
        this.addBody(573, 180, 40, 200, false, res.kooriyukatate, SpriteTag.ground);

        this.addBody(573, 445, 40, 200, false, res.kooriyukatate, SpriteTag.ground);
        this.addBody(873, 600, 40, 200, false, res.kooriyukatate, SpriteTag.ground);
        this.addBody(823, 100, 40, 200, false, res.kooriyukatate, SpriteTag.ground);
        //this.addBody(110, 200, 50, 480, true, res.icegroundwall, SpriteTag.ground);

        this.addBody(650, 232, 50, 50, false, res.medamayaki, SpriteTag.gooru);
        this.addBody(500, -10, 60000, 10, false, res.w, SpriteTag.sinu);


        this.scheduleUpdate();
        cc.eventManager.addListener(touchListenerstage3, this);
        worldstage3.setDefaultCollisionHandler(this.collisionBegin, null, null, null);

    },
    addBody: function(posX, posY, width, height, isDynamic, spriteImage, type) {

        if (isDynamic) {
            var body = new cp.Body(1, cp.momentForBox(1, width, height));
        } else {
            var body = new cp.Body(Infinity, Infinity);
        }
        body.setPos(cp.v(posX, posY));
        var bodySprite = cc.Sprite.create(spriteImage);
        gameLayerstage3.addChild(bodySprite, 0);
        bodySprite.setPosition(posX, posY);
        if (isDynamic) {
            worldstage3.addBody(body);
        }

        shapestage3 = new cp.BoxShape(body, width, height);
        shapestage3.setFriction(0);
        shapestage3.setElasticity(0);
        shapestage3.name = type;
        shapestage3.setCollisionType(type);
        shapestage3.image = bodySprite;
        worldstage3.addShape(shapestage3);
        shapeArraystage3.push(shapestage3);
        //        shapestage3 = shapeArraystage3[0];

        shapeground1stage3 = new cp.BoxShape(body, width, height);

        //shapeArraystage3.push(shapeground1tage2);
        //shapeground1tage2 = SpriteTag.totem;
        shapeground1stage3 = shapeArraystage3[5];
        //shape.body.setPos(cp.v(1, 1))

        nanameyuka1stage3 = new cp.BoxShape(body, width, height);


        nanameyuka1stage3 = shapeArraystage3[13];

        nanameyuka2stage3 = new cp.BoxShape(body, width, height);


        nanameyuka2stage3 = shapeArraystage3[11];

        midorijama1stage3 = new cp.BoxShape(body, width, height);


        midorijama1stage3 = shapeArraystage3[1];

        akajama1stage3 = new cp.BoxShape(body, width, height);


        akajama1stage3 = shapeArraystage3[2];

        aojama1stage3 = new cp.BoxShape(body, width, height);


        haijama1stage3 = new cp.BoxShape(body, width, height);

        haijama1stage3 = shapeArraystage3[4];
        //cc.Sprite.create(res.akateki);
    },
    update: function(dt) {

        nanameyuka1stage3.body.setAngle(150);
        nanameyuka2stage3.body.setAngle(66.5);
        shapeground1stage3.body.setPos(cp.v(500, erebetajougestage3))

        //        shape.body.setPos(cp.v(1, 1))
        midorijamp1stage3 += 1;
        if (midorijamp1stage3 == 200) {
            midorijama1stage3.body.applyImpulse(cp.v(0, 100), cp.v(0, 100))
        }
        if (midorijamp1stage3 == 400) {
            midorijama1stage3.body.applyImpulse(cp.v(0, 200), cp.v(0, 0))
            midorijamp1stage3 = -100;
        }
        akajamp1stage3 += 1;
        if (akajamp1stage3 == 200) {
            akajama1stage3.body.applyImpulse(cp.v(0, 100), cp.v(0, 0))
        }
        if (akajamp1stage3 == 250) {
            akajama1stage3.body.applyImpulse(cp.v(0, -100), cp.v(0, 0))

        }
        if (akajamp1stage3 == 350) {
            akajama1stage3.body.applyImpulse(cp.v(0, 150), cp.v(0, 0))
        }
        if (akajamp1stage3 == 400) {
            akajama1stage3.body.applyImpulse(cp.v(0, -100), cp.v(0, 0))
            akajamp1stage3 = -100;
        }

        aojamp1stage3 += 1;
        if (aojamp1stage3 == 100) {
            aojama1stage3.body.applyImpulse(cp.v(-20, 80), cp.v(0, 0))
        }
        if (aojamp1stage3 == 200) {
            aojama1stage3.body.applyImpulse(cp.v(20, 80), cp.v(0, 0))

        }
        if (aojamp1stage3 == 300) {
            aojama1stage3.body.applyImpulse(cp.v(20, 80), cp.v(0, 0))

        }
        if (aojamp1stage3 == 400) {
            aojama1stage3.body.applyImpulse(cp.v(-20, 80), cp.v(0, 0))
            aojamp1stage3 = 0;
        }
        haijamp1stage3 += 1;
        if (haijamp1stage3 == 200) {
            haijama1stage3.body.applyImpulse(cp.v(0, 100), cp.v(30, 30))
        }
        if (haijamp1stage3 == 400) {
            haijama1stage3.body.applyImpulse(cp.v(0, 100), cp.v(-30, -30))
            haijamp1stage3 = -100;
        }
        worldstage3.step(dt);
        for (var i = shapeArraystage3.length - 1; i >= 0; i--) {
            shapeArraystage3[i].image.x = shapeArraystage3[i].body.p.x
            shapeArraystage3[i].image.y = shapeArraystage3[i].body.p.y
            var angle = Math.atan2(-shapeArraystage3[i].body.rot.y, shapeArraystage3[i].body.rot.x);
            shapeArraystage3[i].image.rotation = angle * 57.2957795;

        }
        //        shapeground1tage2.body.applyImpulse(cp.v(erebetasayuu, erebetajougestage3), cp.v(0, 0))
        if (erebetajougestage3 <= 110) {
            erebetaflagstage3 = false;
        } else if (erebetajougestage3 >= 320) {
            erebetaflagstage3 = true;
        }
        if (erebetaflagstage3 == false) {
            erebetajougestage3 += 0.5;
        } else if (erebetaflagstage3 == true) {
            erebetajougestage3 -= 0.5;
        }

        if (miss2 == 0) {
            cc.director.runScene(new loseScene());
            miss2 = 10;
        }
    },

    collisionBegin: function(arbiter, space) {
        /*
          if((arbiter.a.name=="totem" && arbiter.b.name=="ground") || (arbiter.b.name=="totem" && arbiter.a.name=="ground")){
              console.log("Oh no!!!!");
          }
          */

        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.ground) {
            cc.audioEngine.playEffect(res.landing_mp3);
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.gooru) {
            cc.director.runScene(new WinScene());
            stageflag = 3;
            //gameLayerstage3.removeChild(haijama1stage3.image);
            cc.audioEngine.playEffect(res.eyeshine1);
            miss += miss3;
            miss3 = 9999;
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.akaimono) {
            cc.director.runScene(new loseScene());
            cc.audioEngine.playEffect(res.gameover);
            miss3 = 9999;
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.haiiromono) {
            shapestage3.body.applyImpulse(cp.v(30, 30), cp.v(1000, 1000))



        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.sinu) {
            cc.director.runScene(new loseScene());
            cc.audioEngine.playEffect(res.gameover);




        }
        return true;
    },


});


var MemoryTileue = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.menu);
        cc.eventManager.addListener(listener2.clone(), this);

    }

});
var listener2 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            target.initWithFile("res/menu.png");
            pickedTilesstage3.push(target);

            ueniiku();


        }
    }
});




var touchListenerstage3 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
    swallowTouches: false, // 以降のノードにタッチイベントを渡す

    onTouchBegan: function(touch, event) { // タッチ時
        var pos = touch.getLocation();
        console.log("shapeArraystage3.length:", shapeArraystage3.length)
        // すべてのshapをチェックする
        for (var i = 0; i < shapeArraystage3.length; i++) {
            /*var*/
            shapestage3 = shapeArraystage3[i];
            //shapeground1tage2 = shapeArraystage3[i];
            console.log("shape.type:", i, shapestage3.type)
            //pointQueryは物理オブジェクトの内側がタップされたかどうか判定する関数
            if (shapestage3.pointQuery(cp.v(pos.x, pos.y)) != undefined) {
                console.log("hit ")
                /*  if (shape.name == SpriteTag.destroyable) {
                      //ブロックをタップしたときは、消去する
                      worldstage3.removeBody(shape.getBody());
                      worldstage3.removeShape(shape);
                      gameLayerstage3.removeChild(shape.image);
                      shapeArraystage3.splice(i, 1);
                      console.log("remove block")
                      return;
                  }
                  else*/
                if (shapestage3.name == SpriteTag.totem) {

                    // トーテムをタップしたときは、衝撃を与える
                    //shape.body.applyImpulse(cp.v(dXstage3 * -2, dY * -2), cp.v(10, 10))
                    dXstage3 = 0;
                    dYstage3 = 0;
                    sawariflagstage3 = true;

                    return;


                }

            }
        }
        // 何も無い場所をタップしたときは箱を追加する

        sawariflagstage3 = false;
        //        gameLayerstage3.addBody(pos.x, pos.y, 24, 24, true, res.brick1x1_png, SpriteTag.destroyable);
        return;

    },
    //下の使わない
    onTouchMoved: function(touch, event) {


    },
    onTouchEnded: function(touch, event) {

        //  shape.body.applyImpulse(cp.v(dXstage3 * -1, dY * -1), cp.v(10, 0))
        console.log("Oh no!!!!");

    },


});

/*
var touchListenerstage3 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touch, event) {
        for(var i=shapeArraystage3.length-1;i>=0;i--){
            if(shapeArraystage3[i].pointQuery(cp.v(touch.getLocation().x,touch.getLocation().y))!=undefined){
                if(shapeArraystage3[i].name== SpriteTag.destroyable ){
                    gameLayerstage3.removeChild(shapeArraystage3[i].image);
                    worldstage3.removeBody(shapeArraystage3[i].getBody())
                    worldstage3.removeShape(shapeArraystage3[i])
                    shapeArraystage3.splice(i,1);
                }
            }
        }
    }
});
*/
function ueniiku() {
    //playerSprite.initWithFile(res.paintmansiro2);

    cc.director.runScene(new FirstScene());
    //tekimove(0, -1);
    /*var pause = setTimeout(function() {

    }, 500);
    */
}
